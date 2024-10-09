import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../App";

const EditEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    fatherName: "",
    address: "",
    contact: "",
    joiningDate: "",
    status: true,
    CNIC: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${server}/employees/${employeeId}`);
        setEmployeeData(res.data);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name } = e.target;
    const value =
      e.target.name === "status" ? e.target.value === "true" : e.target.value;

    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${server}/employees/${employeeId}`, employeeData);
      alert("Employee updated successfully");
      navigate(`/branch/${employeeData.branch}`);
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Error updating employee");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl mb-4">Edit Employee</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={employeeData.fatherName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Address</label>
          <input
            type="text"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Contact</label>
          <input
            type="text"
            name="contact"
            value={employeeData.contact}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">CNIC</label>
          <input
            type="text"
            name="CNIC"
            value={employeeData.CNIC}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={employeeData.joiningDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Status</label>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={employeeData.status.toString()}
          className="border p-2 outline-none"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        </div>

        <div className="mb-4">
          <label className="block">Designation</label>
          <input
            type="text"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Salary</label>
          <input
            type="number"
            name="salary"
            value={employeeData.salary}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
