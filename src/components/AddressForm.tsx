import * as React from "react";
import "./common/MiiForm.css";
import MiiForm from "./common/MiiForm";
import WrapInput from "./common/WrapInput";
import {
  CanNormalizeAddressArg,
  fetchCanNormalizeAddress,
  fetchCityStateFromZip,
  postDoNormalize,
} from "../api/AddressApi";
import { debounce } from "debounce";
import "./AddressForm.css";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { doBackgroundChecks } from "../api/BackgroundApi";

export interface AddressFormProps extends RouteComponentProps {}

export interface PersonDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

export interface AddressFormState
  extends CanNormalizeAddressArg,
    PersonDetails {
  /** true if can normalize address */
  canNormalize: boolean;
  uspsFormatted?: boolean;
}

const defaultState: AddressFormState = {
  ZipCode: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  canNormalize: false,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
};

class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
  state = { ...defaultState };

  canNormalizeAddress = debounce(() => {
    fetchCanNormalizeAddress(this.state)
      .then(({ result }) => {
        this.setState({ canNormalize: result });
      })
      .catch(() => {
        this.setState({ canNormalize: false });
      });
  }, 250);

  getCityAndState = debounce(() => {
    if (this.state.ZipCode.length > 4) {
      fetchCityStateFromZip(this.state.ZipCode).then((value) => {
        const city = value["City Name"];
        const state = value["State Name"];
        if (city && state) {
          this.setState({ city, state });
        }
      });
    }
  });

  onSubmit = () => {
    doBackgroundChecks({
      AptOrUnit: "TODO",
      City: this.state.city,
      Email: this.state.email,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      PhoneNumber: "TODO",
      State: this.state.state,
      StreetAddress: this.state.address1,
      Zip: this.state.ZipCode,
      DateOfBirth: new Date(), // TODO,
    }) // go on after both resolve:
      .then((backgroundCheck) =>
        this.props.history.push("./instrument-info", {
          ...this.state,
          ...backgroundCheck,
        })
      ) // or go on without it
      .catch(() => this.props.history.push("./instrument-info"));
  };

  goNext() {}

  onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstName: e.target.value });
  };

  onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ lastName: e.target.value });
  };

  onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ phoneNumber: e.target.value });
  };

  onDOB = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ dob: e.target.value });
  };

  makeAddressChangeHandler = (key: keyof AddressFormState) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value: Partial<AddressFormState> = {
        [key]: e.target.value,
      };
      value.uspsFormatted = false;
      this.setState(value as AddressFormState);
      this.canNormalizeAddress();
    };
  };

  onStreetOneChange = this.makeAddressChangeHandler("address1");
  onStreetTwoChange = this.makeAddressChangeHandler("address2");
  onCityChange = this.makeAddressChangeHandler("city");
  onStateChange = this.makeAddressChangeHandler("state");
  updateZip = this.makeAddressChangeHandler("ZipCode");

  onZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.updateZip(e);
    this.getCityAndState();
  };

  onNormalizeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    postDoNormalize({
      Address1: this.state.address1,
      Address2: this.state.address2,
      City: this.state.city,
      State: this.state.state,
      ZipCode: this.state.ZipCode,
      DoNormalize: "Yes",
    }).then((value) =>
      this.setState({
        address1: value.Address1,
        address2: value.Address2,
        city: value.City,
        state: value.State,
        ZipCode: value.ZipCode,
        uspsFormatted: true,
      })
    );
  };

  public render() {
    return (
      <MiiForm
        className="mii-address-form"
        onSubmit={this.onSubmit}
        buttons={[
          <Link to="/" className="mii-button secondary" key="back">
            Back
          </Link>,
          <button className="mii-button" key="submit" type="submit">
            Continue
          </button>,
        ]}
      >
        <section className="section">
          <fieldset className="mii-fieldset">
            <legend>Applicant Details</legend>
            <div className="name-email">
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
              <WrapInput htmlFor="phone-number" label="Phone Number">
                <input
                  value={this.state.phoneNumber}
                  type="tel"
                  id="phone-number"
                  onChange={this.onPhoneChange}
                />
              </WrapInput>
              <WrapInput htmlFor="birth-day" label="Date Of Birth">
                <input
                  value={this.state.dob}
                  type="date"
                  id="birth-day"
                  onChange={this.onDOB}
                />
              </WrapInput>
            </div>
          </fieldset>
        </section>
        <section className="section">
          <fieldset className="mii-fieldset">
            <legend className="form__title">Mailing Address</legend>

            <div className="street">
              <WrapInput htmlFor="street1" label="Street Address">
                <input
                  className="street-address"
                  type="text"
                  id="street1"
                  onChange={this.onStreetOneChange}
                  value={this.state.address1}
                />
              </WrapInput>
              <WrapInput htmlFor="street2" label="&nbsp;">
                <input
                  type="text"
                  className="apt-unit"
                  id="street2"
                  placeholder="Apt / Unit #"
                  onChange={this.onStreetTwoChange}
                  value={this.state.address2 || ""}
                />
              </WrapInput>
            </div>
            <div className="city-state-zip">
              <WrapInput htmlFor="city" label="City">
                <input
                  type="text"
                  id="city"
                  onChange={this.onCityChange}
                  value={this.state.city}
                />
              </WrapInput>
              <WrapInput htmlFor="state" label="State">
                <input
                  type="text"
                  id="state"
                  onChange={this.onStateChange}
                  value={this.state.state}
                />
              </WrapInput>
              <WrapInput htmlFor="zip-code" label="Zip Code">
                <input
                  type="text"
                  id="zip-code"
                  onChange={this.onZipChange}
                  value={this.state.ZipCode}
                />
              </WrapInput>
              {this.state.canNormalize && !this.state.uspsFormatted && (
                <button
                  className="inline secondary"
                  onClick={this.onNormalizeClick}
                >
                  Validate Address
                </button>
              )}
            </div>
          </fieldset>
        </section>
      </MiiForm>
    );
  }
}

export default withRouter(AddressForm);
