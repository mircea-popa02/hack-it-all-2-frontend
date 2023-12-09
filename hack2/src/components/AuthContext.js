import { useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  nume: "",
  onLogout: () => {},
  onLogin: (token) => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [nume, setNume] = useState("");

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setNume(null);
    localStorage.removeItem("token");
    localStorage.removeItem("nume");
  };

  const loginHandler = (token, nume, coins) => {
    setToken(token);
    setNume(nume);
    localStorage.setItem("token", token);
    localStorage.setItem("nume", nume);
  };


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
    nume: nume
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
