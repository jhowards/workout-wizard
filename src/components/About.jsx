import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="schedule_container_large">
          <h2 className="text-center">About Me:</h2>

          <img
            className="mx-auto mt-4 mb-3 about_profilephoto"
            src="https://i.imgur.com/XAoodKj.jpg"
            alt="Profile"
          />

          <h2 className="text-center ">James Sutcliffe</h2>
          <h5 className="text-center">Front End Developer</h5>
          <h5 className="mb-4 text-center">
            <small>Bournemouth, England</small>
          </h5>

          <div className="text-center">
            <div className="mb-3">
              <b className="h5 mr-3">LinkedIn:</b>
              <span className="h5 text-primary">
                <a href="https://www.linkedin.com/in/james-sutcliffe/">
                  https://www.linkedin.com/in/james-sutcliffe/
                </a>
              </span>
            </div>
            <div className="mb-3">
              <b className="h5 mr-3">Github:</b>
              <span className="h5 text-primary">
                <a href="https://github.com/jhowards">
                  https://github.com/jhowards
                </a>
              </span>
            </div>
            <div className="mb-3">
              <b className="h5 mr-3">Portfolio:</b>
              <span className="h5 text-primary">
                <a href="https://www.jameshoward.uk/">
                  https://www.jameshoward.uk/
                </a>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default About;
