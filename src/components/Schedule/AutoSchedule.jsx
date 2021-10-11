import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../../css/Modals.css";
import { connect } from "react-redux";
import { addTaskAction } from "../../actions";
import moment from "moment";
import { TimePicker } from "antd";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (taskToAdd) => dispatch(addTaskAction(taskToAdd)),
});

const AutoSchedule = (props) => {
  const [value, onChange] = useState("10:00");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleInput = (value) => {
    console.log(value);
  };

  const handleSubmit = async () => {};
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
          <Modal.Title>Auto Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="addTaskForm"
            onSubmit={handleSubmit}
            className="text-center"
          >
            <Form.Group className="mb-2">
              <Form.Label className="mb-0 mr-3">
                <small className="auto_timepicker_label">Start Time:</small>
              </Form.Label>
              <TimePicker
                defaultValue={moment("09:00", timeformat)}
                format={timeformat}
                allowClear={false}
                className="w-25"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-0 mr-3 ml-2">
                <small className="auto_timepicker_label">End Time:</small>
              </Form.Label>
              <TimePicker
                defaultValue={moment("17:00", timeformat)}
                format={timeformat}
                allowClear={false}
                className="w-25"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            className="scheduleButton mx-auto"
            type="submit"
            form="addTaskForm"
          >
            Schedule
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoSchedule);
