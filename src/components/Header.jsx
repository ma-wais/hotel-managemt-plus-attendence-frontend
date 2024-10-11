import React, { useState } from "react";
import { BiCart, BiHomeAlt, BiLogOut, BiMenu } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { BsMenuButtonWide } from "react-icons/bs";
import { RiFilePaperFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/header.scss";
import { FaBoxes } from "react-icons/fa";
// import axios from "axios";
// import { server } from "../App";

// const Header = ({ token, setToken, toggleSidebar, setUser }) => {
const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  if (location.pathname === "/") {
    return null;
  }

  const logout = async () => {
    try {
      sessionStorage.removeItem("token");
      //   setToken(null);
      //   setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-gray-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <h2 className="text-xl font-semibold text-white cursor-pointer">
        Employee Dashboard
      </h2>
      <div className="flex items-center space-x-4">
        <a
          onClick={logout}
          className="p-2 hover:bg-slate-700 rounded-full transition-colors duration-200"
          aria-label="Logout"
        >
          <BiLogOut size={20} />
        </a>
        <a
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-700 rounded-full transition-colors duration-200"
          aria-label="Toggle Sidebar"
        >
          <BiMenu size={20} />
        </a>
      </div>
    </header>
  );
};

export const SideBar = ({ setUser }) => {
  const location = useLocation();
  const [show, setShow] = useState("");
  const navigate = useNavigate();

  if (!location.pathname.includes("/admin")) {
    return null;
  }
  
  const logout = async () => {
    try {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminInfo");
      // setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className="sideBar"
      style={{
        transition: "all 0.1s",
      }}
    >
      <div className="ml-2 border-b-[2px] border-gray-500">
        <p>Main Admin</p>
      </div>
      <div onClick={() => navigate("/admin/dashboard")}>
        <BiHomeAlt /> <p>Dashboard</p>
      </div>
      <div onClick={() => navigate("/admin/employees-present")}>
        <CiSettings /> <p>Attendence</p>
      </div>
      <div onClick={() => setShow(show === "item" ? "" : "item")}>
        <BsMenuButtonWide /> <p>Employee</p> <CgAddR className="add" />
      </div>
      <nav className={show === "item" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/admin/employees")}>All Employees</p>
        <p onClick={() => navigate("/admin/dashboard/employees")}>Add Employee</p>
        <p
        // onClick={() => navigate("/employees/edit")}
        className="!cursor-not-allowed"
        >
          Edit Employee
        </p>
        <p onClick={() => navigate("/admin/employees/delete")}>Delete Employee</p>
      </nav>
      <div onClick={() => setShow(show === "purchase" ? "" : "purchase")}>
        <BiCart /> <p>Branches</p> <CgAddR className="add" />
      </div>
      <nav className={show === "purchase" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/admin/branches")}>Branch List</p>
        <p onClick={() => navigate("/admin/create-branch")}>Add Branch</p>
        <p onClick={() => navigate("/admin/branches/edit")}>Edit Branches</p>
        <p onClick={() => navigate("/admin/branch/delete")}>Remove Branch</p>
      </nav>
      <div onClick={() => setShow(show === "report" ? "" : "report")}>
        <CiSettings /> <p>Shifts</p> <CgAddR className="add" />
      </div>
      <nav className={show === "report" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/admin/shifts")}>Shift List</p>
        {/* <p onClick={() => navigate("/shift/add")}>Create Shift</p>
        <p onClick={() => navigate("/shift/edit")}>Edit Shift</p> */}
        <p onClick={() => navigate("/admin/shift/delete")}>Delete Shift</p>
      </nav>
      <div onClick={() => setShow(show === "account" ? "" : "account")}>
        <RiFilePaperFill /> <p>Sections</p> <CgAddR className="add" />
      </div>
      <nav className={show === "account" ? "p5 h-auto" : ""}>
        <p onClick={() => navigate("/admin/sections")}>Section List</p>
        {/* <p onClick={() => navigate("/section/add")}>Add Section</p>
        <p onClick={() => navigate("/section/edit")}>Edit Section</p> */}
        <p onClick={() => navigate("/admin/section/delete")}>Delete Section</p>
      </nav>
      <div onClick={() => navigate("/admin/attendance/report")}>
        <FaBoxes /> <p>Attendance Summary</p>
      </div>
      <div onClick={() => logout()}>
        <BiLogOut /> <p>Logout</p>
      </div>
    </div>
  );
};

export default Header;
