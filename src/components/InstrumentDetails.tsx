import React from "react";
import WrapInput from "./common/WrapInput";
import Checkbox from "./common/Checkbox";
import SelectOptions from "./common/SelectOptions";

const defaultProps = {};

export interface InstrumentDetailsInfo {
  instrumentTypes: string[];
  instrumentDetails: string[];
  showOtherDetail?: boolean;
  canBeInCase?: boolean;
  wasStoredInCase?: boolean;
  wasPlayedPro?: boolean;
  storageType: string[];
}

export interface InstrumentDetailsProps extends InstrumentDetailsInfo {
  onTypeChange: React.ChangeEventHandler;
  onDetailChange: React.ChangeEventHandler;
  onYearChange: React.ChangeEventHandler;
  onPriceChange: React.ChangeEventHandler;
  onReplacementCostChange: React.ChangeEventHandler;
  onStorageChange: React.ChangeEventHandler;
}

export default class InstrumentDetails extends React.Component<
  InstrumentDetailsProps
> {
  render() {
    return (
      <React.Fragment>
        <h3 className="form__title">Instrument Details</h3>
        <form>
          <WrapInput
            htmlFor="instrument-type"
            label="Type of Instrument"
            required
          >
            <select
              id="instrument-type"
              placeholder="Select"
              onChange={this.props.onTypeChange}
            >
              <SelectOptions optionNames={this.props.instrumentTypes}>
                {this.props.instrumentTypes}
              </SelectOptions>
            </select>
          </WrapInput>
          {this.props.showOtherDetail ? (
            <WrapInput htmlFor="detail" label="Detail" required>
              <select id="detail" onChange={this.props.onDetailChange} />
            </WrapInput>
          ) : (
            <WrapInput htmlFor="detail" label="Detail" required>
              <input type="text" id="detail" />
            </WrapInput>
          )}
          <WrapInput htmlFor="year" label="Year Made" required>
            <input id="year" />
          </WrapInput>
          <WrapInput htmlFor="price" label="Purchase Price" required>
            <input id="price" />
          </WrapInput>
          <WrapInput
            htmlFor="replacement-cost"
            label="Replacement Cost"
            required
          >
            <input id="replacement-cost" />
          </WrapInput>
          <WrapInput htmlFor="storage" label="Stored at/in" required>
            <select id="storage" />
          </WrapInput>
          {this.props.canBeInCase && (
            <Checkbox
              label="Kept in hard shell case"
              checked={this.props.wasStoredInCase as boolean}
              onChange={() => {}}
            />
          )}
          <div>
            <Checkbox
              label="Played professionally"
              checked={this.props.wasPlayedPro as boolean}
              onChange={() => {}}
            />
            <aside>Public performance use more than once per year</aside>
          </div>
          <p>TODO file up-loader</p>
        </form>
      </React.Fragment>
    );
  }
}
