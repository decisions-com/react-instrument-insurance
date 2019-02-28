import React from "react";
import InstrumentDetails, { InstrumentDetailsInfo } from "./InstrumentDetails";

interface InstrumentFormProps {}

interface InstrumentFormState extends InstrumentDetailsInfo {}

let defaultState: InstrumentFormState = {
  instrumentTypes: ["Guitar", "Piano", "Strings", "Drums", "Horns"],
  instrumentDetails: [],
  storageType: ["Garage", "House", "Shed"]
};

export default class InstrumentForm extends React.Component<
  InstrumentFormProps,
  InstrumentFormState
> {
  state = { ...defaultState };

  onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO rest call to run rule to get details,
    // TODO rest call to run rule to get can be in case
    // TODO rest call about "other?"
    console.log(e.target.value);
  };

  onDetailChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    // TODO detail value changed
    console.log(e.target.value);
  };

  onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  onReplacementCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  onStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO rest call for updating updating premium
    console.log(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <InstrumentDetails
            {...this.state}
            onTypeChange={this.onTypeChange}
            onDetailChange={this.onDetailChange}
            onYearChange={this.onYearChange}
            onPriceChange={this.onPriceChange}
            onReplacementCostChange={this.onReplacementCostChange}
            onStorageChange={this.onStorageChange}
          />
        </section>
        <section />
      </React.Fragment>
    );
  }
}
