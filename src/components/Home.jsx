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

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const Home = (props) => {
  const date = new Date();
  let formatCurrentDate = format(date, "P");
  let todaysDateArray = props.tasks.filter(
    (el) => el.date === formatCurrentDate && el.archived === false
  );
  const arrlength = todaysDateArray.length;

  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="h-100 w-100 home_mainbody py-lg-3 px-lg-5">
        <Row xs={1} md={2} className="g-2 h-100">
          <Col className="px-4 d-flex flex-column h-100">
            <Card
              className="home_dailyheader mb-3 mt-4"
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
                    <Card.Text className="home_dailyheader_taskstext">
                      You've got {arrlength} remaining tasks today.
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
            <Card className="h-100 home_schedule" style={{ width: "100%" }}>
              <HomeSchedule />
            </Card>
            {/* <Button className="home_schedule_button mx-auto mt-3 mb-4">
              View Schedule
            </Button> */}
          </Col>
          <Col className="px-4 d-flex flex-column h-100 justify-content-between">
            <Card
              className="mt-4 text-center home_calendar mb-4"
              style={{ width: "100%", height: "50%" }}
            >
              <Card.Body>
                <Calendar
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
              <Link to="/goals">
                <h4>Goals</h4>
              </Link>
              <div className="d-flex flex-column">
                <Card
                  className="mt-0 home_goals"
                  style={{ width: "100%", height: "90px" }}
                >
                  <Card.Body className="home_goals_goalbody d-flex">
                    <div className="home_goals_cardcolor_1 my-auto mr-3"></div>
                    <div>
                      <Card.Text className="home_goals_goaltag mb-1">
                        Reading
                      </Card.Text>
                      <Card.Title className="home_goals_goaltext mb-2">
                        Finish Self Help Book
                      </Card.Title>
                      <Card.Text className="home_goals_goaldeadline">
                        November Deadline
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
                <Card
                  className="mt-2 home_goals"
                  style={{ width: "100%", height: "90px" }}
                >
                  <Card.Body className="home_goals_goalbody d-flex">
                    <div className="home_goals_cardcolor_2 my-auto mr-3"></div>
                    <div>
                      <Card.Text className="home_goals_goaltag mb-1"></Card.Text>
                      <Card.Title className="home_goals_goaltext mb-2"></Card.Title>
                      <Card.Text className="home_goals_goaldeadline"></Card.Text>
                    </div>
                  </Card.Body>
                </Card>
                <Card
                  className="mt-2 home_goals"
                  style={{ width: "100%", height: "90px" }}
                >
                  <Card.Body className="home_goals_goalbody d-flex">
                    <div className="home_goals_cardcolor_3 my-auto mr-3"></div>
                    <div>
                      <Card.Text className="home_goals_goaltag mb-1"></Card.Text>
                      <Card.Title className="home_goals_goaltext mb-2"></Card.Title>
                      <Card.Text className="home_goals_goaldeadline"></Card.Text>
                    </div>
                  </Card.Body>
                </Card>
                {/* <Button className="home_schedule_button mx-auto mt-3 mb-4">
                  View Goals
                </Button> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Home);
