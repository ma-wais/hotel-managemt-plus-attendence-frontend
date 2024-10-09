import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCodeBranch, FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminToken = sessionStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/");
    }
  }, [adminToken]);

  const navItems = [
    { title: "Branches", icon: FaCodeBranch, path: "/admin/branches" },
    { title: "Employees", icon: FaUsers, path: "/admin/employees" },
    { title: "Present", icon: FaUserCheck, path: "/admin/employees-present" },
    { title: "Absent", icon: FaUserTimes, path: "/admin/employees-absent" },
  ];

  return (
    <div className="container p-6 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="bg-[rgb(58,58,58)] p-6 text-white">
                <item.icon className="text-6xl mb-4 opacity-20 absolute right-4 top-4" />
                <h2 className="text-xl font-semibold mb-2 relative z-10">{item.title}</h2>
                <p className="text-sm relative z-10">Click to view details</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;