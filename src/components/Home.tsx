import * as React from "react";
import "./Home.css";
import logo from "./common/agileLogoTrans.png";

interface HomeComponentProps {
  onApplyClick: React.EventHandler<React.MouseEvent>;
}

const HomeComponent: React.FunctionComponent<HomeComponentProps> = props => {
  return (
    <div className="mii-home">
      <header className="mii-home-header">
        <img className="mii-home__logo" src={logo} />
        <h1 className="mii-home-title">Musical Instrument Insurance</h1>
      </header>
      <section className="mii-home-content">
        <p>
          Our instruments are some of the most loved and most delicate things we
          have. They are also sometimes among the most valuable.
        </p>

        <p>
          At Agile Company we provide the some of the best coverage at rates to
          make you play a tune.
        </p>
        <div className="mii-home-controls">
          <button onClick={props.onApplyClick}>Apply Now</button>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
