import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import "./Confirmation.css";

export interface ConfirmationProps extends RouteComponentProps {}

function ConfirmationSfc({ location }: ConfirmationProps) {
  return (
    <div className="mii-confirmation">
      <p>{location.state as string}</p>
    </div>
  );
}

export const Confirmation = withRouter(ConfirmationSfc);
