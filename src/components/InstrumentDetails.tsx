import React from "react";
import WrapInput from "./common/WrapInput";
import Checkbox from "./common/Checkbox";
import SelectOptions from "./common/SelectOptions";

const defaultProps = {};

export interface InstrumentDetailsInfo {
  instrumentType: string;
  instrumentTypes: string[];
  instrumentDetail: string;
  instrumentDetails: string[];
  showOtherDetail?: boolean;
  canBeInCase?: boolean;
  wasStoredInCase?: boolean;
  wasPlayedPro?: boolean;
  price: number;
  year: number;
  replacementCost: number;
  storageType: string;
  storageTypes: string[];
}

export interface InstrumentDetailsProps extends InstrumentDetailsInfo {
  onTypeChange: React.ChangeEventHandler;
  onDetailChange: React.ChangeEventHandler;
  onYearChange: React.ChangeEventHandler;
  onPriceChange: React.ChangeEventHandler;
  onReplacementCostChange: React.ChangeEventHandler;
  onStorageChange: React.ChangeEventHandler;
  onHardShellChange: (label: string, selected: boolean) => void;
  onProChange: (label: string, selected: boolean) => void;
}

export default class InstrumentDetails extends React.Component<
  InstrumentDetailsProps
> {
  render() {
    return (
      <React.Fragment>
        <h3 className="form__title">Instrument Details</h3>
        <WrapInput
          htmlFor="instrument-type"
          label="Type of Instrument"
          required
        >
          <select
            id="instrument-type"
            placeholder="Select"
            onChange={this.props.onTypeChange}
            value={this.props.instrumentType}
          >
            <SelectOptions>{this.props.instrumentTypes}</SelectOptions>
          </select>
        </WrapInput>
        {this.props.showOtherDetail ? (
          <WrapInput htmlFor="detail" label="Detail" required>
            <input
              type="text"
              id="detail"
              onChange={this.props.onDetailChange}
            />
          </WrapInput>
        ) : (
          <WrapInput htmlFor="detail" label="Detail" required>
            <select
              id="detail"
              value={this.props.instrumentDetail}
              onChange={this.props.onDetailChange}
            >
              <SelectOptions>{this.props.instrumentDetails}</SelectOptions>
            </select>
          </WrapInput>
        )}
        <WrapInput htmlFor="year" label="Year Made" required>
          <input id="year" type="number" onChange={this.props.onYearChange} />
        </WrapInput>
        <WrapInput htmlFor="price" label="Purchase Price" required>
          <input
            id="price"
            type="number"
            value={this.props.price}
            onChange={this.props.onPriceChange}
          />
        </WrapInput>
        <WrapInput htmlFor="replacement-cost" label="Replacement Cost" required>
          <input
            id="replacement-cost"
            type="number"
            value={this.props.replacementCost}
            onChange={this.props.onReplacementCostChange}
          />
        </WrapInput>
        <WrapInput htmlFor="storage" label="Stored at/in" required>
          <select
            id="storage"
            value={this.props.storageType}
            onChange={this.props.onStorageChange}
          >
            <SelectOptions value={this.props.storageType}>
              {this.props.storageTypes}
            </SelectOptions>
          </select>
        </WrapInput>
        {this.props.canBeInCase && (
          <Checkbox
            label="Kept in hard shell case"
            checked={this.props.wasStoredInCase as boolean}
            onChange={this.props.onHardShellChange}
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
      </React.Fragment>
    );
  }
}
