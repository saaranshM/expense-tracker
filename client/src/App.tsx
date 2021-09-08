import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/Login";
import "./scss/index.scss";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
