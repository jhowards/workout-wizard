import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar variant="dark" className="login_navbar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand className="mr-0" href="#">
        Task Manager
      </Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto mt-2">
          <Nav.Link className="d-block d-md-none" href="#home">
            Home
          </Nav.Link>
          <Nav.Link className="d-block d-md-none" href="#">
            Schedule
          </Nav.Link>
          <Nav.Link className="d-block d-md-none" href="#">
            Calendar
          </Nav.Link>
          <Nav.Link className="d-block d-md-none" href="#">
            Dailies
          </Nav.Link>
          <Nav.Link className="d-block d-md-none" href="#">
            Notes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
