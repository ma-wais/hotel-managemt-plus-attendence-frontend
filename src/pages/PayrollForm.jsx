import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { server } from "../App";

const PayrollForm = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [date, setDate] = useState(new Date());
  const [advanceTaken, setAdvanceTaken] = useState(0);
  const [loading, setLoading] = useState(false);
  const [joiningdate, setJoiningDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => {
        const employeeOptions = res.data.map((employee) => ({
          value: employee._id,
          label: employee.name,
        }));
        setEmployees(employeeOptions);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !date) {
      alert("Please select employee and date");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${server}/payroll`, {
        params: {
          employeeId: selectedEmployee.value,
          date: date.toISOString(),
        },
      });

      const { attendance, dailyRate } = response.data;
      const daysPresent = attendance.filter(
        (att) => att.status === "Present"
      ).length;
      const totalPayroll = daysPresent * dailyRate - advanceTaken;

      navigate("/payroll-report", {
        state: {
          payrollData: {
            date,
            attendance,
            daysPresent,
            dailyRate,
            totalPayroll,
            employee: selectedEmployee.label,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching payroll:", error);
    }

    setLoading(false);
  };

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-gray-700">Select Employee:</label>
            <Select
              options={employees}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
              placeholder="Select employee"
              className="mt-2 !w-[200px]"
            />
          </div>

          <div>
            <label className="block text-gray-700">Select Date:</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="mt-2 p-[6px] border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Advance Taken:</label>
          <input
            type="number"
            value={advanceTaken}
            onChange={(e) => setAdvanceTaken(Number(e.target.value))}
            className="mt-2 p-2 border border-gray-300 rounded w-full max-w-[250px]"
            placeholder="Enter advance taken"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
        >
          {loading ? "Calculating..." : "Get Payroll"}
        </button>
      </form>
    </div>
  );
};

export default PayrollForm;
