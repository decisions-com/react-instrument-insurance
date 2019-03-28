import React, { Component } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Header from "./components/common/Header";
import HomeComponent from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Application } from "./components/common/Application";

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
    this.setState({ route: Routes.ADDRESS });
  };

  render() {
    return (
      <Router>
        <div className="mii-react-app">
          <LoginForm />
          <Header
            key="header"
            title="Musical Instrument Insurance"
            onApplyClick={this.onApplyClick}
          />
          <Switch>
            <Route path="/" component={HomeComponent} exact />
            <Route path="/apply" component={Application} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
