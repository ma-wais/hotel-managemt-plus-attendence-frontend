import React, { useState } from 'react';
import axios from 'axios';
import { server } from "../App";

const CreateBranch = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    city: '',
    address: '',
    username: '',
    password: '',
    shifts: [],
    sections: [],
    employees: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`${server}/branches`, formData);
      if (res.status === 201) {
        setSuccess('Branch created successfully!');
        setFormData({
          name: '',
          code: '',
          city: '',
          address: '',
          username: '',
          password: '',
          shifts: [],
          sections: [],
          employees: []
        });
      }
    } catch (err) {
      setError('Failed to create branch: ' + err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Create New Branch</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          type="text"
          name="name"
          placeholder="Branch Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="text"
          name="code"
          placeholder="Branch Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Branch
        </button>
      </form>
    </div>
  );
};

export default CreateBranch;
