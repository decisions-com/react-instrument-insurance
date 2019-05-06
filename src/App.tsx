import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import Header from "./components/common/Header";
import HomeComponent from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Application } from "./components/common/Application";
import "./App.css";
import { ApiConfig } from "@decisions/api-helpers/ApiConfig";

export interface AppProps {
  baseUrl: string; // e.g. "/decisions/instrument-insurance/"
}

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    ApiConfig.loadConfig();
  }

  render() {
    return (
      <Router basename={this.props.baseUrl}>
        <div className="mii-react-app">
          <LoginForm />
          <Header key="header" title="Musical Instrument Insurance" />
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
