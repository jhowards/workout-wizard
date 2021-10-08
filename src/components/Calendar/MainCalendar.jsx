import React from "react";
import Calendar from "react-awesome-calendar";
import SideBar from "../SideBar";
import "../Calendar/MainCalendar.css";
import { connect } from "react-redux";
import randomColor from "randomcolor";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const MainCalendar = (props) => {
  // const events = [
  //   {
  //     id: 1,
  //     color: "#fd3153",
  //     from: "2021-10-10T18:00:00+00:00",
  //     to: "2021-10-10T18:00:00+00:00",
  //     title: "This is an event",
  //   },

  let tasksArray = [...props.tasks];
  tasksArray = tasksArray.map((task) => {
    return {
      id: task.id,
      color: randomColor({ hue: "blue", luminosity: "dark" }),
      from: new Date(task.date).toString(),
      to: new Date(task.date).toString(),
      title: task.task,
    };
  });
  console.log(tasksArray);

  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 px-lg-5 bg-light">
        <Calendar events={tasksArray} className="calendartest h-100 w-100" />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(MainCalendar);
