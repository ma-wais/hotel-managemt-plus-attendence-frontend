import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShare, FaTrash} from 'react-icons/fa';
import { server } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const transfer = location.pathname.includes('/transfer');
  
  const employeesPerPage = 12;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${server}/employees`);
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching employees');
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
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

  const handleDelete = async (employeeId) => {
    setDeleting(true);
    try {
      await axios.delete(`${server}/employees/${employeeId}`);
      setEmployees(employees.filter(employee => employee._id !== employeeId));
      setDeleting(false);
    } catch (err) {
      setError('Error deleting employee');
      setDeleting(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 h-[98vh] overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6">{transfer ? 'Transfer' : 'Delete'} Employee</h1>

      <table className="table-auto w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            {/* <th className="px-4 py-2">Designation</th> */}
            <th className="px-4 py-2">Branch</th>
            <th className="px-4 py-2">Section</th>
            <th className="px-4 py-2">Shift</th>
            <th className="px-4 py-2">Joining Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id} className="bg-white border-b">
              <td className="px-4 py-2">{employee.name}</td>
              {/* <td className="px-4 py-2">{employee.designation}</td> */}
              <td className="px-4 py-2">{employee.branch.name}</td>
              <td className="px-4 py-2">{employee.section.name}</td>
              <td className="px-4 py-2">{employee.shift.name}</td>
              <td className="px-4 py-2">{new Date(employee.joiningDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{employee.status ? 'Active' : 'Inactive'}</td>
              <td className="px-4 py-2">
                {transfer? (
                  <button
                    onClick={() => navigate(`/employees/${employee._id}/transfer`)}
                    disabled={deleting}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    <FaShare />
                  </button>
                ) : (
                <button
                  onClick={() => handleDelete(employee._id)}
                  disabled={deleting}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  <FaTrash />
                </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
