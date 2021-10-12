import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container } from "react-bootstrap";

const Intro = () => {
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="schedule_container_large text-center mt-5">
          <h2>Personal Daily Planner</h2>
          <ul className="mx-auto w-50 mt-3">
            <li className="text-center">
              <h5>Create a list of tasks to plan your day</h5>
            </li>
            <li className="text-center">
              <h5>Automatically schedule your whole day</h5>
            </li>
            <li className="text-center">
              <h5>Automatically schedule your whole day</h5>
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default Intro;
