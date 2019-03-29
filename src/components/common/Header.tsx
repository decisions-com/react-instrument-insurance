import * as React from "react";
import logo from "./agileLogoTrans.png";
import { Link } from "react-router-dom";

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
          <Link to="/">Home</Link> | <Link to="/">For Foundations</Link> |{" "}
          <Link to="/">For ProfessionLinkls</Link> |{" "}
          <Link to="/">For Schools</Link> | <Link to="/">About Us</Link>
        </div>
        <div className="mii-home__links">
          <Link className="mii-button inline" to="/apply/user-info">
            Apply Now
          </Link>
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
