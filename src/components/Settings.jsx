import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container, Button } from "react-bootstrap";
import { clearTasksAction, clearGoalsAction } from "../actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  clearTasks: () => dispatch(clearTasksAction()),
  clearGoals: () => dispatch(clearGoalsAction()),
});
const Settings = (props) => {
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="schedule_container_large text-center mt-5">
          <h2>Settings</h2>
          <p>Profile Picture</p>
          <p>Profile Name</p>
          <p>Locale?</p>
          <Button
            onClick={() => {
              if (window.confirm("Are you sure you want to wipe all tasks?"))
                props.clearTasks();
            }}
            className="mb-2 w-25 mx-auto"
            variant="danger"
          >
            Clear all Tasks
          </Button>
          <Button
            onClick={() => {
              if (window.confirm("Are you sure you want to wipe all goals?"))
                props.clearGoals();
            }}
            className="mb-2 w-25 mx-auto"
            variant="danger"
          >
            Clear all Goals
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Settings);
