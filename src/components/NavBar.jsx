import React from "react";
import { Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar variant="dark" className="login_navbar" expand="lg">
      <Navbar.Brand className="ml-5" href="#">
        Task Manager
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
