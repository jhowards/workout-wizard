import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const Schedule = () => {
  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="w-100 schedule_mainbody py-lg-3 px-lg-5">
        <Container className="schedule_container_large">
          <div className="schedule_heading text-center mt-3 mb-2">
            <p className="schedule_weekday mb-0">Wednesday</p>
            <p className="schedule_headingdate">24th October 2021</p>
            <div className="schedule_todaybadge px-4 py-2">Today</div>
          </div>
          <div className="schedule_dayselector d-flex justify-content-center mt-3 mb-1">
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">S</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">21</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">M</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">22</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">T</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">23</p>
            </div>
            <div className="schedule_dayselector_day_active my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter_active">
                W
              </p>
              <p className="mt-1 schedule_dayselector_day_daynumber_active">
                24
              </p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">T</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">25</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">F</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">26</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">S</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">27</p>
            </div>
          </div>
          <hr className="linebreak mb-3" />
          <div className="schedule_activeschedule w-100">
            <div className="schedule_activeschedule_headings d-flex flex-row justify-content-between mx-5">
              <div className="d-flex flex-row justify-content-between w-25 mx-5">
                <span>Time</span>
                <span>Task</span>
              </div>
              <div>
                <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-1 mr-3">
                  <FaPlus
                    size={20}
                    className="schedule_activeschedule_headings_addtask mr-2"
                  />
                  Add Task
                </Button>
                <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mr-5 mb-1">
                  Auto Schedule
                </Button>
              </div>
            </div>
            <div className="schedule_activeschedule_body mt-2">
              <Row className="mx-0">
                <Col
                  xs={2}
                  className="schedule_activeschedule_body_times mt-3 pl-5 pr-0"
                >
                  <div className="d-flex flex-column schedule_activeschedule_body_times_margins">
                    <div className="mb-5">
                      <p className="mb-0 schedule_activeschedule_body_times_largetime">
                        6:30am
                      </p>
                      <p className="schedule_activeschedule_body_times_smalltime">
                        7:00am
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="mb-0 schedule_activeschedule_body_times_largetime">
                        7:00am
                      </p>
                      <p className="schedule_activeschedule_body_times_smalltime">
                        7:40am
                      </p>
                    </div>
                  </div>
                </Col>

                <Col
                  xs={10}
                  className="schedule_activeschedule_body_tasks d-flex flex-row px-0"
                >
                  <div className="schedule_activeschedule_body_divider ml-5 mr-5"></div>
                  <div className="d-flex flex-column w-100 mr-5">
                    <div className="schedule_activeschedule_body_taskcontent">
                      <Row className="mx-0 h-100 position-relative">
                        <Col className="px-4 d-flex" xs={1}>
                          <Form.Check
                            custom
                            type="checkbox"
                            id="test"
                            className="m-auto"
                          />
                        </Col>
                        <Col className="px-4 mt-2" xs={11}>
                          <s className="schedule_activeschedule_body_taskcontent_tasktext mb-0 d-block">
                            Wake up and get ready
                          </s>
                          <s className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0 d-block">
                            {"30m -> 7:00am"}
                          </s>
                          <s className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1 d-block">
                            Daily
                          </s>
                          <BsThreeDotsVertical
                            size={26}
                            className="schedule_activeschedule_body_taskcontent_edittask"
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className="schedule_activeschedule_body_taskcontent_active mt-3">
                      <Row className="mx-0 h-100">
                        <Col className="position-relative" xs={2}>
                          <Form.Check
                            custom
                            type="checkbox"
                            id="test2"
                            className="testtt"
                          />
                        </Col>
                        <Col className="px-0 mt-2" xs={10}>
                          <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0">
                            Morning Exercise{" "}
                          </p>
                          <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0">
                            {"40m -> 7:40am"}
                          </p>
                          <div className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1">
                            Daily
                          </div>
                          <BsThreeDotsVertical
                            size={26}
                            className="schedule_activeschedule_body_taskcontent_edittask"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Schedule;
