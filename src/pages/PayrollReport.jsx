import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getDaysInRange = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const PayrollReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { payrollData } = location.state || {};
    console.log(payrollData);
    
  if (!payrollData) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">No payroll data found!</h1>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const selectedDate = new Date(payrollData?.date);

  const startDate = new Date(selectedDate);
  startDate.setMonth(startDate.getMonth() - 1);

  const daysInRange = getDaysInRange(startDate, selectedDate);

  const attendanceMap = payrollData.attendance.reduce((acc, att) => {
    acc[new Date(att.date).toDateString()] = att.status;
    return acc;
  }, {});

  const completeAttendance = daysInRange.map((date) => {
    const dateString = date.toDateString();
    return {
      date,
      status: attendanceMap[dateString] || "Absent",
    };
  });

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-4">Payroll Report for {payrollData.employee}</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {completeAttendance.map((att, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">
                {att.date.toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <p><strong>Days Present:</strong> {payrollData.daysPresent}</p>
        <p><strong>Daily Rate:</strong> {payrollData.dailyRate}</p>
        <p><strong>Total Payroll (minus advance):</strong> {payrollData.totalPayroll}</p>
      </div>

      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default PayrollReport;
