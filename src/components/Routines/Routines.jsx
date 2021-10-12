import React from "react";
import SideBar from "../SideBar";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import "../../css/Schedule.css";
import "../../components/Routines/Routines.css";
import AddRoutineModal from "../Routines/AddRoutineModal";

const mapStateToProps = (state) => ({
  routines: state.routines,
});

const mapDispatchToProps = (dispatch) => ({});

const Routines = (props) => {
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="schedule_container_large">
          <div className="goals_header text-center mb-3">
            <h1 className="mb-2">Routines</h1>
            <hr className="linebreak mb-3" />
            <div className="goals_headings d-flex flex-row justify-content-between mx-5">
              <div className="d-flex flex-row justify-content-between w-25 mx-1 ">
                <span className="my-auto goals_headings_completedtext ml-2">
                  Routines : {props.routines.length}
                </span>
              </div>
              <div>
                <AddRoutineModal />
              </div>
            </div>
            <h3 className="mb-3 text-center">Daily</h3>
            <div className="w-100 d-flex flex-column">
              {props.routines
                ? props.routines.map((routine, i) =>
                    routine.repetition === "Daily" ? (
                      <div
                        key={routine.id}
                        className="routines_routinescard mb-3 mx-auto"
                      >
                        <h5 className="mb-0">{routine.task}</h5>
                        <p>{routine.date}</p>
                        <p>{routine.duration} minutes</p>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
            <h3 className="mb-3 text-center">Weekly</h3>
            <div className="w-100 d-flex flex-column">
              {props.routines
                ? props.routines.map((routine, i) =>
                    routine.repetition === "Weekly" ? (
                      <div
                        key={routine.id}
                        className="routines_routinescard mb-3 mx-auto"
                      >
                        <h5 className="mb-0">{routine.task}</h5>
                        <p>{routine.date}</p>
                        <p>{routine.duration} minutes</p>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>

            <h3 className="mb-3 text-center">Monthly</h3>
            <div className="w-100 d-flex flex-column">
              {props.routines
                ? props.routines.map((routine, i) =>
                    routine.repetition === "Monthly" ? (
                      <div
                        key={routine.id}
                        className="routines_routinescard mb-3 mx-auto"
                      >
                        <h5 className="mb-0">{routine.task}</h5>
                        <p>{routine.date}</p>
                        <p>{routine.duration} minutes</p>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Routines);
