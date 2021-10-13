import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TimePicker, DatePicker, Select } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Modals.css";
import { format } from "date-fns";
import { connect } from "react-redux";
import { addRoutineAction, addTaskAction } from "../../actions";
import moment from "moment";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (taskToAdd) => dispatch(addTaskAction(taskToAdd)),
  addRoutine: (routineToAdd) => dispatch(addRoutineAction(routineToAdd)),
});

const AddRoutineModal = (props) => {
  const { Option } = Select;

  const [taskToAdd, settaskToAdd] = useState({
    task: "",
    durationhr: null,
    durationmin: null,
  });
  const [timeToSet, settimeToSet] = useState(false);
  const [timeSelected, settimeSelected] = useState("");
  const [routineType, setroutineType] = useState("Daily");

  const [show, setShow] = useState(false);
  const [selectedDate, setselectedDate] = useState(new Date());
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
    setselectedDate(new Date());
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
  const handleCheckInput = (e) => {
    settimeToSet(e.target.checked);
  };

  const handleSelectInput = (value) => {
    setroutineType(value);
  };

  const handleTimeInput = (value) => {
    settimeSelected(value._d);
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

        // let taskToAddnew = {
        //   id: id,
        //   archived: false,
        //   daily: false,
        //   task: taskToAdd.task,
        //   duration: fullduration,
        //   starttime: "",
        //   endtime: "",
        //   staticTime: timeToSet,
        //   active: false,
        //   date: formatDate,
        //    routineid:
        // };

        let routineToAddNew = {
          id: "r" + id,
          repetition: routineType,
          task: taskToAdd.task,
          duration: fullduration,
          starttime: timeSelected,
          staticTime: timeToSet,
          date: formatDate,
        };

        if (fullduration === 0) {
          alert("Please add a duration!");
        } else {
          props.addRoutine(routineToAddNew);
          handleClose();
        }
      }
    }
  };
  const timeformat = "HH:mm";
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
        Add Routine
      </Button>

      <Modal show={show} onHide={handleClose} centered className="addtaskmodal">
        <Modal.Header closeButton>
          <Modal.Title>Add Routine</Modal.Title>
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

            <Form.Group className="mb-4">
              <Form.Label className="mb-0">
                <small>Duration</small>
              </Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  className="border border-dark durationform mr-3"
                  size="sm"
                  type="number"
                  min="0"
                  placeholder="hours"
                  onChange={(e) => handleInput(e, "durationhr")}
                />
                <Form.Control
                  className="border border-dark durationform"
                  size="sm"
                  type="number"
                  min="0"
                  placeholder="minutes"
                  onChange={(e) => handleInput(e, "durationmin")}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-0">
                <p className="mr-3">Set Start Date</p>
              </Form.Label>
              <DatePicker
                defaultValue={moment(selectedDate, "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
                onChange={dateChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-4 d-flex flex-row"
              controlId="formWorkingCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="Set a time?"
                className="mt-1 mr-3"
                size="lg"
                onChange={(e) => handleCheckInput(e)}
              />

              <TimePicker
                defaultValue={moment("12:00", timeformat)}
                format={timeformat}
                allowClear={false}
                className="w-25"
                disabled={!timeToSet}
                onChange={(time) => handleTimeInput(time)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <p className="mr-3">Set Repetition</p>
              </Form.Label>
              <Select
                defaultValue="Daily"
                onChange={handleSelectInput}
                style={{ width: 120 }}
              >
                <Option value="Daily">Daily</Option>
                <Option value="Weekly">Weekly</Option>
                <Option value="Monthly">Monthly</Option>
              </Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="addTaskButton" type="submit" form="addTaskForm">
            Add Routine
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoutineModal);
