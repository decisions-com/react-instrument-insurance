import React from "react";
import WrapInput from "./common/WrapInput";
import Checkbox from "./common/Checkbox";

const defaultProps = {};

export default class InstrumentDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 />
        <form>
          <WrapInput
            htmlFor="instrument-type"
            label="Type of Instrument"
            required
          >
            <select id="instrument-type" />
          </WrapInput>
          <WrapInput htmlFor="detail" label="Detail" required>
            <select id="detail" />
          </WrapInput>
          <WrapInput htmlFor="year" label="Year Made" required>
            <input id="year" />
          </WrapInput>
          <WrapInput htmlFor="price" label="Purchase Price" required>
            <input id="price" />
          </WrapInput>
          <WrapInput
            htmlFor="replacement-cost"
            label="Replacement Cost"
            required
          >
            <input id="replacement-cost" />
          </WrapInput>
          <WrapInput htmlFor="storage" label="Stored at/in" required>
            <select id="storage" />
          </WrapInput>
          <Checkbox
            label="Kept in hard shell case"
            checked
            onChange={() => {}}
          />
          <div>
            <Checkbox
              label="Played professionally"
              checked
              onChange={() => {}}
            />
            <aside>Public performance use more than once per year</aside>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
