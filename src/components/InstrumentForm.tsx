import React from "react";
import InstrumentDetails, { InstrumentDetailsInfo } from "./InstrumentDetails";
import InstrumentPremium from "./InstrumentPremium";
import "./common/MiiForm.css";
import {
  CustomerProvidedImage,
  getSubTypes,
  selectionIsOther,
  getShowCase,
  getRateCalc,
  RateCalcBody,
  createImageObj,
  RateCalcResult
} from "../api/InstrumentApi";
import MiiForm from "./common/MiiForm";
import { withRouter, RouteComponentProps } from "react-router";
import { BackgroundCheck } from "../api/BackgroundApi";
import { debounce } from "debounce";
import { PolicyApp, submitApplication } from "../api/SubmitApi";
import { AddressFormState } from "./AddressForm";
import { Link } from "react-router-dom";

interface InstrumentFormProps extends RouteComponentProps {}

interface InstrumentFormState extends InstrumentDetailsInfo {
  premiumComment: string;
  premium: number;
  image?: CustomerProvidedImage;
  rateCalcResult?: RateCalcResult;
  GigsPerYear: number;
  Deductible: number;
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
  replacementCost: 0,
  GigsPerYear: 10,
  Deductible: 60
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
          premium: result.AdjustedPremium,
          rateCalcResult: result
        });
      })
      .catch();
  }, 150);

  onSubmit = () => {
    const app = getPolicyApp(this.props, this.state);
    const history = (this.props.location.state as BackgroundCheck).history;
    submitApplication(app, history, this.state.image).then(result => {
      // console.log(result);
      // window.alert("submitted application");
      this.props.history.push("./confirmation", result);
    });
  };

  onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      createImageObj(e.target.files[0]).then(image => {
        this.setState({ image });
        this.calculateRate();
      });
    }
  };

  render() {
    return (
      <MiiForm
        onSubmit={this.onSubmit}
        buttons={[
          <Link to="./user-info" className="mii-button secondary" key="back">
            Back
          </Link>,
          <button key="submit" type="submit">
            Submit
          </button>
        ]}
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
            onImageChange={this.onImageChange}
          />
        </section>
        <section className="section">
          <InstrumentPremium
            {...this.state}
            onImageChange={this.onImageChange}
          />
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
    CustomerProvidedImage: state.image || null,
    PurchasePrice: state.price,
    "InstrumentType ": state.instrumentType,
    "Financial Risk": "", // seems null/empty in current flow.
    Make: state.make,
    Model: state.model,
    History: background.history
  };
}

function getPolicyApp(
  props: InstrumentFormProps,
  state: InstrumentFormState
): PolicyApp {
  const userInfo = props.location.state as AddressFormState & BackgroundCheck;
  return {
    FinancialRisk: "",
    PropertyRisk: "", // ?
    PremiumValue: state.premium,
    CustomerProvidedImage: (state.image && state.image.FileName) || null,
    ApplicantEmail: userInfo.email,
    AddressState: userInfo.state,
    City: userInfo.city,
    GigsPerYear: 10,
    StreetAddress: `${userInfo.address1} / ${userInfo.address2}`,
    ReplacementCost: state.replacementCost,
    PurchasePrice: state.price,
    InstrumentSubType: state.instrumentDetail,
    InstrumentType: state.instrumentType,
    Deductible: 60,
    UsedProfessionally: !!state.wasPlayedPro,
    YearMade: state.year.toString(),
    HardCase: !!state.wasStoredInCase,
    ApplicantLastName: userInfo.lastName,
    ApplicantFirstName: userInfo.firstName,
    ApplicantZipCode: userInfo.ZipCode,
    StorageLocation: state.storageType,
    TypeOfTransport: "",
    Make: state.make,
    Model: state.model,
    Id: "",
    ExtensionId: "",
    Deleted: false,
    DeletedBy: "",
    DeletedOn: new Date()
  };
}
