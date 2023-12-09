import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import AuthContext from "./AuthContext";
import dblogo from "./images/dblogo.png";

import "./AppNavbar.css";

const AppNavbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={dblogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Fintech logo"
          />
          <span style={{ color: "#0018A8", fontWeight: "bold" }}>
            Create Impact
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <Nav.Link href="http://localhost:5173/">Earn Coins</Nav.Link>
            <Nav.Link href="/action">
              <Button variant="danger" onClick={authContext.onLogout}>
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
