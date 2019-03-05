import React, { Component } from "react";
import logo from "./agileLogoTrans.png";
import "./App.css";
import InstrumentForm from "./components/InstrumentForm";

class App extends Component {
  render() {
    return (
      <div className="mii-react-app">
        <header className="mii-react-app-header">
          <h1 className="mii-react-app-title">Musical Instrument Insurance</h1>
          <img src={logo} className="mii-react-app-logo" alt="logo" />
        </header>
        <section className="mii-react-app-content">
          <InstrumentForm />
        </section>
      </div>
    );
  }
}

export default App;
