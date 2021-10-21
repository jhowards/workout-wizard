import React from "react";
import "../css/Schedule.css";
import { Container, Form, Image, Button } from "react-bootstrap";
import { useState } from "react";
import profilephoto from "../images/placeholder.png";
import { registerUserAction, setRegisterAction } from "../actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  registered: state.registered,
});

const mapDispatchToProps = (dispatch) => ({
  setRegister: () => dispatch(setRegisterAction()),
  registerUser: (userToRegister) =>
    dispatch(registerUserAction(userToRegister)),
});

const Register = (props) => {
  const [imagePreview, setimagePreview] = useState(profilephoto);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [userToAdd, setuserToAdd] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
  });
  const [baseImage, setBaseImage] = useState("");

  const handleInput = (e, propertyName) => {
    setuserToAdd({
      ...userToAdd,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const imageUpload = async (e) => {
    if (e.target.files.length === 0) {
      console.log("No image selected!");
    } else {
      let imageupload = URL.createObjectURL(e.target.files[0]);
      setimagePreview(imageupload);
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setBaseImage(base64);
      setimageUploaded(true);
    }
    return;
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToAdd.firstname === "") {
      alert("Please enter your First name!");
      return;
    }
    if (userToAdd.surname === "") {
      alert("Please enter your Surname!");
      return;
    }
    if (userToAdd.email === "") {
      alert("Please enter your email address!");
      return;
    }
    if (userToAdd.password === "") {
      alert("Please set a password!");
      return;
    }

    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(userToAdd.email)) {
      alert("Please enter a valid email!");
      return;
    }

    if (props.registered) {
      alert("Only 1 registered account per user is allowed.");
      return;
    }

    let profileImageToSet = null;
    if (imageUploaded) {
      profileImageToSet = baseImage;
    } else {
      profileImageToSet = profilephoto;
    }

    let userToRegister = {
      firstname: userToAdd.firstname,
      surname: userToAdd.surname,
      email: userToAdd.email,
      password: userToAdd.password,
      profileimage: profileImageToSet,
    };
    console.log(userToRegister);
    props.registerUser(userToRegister);
    props.setRegister();

    alert("Successfully Registered!");
    props.history.push("/login");
  };

  return (
    <div className="d-flex h-100 mainwrapper">
      {/* <SideBar /> */}
      <div className="h-100 w-100 py-lg-3 ">
        <Container className="schedule_container_large">
          <h2 className="text-center mt-4">Register</h2>
          <p className="text-center text-danger">
            All data is stored locally. None of your data can be accessed.
          </p>

          <Form id="setupWizardForm" className="d-flex flex-column">
            <div className="mx-auto d-flex flex-row">
              <Form.Group className="mb-2 mx-auto">
                <Form.Label className="mb-0 mt-3">First Name*</Form.Label>
                <Form.Control
                  className="border border-dark"
                  type="text"
                  maxlength="12"
                  minlength="2"
                  placeholder="Ex: John"
                  required
                  onChange={(e) => handleInput(e, "firstname")}
                />
              </Form.Group>
              <Form.Group className="mb-2 mx-auto">
                <Form.Label className="mb-0 mt-3 ml-4">Surname*</Form.Label>
                <Form.Control
                  className="border border-dark ml-4"
                  type="text"
                  maxlength="14"
                  minlength="2"
                  placeholder="Ex: Doe"
                  required
                  onChange={(e) => handleInput(e, "surname")}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-2 mx-auto">
              <Form.Label className="mb-0 mt-3">Email Address*</Form.Label>
              <Form.Control
                className="border border-dark"
                type="email"
                minlength="6"
                maxlength="35"
                required
                placeholder="Ex: john@gmail.com"
                onChange={(e) => handleInput(e, "email")}
              />
            </Form.Group>
            <Form.Group className="mb-2 mx-auto">
              <Form.Label className="mb-0 mt-3">Password*</Form.Label>
              <Form.Control
                className="border border-dark"
                type="password"
                minlength="6"
                maxlength="26"
                placeholder="*********"
                required
                onChange={(e) => handleInput(e, "password")}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3 mt-3 mx-auto">
              <Form.Label>Change Profile Photo:</Form.Label>
              <Form.Control
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => imageUpload(e)}
              />
            </Form.Group>

            <Image
              className="mt-0 mb-3 w-25 mx-auto"
              src={imagePreview}
              fluid
              roundedCircle
            />

            <Button
              className="submitRegisterButton w-25 mx-auto mt-2 mb-3"
              type="submit"
              form="setupWizardForm"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
