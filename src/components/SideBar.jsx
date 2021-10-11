import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/Sidebar.css";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
const SideBar = () => {
  return (
    <div className="d-none d-lg-block">
      <div className="sidebar d-flex flex-column flex-shrink-0 p-3">
        <hr className="linebreak mb-5" />
        <nav className="mb-auto mt-3">
          <ul className="sidebar_navlist">
            <li>
              <NavLink
                to="/home"
                className="sidebar_navlink"
                exact
                activeClassName="sidebar_navlink_active"
              >
                <AiFillHome
                  size={32}
                  className="sidebar_navlink_icon mr-3 text-white"
                />
                <span className="sidebar_navlink_textalign">Home</span>
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/schedule"
                activeClassName="sidebar_navlink_active"
                className="sidebar_navlink"
              >
                <AiOutlineClockCircle
                  size={32}
                  className="sidebar_navlink_icon mr-3 text-white"
                />
                <span className="sidebar_navlink_textalign">Schedule</span>
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/calendar"
                className="sidebar_navlink"
                activeClassName="sidebar_navlink_active"
              >
                <BsCalendar
                  size={32}
                  className="sidebar_navlink_icon mr-3 text-white"
                />
                <span className="sidebar_navlink_textalign">Calendar</span>
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/routines"
                className="sidebar_navlink"
                activeClassName="sidebar_navlink_active"
              >
                <IoMdCheckboxOutline
                  size={32}
                  className="sidebar_navlink_icon mr-3 text-white"
                />
                <span className="sidebar_navlink_textalign">Routines</span>
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/goals"
                className="sidebar_navlink"
                activeClassName="sidebar_navlink_active"
              >
                <CgNotes
                  size={32}
                  className="sidebar_navlink_icon mr-3 text-white"
                />
                <span className="sidebar_navlink_textalign">Goals</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <span className="sidebar_bottomrow d-flex flex-row justify-content-between">
          <Link to="/settings">
            <IoSettingsSharp size={38} className="text-white ml-4 mb-4" />
          </Link>
          <MdKeyboardArrowLeft
            size={38}
            className="text-white mb-4 sidebar_leftarrow"
          />
        </span>
      </div>
    </div>
  );
};

export default SideBar;
