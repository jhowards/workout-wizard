import React from "react";
import SideBar from "./SideBar";
import "../css/Schedule.css";
import { Container } from "react-bootstrap";

const Schedule = () => {
  return (
    <div className="d-flex h-100">
      <SideBar />
      <div className="h-100 w-100 schedule_mainbody py-lg-3 px-lg-5">
        <Container className="schedule_container_large">
          <div className="schedule_heading text-center mt-3 mb-1">
            <p className="schedule_weekday mb-0">Wednesday</p>
            <p className="schedule_headingdate">24th October 2021</p>
            <div className="schedule_todaybadge px-4 py-2">Today</div>
          </div>
          <div className="schedule_dayselector d-flex justify-content-center mt-3 mb-1">
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">S</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">21</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">M</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">22</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">T</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">23</p>
            </div>
            <div className="schedule_dayselector_day_active my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter_active">
                W
              </p>
              <p className="mt-1 schedule_dayselector_day_daynumber_active">
                24
              </p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">T</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">25</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">F</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">26</p>
            </div>
            <div className="schedule_dayselector_day my-auto text-center">
              <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">S</p>
              <p className="mt-1 schedule_dayselector_day_daynumber">27</p>
            </div>
          </div>
          <hr className="linebreak mb-5" />
        </Container>
      </div>
    </div>
  );
};

export default Schedule;
