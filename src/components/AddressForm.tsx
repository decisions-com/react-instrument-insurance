import * as React from "react";
import "./common/MiiForm.css";
import MiiForm from "./common/MiiForm";
import WrapInput from "./common/WrapInput";
import {
  CanNormalizeAddressArg,
  fetchCanNormalizeAddress,
  fetchCityStateFromZip
} from "../api/AddressApi";
import { debounce } from "debounce";

export interface AddressFormProps {}

export interface PersonDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AddressFormState
  extends CanNormalizeAddressArg,
    PersonDetails {
  /** {true} if can normalize address */
  canNormalize: boolean;
  zip: string;
}

const defaultState: AddressFormState = {
  zip: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  canNormalize: false,
  firstName: "",
  lastName: "",
  email: ""
};

export default class AddressForm extends React.Component<
  AddressFormProps,
  AddressFormState
> {
  state = { ...defaultState };

  canNormalizeAddress = debounce(() => {
    fetchCanNormalizeAddress(this.state)
      .then(canNormalize => this.setState({ canNormalize }))
      .catch(() => this.setState({ canNormalize: false }));
  }, 150);

  getCityAndState = debounce(() => {
    if (this.state.zip.length > 4) {
      fetchCityStateFromZip(this.state.zip).then(value => {
        const city = value["City Name"];
        const state = value["State Name"];
        if (city && state) {
          this.setState({ city, state });
        }
      });
    }
  });

  onSubmit = () => {
    // run the other flows
  };

  onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstName: e.target.value });
  };

  onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ lastName: e.target.value });
  };

  onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  makeAddressChangeHandler = (key: keyof AddressFormState) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value: Partial<AddressFormState> = {};
      value[key] = e.target.value;
      this.setState(value as AddressFormState);
      this.canNormalizeAddress();
    };
  };

  onStreetOneChange = this.makeAddressChangeHandler("address1");
  onStreetTwoChange = this.makeAddressChangeHandler("address2");
  onCityChange = this.makeAddressChangeHandler("city");
  onStateChange = this.makeAddressChangeHandler("state");
  updateZip = this.makeAddressChangeHandler("zip");

  onZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.updateZip(e);
    this.getCityAndState();
  };

  public render() {
    return (
      <MiiForm
        onSubmit={this.onSubmit}
        buttons={[
          <button>Back</button>,
          <button type="submit">Continue</button>
        ]}
      >
        <section className="mii-address-form">
          <h3 className="form__title">Name and Email</h3>
          <div className="mii-form--wrapping-group">
            <WrapInput htmlFor="first-name" label="First Name">
              <input
                value={this.state.firstName}
                type="text"
                id="first-name"
                onChange={this.onFirstNameChange}
              />
            </WrapInput>
            <WrapInput htmlFor="last-name" label="Last Name">
              <input
                value={this.state.lastName}
                type="text"
                id="last-name"
                onChange={this.onLastNameChange}
              />
            </WrapInput>
            <WrapInput htmlFor="email" label="Email">
              <input
                value={this.state.email}
                type="text"
                id="email"
                onChange={this.onEmailChange}
              />
            </WrapInput>
          </div>
        </section>
        <section>
          <h3 className="form__title">Address</h3>
          <WrapInput htmlFor="street1" label="Street">
            <input
              type="text"
              id="street1"
              onChange={this.onStreetOneChange}
              value={this.state.address1}
            />
          </WrapInput>
          <WrapInput htmlFor="street2" label="">
            <input
              type="text"
              id="street2"
              onChange={this.onStreetTwoChange}
              value={this.state.address2}
            />
          </WrapInput>
          <WrapInput htmlFor="City" label="City">
            <input
              type="text"
              id="City"
              onChange={this.onCityChange}
              value={this.state.city}
            />
          </WrapInput>
          <WrapInput htmlFor="State" label="State">
            <input
              type="text"
              id="State"
              onChange={this.onStateChange}
              value={this.state.state}
            />
          </WrapInput>
          <WrapInput htmlFor="Zip Code" label="Zip Code">
            <input
              type="text"
              id="Zip Code"
              onChange={this.onZipChange}
              value={this.state.zip}
            />
          </WrapInput>
        </section>
      </MiiForm>
    );
  }
}
