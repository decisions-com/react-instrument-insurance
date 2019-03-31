import * as React from "react";
import "./Home.css";
import Tile from "./Tile";
import orchestra from "../img/larisa-birta-102093-unsplash.jpg";
import school from "../img/dimitri-bong-1343639-unsplash.jpg";
import individual from "../img/echo-grid-206321-unsplash.jpg";
import band from "../img/markus-spiske-487963-unsplash.jpg";

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

        <div className="mii-home-tiles">
          <Tile image={individual} title="Individuals">
            Learn about our rates for Individuals{" "}
          </Tile>
          <Tile image={school} title="Schools">
            Learn about our rates for Schools{" "}
          </Tile>
          <Tile image={band} title="Bands">
            Learn about our rates for Bands{" "}
          </Tile>
          <Tile image={orchestra} title="Orchestras">
            Learn about our rates for Orchestras{" "}
          </Tile>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
