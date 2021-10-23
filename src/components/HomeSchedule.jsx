import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import format from "date-fns/format";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const HomeSchedule = (props) => {
  const date = new Date();
  const formatDateText = format(date, "do LLLL yyyy");

  let formatCurrentDate = format(date, "P");
  let todaysDateArray = props.tasks.filter(
    (el) => el.date === formatCurrentDate
  );
  // let sortedArray = todaysDateArray.sort((a, b) => {
  //   return b.archived - a.archived;
  // });
  let removeArchived = todaysDateArray.filter((el) => el.archived === false);
  const arrlength = removeArchived.length;
  return (
    <Card.Body className="h-100 ml-4">
      <Card.Title className="home_schedule_todaytext">
        <Link to="/schedule">Today's Tasks</Link>
      </Card.Title>

      <Card.Text className="home_schedule_datetext mb-4">
        {formatDateText}
      </Card.Text>
      <div className="d-flex flex-column">
        {props.tasks
          ? removeArchived.map((task, i) =>
              task.date === formatCurrentDate ? (
                <Row className="mx-0 rowborder mb-4" key={task.id}>
                  <Col xs={1} className="mt-2">
                    <i className={task.icon}></i>
                    {arrlength === i + 1 ? (
                      ""
                    ) : (
                      <div className="home_schedule_divider"></div>
                    )}
                  </Col>
                  <Col xs={11}>
                    {/* IS TASK ARCHIVED? */}
                    {task.archived ? (
                      <>
                        <s className="home_schedule_tasks_maintext ml-2 mb-0 d-block">
                          {task.task}
                          {task.daily ? (
                            <span className="ml-4 home_schedule_tasks_dailybadge">
                              Routine
                            </span>
                          ) : (
                            ""
                          )}
                        </s>
                        {task.endtime !== "" ? (
                          <s className="home_schedule_tasks_timetext ml-2 mb-0 d-block">
                            {task.starttime} {"->"} {task.endtime}
                          </s>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        <p className="home_schedule_tasks_maintext ml-2 mb-0">
                          {task.task}
                          {task.daily ? (
                            <span className="ml-4 home_schedule_tasks_dailybadge">
                              Routine
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                        {task.endtime !== "" ? (
                          <p className="home_schedule_tasks_timetext ml-2 mb-0">
                            {task.starttime} {"->"} {task.endtime}
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </Col>
                </Row>
              ) : (
                ""
              )
            )
          : ""}
      </div>
    </Card.Body>
  );
};

export default connect(mapStateToProps)(HomeSchedule);
