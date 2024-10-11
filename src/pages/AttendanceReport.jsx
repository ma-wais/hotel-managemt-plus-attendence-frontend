import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { server } from "../App";
// import AttendanceReportPage from './AttendanceReportPage';

const AttendanceReport = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch employee list for select dropdown
    const fetchEmployees = async () => {
      try {
        const employeesRes = await axios.get(`${server}/employees`);
        setEmployees(employeesRes.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // Modified handleGenerateReport function
  const handleGenerateReport = async () => {
    if (!selectedEmployee || !startDate || !endDate) {
      alert("Please select an employee and date range.");
      return;
    }

    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const response = await axios.get(
        `${server}/attendance?employeeId=${selectedEmployee.value}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );

      setAttendanceData(response.data);

      const reportWindow = window.open("", "_blank");
      if (reportWindow) {
        reportWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Attendance Report</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>
            const AttendanceReportPage = (props) => {
              const { data, employeeName, startDate, endDate } = props;

              const generateDateRange = (start, end) => {
                const dates = [];
                let currentDate = new Date(start);
                const endDate = new Date(end);
                while (currentDate <= endDate) {
                  dates.push(new Date(currentDate));
                  currentDate.setDate(currentDate.getDate() + 1);
                }
                return dates;
              };

              const dateRange = generateDateRange(startDate, endDate);

              const getAttendanceStatus = (date) => {
                const record = data.find(r => new Date(r.date).toDateString() === date.toDateString());
                return record ? record.status : 'Absent';
              };

              return React.createElement('div', { style: { fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' } },
                React.createElement('h1', { style: { fontSize: '24px', marginBottom: '20px' } }, 'Attendance Report'),
                React.createElement('div', { style: { marginBottom: '20px' } },
                  React.createElement('p', null, 
                    React.createElement('strong', null, 'Employee: '), 
                    employeeName
                  ),
                  React.createElement('p', null, 
                    React.createElement('strong', null, 'Period: '), 
                    startDate + ' - ' + endDate
                  )
                ),
                React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
                  React.createElement('thead', null,
                    React.createElement('tr', { style: { backgroundColor: '#f2f2f2' } },
                      React.createElement('th', { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, 'Date'),
                      React.createElement('th', { style: { border: '1px solid #ddd', padding: '8px', textAlign: 'left' } }, 'Status')
                    )
                  ),
                  React.createElement('tbody', null,
                    dateRange.map((date, index) =>
                      React.createElement('tr', { key: index },
                        React.createElement('td', { style: { border: '1px solid #ddd', padding: '8px' } }, date.toLocaleDateString()),
                        React.createElement('td', { style: { border: '1px solid #ddd', padding: '8px' } }, getAttendanceStatus(date))
                      )
                    )
                  )
                )
              );
            };

            const data = ${JSON.stringify(response.data)};
            const employeeName = "${selectedEmployee.label}";
            const startDate = "${formattedStartDate}";
            const endDate = "${formattedEndDate}";
            
            ReactDOM.render(
              React.createElement(AttendanceReportPage, { data, employeeName, startDate, endDate }),
              document.getElementById('root')
            );
          </script>
        </body>
      </html>
    `);

        reportWindow.document.close();
      }
    } catch (err) {
      console.error("Error generating attendance report:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Generate Attendance Report
        </h2>

        {/* Employee Select */}
        <Select
          options={employees.map((emp) => ({
            value: emp._id,
            label: emp.name,
          }))}
          onChange={setSelectedEmployee}
          placeholder="Select Employee"
        />

        {/* Date Range Select */}
        <div className="flex justify-between mt-4">
          <div>
            <label className="block">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div>
            <label className="block">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-6"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;
