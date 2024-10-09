import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from "../App";

const AddShift = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);
  const [shifts, setShifts] = useState([]);
  const { branchId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const res = await axios.get(`${server}/branches/${branchId}/shifts`);
      setShifts(res.data);
    } catch (err) {
      console.error("Error fetching shifts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/branches/${branchId}/shifts`, { name, description, status });
      setName('');
      setDescription('');
      setStatus(true);
      fetchShifts();
    } catch (err) {
      console.error("Error creating shift:", err);
    }
  };

  const handleDelete = async (shiftId) => {
    try {
      await axios.delete(`${server}/shifts/${shiftId}/${branchId}`);
      fetchShifts();
    } catch (err) {
      console.error("Error deleting shift:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Add Shift</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Shift Name"
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <label className="my-4 flex w-[100px]">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="mr-1"
          />
          Active
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Shift</button>
      </form>
      <h2 className="text-xl font-bold mb-2">Shifts</h2>
      <ul>
        {shifts.map((shift) => (
          <li key={shift._id} className="flex justify-between items-center mb-2">
            <span>{shift.name} - {shift.description} - {shift.status ? 'Active' : 'Inactive'}</span>
            <button onClick={() => handleDelete(shift._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/branch/${branchId}`)} className="bg-gray-500 text-white p-2 rounded mt-4">Back to Branch</button>
    </div>
  );
};

export default AddShift;