import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import { BiLock, BiUser } from "react-icons/bi";
import { CgLogIn } from "react-icons/cg";

const BranchLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const branchId = new URLSearchParams(location.search).get("branchId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/branches/auth`, {
        username,
        password,
        branchId,
      });
      if (response.data.branch) {
        localStorage.setItem(
          "branchInfo",
          JSON.stringify(response.data.branch)
        );
        navigate(`/branch/${response.data.branch._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] m-auto w-[400px]">
      <div className="w-full max-w-md px-8 py-6 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Branch Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="flex items-center">
                <BiUser className="absolute left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2 border focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center">
                <BiLock className="absolute left-3 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2 border focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="flex px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                <CgLogIn className="mr-2 translate-y-1 -translate-x-2" size={18} />
                Login
              </button>
            </div>
          </div>
        </form>
        {error && (
          <p className="text-red-500 max-w-[200px] text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default BranchLogin;
