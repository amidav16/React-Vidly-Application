import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      //additonal properties
      {...rest}
      render={props => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        //if component is trucy return it otherwise we call the render function and we give it the props we recieve
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
