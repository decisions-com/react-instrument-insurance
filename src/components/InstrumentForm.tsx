import React from "react";
import InstrumentDetails, { InstrumentDetailsInfo } from "./InstrumentDetails";
import InstrumentPremium from "./InstrumentPremium";
import "./common/MiiForm.css";
import {
  getSubTypes,
  selectionIsOther,
  getShowCase,
  getRateCalc,
  RateCalcBody
} from "../api/InstrumentApi";
import MiiForm from "./common/MiiForm";
import { withRouter, RouteComponentProps } from "react-router";
import { BackgroundCheck } from "../api/BackgroundApi";
import { debounce } from "debounce";

interface InstrumentFormProps extends RouteComponentProps {}

interface InstrumentFormState extends InstrumentDetailsInfo {
  premiumComment: string;
  premium: number;
}

let defaultState: InstrumentFormState = {
  instrumentType: "",
  instrumentTypes: [
    "Guitar",
    "Piano",
    "Drums / Percussion",
    "String",
    "Brass",
    "Other"
  ],
  instrumentDetail: "",
  instrumentDetails: [],
  storageType: "",
  storageTypes: [
    "Home",
    "Studio",
    "School / Educational Center",
    "Standard Storage",
    "Climate Controlled Storage",
    "Mobile Storage"
  ],
  premium: 0,
  premiumComment: "",
  price: 0,
  year: 0,
  make: "",
  model: "",
  replacementCost: 0
};

class InstrumentForm extends React.Component<
  InstrumentFormProps,
  InstrumentFormState
> {
  state = { ...defaultState };

  makeValueChangeHandler(key: keyof InstrumentFormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const partial: Partial<InstrumentFormState> = {};
      partial[key] = e.target.value;
      this.setState(partial as InstrumentFormState);
      this.calculateRate();
    };
  }

  onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instrumentType = e.target.value;

    this.setState({ instrumentType });

    getSubTypes(instrumentType)
      .then(instrumentDetails => this.setState({ instrumentDetails }))
      .catch();

    selectionIsOther(instrumentType)
      .then(showOtherDetail => {
        this.setState({ showOtherDetail });
      })
      .catch();

    getShowCase(instrumentType)
      .then(canBeInCase => {
        this.setState({ canBeInCase });
      })
      .catch();
  };

  onDetailChange = this.makeValueChangeHandler("instrumentDetail");
  onYearChange = this.makeValueChangeHandler("year");
  onMakeChange = this.makeValueChangeHandler("make");
  onModelChange = this.makeValueChangeHandler("model");

  onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ price: Number.parseInt(e.target.value, 10) });
    this.calculateRate();
  };

  onReplacementCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ replacementCost: Number.parseInt(e.target.value, 10) });
    this.calculateRate();
  };

  onStorageChange = this.makeValueChangeHandler("storageType");

  onHardShellChange = (label: string, wasStoredInCase: boolean) => {
    this.setState({ wasStoredInCase });
    this.calculateRate();
  };

  onProChange = (label: string, wasPlayedPro: boolean) => {
    this.setState({ wasPlayedPro });
    this.calculateRate();
  };

  calculateRate = debounce(() => {
    getRateCalc(getRateCalcBody(this.props, this.state))
      .then(result => {
        this.setState({
          premiumComment: result.RichTextForAverageCalculation,
          premium: result.AdjustedPremium
        });
      })
      .catch();
  }, 150);

  onSubmit = () => {
    // TODO submit
  };

  render() {
    return (
      <MiiForm
        onSubmit={this.onSubmit}
        buttons={<button type="submit">Submit</button>}
        row
      >
        <section className="section">
          <InstrumentDetails
            {...this.state}
            onTypeChange={this.onTypeChange}
            onDetailChange={this.onDetailChange}
            onYearChange={this.onYearChange}
            onMakeChange={this.onMakeChange}
            onModelChange={this.onModelChange}
            onPriceChange={this.onPriceChange}
            onReplacementCostChange={this.onReplacementCostChange}
            onStorageChange={this.onStorageChange}
            onHardShellChange={this.onHardShellChange}
            onProChange={this.onProChange}
          />
        </section>
        <section className="section">
          <InstrumentPremium {...this.state} />
        </section>
      </MiiForm>
    );
  }
}

export default withRouter(InstrumentForm);

function getRateCalcBody(
  props: InstrumentFormProps,
  state: InstrumentFormState
): RateCalcBody {
  const background = props.location.state as BackgroundCheck;
  return {
    YearMade: state.year,
    Storage: state.storageType,
    "Replacement Cost": state.replacementCost,
    "Hard Case": !!state.wasStoredInCase,
    Deductible: 60, // hard-coded in current flow.
    GigsPerYear: 10, // hard-coded in current flow.
    ProfessionalUse: !!state.wasPlayedPro,
    CustomerProvidedImage: null as any, // TODO
    PurchasePrice: state.price,
    "InstrumentType ": state.instrumentType,
    "Financial Risk": "", // seems null/empty in current flow.
    Make: state.make,
    Model: state.model,
    History: background.history
  };
}
