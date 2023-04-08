import './App.css';

import { BrowserRouter as Router, Route, Routes, Switch, Redirect } from "react-router-dom";
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

import Login from './components/LoginPage';
import Home from './components/Home';
import Profile from './components/Profile';
import Register from './components/RegisterPage';

// add usestate
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.3.0/dist/');



// Handle login status change



// register

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatusChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/home" /> : <Login onRegister={handleLoginStatusChange} />}
        </Route>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route exact path="/home">
          {isLoggedIn ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {isLoggedIn ? <Profile /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
