import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { server } from "../App";

const AdminAddEmployee = () => {
  const location = useLocation();
  const [branches, setBranches] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [sections, setSections] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [shiftId, setShiftId] = useState("");
  const [sectionId, setSectionId] = useState("");

  const showBranches = location.pathname.includes("/admin");
  console.log("Show Branches:", showBranches);

  const [employeeData, setEmployeeData] = useState({
    name: "",
    fatherName: "",
    address: "",
    contact: "",
    joiningDate: "",
    status: true,
    CNIC: "",
    designation: "",
    salary: "",
  });

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

  useEffect(() => {
    if (branchId) {
      const fetchSections = async () => {
        try {
          const res = await axios.get(
            `${server}/branches/${branchId}/sections`
          );
          setSections(res.data);
        } catch (err) {
          console.error("Error fetching sections:", err);
        }
      };
      fetchSections();
    }
  }, [branchId]);

  useEffect(() => {
    const fetchShifts = async () => {
      if (sectionId) {
        try {
          const res = await axios.get(`${server}/branches/${branchId}/shifts`);
          setShifts(res.data);
        } catch (err) {
          console.error("Error fetching shifts:", err);
        }
      }
    };
    fetchShifts();
  }, [branchId, sectionId]);

  const handleBranchChange = (e) => {
    setBranchId(e.value);
    setSections([]);
    setShifts([]);
  };
  const handleChange = (e) => {
    const value =
      e.target.name === "status" ? e.target.value === "true" : e.target.value;

    setEmployeeData({
      ...employeeData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}/branches/${branchId}/employees`, {
        ...employeeData,
        shift: shiftId,
        section: sectionId,
      });
      alert("Employee added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl mb-4">Select a Branch to Add Employee</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>
          <label className="block">Select Branch</label>
          <Select
            options={branches.map((branch) => ({
              value: branch._id,
              label: branch.name,
            }))}
            onChange={handleBranchChange}
            className="w-[300px]"
          />
        </div>

        {branchId && (
          <div>
            <label className="block">Select Section</label>
            <Select
              options={sections.map((section) => ({
                value: section._id,
                label: section.name,
              }))}
              className="w-[300px]"
              onChange={(option) => setSectionId(option.value)}
            />
          </div>
        )}

        {sectionId && (
          <div className="mb-4">
            <label className="block">Select Shift</label>
            <Select
              options={shifts.map((shift) => ({
                value: shift._id,
                label: shift.name,
              }))}
              className="w-[300px]"
              onChange={(option) => setShiftId(option.value)}
            />
          </div>
        )}
      </div>

      {shiftId && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={employeeData.fatherName}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Address</label>
              <input
                type="text"
                name="address"
                value={employeeData.address}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="block">Contact</label>
              <input
                type="text"
                name="contact"
                value={employeeData.contact}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={employeeData.joiningDate}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <select
              name="status"
              id="status"
              onChange={handleChange}
              value={employeeData.status.toString()}
              className="border h-11 outline-none translate-y-6"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">CNIC</label>
              <input
                type="text"
                name="CNIC"
                value={employeeData.CNIC}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <div>
              <label className="block">Designation</label>
              <input
                type="text"
                name="designation"
                value={employeeData.designation}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Salary</label>
              <input
                type="number"
                name="salary"
                value={employeeData.salary}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 h-10 ml-auto mt-8 text-white p-2 rounded"
            >
              Add Employee
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminAddEmployee;
