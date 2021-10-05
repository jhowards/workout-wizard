import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import ScheduleHeadings from "./ScheduleHeadings";
import AddTaskModal from "./AddTaskModal";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import Tasks from "./Tasks";

const Schedule = () => {
  const [activeDate, setactiveDate] = useState(new Date());
  const [todaysDate, settodaysDate] = useState(new Date());

  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 px-lg-5">
        <Container className="schedule_container_large">
          <ScheduleHeadings
            activeDate={activeDate}
            setactiveDate={setactiveDate}
            todaysDate={todaysDate}
          />
          <hr className="linebreak mb-3" />
          <div className="schedule_activeschedule w-100">
            <div className="schedule_activeschedule_headings d-flex flex-row justify-content-between mx-5">
              <div className="d-flex flex-row justify-content-between w-25 mx-5">
                <span>Time</span>
                <span>Task</span>
              </div>
              <div>
                <AddTaskModal activeDate={activeDate} />
                <Button className="schedule_activeschedule_headings_autoschedule px-3 py-2 mr-5 mb-1">
                  Auto Schedule
                </Button>
              </div>
            </div>

            <Tasks date={activeDate} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Schedule;
