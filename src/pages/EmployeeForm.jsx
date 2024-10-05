import React, { useState } from 'react';
import { server } from "../App";

const EmployeeForm = ({ branchId }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    CNIC: '',
    salary: '',
    shift: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/branches/${branchId}/employees`, formData);
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" mt-10 p-6 flex flex-col bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Add Employee</h2>
      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={formData.designation}
        onChange={handleChange}
      />
      <input
        type="text"
        name="CNIC"
        placeholder="CNIC"
        value={formData.CNIC}
        onChange={handleChange}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />
      <button type="submit" className="mt-4">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
