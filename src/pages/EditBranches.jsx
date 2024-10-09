import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../App";
import { FaCodeBranch } from "react-icons/fa";

const EditBranches = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
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
    navigate(`/branches/${branchId}/edit`); 
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Edit Branch</h1>
      </div>
      <div className="flex flex-wrap gap-8">
        {branches.map((branch) => (
          <div key={branch._id} className="flex flex-col items-center">
            <button
              onClick={() => handleBranchClick(branch._id)}
              className="flex justify-between items-center h-20 px-8 w-[380px] shadow-md rounded-lg bg-[rgb(71,70,70)] hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <h2 className="text-md font-medium text-gray-400">
                {branch.name}
              </h2>{" "}
              <FaCodeBranch className="text-3xl text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditBranches;
