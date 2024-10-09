import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../App";
import { FaTrash } from "react-icons/fa";

const DeleteBranch = () => {
  const [branches, setBranches] = useState([]);
  const usertoken = sessionStorage.getItem("userToken");
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const admintoken = sessionStorage.getItem("adminToken");
  const admininfo = JSON.parse(sessionStorage.getItem("adminInfo"));
  console.log(usertoken, userinfo, admintoken, admininfo);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${server}/branches`);
        setBranches(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBranches();
  }, []);

  const handleBranchDelete = (branchId) => {
    try {
      const res = axios.delete(`${server}/branches/${branchId}`);
      setBranches(branches.filter((branch) => branch._id !== branchId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container p-6 mx-auto min-h-screen w-full">
      <h1 className="text-3xl mb-4 font-bold">Branches</h1>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Branch Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Code</th>
              <th className="px-6 py-3 text-left text-sm font-medium">City</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {branches.map((branch) => (
              <tr
                key={branch._id}
                className="hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="px-6 py-4 text-gray-700">{branch.name}</td>
                <td className="px-6 py-4 text-gray-700">{branch.code}</td>
                <td className="px-6 py-4 text-gray-700">{branch.city}</td>
                <td className="px-6 py-4 text-gray-700">{branch.address}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      branch.status
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {branch.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleBranchDelete(branch._id)}
                    className="flex items-center justify-center bg-[rgb(71,70,70)] hover:bg-gray-100 text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out"
                  >
                    <FaTrash className="text-xl" />
                    <span className="ml-2">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteBranch;
