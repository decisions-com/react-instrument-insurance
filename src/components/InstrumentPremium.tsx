import * as React from "react";
import "./InstrumentPremium.css";
import { CustomerProvidedImage } from "../api/InstrumentApi";
import ImageUploader, { ImageUploaderProps } from "./common/ImageUploader";
export interface InstrumentPremiumProps extends ImageUploaderProps {
  premium: number;
  premiumComment: string;
  image?: CustomerProvidedImage;
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
        {/* <h3 className="form__title">Premium</h3> */}
        <div className="instrument-premium__value">
          {toDollars(this.props.premium)}
        </div>
        <p className="instrument-premium__comment">
          {this.props.premiumComment}&nbsp;
        </p>
        {this.props.image ? (
          <img
            className="instrument-premium__image"
            src={
              (this.props.image.dataUrlTypeString +
                "," +
                this.props.image.Contents) as string
            }
          />
        ) : (
          <div className="instrument-premium__image-placeholder">
            <span>Upload a picture of your instrument for a discount.</span>
          </div>
        )}
        <ImageUploader {...this.props} />
      </div>
    );
  }
}
