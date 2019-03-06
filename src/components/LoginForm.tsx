import * as React from "react";
import { AuthApi } from "../api/AuthApi";
import "./LoginForm.css";

export interface LoginFormProps {}
export interface LoginFormState {
  username: string;
  password: string;
  error: string;
}

const INITIAL_STATE: LoginFormState = {
  username: "",
  password: "",
  error: ""
};

/**
 * A simplistic login form.
 * inside a Decisions context, Decisions will redirect to
 * the login and we should never see this.
 */
export default class LoginForm extends React.Component<
  LoginFormProps,
  LoginFormState
> {
  state = { ...INITIAL_STATE };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ error: "" });
    AuthApi.login(this.state.username, this.state.password)
      .then(() => this.setState({ password: "" }))
      .catch(() => {
        this.setState({ password: "", error: "Nope. Try again." });
      });
  };

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ username: e.target.value });

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.target.value });

  public render() {
    return AuthApi.getSessionId() ? null : (
      <form className="mii-login-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={this.onUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={this.onPasswordChange}
        />
        <input type="submit" />
        {this.state.error}
      </form>
    );
  }
}
