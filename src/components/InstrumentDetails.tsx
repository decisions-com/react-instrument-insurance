import React from "react";
import WrapInput from "./common/WrapInput";
import Checkbox from "./common/Checkbox";
import SelectOptions from "./common/SelectOptions";
import { RateCalcResult } from "../api/InstrumentApi";
import "./InstrumentDetails.css";

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
  make: string;
  model: string;
  replacementCost: number;
  storageType: string;
  storageTypes: string[];
  rateCalcResult?: RateCalcResult;
}

export interface InstrumentDetailsProps extends InstrumentDetailsInfo {
  onTypeChange: React.ChangeEventHandler;
  onDetailChange: React.ChangeEventHandler;
  onYearChange: React.ChangeEventHandler;
  onMakeChange: React.ChangeEventHandler;
  onModelChange: React.ChangeEventHandler;
  onPriceChange: React.ChangeEventHandler;
  onReplacementCostChange: React.ChangeEventHandler;
  onStorageChange: React.ChangeEventHandler;
  onHardShellChange: (label: string, selected: boolean) => void;
  onProChange: (label: string, selected: boolean) => void;
  onImageChange: React.ChangeEventHandler;
}

export default class InstrumentDetails extends React.Component<
  InstrumentDetailsProps
> {
  render() {
    return (
      <React.Fragment>
        <fieldset className="mii-fieldset">
          <legend>Instrument Details</legend>
          <section className="instrument-fields">
            <div className="mii-form__two-fields">
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
                    <SelectOptions>
                      {this.props.instrumentDetails}
                    </SelectOptions>
                  </select>
                </WrapInput>
              )}
            </div>
            <div className="mii-form__two-fields">
              <WrapInput htmlFor="year" label="Year Made" required>
                <input
                  id="year"
                  type="number"
                  onChange={this.props.onYearChange}
                  value={this.props.year}
                />
              </WrapInput>
            </div>
            <div className="mii-form__two-fields">
              <WrapInput htmlFor="make" label="Make" required>
                <input
                  id="make"
                  type="text"
                  onChange={this.props.onMakeChange}
                  value={this.props.make}
                />
              </WrapInput>
              <WrapInput htmlFor="model" label="Model" required>
                <input
                  id="model"
                  type="text"
                  onChange={this.props.onModelChange}
                  value={this.props.model}
                />
              </WrapInput>
            </div>
            <div className="mii-form__two-fields">
              <WrapInput htmlFor="price" label="Purchase Price" required>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={this.props.price}
                  onChange={this.props.onPriceChange}
                />
              </WrapInput>
              <WrapInput
                htmlFor="replacement-cost"
                label="Replacement Cost"
                required
              >
                <input
                  id="replacement-cost"
                  step="0.01"
                  min="0"
                  type="number"
                  value={this.props.replacementCost}
                  onChange={this.props.onReplacementCostChange}
                />
              </WrapInput>
            </div>
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
                checked={!!this.props.wasStoredInCase}
                onChange={this.props.onHardShellChange}
              />
            )}
            <div>
              <Checkbox
                label="Played professionally"
                checked={!!this.props.wasPlayedPro}
                onChange={this.props.onProChange}
                tooltip="Public performance use more than once per year"
              />
            </div>
          </section>
        </fieldset>
      </React.Fragment>
    );
  }
}
