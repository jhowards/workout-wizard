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
        <Modal.Header className="py-2 mt-1" closeButton>
          <Modal.Title className="modal_maintitle">
            <FaPlus className=" ml-2 mr-2 align-middle mb-1" />
            Add Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addTaskForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1 modal_form_heading">
                Task Name
              </Form.Label>
              <Form.Control
                className="modal_form_border"
                type="text"
                maxlength="40"
                minlength="2"
                placeholder="Ex: Walk the dog"
                onChange={(e) => handleInput(e, "task")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1 modal_form_heading d-block">
                Set a date
              </Form.Label>
              <DatePicker
                defaultValue={moment(selectedDate, "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
                onChange={dateChange}
                className="modal_form_border modal_form_datepicker"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1 modal_form_heading">
                Duration
              </Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  className="modal_form_border durationform mr-3"
                  type="number"
                  min="0"
                  max="23"
                  placeholder="hours"
                  onChange={(e) => handleInput(e, "durationhr")}
                />
                <Form.Control
                  className="modal_form_border durationform"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="minutes"
                  onChange={(e) => handleInput(e, "durationmin")}
                />
              </div>
            </Form.Group>
            <Form.Label className="mb-1 modal_form_heading d-block">
              Set an icon
            </Form.Label>
            <IconPicker setselectedIcon={setselectedIcon} />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button onClick={handleClose} className="cancel_button">
            Cancel
          </Button>
          <Button
            className="add_task_button ml-2"
            type="submit"
            form="addTaskForm"
          >
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
