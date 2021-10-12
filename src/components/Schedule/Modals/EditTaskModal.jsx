import React from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/Modals.css";
import { format } from "date-fns";
import { connect } from "react-redux";
import { editTaskAction } from "../../../actions";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  editTask: (taskToEdit) => dispatch(editTaskAction(taskToEdit)),
});

const EditTaskModal = (props) => {
  const [taskToAdd, settaskToAdd] = useState({
    task: "",
    durationhr: null,
    durationmin: null,
  });

  const [selectedTask, setselectedTask] = useState("");
  const [selectedDurationhr, setselectedDurationhr] = useState(null);
  const [selectedDurationmin, setselectedDurationmin] = useState(null);
  const [selectedDate, setselectedDate] = useState(new Date());
  const [taskDetails, settaskDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    const index = props.tasks.findIndex((task) => task.id === props.taskid);
    setselectedTask(props.tasks[index].task);
    durationConvert(props.tasks[index].duration, index);
    let convertedDate = new Date(props.tasks[index].date);
    setselectedDate(convertedDate);
    setShow(true);
    settaskDetails(props.tasks[index]);
  };

  const durationConvert = (duration, index) => {
    let minutes = Math.floor(duration % 60);
    let hours = Math.floor(duration / 60);
    setselectedDurationhr(hours);
    setselectedDurationmin(minutes);
    settaskToAdd({
      task: props.tasks[index].task,
      durationhr: hours,
      durationmin: minutes,
    });
  };

  function dateChange(selectedDate) {
    setselectedDate(selectedDate);
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

        // if (props.tasks) {
        //   id = props.tasks.length + 2;
        // } else {
        //   id = 1;
        // }

        let formatDate = format(selectedDate, "P");

        let fullTaskToEdit = {
          id: taskDetails.id,
          task: taskToAdd.task,
          duration: fullduration,
          date: formatDate,
        };
        console.log(fullTaskToEdit);
        if (fullduration === 0) {
          alert("Please add a duration!");
        } else {
          props.editTask(fullTaskToEdit);
          handleClose();
        }
      }
    }
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow} eventKey="1">
        <span>Edit Task</span>
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose} className="addtaskmodal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editTaskForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Task Name</small>
              </Form.Label>
              <Form.Control
                className="border border-dark"
                size="sm"
                type="text"
                placeholder="Ex: Walk the dog"
                defaultValue={selectedTask}
                onChange={(e) => handleInput(e, "task")}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Date</small>
              </Form.Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                selected={selectedDate}
                onChange={dateChange}
                todayButton="Today"
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
                  placeholder="hours"
                  defaultValue={selectedDurationhr}
                  onChange={(e) => handleInput(e, "durationhr")}
                />
                <Form.Control
                  className="border border-dark durationform"
                  size="sm"
                  type="number"
                  min="0"
                  placeholder="minutes"
                  defaultValue={selectedDurationmin}
                  onChange={(e) => handleInput(e, "durationmin")}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="addTaskButton" type="submit" form="editTaskForm">
            Edit Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
