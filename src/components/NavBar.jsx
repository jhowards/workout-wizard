import React from "react";
import { Navbar, Nav, Form, FormControl, Dropdown } from "react-bootstrap";
import profilephoto from "../images/placeholder.png";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import { connect } from "react-redux";
import { logoutAction } from "../actions";

const mapStateToProps = (state) => ({
  loggedin: state.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  sendLogout: () => dispatch(logoutAction()),
});

const NavBar = (props) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  if (props.loggedin) {
    return (
      <Navbar variant="dark" className="login_navbar pl-0" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav mr-5" />
        <Navbar.Brand className="mr-0 navbar_logo ml-lg-4" href="/home">
          <div className="navbar_logowrapper text-lg-center d-inline ml-lg-3">
            Personal Daily Planner
          </div>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto mt-2 ml-3">
            <Nav.Link className="d-block d-md-none text-white" href="/home">
              Home
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="/schedule">
              Schedule
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="/calendar">
              Calendar
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="/routines">
              Routines
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="/goals">
              Goals
            </Nav.Link>
            <hr className="linebreak my-2" />
            <Nav.Link className="d-block d-md-none text-white" href="/settings">
              Settings
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="#">
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* <AiOutlineSearch /> */}
        <Form inline className="mr-5 d-none d-md-block">
          <FormControl type="text" placeholder={"Search"} className="mr-sm-2" />
        </Form>
        <IoMdNotificationsOutline
          size={28}
          className="mr-4 d-none d-md-block"
        />
        <Dropdown className="d-none d-md-block">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <div className="mr-5 d-none d-md-block navbar_profilesection px-2">
              <span className="mr-2 navbar_profilename">James</span>
              <img
                className="navbar_profilephoto ml-2"
                src={profilephoto}
                alt=""
              />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu} className="mt-1 pb-0">
            <Dropdown.Item eventKey="1">Settings</Dropdown.Item>
            <Dropdown.Item onClick={() => props.sendLogout()} eventKey="2">
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  } else {
    return (
      <Navbar variant="dark" className="login_navbar pl-0" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav mr-5" />
        <Navbar.Brand className="mr-0 navbar_logo ml-lg-4" href="/home">
          <div className="navbar_logowrapper text-lg-center d-inline ml-lg-3">
            Personal Daily Planner
          </div>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto mt-2 ml-3">
            <Nav.Link className="d-block d-md-none text-white" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="#">
              Login
            </Nav.Link>
            <Nav.Link className="d-block d-md-none text-white" href="#">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
