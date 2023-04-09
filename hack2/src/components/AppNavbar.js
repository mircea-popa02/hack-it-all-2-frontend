
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
//import css
import './AppNavbar.css';
const AppNavbar = () => {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Fintech</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/transactions">Transactions</Nav.Link>
                        <Nav.Link href="/news">News</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        </>
    )
}

export default AppNavbar;