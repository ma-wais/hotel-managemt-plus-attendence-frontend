import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { server } from "../App";

const BranchPage = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get(
          `${server}/branches/${branchId}/sections`
        );
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };
    fetchSections();
  }, [branchId]);

  useEffect(() => {
    const fetchShifts = async () => {
      if (selectedSection) {
        try {
          const res = await axios.get(
            `${server}/branches/${branchId}/shifts`
          );
          setShifts(res.data);
        } catch (err) {
          console.error("Error fetching shifts:", err);
        }
      }
    };
    fetchShifts();
  }, [branchId, selectedSection]);

  useEffect(() => {
    const fetchEmployeesAndAttendance = async () => {
      if (selectedSection && selectedShift) {
        try {
          const formattedDate = selectedDate.toISOString().split("T")[0];
          const [employeesRes, attendanceRes] = await Promise.all([
            axios.get(
              `${server}/branches/${branchId}/sections/${selectedSection.value}/shifts/${selectedShift.value}/employees`
            ),
            axios.get(
              `${server}/attendance?date=${formattedDate}&shiftId=${selectedShift.value}`
            ),
          ]);

          setEmployees(employeesRes.data);

          const attendanceMap = attendanceRes.data.reduce((acc, record) => {
            acc[record.employee] = record.status;
            return acc;
          }, {});
          console.log("Fetched attendance data:", attendanceMap);
          setAttendanceData(attendanceMap);
        } catch (err) {
          console.error("Error fetching employees and attendance:", err);
        }
      }
    };
    fetchEmployeesAndAttendance();
    console.log(selectedSection, selectedShift, selectedDate);
  }, [branchId, selectedSection, selectedShift, selectedDate]);

  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
    setSelectedShift(null);
  };

  const handleAttendanceChange = (employeeId, status) => {
    setAttendanceData((prev) => ({ ...prev, [employeeId]: status }));
  };

  const handleSaveAttendance = async () => {
    try {
      await axios.post(`${server}/attendance/bulk`, {
        date: selectedDate,
        shiftId: selectedShift.value,
        attendanceData,
      });
      alert("Attendance saved successfully");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Error saving attendance");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Branch Info</h1>
        <button
          className="bg-yellow-500 text-white p-2 rounded"
          onClick={() => navigate(`/branches/${branchId}/edit`)}
        >
          Edit Branch
        </button>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <Select
          value={selectedSection}
          onChange={handleSectionChange}
          options={sections.map((section) => ({
            value: section._id,
            label: section.name,
          }))}
          placeholder="Select Section"
          className="react-select"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => navigate(`/branches/${branchId}/add-section`)}
        >
          Add Section
        </button>
      </div>

      {selectedSection && (
        <div className="mb-6 flex items-center gap-2">
          <Select
            value={selectedShift}
            onChange={setSelectedShift}
            options={shifts.map((shift) => ({
              value: shift._id,
              label: shift.name,
            }))}
            placeholder="Select Shift"
            className="react-select"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => navigate(`/branches/${branchId}/add-shift`)}
          >
            Add Shift
          </button>
        </div>
      )}

      <div className="mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          className="p-2 border rounded"
        />
      </div>

      <h2 className="text-2xl mb-4">Employees in Shift</h2>
      <table className="w-full mb-4">
        {employees.length > 0 && (
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 w-[5%] text-left">#</th>
              <th className="px-4 py-2 w-[40%] text-left">Employee Name</th>
              <th className="px-4 py-2 w-[30%] text-left">Father's Name</th>
              <th className="px-4 py-2 text-left">Attendance</th>
            </tr>
          </thead>
        )}
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id} className="border-b">
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.fatherName}</td>
              <td className="px-4 py-2">
                <div className="flex">
                  {["Present", "Absent"].map((status) => (
                    <label key={status} className="mr-2 flex items-center">
                      <input
                        type="radio"
                        name={`attendance-${employee._id}`}
                        value={status}
                        checked={attendanceData[employee._id] === status}
                        onChange={() =>
                          handleAttendanceChange(employee._id, status)
                        }
                        className="mr-2"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-6 bg-green-500 text-white p-2 rounded mr-4"
        onClick={handleSaveAttendance}
      >
        Save Attendance
      </button>

      {selectedSection && selectedShift && (
        <button
          className="mt-6 bg-blue-500 text-white p-2 rounded"
          onClick={() =>
            navigate(
              `/branches/${branchId}/sections/${selectedSection?.value}/shifts/${selectedShift?.value}/add-employee`
            )
          }
        >
          Add Employee
        </button>
      )}
    </div>
  );
};

export default BranchPage;
