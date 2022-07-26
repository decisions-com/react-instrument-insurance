import * as React from "react";
import WrapInput from "./WrapInput";
import { RateCalcResult } from "../../api/InstrumentApi";

export interface ImageUploaderProps {
  onImageChange: React.ChangeEventHandler;
  fileName?: string;
  rateCalcResult?: RateCalcResult;
}

const ImageUploader: React.FunctionComponent<ImageUploaderProps> = ({
  onImageChange,
  fileName,
  rateCalcResult
}) => {
  return (
    <div className="mii-image-uploader">
      <WrapInput
        className="file"
        htmlFor="instr-image"
        label={fileName || "Upload Image"}
      >
        <input id="instr-image" type="file" onChange={onImageChange} />
      </WrapInput>
      {rateCalcResult && rateCalcResult.ImageConfidence && (
        <div className="image-feedback">
          <img
            alt="confidence-level"
            className="confidence-icon"
            src={"data:image/gif;base64," + rateCalcResult.Icon}
          />
          {rateCalcResult.ImageConfidence}
          <aside className="warning">
            * Images submitted with low confidence may result in a re-submission
          </aside>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
