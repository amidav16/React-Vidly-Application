import React, { Component } from "react";
import Movies from "./components/movies.jsx";
import MovieForm from "./components/movieForm.jsx";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import WebsiteNavBar from "../src/components/Navbar/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/Navbar/notFound";
import Customers from "./components/Navbar/customers";
import Rentals from "./components/Navbar/rentals";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <WebsiteNavBar />

          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
