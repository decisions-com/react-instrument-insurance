import * as React from "react";
import "./MiiForm.css";
import classNames from "classnames";

interface MiiFormProps {
  onSubmit: Function;
  buttons: React.ReactNode;
  row?: boolean;
  className?: string;
  disclaimer?: React.ReactNode;
}

export class MiiForm extends React.Component<MiiFormProps> {
  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  public render() {
    const { buttons, row, children, className, disclaimer } = this.props;
    return (
      <>
        <form
          className={classNames("mii-form", className)}
          onSubmit={this.onSubmit}
        >
          <div className={classNames("mii-form__fields", { row })}>
            {children}
          </div>
          <div className="mii-form__buttons">{buttons}</div>
        </form>
        <>{disclaimer}</>
      </>
    );
  }
}

export default MiiForm;
