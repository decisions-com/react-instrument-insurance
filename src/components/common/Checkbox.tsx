import * as React from "react";
import "./Checkbox.css";
import props from "ramda/es/props";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (label: string, selected: boolean) => void;
  tooltip?: string;
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
        {this.props.tooltip && (
          <span title={this.props.tooltip} className="checkbox__tooltip">
            i
          </span>
        )}
      </div>
    );
  }
}
