import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
//import css
import { Button } from "react-bootstrap";
import { useContext } from "react";
import dblogo from "./images/dblogo.png";
import AuthContext from "./AuthContext";

import "./AppNavbar.css";
const AppNavbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <img
              src={dblogo}
              width="30" // Set the width as needed
              height="30" // Set the height as needed
              className="d-inline-block align-top"
              alt="Fintech logo"
            />{" "}
            <span style={{ color: "#0018A8", fontWeight: "bold" }}>
              Create Impact
            </span>{" "}
            {/* Inline styling for example */}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/marketplace">Marketplace</Nav.Link>
              <Nav.Link href="/action">
                <Button variant="danger" onClick={authContext.onLogout}>
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
