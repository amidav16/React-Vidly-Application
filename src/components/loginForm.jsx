import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    //controlled value cannot be null or unidentified...
    //therefore initiliaze it to an empty string or some value you find from the server
    account: { username: "", password: "" },
    errors: {
      username: "",
      password: ""
    }
  };

  handleChange = ({ currentTarget: input }) => {
    //we want to update the state but not directly, we want to clone it and let react update that state
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    //instead of null we use an empty object
    this.setState({ errors: errors || {} });
    //wont call the server on error
    if (errors) return;

    //call the server
    console.log("Submitted");
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          ></Input>
          <Input
            name="password"
            value={account.Password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          ></Input>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
