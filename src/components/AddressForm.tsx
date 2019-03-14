import * as React from "react";
import "./common/MiiForm.css";
import MiiForm from "./common/MiiForm";
import WrapInput from "./common/WrapInput";

export interface AddressFormProps {}

export default class AddressForm extends React.Component<
  AddressFormProps,
  any
> {
  onSubmit = () => {};

  onFirstNameChange = () => {};
  onLastNameChange = () => {};
  onEmailChange = () => {};
  onStreetOneChange = () => {};
  onStreetTwoChange = () => {};
  onCityChange = () => {};
  onStateChange = () => {};
  onZipChange = () => {};

  public render() {
    return (
      <MiiForm
        onSubmit={this.onSubmit}
        buttons={[
          <button>Back</button>,
          <button type="submit">Continue</button>
        ]}
      >
        <section>
          <h3 className="form__title">Name and Email</h3>
          <WrapInput htmlFor="first-name" label="First Name">
            <input
              type="text"
              id="first-name"
              onChange={this.onFirstNameChange}
            />
          </WrapInput>
          <WrapInput htmlFor="last-name" label="Last Name">
            <input
              type="text"
              id="last-name"
              onChange={this.onLastNameChange}
            />
          </WrapInput>
          <WrapInput htmlFor="email" label="Email">
            <input type="text" id="email" onChange={this.onEmailChange} />
          </WrapInput>
        </section>
        <section>
          <h3 className="form__title">Address</h3>
          <WrapInput htmlFor="street1" label="Street">
            <input type="text" id="street1" onChange={this.onStreetOneChange} />
          </WrapInput>
          <WrapInput htmlFor="street2" label="">
            <input type="text" id="street2" onChange={this.onStreetTwoChange} />
          </WrapInput>
          <WrapInput htmlFor="City" label="City">
            <input type="text" id="City" onChange={this.onCityChange} />
          </WrapInput>
          <WrapInput htmlFor="State" label="State">
            <input type="text" id="State" onChange={this.onStateChange} />
          </WrapInput>
          <WrapInput htmlFor="Zip Code" label="Zip Code">
            <input type="text" id="Zip Code" onChange={this.onZipChange} />
          </WrapInput>
        </section>
      </MiiForm>
    );
  }
}
