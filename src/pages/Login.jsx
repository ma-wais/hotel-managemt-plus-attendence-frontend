import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from "../App";
import { BiLock, BiUser } from 'react-icons/bi';
import { CgLogIn } from 'react-icons/cg';
import { RiRefreshFill } from 'react-icons/ri';

const UnifiedLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isAdmin 
      ? `${server}/auth/admin/login`
      : `${server}/auth/login`;
    
    try {
      const response = await axios.post(endpoint, { username, password });
      if (response.data.token) {
        const tokenKey = isAdmin ? 'adminToken' : 'userToken';
        const infoKey = isAdmin ? 'adminInfo' : 'userInfo';
        sessionStorage.setItem(tokenKey, response.data.token);
        sessionStorage.setItem(infoKey, JSON.stringify(response.data));
        navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const toggleLoginType = () => {
    setIsAdmin(!isAdmin);
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen m-auto w-[400px]">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {isAdmin ? 'Admin Login' : 'User Login'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center"
              >
                <CgLogIn className="mr-2" size={18} />
                Login
              </button>
              <aside
                type="button"
                onClick={toggleLoginType}
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
              >
                <RiRefreshFill className="mr-1" size={14} />
                {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
              </aside>
            </div>
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default UnifiedLogin;