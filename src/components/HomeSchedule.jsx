import React from "react";
import { FaBell } from "react-icons/fa";
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
  const arrlength = todaysDateArray.length;
  return (
    <Card.Body className="h-100 ml-4">
      <Link to="/schedule">
        <Card.Title className="home_schedule_todaytext">
          Today's Tasks
        </Card.Title>
      </Link>
      <Card.Text className="home_schedule_datetext mb-4">
        {formatDateText}
      </Card.Text>
      <div className="h-100 d-flex flex-column">
        {props.tasks
          ? todaysDateArray.map((task, i) => (
              <Row className="mx-0 rowborder mb-4" key={`${task.id}`}>
                <Col xs={1}>
                  <FaBell size={18} />
                  {arrlength === i + 1 ? (
                    ""
                  ) : (
                    <div className="home_schedule_divider mx-2"></div>
                  )}
                </Col>
                <Col xs={11}>
                  <div className="home_schedule_tasks_maintext ml-2">
                    {task.task}
                    {task.daily ? (
                      <span className="ml-4 home_schedule_tasks_dailybadge">
                        Daily
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="home_schedule_tasks_timetext ml-2">
                    7:20 AM
                  </div>
                </Col>
              </Row>
            ))
          : ""}
      </div>

      <div>Test2</div>
      <div>Test3</div>
    </Card.Body>
  );
};

export default connect(mapStateToProps)(HomeSchedule);
