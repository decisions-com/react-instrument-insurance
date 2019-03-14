import * as React from "react";
import logo from "./agileLogoTrans.png";

interface HeaderProps {
  title: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ title }) => {
  return (
    <header className="mii-react-app-header">
      <h1 className="mii-react-app-title">{title}</h1>
      <img src={logo} className="mii-react-app-logo" alt="logo" />
    </header>
  );
};

export default Header;
