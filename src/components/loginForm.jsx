import React, { Component } from "react";
import Joi from "joi-browser";
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

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validateProperty = ({ name, value }) => {
    //same approach in validate method, but we only want to validate one input field each
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    //cant validate our current schema cause our schemna takes two properties, so we need to make a sub schema
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;

    //this code is the same as above
    //if (error) return null;
    //return error.details[0].message;
  };

  handleChange = ({ currentTarget: input }) => {
    //we need to do validation but we dont wanna call validate() cause that will validate the entire form instead of the specific input field for example username.
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    //if errormessage is trucy do this, we will store it into our errors object and set it to the errormessage from our validation function
    //if not then we should delete the existing error property so the error is cleared up.
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    //we want to update the state but not directly, we want to clone it and let react update that state
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    //if theres no errors return null
    if (!error) return null;
    //otherwise we have to get the array and map it to an object

    const errors = {};
    //itterate over the array to an object could also use map but might be complicated for people like me
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
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

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
