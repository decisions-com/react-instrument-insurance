import React, { Component } from "react";
import "./App.css";
import InstrumentForm from "./components/InstrumentForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/common/Header";
import HomeComponent from "./components/Home";

enum Routes {
  HOME = "home",
  ADDRESS = "address",
  DETAILS = "details"
}

interface AppState {
  route: Routes;
}

// could just install React Router, but making that play nice with IIS is a "nice to have."
const initialState: AppState = {
  route: Routes.HOME
};

class App extends Component<{}, AppState> {
  state = { ...initialState };

  onApplyClick = () => {
    this.setState({ route: Routes.DETAILS });
  };

  render() {
    return (
      <div className="mii-react-app">
        <LoginForm />
        {this.state.route === Routes.HOME && (
          <HomeComponent onApplyClick={this.onApplyClick} />
        )}
        {this.state.route === Routes.DETAILS && [
          <Header title="Musical Instrument Insurance" />,
          <section className="mii-react-app-content">
            <InstrumentForm />
          </section>
        ]}
      </div>
    );
  }
}

export default App;
