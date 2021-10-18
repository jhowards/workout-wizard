import React from "react";
import Calendar from "react-awesome-calendar";
import SideBar from "../SideBar";
import "../Calendar/MainCalendar.css";
import { connect } from "react-redux";
import randomColor from "randomcolor";
import { setDateAction } from "../../actions";
import addHours from "date-fns/addHours";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDateAction(date)),
});

const MainCalendar = (props) => {
  const moveToSchedule = (event) => {
    let taskDate = props.tasks.filter((el) => el.id === event);
    let dateToPass = new Date(taskDate[0].date);
    console.log(dateToPass);
    props.setDate(dateToPass);
    props.history.push("/schedule");
  };

  // const events = [
  //   {
  //     id: 1,
  //     color: "#fd3153",
  //     from: "2021-10-10T18:00:00+00:00",
  //     to: "2021-10-10T18:00:00+00:00",
  //     title: "This is an event",
  //   },

  const addTimetoDate = (date, time) => {
    const hr = time.slice(0, 2);
    const min = time.slice(3);
    let formatTime = new Date(date);
    formatTime.setHours(hr);
    formatTime.setMinutes(min);
    return formatTime;
  };
  let tasksArray = [...props.tasks];
  tasksArray = tasksArray.map((task) => {
    const fromTimeGMT = addTimetoDate(task.date, task.starttime);
    const endTimeGMT = addTimetoDate(task.date, task.endtime);
    const fromTimeUTC = addHours(fromTimeGMT, 1);
    const endTimeUTC = addHours(endTimeGMT, 1);

    return {
      id: task.id,
      color: randomColor({ hue: "blue", luminosity: "dark" }),
      // from: new Date(task.date).toString(),
      // to: new Date(task.date).toString(),
      from: fromTimeUTC.toUTCString(),
      to: endTimeUTC.toUTCString(),
      title: task.task,
    };
  });
  console.log(tasksArray);

  return (
    <div className="d-flex h-100 mainwrapper">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 bg-light">
        <div className="mx-lg-5">
          <Calendar
            onClickEvent={(event) => moveToSchedule(event)}
            events={tasksArray}
            className="calendartest h-100 w-100 "
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCalendar);
