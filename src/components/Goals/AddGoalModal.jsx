import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import moment from "moment";
import { format } from "date-fns";
import { connect } from "react-redux";
import { addGoalAction } from "../../actions";
import { DatePicker } from "antd";

const mapStateToProps = (state) => ({
  goals: state.goals,
});

const mapDispatchToProps = (dispatch) => ({
  addGoal: (goalToAdd) => dispatch(addGoalAction(goalToAdd)),
});

const AddGoalModal = (props) => {
  const [goalToAdd, setgoalToAdd] = useState({});
  const [subTasksToAdd, setsubTasksToAdd] = useState({});

  const [show, setShow] = useState(false);
  const [formCount, setformCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const handleClose = () => {
    setShow(false);
    setgoalToAdd({});
    setsubTasksToAdd({});
    setformCount(0);
  };
  const handleShow = () => {
    setShow(true);
    setStartDate(new Date());
  };

  function dateChange(date) {
    if (date !== null) {
      setStartDate(date._d);
    } else {
      setStartDate("");
    }
  }

  const handleInput = (e, propertyName) => {
    setgoalToAdd({
      ...goalToAdd,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const handleSubInput = (e, propertyName) => {
    setsubTasksToAdd({
      ...subTasksToAdd,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const formAdd = () => {
    setformCount(formCount + 1);
  };

  const formRemove = () => {
    setformCount(formCount - 1);
    let removesubtask = subTasksToAdd;
    let keys = Object.keys(removesubtask);
    delete removesubtask[keys[keys.length - 1]];
    setsubTasksToAdd(removesubtask);
  };

  function getColour(num) {
    var colours = {
      0: "28a745",
      1: "ffc107",
      2: "17a2b8",
      3: "dc3545",
      default: "007bff",
    };
    return colours[num] || colours["default"];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formatDate = format(startDate, "P");
    let id = "g" + Date.now();
    // setgoalToAdd({
    //   ...goalToAdd,
    //   completed: false,
    //   enddate: formatDate,
    //   id: id,
    // });

    let chosenColor = getColour(props.goals.length);
    let goalToAddFinal = goalToAdd;
    goalToAddFinal.completed = false;
    goalToAddFinal.enddate = formatDate;
    goalToAddFinal.id = id;
    goalToAddFinal.percentage = 0;
    goalToAddFinal.colour = chosenColor;
    goalToAddFinal.subtasks = subTasksToAdd;
    goalToAddFinal.count = -1;
    props.addGoal(goalToAddFinal);
    handleClose();

    // if (taskToAdd.task === "") {
    //   alert("Please input a task!");
    // } else {
    //   if (taskToAdd.durationhr === null && taskToAdd.durationmin === null) {
    //     alert("Please input a duration!");
    //   } else {
    //     if (taskToAdd.durationhr === "" || taskToAdd.durationhr === null) {
    //       hourstomins = 0;
    //     } else {
    //       hourstomins = parseInt(taskToAdd.durationhr) * 60;
    //     }
    //     if (taskToAdd.durationmin === "" || taskToAdd.durationmin === null) {
    //       minutes = 0;
    //     } else {
    //       minutes = parseInt(taskToAdd.durationmin);
    //     }

    //     console.log(taskToAddnew);
    //     if (fullduration === 0) {
    //       alert("Please add a duration!");
    //     } else {
    //       props.addTask(taskToAddnew);
    //       handleClose();
    //     }
    //   }
    // }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="goals_addeditgoalbutton px-3 py-2 mb-1 mr-3"
      >
        <FaPlus
          size={20}
          className="schedule_activeschedule_headings_addtask mr-2"
        />
        Add a Goal
      </Button>

      <Modal show={show} onHide={handleClose} className="addtaskmodal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addTaskForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Goal Name</small>
              </Form.Label>
              <Form.Control
                className="border border-dark"
                size="sm"
                type="text"
                placeholder="Ex: Walk the dog"
                onChange={(e) => handleInput(e, "goal")}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Tag</small>
              </Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  className="border border-dark durationform mr-3"
                  size="sm"
                  type="text"
                  min="0"
                  placeholder="Ex. Reading"
                  onChange={(e) => handleInput(e, "tag")}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0 d-block">
                <small>Due Date</small>
              </Form.Label>
              <DatePicker
                defaultValue={moment(startDate, "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
                onChange={dateChange}
                className="border border-dark"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="mb-0">
                <small>Subtasks:</small>
              </Form.Label>
              <div className="d-flex flex-row mb-3">
                <Form.Control
                  className="border border-dark durationform mr-3"
                  size="sm"
                  type="text"
                  min="0"
                  placeholder="Ex. Chapter 1"
                  onChange={(e) => handleSubInput(e, "subtask1")}
                />
                <div type="button" onClick={(e) => formAdd()}>
                  <FaPlus size={22} className="mt-1 mr-3" />
                </div>
                {formCount > 0 ? (
                  <div type="button" onClick={(e) => formRemove()}>
                    <FaMinus size={22} className="mt-1" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {Array.from({ length: formCount }, (e, i) => (
                <div className="d-flex flex-row mb-3" key={i}>
                  <Form.Control
                    className="border border-dark durationform mr-3"
                    size="sm"
                    type="text"
                    min="0"
                    placeholder={"Ex. Chapter " + (i + 2)}
                    onChange={(e) => handleSubInput(e, "subtask" + (i + 2))}
                  />
                </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="addTaskButton" type="submit" form="addTaskForm">
            Add Goal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalModal);
