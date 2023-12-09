import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Redirect,
} from "react-router-dom";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";

import Login from "./components/LoginPage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/RegisterPage";
import AuthContext from "./components/AuthContext";
import { useContext } from "react";

import Action from "./components/Action";
import Transactions from "./components/Transactions";

import Landing from "./components/Landing";

// add usestate
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Marketplace from "./components/Marketplace";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/"
);

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authContext.isLoggedIn ? <Redirect to="/home" /> : <Landing />}
        </Route>
        <Route exact path="/register">
          {authContext.isLoggedIn ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route exact path="/login">
          {authContext.isLoggedIn ? <Home /> : <Login />}
        </Route>

        <Route exact path="/home">
          {authContext.isLoggedIn ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {authContext.isLoggedIn ? <Profile /> : <Redirect to="/" />}
        </Route>

        <Route exact path="/transactions">
          {authContext.isLoggedIn ? <Transactions /> : <Redirect to="/" />}
        </Route>

        <Route exact path="/marketplace">
          {authContext.isLoggedIn ? <Marketplace /> : <Redirect to="/" />}
        </Route>
        <Route path="/action">
          {authContext.isLoggedIn ? <Action /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
