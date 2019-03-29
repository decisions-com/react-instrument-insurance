import * as React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

interface HomeComponentProps {
  onApplyClick: React.EventHandler<React.MouseEvent>;
}

const HomeComponent: React.FunctionComponent<HomeComponentProps> = props => {
  return (
    <div className="mii-home">
      <section className="mii-home-content">
        <p>
          At agile company, our affiliates have been providing premier coverage
          for prestigious musical instruments since 1897. We have deep knowledge
          of both instruments, and insurance, and we marry the two for your
          benefit.
        </p>

        <p>
          Whether you are playing a modern guitar or a historical orchestral
          piece, protecting an heirloom or the tool of your livelihood, we can
          taylor coverage and rates to meet your precise needs.
        </p>

        <div className="mii-home-controls" />
      </section>
    </div>
  );
};

export default HomeComponent;
