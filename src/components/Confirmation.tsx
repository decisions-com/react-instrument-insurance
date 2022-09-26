import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import "./Confirmation.css";

export interface ConfirmationProps extends RouteComponentProps {}

function ConfirmationSfc(_: ConfirmationProps) {
  return (
    <div className="mii-confirmation">
      <p>Thank you! Your application has been submitted and will be reviewed by our Underwriting team. You will receive a final decision within 24 hours!</p>
    </div>
  );
}

export const Confirmation = withRouter(ConfirmationSfc);
