import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";

export interface ConfirmationProps extends RouteComponentProps {}

function ConfirmationSfc({ location }: ConfirmationProps) {
  return (
    <div>
      <p>{location.state as string}</p>
    </div>
  );
}

export const Confirmation = withRouter(ConfirmationSfc);
