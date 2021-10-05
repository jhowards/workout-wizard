import React from "react";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { connect } from "react-redux";
import { removeTaskAction, archiveTaskAction } from "../actions";
import { format } from "date-fns";
import { persistor } from "../store";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  archiveTask: (taskToArchive) => dispatch(archiveTaskAction(taskToArchive)),
  removeTask: (index) => dispatch(removeTaskAction(index)),
});

const Tasks = (props) => {
  let formatCurrentDate = format(props.date, "P");
  let currentDateArray = props.tasks.filter(
    (el) => el.date === formatCurrentDate
  );

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled mb-1">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     archived: true,
  //     daily: true,
  //     task: "Wake up and get ready",
  //     duration: "30m -> 7:00am",
  //     starttime: "6:30am",
  //     endtime: "7:00am",
  //     active: false,
  //   },
  //   {
  //     id: 2,
  //     archived: false,
  //     daily: true,
  //     task: "Morning Exercise",
  //     duration: "40m -> 7:40am",
  //     starttime: "7:00am",
  //     endtime: "7:40am",
  //     active: true,
  //   },
  //   {
  //     id: 3,
  //     archived: false,
  //     daily: true,
  //     task: "Eat Breakfast",
  //     duration: "30m -> 8:30am",
  //     starttime: "8:00am",
  //     endtime: "8:30am",
  //     active: false,
  //   },
  //   {
  //     id: 4,
  //     archived: false,
  //     daily: false,
  //     task: "Study for Project",
  //     duration: "2hr30m -> 12:00pm",
  //     starttime: "8:30am",
  //     endtime: "12:00pm",
  //     active: false,
  //   },
  // ]);

  const handleCheckInput = (e, id) => {
    // console.log(e.target.checked);
    // let isChecked = e.target.checked;
    props.archiveTask(id);
  };

  const durationConvert = (duration) => {
    let minutes = Math.floor(duration % 60);
    let hours = Math.floor(duration / 60);
    let length = "";
    if (hours === 0) {
      length = minutes + "m";
    }
    if (minutes === 0) {
      length = hours + "hr";
    }
    if (minutes > 0 && hours > 0) {
      length = hours + "hr " + minutes + "m";
    }
    return length;
  };

  return (
    <div className="schedule_activeschedule_body mt-2" data-testid="tasks">
      {props.tasks
        ? currentDateArray.map((task, i) =>
            task.archived === true ? (
              <Row className="mx-0" key={`${task.id}`}>
                {/* ----ARCHIVED TASKS-----*/}
                <Col
                  xs={2}
                  className="schedule_activeschedule_body_times mt-3 pl-5 pr-0"
                >
                  <div className="d-flex flex-column schedule_activeschedule_body_times_margins">
                    <div>
                      <p className="mb-0 schedule_activeschedule_body_times_largetime">
                        {task.starttime}
                      </p>
                      <p className="schedule_activeschedule_body_times_smalltime">
                        {task.endtime}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={10}
                  className="schedule_activeschedule_body_tasks d-flex flex-row px-0"
                >
                  <div className="schedule_activeschedule_body_divider ml-5 mr-5"></div>
                  <div className="d-flex flex-column w-100 mr-5">
                    <div className="schedule_activeschedule_body_taskcontent mb-3">
                      <Row className="mx-0 h-100">
                        <Col className="position-relative" xs={2}>
                          <Form.Check
                            custom
                            type="checkbox"
                            id={task.id}
                            className="testtt"
                            defaultChecked={task.archived}
                            onChange={(e) => handleCheckInput(e, i)}
                          />
                        </Col>
                        <Col className="px-0 mt-2" xs={10}>
                          {/* DAILY TASKS*/}
                          {task.daily ? (
                            <>
                              <s className="schedule_activeschedule_body_taskcontent_tasktext mb-0 d-block">
                                {task.task}
                              </s>
                              <s className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0 d-block">
                                {durationConvert(task.duration)}
                              </s>
                              <s className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1 d-block">
                                Daily
                              </s>
                            </>
                          ) : (
                            <>
                              {/* NOT DAILY TASKS*/}
                              <s className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2 d-block">
                                {task.task}
                              </s>
                              <s className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0 d-block">
                                {durationConvert(task.duration)}
                              </s>
                            </>
                          )}
                          <Dropdown className="schedule_activeschedule_body_taskcontent_edittask">
                            <Dropdown.Toggle
                              as={CustomToggle}
                              id="dropdown-custom-components"
                            >
                              <div className="">
                                <BsThreeDotsVertical size={26} />
                              </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu} className="py-1">
                              <Dropdown.Item eventKey="1">
                                Edit Task
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => props.removeTask(task.id)}
                                eventKey="2"
                              >
                                Delete Task
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row className="mx-0" key={`${task.id}`}>
                {/* NOT ARCHIVED TASKS*/}
                <Col
                  xs={2}
                  className="schedule_activeschedule_body_times mt-3 pl-5 pr-0"
                >
                  <div className="schedule_activeschedule_body_times_margins">
                    <div>
                      <p className="mb-0 schedule_activeschedule_body_times_largetime">
                        {task.starttime}
                      </p>
                      <p className="schedule_activeschedule_body_times_smalltime">
                        {task.endtime}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={10}
                  className="schedule_activeschedule_body_tasks d-flex flex-row px-0"
                >
                  <div className="schedule_activeschedule_body_divider ml-5 mr-5"></div>
                  <div className="d-flex flex-column w-100 mr-5">
                    {/* ACTIVE TASK*/}
                    {task.active ? (
                      <div className="schedule_activeschedule_body_taskcontent_active mb-3">
                        <Row className="mx-0 h-100">
                          <Col className="position-relative" xs={2}>
                            <Form.Check
                              custom
                              type="checkbox"
                              id={task.id}
                              className="testtt"
                              onChange={(e) => handleCheckInput(e, i)}
                            />
                          </Col>
                          <Col className="px-0 mt-2" xs={10}>
                            {/* DAILY TASKS*/}
                            {task.daily ? (
                              <>
                                <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0">
                                  {task.task}
                                </p>
                                <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0">
                                  {durationConvert(task.duration)}
                                </p>
                                <p className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1">
                                  Daily
                                </p>
                              </>
                            ) : (
                              <>
                                {/* NOT DAILY TASKS*/}
                                <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2">
                                  {task.task}
                                </p>
                                <p className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0">
                                  {durationConvert(task.duration)}
                                </p>
                              </>
                            )}
                            <Dropdown className="schedule_activeschedule_body_taskcontent_edittask">
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components"
                              >
                                <div className="">
                                  <BsThreeDotsVertical size={26} />
                                </div>
                              </Dropdown.Toggle>

                              <Dropdown.Menu as={CustomMenu} className="py-1">
                                <Dropdown.Item eventKey="1">
                                  Edit Task
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => props.removeTask(task.id)}
                                  eventKey="2"
                                >
                                  Delete Task
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <div className="schedule_activeschedule_body_taskcontent mb-3">
                        {/* NOT ACTIVE TASKS*/}
                        <Row className="mx-0 h-100">
                          <Col className="position-relative" xs={2}>
                            <Form.Check
                              custom
                              type="checkbox"
                              id={task.id}
                              className="testtt"
                              onChange={(e) => handleCheckInput(e, i)}
                            />
                          </Col>
                          <Col className="px-0 mt-2" xs={10}>
                            {/* DAILY TASKS*/}
                            {task.daily ? (
                              <>
                                <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0">
                                  {task.task}
                                </p>
                                <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0">
                                  {durationConvert(task.duration)}
                                </p>
                                <p className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1">
                                  Daily
                                </p>
                              </>
                            ) : (
                              <>
                                {/* NOT DAILY TASKS*/}
                                <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2">
                                  {task.task}
                                </p>
                                <p className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0">
                                  {durationConvert(task.duration)}
                                </p>
                              </>
                            )}
                            <Dropdown className="schedule_activeschedule_body_taskcontent_edittask">
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components"
                              >
                                <div className="">
                                  <BsThreeDotsVertical size={26} />
                                </div>
                              </Dropdown.Toggle>

                              <Dropdown.Menu as={CustomMenu} className="py-1">
                                <Dropdown.Item eventKey="1">
                                  Edit Task
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => props.removeTask(task.id)}
                                  eventKey="2"
                                >
                                  Delete Task
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            )
          )
        : ""}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

{
  /* <Checkbox id={task.id} taskDesc={task.task} /> */
}
