import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar variant="dark" className="login_navbar pl-0" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav mr-5" />
      <Navbar.Brand className="mr-0 navbar_logo ml-lg-4" href="#">
        <div className="navbar_logowrapper text-lg-center d-inline ml-lg-5">
          Task Manager
        </div>
      </Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto mt-2 ml-3">
          <Nav.Link className="d-block d-md-none text-white" href="#home">
            Home
          </Nav.Link>
          <Nav.Link className="d-block d-md-none text-white" href="#">
            Schedule
          </Nav.Link>
          <Nav.Link className="d-block d-md-none text-white" href="#">
            Calendar
          </Nav.Link>
          <Nav.Link className="d-block d-md-none text-white" href="#">
            Dailies
          </Nav.Link>
          <Nav.Link className="d-block d-md-none text-white" href="#">
            Notes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
