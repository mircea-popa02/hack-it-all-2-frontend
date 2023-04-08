import './App.css';

import { BrowserRouter as Router, Route, Routes, Switch, Redirect } from "react-router-dom";
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

import Login from './components/LoginPage';
import Home from './components/Home';
import Profile from './components/Profile';
import Register from './components/RegisterPage';
import  AuthContext  from './components/AuthContext';
import { useContext } from 'react';


// add usestate
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/');

function App() {
  const authContext = useContext(AuthContext);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authContext.isLoggedIn ? <Redirect to="/home" /> : <Login  />}
        </Route>
        <Route exact path="/register">
          {authContext.isLoggedIn ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route exact path="/home">
          {authContext.isLoggedIn ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {authContext.isLoggedIn ? <Profile /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
