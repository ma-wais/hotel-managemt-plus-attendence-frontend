import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaBuilding,
  FaClock,
  FaLayerGroup,
  FaEdit,
} from "react-icons/fa";
import { server } from "../App";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
    const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6; // Adjust this number as needed

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${server}/employees`);
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 h-[98vh] overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">Employee List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEmployees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-gray-100 p-4">
              <h2 className="text-xl font-semibold">
                {employee.name}{" "}
                <FaEdit onClick={() => {navigate(`/employees/${employee._id}/edit`)}} className="inline-block text-gray-400 cursor-pointer ml-4 -translate-y-1" />
              </h2>
              <p className="text-gray-600">{employee.designation}</p>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-400 mr-2" />
                <span>{employee.fatherName}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBuilding className="text-gray-400 mr-2" />
                <span>{employee.branch.name}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaLayerGroup className="text-gray-400 mr-2" />
                <span>{employee.section.name}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="text-gray-400 mr-2" />
                <span>{employee.shift.name}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Joined: {new Date(employee.joiningDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {employee.status ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
