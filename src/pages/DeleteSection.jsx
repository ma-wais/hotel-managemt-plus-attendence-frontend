import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { server } from '../App';

const DeleteSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${server}/sections`);
        setSections(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching sections');
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const deleteSection = async (section) => {
    try {
      await axios.delete(`${server}/sections/${section._id}/${section.branch._id}`);
      setSections(sections.filter((item) => item._id !== section._id));
    } catch (err) {
      console.error('Error deleting section:', err);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Section List</h1>
      
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 border-b">Section Name</th>
            <th className="py-3 px-6 bg-gray-100 border-b">Branch</th>
            <th className="py-3 px-6 bg-gray-100 border-b">Status</th>
            <th className="py-3 px-6 bg-gray-100 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section._id} className="text-center">
              <td className="py-4 px-6 border-b">{section.name}</td>
              <td className="py-4 px-6 border-b flex items-center justify-center translate-y-4">
                <FaBuilding className="mr-2 text-gray-400" /> 
                {section.branch ? section.branch.name : 'N/A'}
              </td>
              <td className="py-4 px-6 border-b">
                {section.status ? (
                  <span className="flex items-center justify-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-red-600">
                    <FaTimesCircle className="mr-2" />
                    Inactive
                  </span>
                )}
              </td>
              <td className="py-4 px-6 border-b">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteSection(section)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteSection;
