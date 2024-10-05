import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../App";

const AdminDashboard = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminToken = sessionStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/");
    }
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${server}/branches`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setBranches(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBranches();
  }, [adminToken]);

  const handleBranchClick = (branchId) => {
    navigate(`/branch/${branchId}`);
  };

  const handleManageCredentials = (branch) => {
    setSelectedBranch(branch);
    setUsername(branch.username);
    setPassword("");
  };

  const handleSubmitCredentials = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/branches/${selectedBranch._id}/credentials`,
        { username, password },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      alert("Branch credentials updated successfully");
      setSelectedBranch(null);
      const res = await axios.get(`${server}/branches`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setBranches(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update branch credentials");
    }
  };

  return (
    <div className="container p-6 mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl my-10 font-bold">Branches</h1>
        <button
          className="p-2 rounded-lg bg-gray-100"
          onClick={() => navigate("/admin/create-branch")}
        >
          Create Branch
        </button>
      </div>
      <div className="flex flex-wrap gap-8">
        {branches.map((branch) => (
          <div key={branch._id} className="flex flex-col items-center">
            <button
              onClick={() => handleBranchClick(branch._id)}
              className="p-4 shadow-md rounded-lg bg-white hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <h2 className="text-md font-medium">{branch.name}</h2>
            </button>
            <button
              onClick={() => handleManageCredentials(branch)}
              className="p-2 mt-5 rounded-lg bg-white hover:bg-gray-100"
            >
              <h3 className="text-sm font-medium">Manage Creds</h3>
            </button>
          </div>
        ))}
      </div>

      {selectedBranch && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Update Credentials for {selectedBranch.name}
            </h2>
            <form onSubmit={handleSubmitCredentials}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Credentials
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSelectedBranch(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
