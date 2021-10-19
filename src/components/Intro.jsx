import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container } from "react-bootstrap";
import calendarphoto from "../images/calendar.jpg";

const Intro = () => {
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="intro_container_large text-center mt-5">
          <img
            className="intro_calendar_banner mb-5"
            src={calendarphoto}
            alt=""
          />
          <h1 className="font-weight-bold">Automated Daily Planner</h1>
          <ul className="mx-auto w-50 mt-3">
            <li className="text-center">
              <h5 className="mb-4">Create a list of tasks to plan your day</h5>
            </li>
            <li className="text-center">
              <h5 className="mb-4">Automatically schedule your whole day</h5>
            </li>
            <li className="text-center">
              <h5 className="mb-4">
                Add routines for daily, weekly and monthly tasks.
              </h5>
            </li>
            <li className="text-center">
              <h5 className="mb-4">
                Set long term goals and check their progress over time.
              </h5>
            </li>
          </ul>

          <h4 className="mb-3 font-weight-bold">Tech Stack:</h4>
          <h5>React, Redux, Javascript + React Bootstrap</h5>
          <h5 className="mb-5">Data stored locally using Redux Persist</h5>
        </Container>
      </div>
    </div>
  );
};

export default Intro;
