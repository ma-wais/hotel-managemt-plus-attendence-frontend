import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaBuilding, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { server } from '../App';

const AttendanceList = ({defaultTab = 'present'}) => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  useEffect(() => {
    const fetchEmployeesAndAttendance = async () => {
        try {
          const formattedDate = selectedDate.toISOString().split('T')[0];
          const [employeesRes, attendanceRes] = await Promise.all([
            axios.get(
              `${server}/employees`
            ),
            axios.get(`${server}/attendance?date=${formattedDate}`)
          ]);

          setEmployees(employeesRes.data);
          console.log(employeesRes.data, attendanceRes.data);

          const attendanceMap = attendanceRes.data.reduce((acc, record) => {
            acc[record.employee] = record.status;
            return acc;
          }, {});

          setAttendanceData(attendanceMap);
        } catch (err) {
          console.error('Error fetching employees and attendance:', err);
        }
      }
    fetchEmployeesAndAttendance();
  }, [selectedDate]);

  const filteredEmployees = employees.filter(employee => {
    const isPresent = attendanceData[employee._id] === 'Present';
    return activeTab === 'present' ? isPresent : !isPresent;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        <div>
          <button
            onClick={() => setActiveTab('present')}
            className={`px-4 py-2 ${activeTab === 'present' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Present Employees
          </button>
          <button
            onClick={() => setActiveTab('absent')}
            className={`px-4 py-2 ml-2 ${activeTab === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Absent Employees
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEmployees.map((employee) => (
          <div key={employee._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <FaUser className="text-gray-400 mr-2" />
              <span className="font-bold">{employee.name}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaBuilding className="text-gray-400 mr-2" />
              <span>{employee.branch.name}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaClock className="text-gray-400 mr-2" />
              <span>{employee.shift.name}</span>
            </div>
            <div className="flex items-center">
              {attendanceData[employee._id] === 'Present' ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              <span>{attendanceData[employee._id] === 'Present' ? 'Present' : 'Absent'}</span>
            </div>
          </div>
        ))}
      </div>

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

export default AttendanceList;
