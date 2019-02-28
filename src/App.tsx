import React, { Component } from 'react';
import logo from './agileLogoTrans.png';
import './App.css';
import InstrumentForm from './components/InstrumentForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Musical Instrument Insurance</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section className="App-content">
          <InstrumentForm />
        </section>
      </div>
    );
  }
}

export default App;
