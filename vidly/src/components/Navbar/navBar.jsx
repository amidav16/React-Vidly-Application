import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>

          {!user && (
            //conditonal render, if we have no user we will render these!
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            //conditonal render, if we have a user we wanna render these!
            <React.Fragment>
              <NavLink className="nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
