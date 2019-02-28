import * as React from "react";
import "./Checkbox.css";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (label: string, selected: boolean) => void;
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
  // not an SFC, because "this" is state we need to reference in this handler
  onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange(this.props.label, !this.props.checked);

  public render() {
    const { label, checked } = this.props;
    return (
      <div className="checkbox">
        <input
          className="checkbox__input"
          key={label}
          title={label}
          type="checkbox"
          checked={checked}
          onChange={this.onChange}
        />
        {label}
      </div>
    );
  }
}
