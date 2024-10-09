import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../App";

const ManageEmployeesPage = () => {
  const { branchId, sectionId, shiftId } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${server}/branches/${branchId}/sections/${sectionId}/shifts/${shiftId}/employees`
        );
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, [branchId, sectionId, shiftId]);

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`${server}/employees/${employeeId}`);
      setEmployees(employees.filter(emp => emp._id !== employeeId));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleTransferEmployee = (employeeId) => {
    navigate(`/employees/${employeeId}/transfer`);
  };

  const handleEditEmployee = (employeeId) => {
    navigate(`/employees/${employeeId}/edit`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl mb-4">Manage Employees</h1>
      <button
        className="mb-4 bg-green-500 text-white p-2 rounded"
        onClick={() => navigate(`/branches/${branchId}/sections/${sectionId}/shifts/${shiftId}/add-employee`)}
      >
        Add Employee
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleEditEmployee(employee._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded ml-2"
                  onClick={() => handleDeleteEmployee(employee._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white p-2 rounded ml-2"
                  onClick={() => handleTransferEmployee(employee._id)}
                >
                  Transfer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployeesPage;
