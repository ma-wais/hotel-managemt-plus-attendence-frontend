import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { server } from '../App';

const ShiftList = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(`${server}/shifts`);
        setShifts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching shifts');
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shift List</h1>
      
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 border-b">Shift Name</th>
            <th className="py-3 px-6 bg-gray-100 border-b">Description</th>
            <th className="py-3 px-6 bg-gray-100 border-b">Branch</th>
            <th className="py-3 px-6 bg-gray-100 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift._id} className="text-center">
              <td className="py-4 px-6 border-b">{shift.name}</td>
              <td className="py-4 px-6 border-b">{shift.description || 'No description'}</td>
              <td className="py-4 px-6 border-b flex items-center justify-center">
                <FaBuilding className="mr-2 text-gray-400" /> 
                {shift.branch ? shift.branch.name : 'N/A'}
              </td>
              <td className="py-4 px-6 border-b">
                {shift.status ? (
                  <span className="flex items-center justify-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-red-600">
                    <FaTimesCircle className="mr-2" />
                    Inactive
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftList;
