import React from "react";
import SideBar from "./SideBar";
import "../css/Home.css";
import { Row, Col, Card } from "react-bootstrap";
import profilephoto from "../images/placeholder.png";
import Calendar from "react-calendar";
import "../css/homecalendar.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Greeting from "./Greeting";
import { Link } from "react-router-dom";
import HomeSchedule from "./HomeSchedule";
import { connect } from "react-redux";
import format from "date-fns/format";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { setDateAction } from "../actions";
import { isEqual } from "date-fns";
import randomColor from "randomcolor";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  goals: state.goals,
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDateAction(date)),
});

const Home = (props) => {
  const date = new Date();
  let formatCurrentDate = format(date, "P");
  let todaysDateArray = props.tasks.filter(
    (el) => el.date === formatCurrentDate && el.archived === false
  );
  const arrlength = todaysDateArray.length;

  const dateFormat = (date) => {
    let convertedDate = new Date(date);
    return format(convertedDate, "MMMM");
  };

  const compareDates = (date, date2) => {
    var d3 = new Date();
    d3.setHours(0, 0, 0, 0);
    if (isEqual(date2, d3)) {
      return false;
    } else {
      let convertedDate = new Date(date);
      let result = isEqual(convertedDate, date2);
      return result;
    }
  };

  const moveToSchedule = (value, event) => {
    props.setDate(value);
    props.history.push("/schedule");
  };

  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 home_mainbody py-md-3 px-md-5">
        <Row xs={1} lg={2} className="g-2 h-100 pl-lg-5">
          <Col className="px-4 d-flex flex-column h-100">
            <Card
              className="home_dailyheader mb-3 mt-2"
              style={{ width: "100%" }}
            >
              <Card.Body>
                <Row>
                  <Col xs={12} lg={4} className="px-3 d-flex">
                    <Card.Img
                      className="home_dailyheader_image mx-auto"
                      src={profilephoto}
                    />
                  </Col>
                  <Col xs={12} lg={8} className="text-center">
                    <Card.Title className="home_dailyheader_morningtext mt-5">
                      <Greeting />
                    </Card.Title>
                    <Card.Text className="home_dailyheader_taskstext lead">
                      You have{" "}
                      <span className="home_dailyheader_taskstextcolor">
                        {arrlength}
                      </span>{" "}
                      {arrlength === 1
                        ? "remaining task today."
                        : "remaining tasks today."}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            {/* <div className="home_timeperiod mb-2 ml-4">
              <span className="mr-2 home_timeperiod_text_active">Daily</span>
              <span className="mr-2 home_timeperiod_text">Weekly</span>
              <span className="home_timeperiod_text">Monthly</span>
            </div> */}
            <Card
              className=" h-100 home_schedule homeschedule_card_overflow"
              style={{ width: "100%" }}
            >
              <HomeSchedule />
            </Card>
            {/* <Button className="home_schedule_button mx-auto mt-3 mb-4">
              View Schedule
            </Button> */}
          </Col>
          <Col className="px-4 d-flex flex-column h-100">
            <Card
              className="mt-2 text-center home_calendar mb-4"
              style={{ width: "100%", height: "50%" }}
            >
              <Card.Body>
                <Calendar
                  onClickDay={(value, event) => moveToSchedule(value, event)}
                  tileClassName="position-relative"
                  tileContent={({ activeStartDate, date, view }) =>
                    props.tasks.map((task, i) =>
                      view === "month" && compareDates(task.date, date) ? (
                        <span
                          style={{
                            backgroundColor: randomColor({
                              luminosity: "dark",
                            }),
                          }}
                          className="homecalendar_task_dot p-0 m-0"
                          key={task.id}
                        ></span>
                      ) : null
                    )
                  }
                  prev2Label={null}
                  next2Label={null}
                  nextLabel={<IoIosArrowForward size={22} />}
                  prevLabel={<IoIosArrowBack size={22} />}
                  className="m-auto"
                />
              </Card.Body>
            </Card>
            {/* <Button className="home_schedule_button mx-auto mt-3 mb-4">
              View Calendar
            </Button> */}
            <div>
              <h4 className="home_goals_goalsheadertext">
                <Link to="/goals">Goals</Link>
              </h4>

              <div className="d-flex flex-column">
                {props.goals
                  ? props.goals.map((goal, i) =>
                      i < 3 ? (
                        <Card
                          className="mt-0 home_goals mt-3"
                          style={{ width: "100%", height: "100px" }}
                          key={goal.id}
                        >
                          <Card.Body className="home_goals_goalbody d-flex">
                            <div
                              style={{ backgroundColor: "#" + goal.colour }}
                              className={"home_goals_cardcolor_1 my-auto mr-3"}
                            ></div>
                            <div>
                              <Card.Text className="home_goals_goaltag mb-2">
                                {goal.tag}
                              </Card.Text>
                              <Card.Title className="home_goals_goaltext mb-3">
                                {goal.goal}
                              </Card.Title>
                              <Card.Text className="home_goals_goaldeadline">
                                {dateFormat(goal.enddate) + " Deadline"}
                              </Card.Text>
                            </div>
                            <div
                              className="ml-auto mr-3"
                              style={{ width: "80px", height: "80px" }}
                            >
                              <CircularProgressbar
                                value={goal.percentage}
                                text={`${Math.round(goal.percentage)}%`}
                                styles={{
                                  path: { stroke: "#" + goal.colour },
                                }}
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
