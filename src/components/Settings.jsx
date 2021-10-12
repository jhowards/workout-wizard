import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container } from "react-bootstrap";

const Settings = () => {
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="schedule_container_large text-center mt-5">
          <h2>Settings</h2>
          <p>Profile Picture</p>
          <p>Profile Name</p>
          <p>Locale?</p>
        </Container>
      </div>
    </div>
  );
};

export default Settings;
