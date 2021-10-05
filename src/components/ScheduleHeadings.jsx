import React from "react";
import { format, subDays, addDays } from "date-fns";
import { GoPrimitiveDot } from "react-icons/go";

const ScheduleHeadings = ({ todaysDate, activeDate, setactiveDate }) => {
  const subDate = (days) => {
    let newDate = subDays(activeDate, days);
    setactiveDate(newDate);
  };

  const addDate = (days) => {
    let newDate = addDays(activeDate, days);
    setactiveDate(newDate);
  };

  return (
    <>
      <div className="schedule_heading text-center mt-3 mb-2">
        <p className="schedule_weekday mb-0">{format(activeDate, "EEEE")}</p>
        <p className="schedule_headingdate">
          {format(activeDate, "do LLLL yyyy")}
        </p>
        {todaysDate.toDateString() === activeDate.toDateString() ? (
          <div className="schedule_todaybadge px-4 py-2">Today</div>
        ) : null}
      </div>
      <div className="schedule_dayselector d-flex justify-content-center mt-3 mb-1">
        <div
          className="schedule_dayselector_day my-auto text-center position-relative"
          onClick={() => subDate(3)}
        >
          {todaysDate.toDateString() ===
          subDays(activeDate, 3).toDateString() ? (
            <GoPrimitiveDot className="schedule_todaydot" size={13} />
          ) : (
            ""
          )}
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(subDays(activeDate, 3), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(subDays(activeDate, 3), "d")}
          </p>
        </div>
        <div
          className="schedule_dayselector_day my-auto text-center position-relative"
          onClick={() => subDate(2)}
        >
          {todaysDate.toDateString() ===
          subDays(activeDate, 2).toDateString() ? (
            <GoPrimitiveDot className="schedule_todaydot" size={13} />
          ) : (
            ""
          )}
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(subDays(activeDate, 2), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(subDays(activeDate, 2), "d")}
          </p>
        </div>
        <div
          className="schedule_dayselector_day my-auto text-center position-relative"
          onClick={() => subDate(1)}
        >
          {todaysDate.toDateString() ===
          subDays(activeDate, 1).toDateString() ? (
            <GoPrimitiveDot className="schedule_todaydot" size={13} />
          ) : (
            ""
          )}
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
        <div
          className="schedule_dayselector_day my-auto text-center position-relative"
          onClick={() => addDate(1)}
        >
          {todaysDate.toDateString() ===
          addDays(activeDate, 1).toDateString() ? (
            <GoPrimitiveDot className="schedule_todaydot" size={13} />
          ) : (
            ""
          )}
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(addDays(activeDate, 1), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(addDays(activeDate, 1), "d")}
          </p>
        </div>
        <div
          className="schedule_dayselector_day my-auto text-center position-relative"
          onClick={() => addDate(2)}
        >
          {todaysDate.toDateString() ===
          addDays(activeDate, 2).toDateString() ? (
            <GoPrimitiveDot className="schedule_todaydot" size={13} />
          ) : (
            ""
          )}
          <p className="mt-2 mb-0 schedule_dayselector_day_dayletter">
            {format(addDays(activeDate, 2), "EEEEE")}
          </p>
          <p className="mt-1 schedule_dayselector_day_daynumber">
            {format(addDays(activeDate, 2), "d")}
          </p>
        </div>
        <div
          className="schedule_dayselector_day my-auto text-center position-relative"
          onClick={() => addDate(3)}
        >
          {todaysDate.toDateString() ===
          addDays(activeDate, 3).toDateString() ? (
            <GoPrimitiveDot className="schedule_todaydot" size={13} />
          ) : (
            ""
          )}
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
