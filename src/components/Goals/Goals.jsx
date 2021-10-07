import React from "react";
import SideBar from "../SideBar";
import "../../css/Goals.css";
import "../../css/Schedule.css";
import {
  Container,
  Button,
  Accordion,
  Card,
  ProgressBar,
} from "react-bootstrap";
import { connect } from "react-redux";
import AddGoalModal from "./AddGoalModal";
import { removeGoalAction } from "../../actions";

const mapStateToProps = (state) => ({
  goals: state.goals,
});

const mapDispatchToProps = (dispatch) => ({
  removeGoal: (id) => dispatch(removeGoalAction(id)),
});

const Goals = (props) => {
  let completedGoalsArray = props.goals.filter((el) => el.completed === true);
  const arrlength = completedGoalsArray.length;
  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 px-lg-5">
        <Container className="schedule_container_large">
          <div className="goals_header text-center mb-3">
            <h1>Goals</h1>
            <hr className="linebreak mb-3" />
            <div className="goals_headings d-flex flex-row justify-content-between mx-5">
              <div className="d-flex flex-row justify-content-between w-25 mx-1 ">
                <span className="my-auto goals_headings_completedtext">
                  Goals Completed: {arrlength}
                </span>
              </div>
              <div>
                <AddGoalModal />
              </div>
            </div>
          </div>
          <div>
            {props.goals
              ? props.goals.map((goal, i) => (
                  <Accordion
                    defaultActiveKey="1"
                    className="mb-3 mx-5"
                    key={goal.id}
                  >
                    <Card className="goals_accordion py-2">
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey="0"
                        className="p-0 goals_accordion_toggle"
                      >
                        <div className="goals_goalcollapsed">
                          <p className="home_goals_goaltag mb-1">{goal.tag}</p>
                          <p className="home_goals_goaltext mb-2">
                            {goal.goal}
                          </p>
                          <ProgressBar
                            striped
                            variant={goal.colour}
                            now={goal.percentage}
                            label={`${goal.percentage}%`}
                          />
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          {" "}
                          <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-1 mr-3">
                            Add Subtask
                          </Button>
                          <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-1 mr-3">
                            Edit Goal
                          </Button>
                          <Button
                            variant="danger"
                            className=" px-3 py-2 mb-1 mr-3"
                            onClick={() => props.removeGoal(goal.id)}
                          >
                            Delete Goal
                          </Button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ))
              : ""}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
