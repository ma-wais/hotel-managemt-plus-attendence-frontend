import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../App";

const AddEmployee = () => {
  const params = useParams();
  const { branchId, sectionId, shiftId } = params;
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

  const handleChange = (e) => {
    const value =
      e.target.name === "status" ? e.target.value === "true" : e.target.value;

    setEmployeeData({
      ...employeeData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/branches/${branchId}/employees`,
        {
          ...employeeData,
          shift: shiftId,
          section: sectionId,
        }
      );
      alert("Employee added successfully");
      navigate(`/branch/${branchId}`);
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl mb-4">Add Employee to Branch {branchId}</h1>

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
          <label className="block">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={employeeData.joiningDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

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
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
