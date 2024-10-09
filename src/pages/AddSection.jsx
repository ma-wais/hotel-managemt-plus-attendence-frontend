import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";

const AddSection = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { branchId } = useParams();
  const navigate = useNavigate();

  const fetchSections = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${server}/branches/${branchId}/sections`
      );
      setSections(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [branchId]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/branches/${branchId}/sections`,
        { name, status }
      );
      setName("");
      setStatus(true);
      fetchSections();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (sectionId) => {
    try {
      await axios.delete(
        `${server}/sections/${sectionId}/${branchId}`
      );
      fetchSections();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Add Section</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Section Name"
            className="border p-2 mr-2"
            required
          />
          <label className="mr-2 flex">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="m-2"
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          Add Section
        </button>
      </form>
      <h2 className="text-xl font-bold mb-2">Sections</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {sections.map((section) => (
            <li
              key={section._id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {section.name} - {section.status ? "Active" : "Inactive"}
              </span>
              <button
                onClick={() => handleDelete(section._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => navigate(`/branch/${branchId}`)}
        className="bg-gray-500 text-white p-2 rounded mt-4"
      >
        Back to Branch
      </button>
    </div>
  );
};

export default AddSection;
