import * as React from "react";
import { Route, match } from "react-router";
import InstrumentForm from "../InstrumentForm";
import AddressForm from "../AddressForm";

export interface ApplyProps {
  match: match;
}

export function Application({ match }: ApplyProps) {
  return (
    <section key="section" className="mii-react-app-content">
      <Route path={`${match.path}/user-info`} component={AddressForm} />
      <Route
        path={`${match.path}/instrument-info`}
        component={InstrumentForm}
      />
    </section>
  );
}
