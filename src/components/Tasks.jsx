import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

export const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      archived: true,
      daily: true,
      task: "Wake up and get ready",
      date: "30m -> 7:00am",
      starttime: "6:30am",
      endtime: "7:00am",
      active: false,
    },
    {
      id: 2,
      archived: false,
      daily: true,
      task: "Morning Exercise",
      date: "40m -> 7:40am",
      starttime: "7:00am",
      endtime: "7:40am",
      active: true,
    },
    {
      id: 3,
      archived: false,
      daily: true,
      task: "Eat Breakfast",
      date: "30m -> 8:30am",
      starttime: "8:00am",
      endtime: "8:30am",
      active: false,
    },
    {
      id: 4,
      archived: false,
      daily: false,
      task: "Study for Project",
      date: "2hr30m -> 12:00pm",
      starttime: "8:30am",
      endtime: "12:00pm",
      active: false,
    },
  ]);

  const handleCheckInput = (e, i) => {
    console.log(e.target.checked);

    // const changedTasks = tasks;

    // changedTasks[i].archived = e.target.checked;
    // console.log(changedTasks);
    // setTasks(changedTasks);
  };

  return (
    <div className="schedule_activeschedule_body mt-2" data-testid="tasks">
      {tasks.map((task, i) =>
        task.archived === true ? (
          <Row className="mx-0" key={`${task.id}`}>
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
                      <s className="schedule_activeschedule_body_taskcontent_tasktext mb-0 d-block">
                        {task.task}
                      </s>
                      <s className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0 d-block">
                        {task.date}
                      </s>
                      <s className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1 d-block">
                        Daily
                      </s>
                      <BsThreeDotsVertical
                        size={26}
                        className="schedule_activeschedule_body_taskcontent_edittask"
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="mx-0" key={`${task.id}`}>
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
                        <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0">
                          {task.task}
                        </p>
                        <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0">
                          {task.date}
                        </p>
                        <p className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1">
                          Daily
                        </p>
                        <BsThreeDotsVertical
                          size={26}
                          className="schedule_activeschedule_body_taskcontent_edittask"
                        />
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div className="schedule_activeschedule_body_taskcontent mb-3">
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
                        {task.daily ? (
                          <>
                            <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0">
                              {task.task}
                            </p>
                            <p className="schedule_activeschedule_body_taskcontent_tasktimetext mt-0 mb-0">
                              {task.date}
                            </p>
                            <p className="schedule_activeschedule_body_taskcontent_dailybadge text-center mt-1">
                              Daily
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="schedule_activeschedule_body_taskcontent_tasktext mb-0 mt-2">
                              {task.task}
                            </p>
                            <p className="schedule_activeschedule_body_taskcontent_tasktimenodaily mt-2 mb-0">
                              {task.date}
                            </p>
                          </>
                        )}

                        <BsThreeDotsVertical
                          size={26}
                          className="schedule_activeschedule_body_taskcontent_edittask"
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )
      )}
    </div>
  );
};

{
  /* <Checkbox id={task.id} taskDesc={task.task} /> */
}
