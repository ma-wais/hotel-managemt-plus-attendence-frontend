import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from "../App";

const EditBranch = () => {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    city: '',
    address: '',
    status: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await axios.get(`${server}/branches/${branchId}`);
        const { name, code, city, address, status } = res.data;
        setFormData({ name, code, city, address, status });
      } catch (err) {
        setError('Failed to fetch branch details: ' + err.message);
      }
    };
    fetchBranch();
  }, [branchId]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.put(`${server}/branches/${branchId}`, formData);
      if (res.status === 200) {
        setSuccess('Branch updated successfully!');
        navigate(`/branch/${branchId}`)
      }
    } catch (err) {
      setError('Failed to update branch: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Edit Branch</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          name="name"
          placeholder="Branch Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="code"
          placeholder="Branch Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <label className="flex items-center mb-4 w-20">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="mr-2"
          />
          Active
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Branch
        </button>
      </form>
    </div>
  );
};

export default EditBranch;