import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../../../css/Modals.css";
import { connect } from "react-redux";
import moment from "moment";
import { TimePicker } from "antd";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({});

const AutoSchedule = (props) => {
  const [startTime, setstartTime] = useState(new Date());
  const [endTime, setendTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleStartInput = (value) => {
    setstartTime(value._d);
  };

  const handleEndInput = (value) => {
    setendTime(value._d);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Modal.Title>Auto Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="autoScheduleForm"
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
                onChange={(time) => handleStartInput(time)}
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
