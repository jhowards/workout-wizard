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
import { removeGoalAction, goalCompletionAction } from "../../actions";
import "antd/dist/antd.css";
import { Steps } from "antd";
import EditGoalModal from "./EditGoalModal";

const mapStateToProps = (state) => ({
  goals: state.goals,
});

const mapDispatchToProps = (dispatch) => ({
  removeGoal: (id) => dispatch(removeGoalAction(id)),
  setGoalCompletion: (goal) => dispatch(goalCompletionAction(goal)),
});

const Goals = (props) => {
  let selected = false;

  const setCurrentSub = (i, goal) => {
    if (i === 0) {
      if (selected === true) {
        props.setGoalCompletion({ id: goal.id, count: -1 });
        selected = false;
      } else {
        props.setGoalCompletion({ id: goal.id, count: i });
      }
      selected = true;
    } else {
      props.setGoalCompletion({ id: goal.id, count: i });
    }
  };

  const { Step } = Steps;
  const completedGoalsArray = props.goals.filter((el) => el.completed === true);
  const arrlength = completedGoalsArray.length;
  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3">
        <Container className="schedule_container_large">
          <div className="goals_header text-center mb-3">
            <h1 className="mb-2">Goals</h1>
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
                  <>
                    {goal.completed === true ? (
                      <Accordion
                        defaultActiveKey="1"
                        className="mb-3 mx-5 goalcompleted"
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
                              <p className="home_goals_goaltag mb-1">
                                {goal.tag}
                              </p>
                              <p className="home_goals_goaltext mb-2">
                                {goal.goal}
                              </p>
                              <ProgressBar
                                striped
                                variant={goal.colour}
                                now={goal.percentage}
                                label={`${Math.round(goal.percentage)}%`}
                              />
                            </div>
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body className="d-flex flex-column">
                              {" "}
                              {/* <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-3 mr-3">
                            Add Subtask
                          </Button> */}
                              <div className="mx-auto">
                                <Steps
                                  direction="vertical"
                                  current={goal.count}
                                  status="finish"
                                >
                                  {Object.entries(goal.subtasks).map(
                                    ([key, value], i) => (
                                      <Step
                                        key={i}
                                        title={value}
                                        value={key}
                                        className="mb-3"
                                        description="{}"
                                        className="goals_goal_steps_step"
                                        onClick={() => setCurrentSub(i, goal)}
                                      />
                                    )
                                  )}
                                </Steps>
                              </div>
                              <EditGoalModal goalid={goal.id} />
                              <Button
                                variant="danger"
                                className="goals_resetdeletegoalbutton px-3 py-2 mb-1 mr-3 w-25 mx-auto"
                                onClick={() => setCurrentSub(-1, goal)}
                              >
                                Reset Subtasks
                              </Button>
                              <Button
                                variant="danger"
                                className="goals_resetdeletegoalbutton px-3 py-2 mb-1 mr-3 w-25 mx-auto"
                                onClick={() => props.removeGoal(goal.id)}
                              >
                                Delete Goal
                              </Button>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    ) : (
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
                              <p className="home_goals_goaltag mb-1">
                                {goal.tag}
                              </p>
                              <p className="home_goals_goaltext mb-2">
                                {goal.goal}
                              </p>
                              <ProgressBar
                                striped
                                variant={goal.colour}
                                now={goal.percentage}
                                label={`${Math.round(goal.percentage)}%`}
                              />
                            </div>
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body className="d-flex flex-column">
                              {" "}
                              {/* <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-3 mr-3">
                            Add Subtask
                          </Button> */}
                              <div className="mx-auto">
                                <Steps
                                  direction="vertical"
                                  current={goal.count}
                                  status="finish"
                                >
                                  {Object.entries(goal.subtasks).map(
                                    ([key, value], i) => (
                                      <Step
                                        key={i}
                                        title={value}
                                        value={key}
                                        className="mb-3"
                                        description="{}"
                                        className="goals_goal_steps_step"
                                        onClick={() => setCurrentSub(i, goal)}
                                      />
                                    )
                                  )}
                                </Steps>
                              </div>
                              <EditGoalModal goalid={goal.id} />
                              <Button
                                className="px-3 py-2 mb-1 mr-3 w-25 mx-auto goals_resetdeletegoalbutton"
                                onClick={() => setCurrentSub(-1, goal)}
                              >
                                Reset Subtasks
                              </Button>
                              <Button
                                className="goals_resetdeletegoalbutton px-3 py-2 mb-1 mr-3 w-25 mx-auto"
                                onClick={() => props.removeGoal(goal.id)}
                              >
                                Delete Goal
                              </Button>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    )}
                  </>
                ))
              : ""}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
