import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { server } from "../App";

const TransferEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get(`${server}/branches`);
        setBranches(res.data.map(branch => ({ value: branch._id, label: branch.name })));
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      if (selectedBranch) {
        try {
          const res = await axios.get(`${server}/branches/${selectedBranch.value}/sections`);
          setSections(res.data.map(section => ({ value: section._id, label: section.name })));
        } catch (err) {
          console.error("Error fetching sections:", err);
        }
      }
    };
    fetchSections();
  }, [selectedBranch]);

  useEffect(() => {
    const fetchShifts = async () => {
      if (selectedSection) {
        try {
          const res = await axios.get(`${server}/branches/${selectedBranch.value}/shifts`);
          setShifts(res.data.map(shift => ({ value: shift._id, label: shift.name })));
        } catch (err) {
          console.error("Error fetching shifts:", err);
        }
      }
    };
    fetchShifts();
  }, [selectedSection]);

  // Handle employee transfer
  const handleTransfer = async () => {
    try {
      await axios.put(`${server}/employees/${employeeId}/transfer`, {
        newBranchId: selectedBranch.value,
        newSectionId: selectedSection.value,
        newShiftId: selectedShift.value,
      });
      alert("Employee transferred successfully");
      navigate(`/branch/${selectedBranch.value}`);
    } catch (err) {
      console.error("Error transferring employee:", err);
      alert("Error transferring employee");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl mb-4">Transfer Employee</h1>

      <Select
        options={branches}
        value={selectedBranch}
        onChange={setSelectedBranch}
        placeholder="Select New Branch"
      />

      {selectedBranch && (
        <div className="mt-4">
          <Select
            options={sections}
            value={selectedSection}
            onChange={setSelectedSection}
            placeholder="Select Section"
          />
        </div>
      )}

      {selectedSection && (
        <div className="mt-4">
          <Select
            options={shifts}
            value={selectedShift}
            onChange={setSelectedShift}
            placeholder="Select Shift"
          />
        </div>
      )}

      <button
        className="mt-6 bg-blue-500 text-white p-2 rounded"
        onClick={handleTransfer}
        disabled={!selectedShift}
      >
        Transfer Employee
      </button>
    </div>
  );
};

export default TransferEmployee;
