import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../App";
import { FaCodeBranch } from "react-icons/fa";

const BranchDashboard = () => {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

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

  const handleBranchClick = (branchId) => {
    navigate(`/login?branchId=${branchId}`);
  };

  return (
    <div className="container p-6 mx-auto min-h-screen w-full">
      <h1 className="text-3xl my-10 font-bold">Branches</h1>
      <div className="flex flex-wrap gap-8">
        {branches.map((branch) => (
          <button
            onClick={() => handleBranchClick(branch._id)}
            className="flex justify-between items-center h-20 px-8 w-[380px] shadow-md rounded-lg bg-[rgb(71,70,70)] hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <h2 className="text-md font-medium text-gray-400">{branch.name}</h2>
            <FaCodeBranch className="text-3xl text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchDashboard;
