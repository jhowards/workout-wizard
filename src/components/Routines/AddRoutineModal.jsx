import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TimePicker, DatePicker, Select } from "antd";
import "../../css/Modals.css";
import { format } from "date-fns";
import { connect } from "react-redux";
import { addRoutineAction, addRoutineTasksAction } from "../../actions";
import moment from "moment";
import IconPicker from "../Schedule/Modals/IconPicker";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  addRoutineTasks: (taskToAdd) => dispatch(addRoutineTasksAction(taskToAdd)),
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
  const [selectedIcon, setselectedIcon] = useState("");
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
    settimeToSet(false);
    setroutineType("Daily");
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

  const RoutineTasksAdd = (taskToAdd) => {
    let addRoutinesNewArray = [...props.tasks];
    const newRoutineID = Date.now();

    if (taskToAdd.repetition === "Daily") {
      let routineObjectToAdd = { ...taskToAdd };

      for (let i = 0; i < 365; i++) {
        if (i > 0) {
          let newRoutineObject = { ...routineObjectToAdd };
          let newdate = addDays(routineObjectToAdd.date, i);
          newRoutineObject.date = format(newdate, "P");
          newRoutineObject.id = newRoutineID + (i + 1);
          addRoutinesNewArray.push(newRoutineObject);
        } else {
          let newRoutineFirstObject = { ...routineObjectToAdd };
          newRoutineFirstObject.date = format(newRoutineFirstObject.date, "P");
          addRoutinesNewArray.push(newRoutineFirstObject);
        }
      }
    }

    if (taskToAdd.repetition === "Weekly") {
      let routineObjectToAdd = { ...taskToAdd };

      for (let i = 0; i < 52; i++) {
        if (i > 0) {
          let newRoutineObject = { ...routineObjectToAdd };
          let newdate = addWeeks(routineObjectToAdd.date, i);
          newRoutineObject.date = format(newdate, "P");
          newRoutineObject.id = newRoutineID + (i + 1);
          addRoutinesNewArray.push(newRoutineObject);
        } else {
          let newRoutineFirstObject = { ...routineObjectToAdd };
          newRoutineFirstObject.date = format(newRoutineFirstObject.date, "P");
          addRoutinesNewArray.push(newRoutineFirstObject);
        }
      }
    }

    if (taskToAdd.repetition === "Monthly") {
      let routineObjectToAdd = { ...taskToAdd };

      for (let i = 0; i < 12; i++) {
        if (i > 0) {
          let newRoutineObject = { ...routineObjectToAdd };
          let newdate = addMonths(routineObjectToAdd.date, i);
          newRoutineObject.date = format(newdate, "P");
          newRoutineObject.id = newRoutineID + (i + 1);
          addRoutinesNewArray.push(newRoutineObject);
        } else {
          let newRoutineFirstObject = { ...routineObjectToAdd };
          newRoutineFirstObject.date = format(newRoutineFirstObject.date, "P");
          addRoutinesNewArray.push(newRoutineFirstObject);
        }
      }
    }
    return addRoutinesNewArray;
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

        let icon = "";
        if (selectedIcon === "") {
          alert("Please select an icon!");
          return;
        } else {
          icon = selectedIcon;
        }

        let fullduration = hourstomins + minutes;
        let routineid = Date.now();
        let formatDate = format(selectedDate, "P");
        let staticTimeToAdd = "";
        if (timeToSet) {
          if (timeSelected === "") {
            staticTimeToAdd = "12:00";
          } else {
            staticTimeToAdd = format(timeSelected, "HH:mm");
          }
        }

        let taskToAddnew = {
          id: routineid,
          archived: false,
          task: taskToAdd.task,
          duration: fullduration,
          starttime: staticTimeToAdd,
          endtime: "",
          staticTime: timeToSet,
          active: false,
          date: selectedDate,
          routineid: routineid,
          repetition: routineType,
          icon: icon,
          daily: "true",
        };
        let generateTasks = RoutineTasksAdd(taskToAddnew);
        let routineToAddNew = {
          id: routineid,
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
          props.addRoutineTasks(generateTasks);
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
                label={<s>Set a time?</s>}
                className="mt-1 mr-3"
                size="lg"
                onChange={(e) => handleCheckInput(e)}
              />

              <TimePicker
                defaultValue={moment("12:00", timeformat)}
                format={timeformat}
                allowClear={false}
                className="w-25"
                // disabled={!timeToSet}
                disabled={true}
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
            Add Routine
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoutineModal);
