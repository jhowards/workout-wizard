import React from "react";
import SideBar from "../../components/SideBar";
import "../../css/Schedule.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import ScheduleHeadings from "./ScheduleHeadings";
import AddTaskModal from "./Modals/AddTaskModal";
import Tasks from "./Tasks";
import { connect } from "react-redux";
import { useEffect } from "react";
import { removeDateAction } from "../../actions";
import AutoSchedule from "./Modals/AutoSchedule";

const mapStateToProps = (state) => ({
  date: state.homeCalendarDate,
});

const mapDispatchToProps = (dispatch) => ({
  removeDate: (i) => dispatch(removeDateAction(i)),
});

const Schedule = (props) => {
  const [activeDate, setactiveDate] = useState(new Date());
  const todaysDate = new Date();

  useEffect(() => {
    if (props.date !== "") {
      let formatDate = new Date(props.date);
      setactiveDate(formatDate);
      props.removeDate(1);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 ">
        <Container className="schedule_container_large px-3">
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
                <AutoSchedule activeDate={activeDate} />
              </div>
            </div>

            <Tasks date={activeDate} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
