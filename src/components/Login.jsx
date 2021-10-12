import React from "react";
import { Form, Button } from "react-bootstrap";
import "../css/Login.css";
import googlelogo from "../images/googleicon.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../actions";

const mapStateToProps = (state) => ({
  loggedin: state.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  sendLogin: () => dispatch(loginAction()),
});

const Login = (props) => {
  const loginInput = (e) => {
    e.preventDefault();
    props.sendLogin();
    props.history.push("/home");
    return;
  };
  return (
    <div className="login_window m-auto">
      <p className="mb-0">Welcome Back</p>
      <p className="login_window_logintext">Login to your account</p>
      <Form className="mb-5">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="formheight"
            type="email"
            placeholder="john.doe@gmail.com"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="formheight"
            type="password"
            placeholder="*********"
          />
        </Form.Group>
        <Form.Group
          className="d-flex justify-content-between"
          controlId="formBasicCheckbox"
        >
          <Form.Check type="checkbox" label="Remember me" />
          <span className="login_window_forgotpass">Forgot password?</span>
        </Form.Group>
        <Link to="/home">
          <Button
            className="w-100 mb-3 login_window_loginbtn"
            variant="success"
            type="submit"
            onClick={(e) => loginInput(e)}
          >
            Login now
          </Button>
        </Link>
        <Button
          className="w-100 login_window_googleloginbtn"
          onClick={(e) => loginInput(e)}
          type="submit"
        >
          <span>
            {" "}
            <img
              src={googlelogo}
              className="login_window_googleicon"
              alt=""
            />{" "}
            Or sign-in with Google
          </span>
        </Button>
      </Form>

      <span className="text-center login_jointext">
        Don't have an account? Join free today
      </span>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
