import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../../../css/Modals.css";
import { connect } from "react-redux";
import moment from "moment";
import { TimePicker } from "antd";
import format from "date-fns/format";
import addMinutes from "date-fns/addMinutes";
import { autoScheduleAction } from "../../../actions";
import isAfter from "date-fns/isAfter";
import { roundToNearestMinutes } from "date-fns";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  autoScheduleTasks: (tasksToSchedule) =>
    dispatch(autoScheduleAction(tasksToSchedule)),
});

const AutoSchedule = (props) => {
  const currenttime = new Date();
  let defaultEnd = new Date();
  defaultEnd.setHours(23);
  defaultEnd.setMinutes(59);
  defaultEnd.setSeconds(0);
  let startDatecheck = new Date();
  if (currenttime.toDateString() === props.activeDate.toDateString()) {
    startDatecheck = roundToNearestMinutes(new Date(), { nearestTo: 5 });
  } else {
    startDatecheck = new Date();
    startDatecheck.setHours(9);
    startDatecheck.setMinutes(0);
    startDatecheck.setSeconds(0);
  }

  const [startTime, setstartTime] = useState(startDatecheck);
  // const formatcurrenttime = format(currenttime, "HH:mm");
  const [endTime, setendTime] = useState(defaultEnd);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setstartTime(startDatecheck);
  };

  const handleStartInput = (value) => {
    setstartTime(value._d);
  };

  const handleEndInput = (value) => {
    setendTime(value._d);
  };

  const disabledHoursSelect = () => {
    var hours = [];
    if (currenttime.toDateString() === props.activeDate.toDateString()) {
      for (var i = 0; i < moment().hour(); i++) {
        hours.push(i);
      }
    }

    return hours;
  };

  const disabledMinutesSelect = (selectedHour) => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formatCurrentDate = format(props.activeDate, "P");

    let items = Array.from(props.tasks);

    const formatstarttime = format(startTime, "HH:mm");

    let newTime = startTime;
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].archived === true) {
        items[i].starttime = "";
        items[i].endtime = "";
        items.push(items.splice(items.indexOf(items[i]), 1)[0]);
      }
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].archived === true) {
        items[i].starttime = "";
        items[i].endtime = "";
        items.push(items.splice(items.indexOf(items[i]), 1)[0]);
      }
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].date === formatCurrentDate) {
        // -- ONLY SELECTED DATE --
        if (items[i].archived === false) {
          // -- ONLY TASKS THAT AREN'T ARCHIVED --
          if (count === 0) {
            // if(items[i].starttime === "")
            items[i].starttime = formatstarttime;
            newTime = addMinutes(newTime, items[i].duration);
            const formatEndTime = format(newTime, "HH:mm");
            if (isAfter(newTime, endTime)) {
              alert("Error! Not enough time available to schedule all tasks.");
              return;
            }
            items[i].endtime = formatEndTime;
            items[i].active = true;
            count++;
          } else {
            items[i].starttime = format(newTime, "HH:mm");
            newTime = addMinutes(newTime, items[i].duration);
            if (isAfter(newTime, endTime)) {
              alert("Error! Not enough time available to schedule all tasks.");
              return;
            }
            items[i].endtime = format(newTime, "HH:mm");
            items[i].active = false;
          }
        }
      }
    }

    props.autoScheduleTasks(items);
    handleClose();
  };

  const timeformat = "HH:mm";
  return (
    <>
      <Button
        onClick={handleShow}
        className="schedule_activeschedule_headings_autoschedule px-3 py-2 mr-5 mb-1"
      >
        Auto Schedule
      </Button>

      <Modal show={show} onHide={handleClose} className="addtaskmodal" centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal_maintitle ml-2">
            Auto Schedule
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="autoScheduleForm"
            onSubmit={handleSubmit}
            className="text-center"
          >
            <Form.Group className="mb-2">
              <Form.Label className="mb-0 mr-3">
                <small className="auto_timepicker_label modal_form_heading">
                  Start Time:
                </small>
              </Form.Label>
              <TimePicker
                defaultValue={moment(startDatecheck, timeformat)}
                format={timeformat}
                allowClear={false}
                className="w-25"
                minuteStep={5}
                disabledHours={() => disabledHoursSelect()}
                disabledMinutes={(selectedHour) =>
                  disabledMinutesSelect(selectedHour)
                }
                onChange={(time) => handleStartInput(time)}
                hideDisabledOptions={true}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0 mr-3 ml-2">
                <small className="auto_timepicker_label modal_form_heading">
                  End Time:
                </small>
              </Form.Label>
              <TimePicker
                defaultValue={moment("23:59", timeformat)}
                format={timeformat}
                allowClear={false}
                className="w-25"
                minuteStep={5}
                onChange={(time) => handleEndInput(time)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            className="scheduleButton mx-auto"
            type="submit"
            form="autoScheduleForm"
          >
            Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoSchedule);
