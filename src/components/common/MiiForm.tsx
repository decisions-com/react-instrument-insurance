import * as React from "react";
import "./MiiForm.css";

interface MiiFormProps {
  onSubmit: React.FormEventHandler;
  buttons: React.ReactNode;
}

const MiiForm: React.FunctionComponent<MiiFormProps> = ({
  children,
  onSubmit,
  buttons
}) => {
  return (
    <form className="mii-form" onSubmit={onSubmit}>
      <div className="mii-form__fields">{children}</div>
      <div className="mii-form__buttons">{buttons}</div>
    </form>
  );
};

export default MiiForm;
