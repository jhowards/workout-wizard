import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DatePicker } from "antd";
import "../../../css/Modals.css";
import { format } from "date-fns";
import moment from "moment";
import IconPicker from "./IconPicker";

import { connect } from "react-redux";
import { addTaskAction } from "../../../actions";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (taskToAdd) => dispatch(addTaskAction(taskToAdd)),
});

const AddTaskModal = (props) => {
  const [taskToAdd, settaskToAdd] = useState({
    task: "",
    durationhr: null,
    durationmin: null,
  });

  const [show, setShow] = useState(false);
  const [selectedDate, setselectedDate] = useState(props.activeDate);
  const [selectedIcon, setselectedIcon] = useState("");
  const handleClose = () => {
    settaskToAdd((prevState) => {
      return {
        ...prevState,
        task: "",
        durationhr: null,
        durationmin: null,
      };
    });
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setselectedDate(props.activeDate);
  };

  function dateChange(date) {
    if (date !== null) {
      setselectedDate(date._d);
    } else {
      setselectedDate("");
    }
  }

  const handleInput = (e, propertyName) => {
    settaskToAdd({
      ...taskToAdd,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hourstomins = null;
    let minutes = null;

    if (taskToAdd.task === "") {
      alert("Please input a task!");
    } else {
      if (taskToAdd.durationhr === null && taskToAdd.durationmin === null) {
        alert("Please input a duration!");
      } else {
        if (taskToAdd.durationhr === "" || taskToAdd.durationhr === null) {
          hourstomins = 0;
        } else {
          hourstomins = parseInt(taskToAdd.durationhr) * 60;
        }
        if (taskToAdd.durationmin === "" || taskToAdd.durationmin === null) {
          minutes = 0;
        } else {
          minutes = parseInt(taskToAdd.durationmin);
        }

        let fullduration = hourstomins + minutes;
        let id = Date.now();

        // if (props.tasks) {
        //   id = props.tasks.length + 2;
        // } else {
        //   id = 1;
        // }

        let formatDate = format(selectedDate, "P");
        let icon = "";
        if (selectedIcon === "") {
          alert("Please select an icon!");
          return;
        } else {
          icon = selectedIcon;
        }
        console.log(icon);

        let taskToAddnew = {
          id: id,
          archived: false,
          daily: false,
          task: taskToAdd.task,
          duration: fullduration,
          starttime: "",
          endtime: "",
          staticTime: false,
          active: false,
          date: formatDate,
          icon: icon,
          routineid: "",
        };

        console.log(taskToAddnew);
        if (fullduration === 0) {
          alert("Please add a duration!");
        } else {
          props.addTask(taskToAddnew);
          handleClose();
        }
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="schedule_activeschedule_headings_autoschedule px-3 py-2 mb-1 mr-3"
      >
        <FaPlus
          size={20}
          className="schedule_activeschedule_headings_addtask mr-2"
        />
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} centered className="addtaskmodal">
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addTaskForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Task Name</small>
              </Form.Label>
              <Form.Control
                className="border border-dark"
                size="sm"
                type="text"
                placeholder="Ex: Walk the dog"
                onChange={(e) => handleInput(e, "task")}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0 d-block">
                <small>Date</small>
              </Form.Label>
              <DatePicker
                defaultValue={moment(selectedDate, "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
                onChange={dateChange}
                className="border border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Duration</small>
              </Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  className="border border-dark durationform mr-3"
                  size="sm"
                  type="number"
                  min="0"
                  max="23"
                  placeholder="hours"
                  onChange={(e) => handleInput(e, "durationhr")}
                />
                <Form.Control
                  className="border border-dark durationform"
                  size="sm"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="minutes"
                  onChange={(e) => handleInput(e, "durationmin")}
                />
              </div>
            </Form.Group>
            <Form.Label className="mb-0 d-block">
              <small>Icon</small>
            </Form.Label>
            <IconPicker setselectedIcon={setselectedIcon} />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="addTaskButton" type="submit" form="addTaskForm">
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
