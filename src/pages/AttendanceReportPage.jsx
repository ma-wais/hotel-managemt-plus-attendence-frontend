import React from 'react';

const AttendanceReportPage = ({ data, employeeName, startDate, endDate }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Attendance Report</h1>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Employee:</strong> {employeeName}</p>
        <p><strong>Period:</strong> {startDate} - {endDate}</p>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(record.date).toLocaleDateString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReportPage;