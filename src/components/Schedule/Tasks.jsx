import React from "react";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { connect } from "react-redux";
import {
  removeTaskAction,
  archiveTaskAction,
  reorderTaskAction,
} from "../../actions";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditTaskModal from "./Modals/EditTaskModal";

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  archiveTask: (taskToArchive) => dispatch(archiveTaskAction(taskToArchive)),
  removeTask: (id) => dispatch(removeTaskAction(id)),
  reorderTasks: (taskToReorder) => dispatch(reorderTaskAction(taskToReorder)),
});

const Tasks = (props) => {
  let formatCurrentDate = format(props.date, "P");
  // let currentDateArray = props.tasks.filter(
  //   (el) => el.date === formatCurrentDate
  // );

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const items = Array.from(props.tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.starttime = "";
    reorderedItem.endtime = "";
    reorderedItem.active = false;
    items.splice(result.destination.index, 0, reorderedItem);
    props.reorderTasks(items);
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const value = "";

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

  const handleCheckInput = (id) => {
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            className="schedule_activeschedule_body mt-2"
            data-testid="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.tasks
              ? props.tasks.map((task, i) =>
                  task.date === formatCurrentDate ? (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={i}
                    >
                      {(provided) => (
                        <Row
                          className="mx-0"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Col
                            xs={2}
                            className="schedule_activeschedule_body_times mt-3 pl-5 pr-0"
                          >
                            <div className="schedule_activeschedule_body_times_margins">
                              {task.starttime === "" ? (
                                <div className="schedule_activeschedule_nostart_box d-flex">
                                  <div className="schedule_activeschedule_nostart_line my-auto"></div>
                                </div>
                              ) : (
                                <div>
                                  {task.archived ? (
                                    <>
                                      <s className="mb-0 schedule_activeschedule_body_times_largetime d-block">
                                        {task.starttime}
                                      </s>
                                      <s className="schedule_activeschedule_body_times_smalltime d-block">
                                        {task.endtime}
                                      </s>
                                    </>
                                  ) : (
                                    <>
                                      <p className="mb-0 schedule_activeschedule_body_times_largetime">
                                        {task.starttime}
                                      </p>
                                      <p className="schedule_activeschedule_body_times_smalltime">
                                        {task.endtime}
                                      </p>
                                    </>
                                  )}
                                </div>
                              )}
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
                                  <Row className="mx-0 h-100 schedule_activeschedule_body_taskcontent_dragging">
                                    <Col className="position-relative" xs={2}>
                                      <Form.Check
                                        custom
                                        type="checkbox"
                                        id={task.id}
                                        className="schedule_task_checkbox"
                                        onChange={() =>
                                          handleCheckInput(task.id)
                                        }
                                      />
                                    </Col>
                                    <Col className="px-0" xs={10}>
                                      {/* DAILY TASKS*/}
                                      {task.daily ? (
                                        <div className="d-flex flex-row h-100">
                                          <i
                                            className={
                                              task.icon + " my-auto mr-4"
                                            }
                                          ></i>
                                          <div>
                                            <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2">
                                              {task.task}
                                            </p>
                                            <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0">
                                              {durationConvert(task.duration)}
                                              {task.endtime !== ""
                                                ? " ->  " + task.endtime
                                                : ""}
                                            </p>
                                            <p className="schedule_activeschedule_body_taskcontent_routinebadge text-center mt-1">
                                              Routine
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-flex flex-row h-100">
                                          {/* NOT DAILY TASKS*/}
                                          <i
                                            className={
                                              task.icon + " my-auto mr-4"
                                            }
                                          ></i>
                                          <div>
                                            <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2 pt-1">
                                              {task.task}
                                            </p>
                                            <p className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0">
                                              {durationConvert(task.duration)}
                                              {task.endtime !== ""
                                                ? " ->  " + task.endtime
                                                : ""}
                                            </p>
                                          </div>
                                        </div>
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

                                        <Dropdown.Menu
                                          as={CustomMenu}
                                          className="py-1"
                                        >
                                          <EditTaskModal taskid={task.id} />
                                          <Dropdown.Item
                                            onClick={() =>
                                              props.removeTask(task.id)
                                            }
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
                                <>
                                  {task.archived ? (
                                    <div className="schedule_activeschedule_body_taskcontent mb-3">
                                      <Row className="mx-0 h-100 schedule_activeschedule_body_taskcontent_dragging">
                                        <Col
                                          className="position-relative"
                                          xs={2}
                                        >
                                          <Form.Check
                                            custom
                                            type="checkbox"
                                            id={task.id}
                                            className="schedule_task_checkbox"
                                            defaultChecked={task.archived}
                                            onChange={() =>
                                              handleCheckInput(task.id)
                                            }
                                          />
                                        </Col>
                                        <Col className="px-0" xs={10}>
                                          {/* DAILY TASKS*/}
                                          {task.daily ? (
                                            <div className="d-flex flex-row h-100">
                                              <i
                                                className={
                                                  task.icon +
                                                  " my-auto mr-4 iconfix"
                                                }
                                              ></i>
                                              <div>
                                                <s className="schedule_activeschedule_body_taskcontent_tasktext d-block mb-0 mt-2">
                                                  {task.task}
                                                </s>
                                                <s className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0 d-block">
                                                  {durationConvert(
                                                    task.duration
                                                  )}
                                                  {task.endtime !== ""
                                                    ? " ->  " + task.endtime
                                                    : ""}
                                                </s>
                                                <s className="schedule_activeschedule_body_taskcontent_routinebadge text-center mt-1 d-block">
                                                  Routine
                                                </s>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="d-flex flex-row h-100">
                                              {/* NOT DAILY TASKS*/}
                                              <i
                                                className={
                                                  task.icon + " my-auto mr-4"
                                                }
                                              ></i>
                                              <div>
                                                <s className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2 pt-1 d-block">
                                                  {task.task}
                                                </s>
                                                <s className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0 d-block">
                                                  {durationConvert(
                                                    task.duration
                                                  )}
                                                  {task.endtime !== ""
                                                    ? " ->  " + task.endtime
                                                    : ""}
                                                </s>
                                              </div>
                                            </div>
                                          )}
                                          <Dropdown className="schedule_activeschedule_body_taskcontent_edittask">
                                            <Dropdown.Toggle
                                              as={CustomToggle}
                                              id="dropdown-custom-components"
                                            >
                                              <div className="">
                                                <BsThreeDotsVertical
                                                  size={26}
                                                />
                                              </div>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu
                                              as={CustomMenu}
                                              className="py-1"
                                            >
                                              <EditTaskModal taskid={task.id} />
                                              <Dropdown.Item
                                                onClick={() =>
                                                  props.removeTask(task.id)
                                                }
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
                                      {/* NOT ACTIVE OR ARCHIVED TASKS*/}

                                      <Row className="mx-0 h-100 schedule_activeschedule_body_taskcontent_dragging schedule_activeschedule_body_taskcontent_normal">
                                        <Col
                                          className="position-relative"
                                          xs={2}
                                        >
                                          <Form.Check
                                            custom
                                            type="checkbox"
                                            id={task.id}
                                            className="schedule_task_checkbox"
                                            onChange={() =>
                                              handleCheckInput(task.id)
                                            }
                                          />
                                        </Col>
                                        <Col className="px-0" xs={10}>
                                          {/* DAILY TASKS*/}
                                          {task.daily ? (
                                            <div className="d-flex flex-row h-100">
                                              <i
                                                className={
                                                  task.icon + " my-auto mr-4"
                                                }
                                              ></i>
                                              <div>
                                                <p className="schedule_activeschedule_body_taskcontent_tasktext d-block mb-0 mt-2">
                                                  {task.task}
                                                </p>
                                                <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0 d-block">
                                                  {durationConvert(
                                                    task.duration
                                                  )}
                                                  {task.endtime !== ""
                                                    ? " ->  " + task.endtime
                                                    : ""}
                                                </p>
                                                <p className="schedule_activeschedule_body_taskcontent_routinebadge text-center mt-1 d-block">
                                                  Routine
                                                </p>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="d-flex flex-row h-100">
                                              {/* NOT DAILY TASKS*/}
                                              <i
                                                className={
                                                  task.icon + " my-auto mr-4"
                                                }
                                              ></i>
                                              <div>
                                                <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2 pt-1">
                                                  {task.task}
                                                </p>
                                                <p className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0">
                                                  {durationConvert(
                                                    task.duration
                                                  )}
                                                  {task.endtime !== ""
                                                    ? " ->  " + task.endtime
                                                    : ""}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                          <Dropdown className="schedule_activeschedule_body_taskcontent_edittask">
                                            <Dropdown.Toggle
                                              as={CustomToggle}
                                              id="dropdown-custom-components"
                                            >
                                              <div className="">
                                                <BsThreeDotsVertical
                                                  size={26}
                                                />
                                              </div>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu
                                              as={CustomMenu}
                                              className="py-1"
                                            >
                                              <EditTaskModal taskid={task.id} />
                                              <Dropdown.Item
                                                onClick={() =>
                                                  props.removeTask(task.id)
                                                }
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
                                </>
                              )}
                            </div>
                          </Col>
                        </Row>
                      )}
                    </Draggable>
                  ) : (
                    ""
                  )
                )
              : ""}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
