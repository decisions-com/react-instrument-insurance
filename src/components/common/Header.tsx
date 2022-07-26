import * as React from "react";
import logo from "./logo.svg";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import classNames from "classnames";

interface HeaderProps extends RouteComponentProps {
  title: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ title, location }) => {
  return (
    <React.Fragment>
      <section className="mii-home__top-nav">
        <div className="mii-home__links">
          <Link to="/">Home</Link> | <Link to="/">For Foundations</Link> |{" "}
          <Link to="/">For Professionals</Link> |{" "}
          <Link to="/">For Schools</Link> | <Link to="/">About Us</Link>
        </div>
        <div className="mii-home__links">
          <Link className="mii-button inline" to="/apply/user-info">
            Apply Now
          </Link>
        </div>
      </section>
      <header
        className={classNames("mii-home-header", {
          applying: location.pathname !== "/"
        })}
      >
        <img alt="Logo" className="mii-home__logo" src={logo} />
        <h1 className="mii-home-title">{title}</h1>
      </header>
    </React.Fragment>
  );
};

export default withRouter(Header);
