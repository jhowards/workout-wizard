import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { DatePicker } from "antd";
import { format } from "date-fns";
import { connect } from "react-redux";
import { editGoalAction } from "../../actions";
import moment from "moment";

const mapStateToProps = (state) => ({
  goals: state.goals,
});

const mapDispatchToProps = (dispatch) => ({
  editGoal: (goalToEdit) => dispatch(editGoalAction(goalToEdit)),
});

const EditGoalModal = (props) => {
  const [selectedSubtasks, setselectedSubtasks] = useState({});
  const [selectedDate, setselectedDate] = useState(new Date());
  const [goalDetails, setGoalDetails] = useState({});
  const [subtasksAmount, setsubtasksAmount] = useState(0);

  const [show, setShow] = useState(false);

  function dateChange(date) {
    if (date !== null) {
      setselectedDate(date._d);
    } else {
      setselectedDate("");
    }
  }

  const handleClose = () => {
    setShow(false);
    setGoalDetails({});
    setselectedSubtasks({});
    setsubtasksAmount(0);
  };
  const handleShow = () => {
    const index = props.goals.findIndex((goal) => goal.id === props.goalid);
    let convertedDate = new Date(props.goals[index].enddate);
    setselectedSubtasks(props.goals[index].subtasks);
    setselectedDate(convertedDate);
    setGoalDetails(props.goals[index]);
    const subtasksnum = Object.keys(props.goals[index].subtasks).length;
    setsubtasksAmount(subtasksnum - 1);
    setShow(true);
  };

  const findSubtask = (i) => {
    let subtaskfound = "subtask" + (i + 2);
    return subtaskfound;
  };

  const handleInput = (e, propertyName) => {
    setGoalDetails({
      ...goalDetails,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const handleSubInput = (e, propertyName) => {
    setselectedSubtasks({
      ...selectedSubtasks,
      [propertyName]: propertyName === "" ? "" : e.target.value,
    });
  };

  const formAdd = () => {
    setsubtasksAmount(subtasksAmount + 1);
  };

  const formRemove = () => {
    setsubtasksAmount(subtasksAmount - 1);

    let removesubtask = selectedSubtasks;
    let keys = Object.keys(removesubtask);
    delete removesubtask[keys[keys.length - 1]];
    setselectedSubtasks(removesubtask);
  };

  // function getColour(num) {
  //   var colours = {
  //     0: "28a745",
  //     1: "ffc107",
  //     2: "17a2b8",
  //     3: "dc3545",
  //     default: "007bff",
  //   };
  //   return colours[num] || colours["default"];
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formatDate = format(selectedDate, "P");

    let goalToEditFinal = {
      id: goalDetails.id,
      goal: goalDetails.goal,
      tag: goalDetails.tag,
      enddate: formatDate,
      subtasks: selectedSubtasks,
    };

    props.editGoal(goalToEditFinal);

    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="goals_addeditgoalbutton px-3 py-2 mb-1 mr-3 w-25 mx-auto"
      >
        Edit Goal
      </Button>

      <Modal show={show} onHide={handleClose} className="addtaskmodal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Goal</Modal.Title>
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
                defaultValue={goalDetails.goal}
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
                  defaultValue={goalDetails.tag}
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
                defaultValue={moment(selectedDate, "DD/MM/YYYY")}
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
                  defaultValue={selectedSubtasks.subtask1}
                  placeholder="Ex. Chapter 1"
                  onChange={(e) => handleSubInput(e, "subtask1")}
                />
                <div type="button" onClick={(e) => formAdd()}>
                  <FaPlus size={22} className="mt-1 mr-3" />
                </div>
                {subtasksAmount > 0 ? (
                  <div type="button" onClick={(e) => formRemove()}>
                    <FaMinus size={22} className="mt-1" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {Array.from({ length: subtasksAmount }, (e, i) => (
                <div className="d-flex flex-row mb-3" key={i}>
                  <Form.Control
                    className="border border-dark durationform mr-3"
                    size="sm"
                    type="text"
                    min="0"
                    defaultValue={selectedSubtasks[findSubtask(i)]}
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
          <Button
            className="addTaskButton w-25"
            type="submit"
            form="addTaskForm"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGoalModal);
