import * as React from "react";
import logo from "./agileLogoTrans.png";

interface HeaderProps {
  title: string;
  onApplyClick: React.EventHandler<React.MouseEvent>;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  onApplyClick
}) => {
  return (
    <React.Fragment>
      <section className="mii-home__top-nav">
        <div className="mii-home__links">
          <a href="/">For Foundations</a> | <a href="/">For Professionals</a> |{" "}
          <a href="/">For Schools</a> | <a href="/">About Us</a>
        </div>
        <div className="mii-home__links">
          <button className="inline" onClick={onApplyClick}>
            Apply Now
          </button>
        </div>
      </section>
      <header className="mii-home-header">
        <img className="mii-home__logo" src={logo} />
        <h1 className="mii-home-title">{title}</h1>
      </header>
    </React.Fragment>
  );
};

export default Header;
