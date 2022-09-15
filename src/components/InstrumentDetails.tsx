import React from "react";
import WrapInput from "./common/WrapInput";
import Checkbox from "./common/Checkbox";
import SelectOptions from "./common/SelectOptions";
import { RateCalcResult } from "../api/InstrumentApi";
import "./InstrumentDetails.css";
import { PolicyApplication } from "../api/SubmitApi";

export interface InstrumentDetailsInfo {
  instrumentTypes: string[];
  instrumentDetails: string[];
  showOtherDetail?: boolean;
  canBeInCase?: boolean;
  wasStoredInCase?: boolean;
  wasPlayedPro?: boolean;
  price: number;
  year: number;
  make: string;
  makes: string[];
  model: string;
  models: string[];
  replacementCost: number;
  storageTypes: string[];
  rateCalcResult?: RateCalcResult;
  PolicyApplication: PolicyApplication;
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
  onLimitedEditionChange: (label: string, selected: boolean) => void;
  onPrimaryChange: (label: string, selected: boolean) => void;
  onImageChange: React.ChangeEventHandler;
}

export default class InstrumentDetails extends React.Component<InstrumentDetailsProps> {
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
                  value={this.props.PolicyApplication.InstrumentType}
                >
                  <SelectOptions>{this.props.instrumentTypes}</SelectOptions>
                </select>
              </WrapInput>
              {this.props.showOtherDetail ? (
                <WrapInput htmlFor="detail" label="Detail" required>
                  <input
                    type="text"
                    id="detail"
                    value={this.props.PolicyApplication.InstrumentSubType}
                    onChange={this.props.onDetailChange}
                  />
                </WrapInput>
              ) : (
                <WrapInput htmlFor="detail" label="Detail" required>
                  <select
                    id="detail"
                    value={this.props.PolicyApplication.InstrumentSubType}
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
                  value={this.props.PolicyApplication.YearMade}
                />
              </WrapInput>
            </div>
            <div className="mii-form__two-fields">
              <WrapInput htmlFor="make" label="Make" required>
                <select
                  id="make"
                  placeholder="Select Make"
                  onChange={this.props.onMakeChange}
                  value={this.props.PolicyApplication.Make}
                >
                  <SelectOptions>{this.props.makes}</SelectOptions>
                </select>
              </WrapInput>
              <WrapInput htmlFor="model" label="Model" required>
                <select
                  id="model"
                  placeholder="Select Model"
                  onChange={this.props.onModelChange}
                  value={this.props.PolicyApplication.Model}
                >
                  <SelectOptions>{this.props.models}</SelectOptions>
                </select>
              </WrapInput>
            </div>
            <div className="mii-form__two-fields">
              <WrapInput htmlFor="price" label="Purchase Price" required>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={this.props.PolicyApplication.PurchasePrice}
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
                  value={this.props.PolicyApplication.ReplacementCost}
                  onChange={this.props.onReplacementCostChange}
                />
              </WrapInput>
            </div>
            <WrapInput htmlFor="storage" label="Stored at/in" required>
              <select
                id="storage"
                value={this.props.PolicyApplication.StorageLocation}
                onChange={this.props.onStorageChange}
              >
                <SelectOptions
                  value={this.props.PolicyApplication.StorageLocation}
                >
                  {this.props.storageTypes}
                </SelectOptions>
              </select>
            </WrapInput>
            <Checkbox
              label="I am the Primary User"
              checked={!!this.props.PolicyApplication.PrimaryUser}
              onChange={this.props.onPrimaryChange}
              // tooltip="Public performance use more than once per year"
            />
            <Checkbox
              label="Played professionally"
              checked={!!this.props.PolicyApplication.UsedProfessionally}
              onChange={this.props.onProChange}
              tooltip="Public performance use more than once per year"
            />
            <Checkbox
              label="Limited Edition"
              checked={!!this.props.PolicyApplication.LimitedEdition}
              onChange={this.props.onLimitedEditionChange}
              // tooltip="Public performance use more than once per year"
            />
            {this.props.canBeInCase && (
              <Checkbox
                label="Kept in hard shell case"
                checked={!!this.props.PolicyApplication.HardCase}
                onChange={this.props.onHardShellChange}
              />
            )}
          </section>
        </fieldset>
      </React.Fragment>
    );
  }
}
