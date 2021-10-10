import React from "react";
import SideBar from "../SideBar";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({});

const Routines = () => {
  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 px-lg-5">
        <Container className="schedule_container_large">
          <div className="goals_header text-center mb-3">
            <h1 className="mb-2">Routines</h1>
            <hr className="linebreak mb-3" />
            <div className="goals_headings d-flex flex-row justify-content-between mx-5">
              <div className="d-flex flex-row justify-content-between w-25 mx-1 ">
                <span className="my-auto goals_headings_completedtext">
                  Goals Completed:
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Routines);
