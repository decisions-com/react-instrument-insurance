import React from "react";
import InstrumentDetails, { InstrumentDetailsInfo } from "./InstrumentDetails";
import InstrumentPremium from "./InstrumentPremium";
import "./common/MiiForm.css";
import {
  CustomerProvidedImage,
  getSubTypes,
  selectionIsNotOther,
  getShowCase,
  getRateCalc,
  RateCalcBody,
  createImageObj,
  RateCalcResult,
  fetchModels,
  fetchMakes,
  getDefaultRateCalcResult,
} from "../api/InstrumentApi";
import MiiForm from "./common/MiiForm";
import { withRouter, RouteComponentProps } from "react-router";
import { PersonalHistoryResult } from "../api/BackgroundApi";
import { debounce } from "debounce";
import { PolicyApplication, submitApplication } from "../api/SubmitApi";
import { Link } from "react-router-dom";

interface InstrumentFormProps
  extends RouteComponentProps<{}, {}, PersonalHistoryResult> {}

interface InstrumentFormState extends InstrumentDetailsInfo {
  premiumComment: string;
  premium: number;
  image?: CustomerProvidedImage;
  rateCalcResult: RateCalcResult;
  GigsPerYear: number;
  Deductible: number;
  PolicyApplication: PolicyApplication;
}

let defaultState: InstrumentFormState = {
  instrumentTypes: [
    "Guitar",
    "Piano",
    "Drums / Percussion",
    "String",
    "Brass",
    "Other",
  ],
  instrumentDetails: [],
  makes: [],
  models: [],
  storageTypes: [
    "Home",
    "Studio",
    "School / Educational Center",
    "Standard Storage",
    "Climate Controlled Storage",
    "Mobile Storage",
  ],
  premium: 0,
  premiumComment: "",
  price: 0,
  year: 0,
  make: "",
  model: "",
  replacementCost: 0,
  GigsPerYear: 10,
  Deductible: 60,
  PolicyApplication: getDefaultPolicyApplication(),
  rateCalcResult: getDefaultRateCalcResult(),
};

class InstrumentForm extends React.Component<
  InstrumentFormProps,
  InstrumentFormState
> {
  state = { ...defaultState };

  constructor(props: InstrumentFormProps) {
    super(props);
    // grab stuff we got from router for previous component
    this.state.PolicyApplication = {
      ...this.state.PolicyApplication,
      ...this.props.location.state.PolicyApplication,
    };
  }

  makePolicyAppChangeHandler(
    key: keyof PolicyApplication,
    sideEffect?: (value: any) => Promise<void> | void
  ) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        typeof this.state.PolicyApplication[key] === "number"
          ? parseInt(e.target.value, 10)
          : e.target.value;

      this.setState({
        PolicyApplication: { ...this.state.PolicyApplication, [key]: value },
      });
      sideEffect && sideEffect(value);
      this.calculateRate();
    };
  }

  onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const instrumentType = e.target.value;

    this.setState({
      PolicyApplication: {
        ...this.state.PolicyApplication,
        InstrumentType: instrumentType,
      },
    });

    Promise.all([
      getSubTypes(instrumentType),
      selectionIsNotOther(instrumentType),
      getShowCase(instrumentType),
      fetchMakes(instrumentType),
    ])
      .then((value) => {
        this.setState({
          instrumentDetails: value[0],
          showOtherDetail: !value[1],
          canBeInCase: value[2],
          makes: value[3].Make,
        });
      })
      .catch();
  };

  onDetailChange = this.makePolicyAppChangeHandler("InstrumentSubType");
  onYearChange = this.makePolicyAppChangeHandler("YearMade");
  onMakeChange = this.makePolicyAppChangeHandler(
    "Make",
    async (make: string) => {
      // update models:
      const models = (await fetchModels(make)).Model;
      this.setState({ models });
    }
  );

  onModelChange = this.makePolicyAppChangeHandler("Model", async () => {
    // update models:
    //  const models = (await fetchModels(this.state.make)).Model;
    //  this.setState({ models });
    // why was I sure model change needed to do something else...
  });

  onPriceChange = this.makePolicyAppChangeHandler("PurchasePrice");

  onReplacementCostChange = this.makePolicyAppChangeHandler("ReplacementCost");

  onStorageChange = this.makePolicyAppChangeHandler("StorageLocation");

  onHardShellChange = (_label: string, HardCase: boolean) => {
    this.setState({
      PolicyApplication: { ...this.state.PolicyApplication, HardCase },
    });
    this.calculateRate();
  };

  onProChange = (_label: string, UsedProfessionally: boolean) => {
    this.setState({
      PolicyApplication: {
        ...this.state.PolicyApplication,
        UsedProfessionally,
      },
    });
    this.calculateRate();
  };

  onLimitedEditionChange = (_label: string, LimitedEdition: boolean) => {
    this.setState({
      PolicyApplication: { ...this.state.PolicyApplication, LimitedEdition },
    });
    this.calculateRate();
  };

  onPrimaryChange = (_label: string, PrimaryUser: boolean) => {
    this.setState({
      PolicyApplication: { ...this.state.PolicyApplication, PrimaryUser },
    });
    this.calculateRate();
  };

  calculateRate = debounce(() => {
    if (!canCalculateRate(this.props, this.state)) {
      return;
    }
    getRateCalc(getRateCalcBody(this.props, this.state))
      .then((result) => {
        this.setState({
          premium: result.AdjustedPremium,
          rateCalcResult: result,
        });
      })
      .catch();
  }, 150);

  onSubmit = () => {
    const app = this.state.PolicyApplication;
    const history = this.props.location.state.History;
    const { AdjustedPremium, TotalDiscount } = this.state.rateCalcResult;
    submitApplication(
      app,
      history,
      AdjustedPremium,
      parseFloat(TotalDiscount),
      this.state.image
    ).finally(() => {
      this.props.history.push("./confirmation");
    });
  };

  onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      createImageObj(e.target.files[0]).then((image) => {
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
            Continue
          </button>,
        ]}
        row
        disclaimer={
          <p style={{ margin: "1rem" }}>
            <em>
              By clicking the "Continue" button, you agree that Agile Co and
              it's insurance partners may use other information sources to
              collect information about you in order to calculate accurate
              prices for your insurance including, but not limited to your
              performance records, your claims history, consumer reports, and/or
              credit history.
            </em>
          </p>
        }
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
            onLimitedEditionChange={this.onLimitedEditionChange}
            onPrimaryChange={this.onPrimaryChange}
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

function canCalculateRate(
  props: InstrumentFormProps,
  state: InstrumentFormState
): boolean {
  if (
    !state.PolicyApplication.InstrumentType ||
    !state.PolicyApplication.Make ||
    !state.PolicyApplication.Model ||
    !state.PolicyApplication.PurchasePrice ||
    !state.PolicyApplication.ReplacementCost ||
    !state.PolicyApplication.YearMade
  ) {
    return false;
  }
  return true;
}

function getRateCalcBody(
  props: InstrumentFormProps,
  state: InstrumentFormState
): RateCalcBody {
  const history = props.location.state.History;
  const {
    AddressState,
    ApplicantFirstName,
    ApplicantLastName,
    Deductible,
    FinancialRisk,
    GigsPerYear,
    HardCase,
    InstrumentType,
    Make,
    Model,
    UsedProfessionally,
    PurchasePrice,
    ReplacementCost,
    StorageLocation,
    YearMade,
  } = state.PolicyApplication;
  return {
    AddressState,
    ApplicantName: `${ApplicantFirstName} ${ApplicantLastName}`,
    CaptureRuleHistory: false,
    CustomerProvidedImage: state.image || null,
    Deductible,
    FinancialRisk,
    GigsPerYear,
    HardCase,
    History: history && history,
    InstrumentType,
    Make,
    Model,
    ProfessionalUse: UsedProfessionally,
    PurchasePrice,
    ReplacementCost,
    Storage: StorageLocation,
    UniqueProcessId: "",
    YearMade,
    PolicyApp: state.PolicyApplication,
  };
}

function getDefaultPolicyApplication(): PolicyApplication {
  return {
    AddressState: "",
    ApplicantEmail: "",
    ApplicantFirstName: "",
    ApplicantLastName: "",
    ApplicantZipCode: "",
    City: "",
    CreatedDate: new Date(),
    CustomerProvidedImage: null,
    Deductible: 60,
    Deleted: false,
    DeletedBy: "",
    DeletedOn: new Date(),
    ExtensionId: "",
    FinancialRisk: "",
    GigsPerYear: 10,
    HardCase: false,
    Id: "",
    InstrumentSubType: "",
    InstrumentType: "",
    LimitedEdition: false,
    Make: "",
    Model: "",
    PremiumValue: 0,
    PrimaryUser: false,
    PropertyRisk: "",
    PurchasePrice: 0,
    ReplacementCost: 0,
    StorageLocation: "",
    StreetAddress1: "",
    StreetAddress2: "",
    TotalRuleTime: 0,
    TypeOfTransport: "",
    Underwriter: "",
    UsedProfessionally: false,
    YearMade: "",
  };
}
