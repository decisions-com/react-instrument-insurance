import * as React from "react";
import "./InstrumentPremium.css";
import { CustomerProvidedImage, RateCalcResult } from "../api/InstrumentApi";
import ImageUploader, { ImageUploaderProps } from "./common/ImageUploader";
import heart from "../img/heart1.png";
import pin from "../img/pin.png";
import bulb from "../img/bulb.png";
import shield from "../img/shield.png";
import addPic from "../img/add-pic.png";
import DiscountDetail from "./DiscountDetail";

export interface InstrumentPremiumProps extends ImageUploaderProps {
  premium: number;
  premiumComment: string;
  image?: CustomerProvidedImage;
  rateCalcResult: RateCalcResult;
}

const toDollars = (num: Number) =>
  Number(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const getFileName = (image?: CustomerProvidedImage) => image && image.FileName;

export default class InstrumentPremium extends React.Component<
  InstrumentPremiumProps,
  any
> {
  public render() {
    const {
      ExistingCustomerDiscountValue,
      NewModelDiscountValue,
      SafeStorageDiscountValue,
      PhotoDiscountValue,
      LocationDiscountValue,
    } = this.props.rateCalcResult;
    return (
      <div className="instrument-premium">
        {/* <h3 className="form__title">Premium</h3> */}
        <fieldset className="mii-fieldset">
          <legend>Estimated Premium</legend>
          <section className="instrument-premium__fields">
            <div className="instrument-premium__value">
              {toDollars(this.props.premium)}
            </div>
            <p className="instrument-premium__comment">
              {this.props.premiumComment}&nbsp;
            </p>
            <ul className="discount-detail">
              <DiscountDetail
                iconUrl={heart}
                label="Existing Customer Discount"
                value={ExistingCustomerDiscountValue}
              />
              <DiscountDetail
                iconUrl={pin}
                label="Location discount"
                value={LocationDiscountValue}
              />
              <DiscountDetail
                iconUrl={bulb}
                label="New Model discount"
                value={NewModelDiscountValue}
              />
              <DiscountDetail
                iconUrl={shield}
                label="Safe Storage discount"
                value={SafeStorageDiscountValue}
              />
              <DiscountDetail
                iconUrl={addPic}
                label="Photo discount"
                value={PhotoDiscountValue}
              />
            </ul>
            {this.props.image ? (
              <img
                alt="Instrument Premium"
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
            <ImageUploader
              {...this.props}
              fileName={getFileName(this.props.image)}
            />
          </section>
        </fieldset>
      </div>
    );
  }
}
