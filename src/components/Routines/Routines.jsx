import React from "react";
import SideBar from "../SideBar";
import { connect } from "react-redux";
import { Container, Dropdown } from "react-bootstrap";
import "../../css/Schedule.css";
import "../../components/Routines/Routines.css";
import AddRoutineModal from "../Routines/AddRoutineModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { removeRoutineAction, removeRoutineTasksAction } from "../../actions";

const mapStateToProps = (state) => ({
  routines: state.routines,
});

const mapDispatchToProps = (dispatch) => ({
  removeRoutine: (id) => dispatch(removeRoutineAction(id)),
  removeRoutineTasks: (id) => dispatch(removeRoutineTasksAction(id)),
});

const Routines = (props) => {
  const isAnyDaily = props.routines.filter((el) => el.repetition === "Daily");
  const isAnyWeekly = props.routines.filter((el) => el.repetition === "Weekly");
  const isAnyMonthly = props.routines.filter(
    (el) => el.repetition === "Monthly"
  );

  const deleteRoutineFunction = (id) => {
    props.removeRoutine(id);
    props.removeRoutineTasks(id);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const value = "";

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled mb-1">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

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
            {isAnyDaily ? <h3 className="mb-3 text-center">Daily</h3> : ""}
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
                        <Dropdown className="routines_routinedropdown">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          >
                            <div className="">
                              <BsThreeDotsVertical size={26} />
                            </div>
                          </Dropdown.Toggle>

                          <Dropdown.Menu as={CustomMenu} className="py-1">
                            {/* <EditTaskModal taskid={task.id} /> */}
                            <Dropdown.Item
                              onClick={() => deleteRoutineFunction(routine.id)}
                              eventKey="2"
                            >
                              Delete Routine
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
            {isAnyWeekly ? <h3 className="mb-3 text-center">Weekly</h3> : ""}
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
                        <Dropdown className="routines_routinedropdown">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          >
                            <div className="">
                              <BsThreeDotsVertical size={26} />
                            </div>
                          </Dropdown.Toggle>

                          <Dropdown.Menu as={CustomMenu} className="py-1">
                            {/* <EditTaskModal taskid={task.id} /> */}
                            <Dropdown.Item
                              onClick={() => deleteRoutineFunction(routine.id)}
                              eventKey="2"
                            >
                              Delete Routine
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>

            {isAnyMonthly ? <h3 className="mb-3 text-center">Monthly</h3> : ""}
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
                        <Dropdown className="routines_routinedropdown">
                          <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                          >
                            <div className="">
                              <BsThreeDotsVertical size={26} />
                            </div>
                          </Dropdown.Toggle>

                          <Dropdown.Menu as={CustomMenu} className="py-1">
                            {/* <EditTaskModal taskid={task.id} /> */}
                            <Dropdown.Item
                              onClick={() => deleteRoutineFunction(routine.id)}
                              eventKey="2"
                            >
                              Delete Routine
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
