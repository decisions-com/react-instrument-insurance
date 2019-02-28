import classNames from "classnames";
import * as React from "react";
import "./WrapInput.css";

interface WrapInputProps extends React.HTMLProps<HTMLLabelElement> {
  htmlFor: string;
  label: string;
  required?: boolean;
}

const WrapInput: React.SFC<WrapInputProps> = ({
  htmlFor,
  label,
  children,
  className,
  required
}) => {
  return (
    <label htmlFor={htmlFor} className={classNames("wrapped-input", className)}>
      <span className="wrapped-input__label">
        {label}
        {required && <span className="wrapped-input__warn-text"> *</span>}
      </span>
      {children}
    </label>
  );
};

export default WrapInput;
