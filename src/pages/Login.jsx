import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from "../App";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">{isAdmin ? 'Admin Login' : 'User Login'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login
              </button>
              <button
                type="button"
                onClick={toggleLoginType}
                className="text-sm text-blue-600 bg-transparent hover:underline"
              >
                {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
              </button>
            </div>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UnifiedLogin;