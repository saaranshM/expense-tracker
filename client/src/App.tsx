import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login";
import "./scss/index.scss";
import Register from "./views/Register";
import RegisterUserDetails from "./components/Register/RegisterUserDetails";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/register" />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/register/details" exact>
        <RegisterUserDetails />
      </Route>
    </Switch>
  );
}

export default App;
