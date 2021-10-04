import React from "react";
import { format, subDays, addDays } from "date-fns";

const ScheduleHeadings = ({ todaysDate, activeDate }) => {
  return (
    <>
      <div className="schedule_heading text-center mt-3 mb-2">
        <p className="schedule_weekday mb-0">{format(new Date(), "EEEE")}</p>
        <p className="schedule_headingdate">
          {format(new Date(), "do LLLL yyyy")}
        </p>
        {todaysDate.toDateString() === activeDate.toDateString() ? (
          <div className="schedule_todaybadge px-4 py-2">Today</div>
        ) : null}
      </div>
      <div className="schedule_dayselector d-flex justify-content-center mt-3 mb-1">
        <div className="schedule_dayselector_day my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(subDays(activeDate, 3), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(subDays(activeDate, 3), "d")}
          </p>
        </div>
        <div className="schedule_dayselector_day my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(subDays(activeDate, 2), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(subDays(activeDate, 2), "d")}
          </p>
        </div>
        <div className="schedule_dayselector_day my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(subDays(activeDate, 1), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(subDays(activeDate, 1), "d")}
          </p>
        </div>
        <div className="schedule_dayselector_day_active my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter_active">
            {format(activeDate, "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber_active">
            {format(activeDate, "d")}
          </p>
        </div>
        <div className="schedule_dayselector_day my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(addDays(activeDate, 1), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(addDays(activeDate, 1), "d")}
          </p>
        </div>
        <div className="schedule_dayselector_day my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(addDays(activeDate, 2), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(addDays(activeDate, 2), "d")}
          </p>
        </div>
        <div className="schedule_dayselector_day my-auto text-center">
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(addDays(activeDate, 3), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(addDays(activeDate, 3), "d")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ScheduleHeadings;
