import React from "react";
import InstrumentDetails, { InstrumentDetailsInfo } from "./InstrumentDetails";
import InstrumentPremium from "./InstrumentPremium";
import "./InstrumentForm.css";
import { getSubTypes } from "../api/InstrumentApi";

interface InstrumentFormProps {}

interface InstrumentFormState extends InstrumentDetailsInfo {
  amountLess: number;
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
  instrumentDetails: ["Acoustic", "Electric"],
  storageType: "",
  storageTypes: [
    "Home",
    "Studio",
    "School / Educational Center",
    "Standard Storage",
    "Climate Controlled Storage",
    "Mobile Storage"
  ],
  premium: 50,
  amountLess: 12.0,
  price: 0,
  year: 0,
  replacementCost: 0
};

export default class InstrumentForm extends React.Component<
  InstrumentFormProps,
  InstrumentFormState
> {
  state = { ...defaultState };

  onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    this.setState({ instrumentType: e.target.value });
    getSubTypes(e.target.value).then(instrumentDetails =>
      this.setState({ instrumentDetails })
    );
    // TODO rest call to run rule to get can be in case
    // TODO rest call about "other?"
  };

  onDetailChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    this.setState({ instrumentDetail: e.target.value });
    console.log(e.target.value);
    // TODO detail value changed
  };

  onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO rest call for updating updating premium
    this.setState({ year: Number.parseInt(e.target.value, 10) });
    console.log(e.target.value);
  };

  onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ price: Number.parseInt(e.target.value, 10) });
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  onReplacementCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ replacementCost: Number.parseInt(e.target.value, 10) });
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  onStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ storageType: e.target.value });
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  onHardShellChange = (label: string, wasStoredInCase: boolean) => {
    this.setState({ wasStoredInCase });
    // TODO rest call for updating updating premium
    console.log(label, wasStoredInCase);
  };

  onProChange = (label: string, wasPlayedPro: boolean) => {
    this.setState({ wasPlayedPro });
    // TODO rest call for updating updating premium
    console.log(label, wasPlayedPro);
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO submit
  };

  render() {
    return (
      <form className="instrument-form" onSubmit={this.onSubmit}>
        <div className="instrument-form__fields">
          <section>
            <InstrumentDetails
              {...this.state}
              onTypeChange={this.onTypeChange}
              onDetailChange={this.onDetailChange}
              onYearChange={this.onYearChange}
              onPriceChange={this.onPriceChange}
              onReplacementCostChange={this.onReplacementCostChange}
              onStorageChange={this.onStorageChange}
              onHardShellChange={this.onHardShellChange}
              onProChange={this.onProChange}
            />
          </section>
          <section>
            <InstrumentPremium {...this.state} />
          </section>
        </div>
        <div className="instrument-form__buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
