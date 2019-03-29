import * as React from "react";
import "./InstrumentPremium.css";
export interface InstrumentPremiumProps {
  premium: number;
  premiumComment: string;
}

let toDollars = (num: Number) =>
  Number(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

export default class InstrumentPremium extends React.Component<
  InstrumentPremiumProps,
  any
> {
  public render() {
    return (
      <div className="instrument-premium">
        <h3 className="form__title">Premium</h3>
        <div className="instrument-premium__value">
          {toDollars(this.props.premium)}
        </div>
        <p>{this.props.premiumComment}</p>
      </div>
    );
  }
}
