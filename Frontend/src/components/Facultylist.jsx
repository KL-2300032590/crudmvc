import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie, FaEdit, FaTrash, FaPlus, FaEnvelope } from "react-icons/fa";

const Facultylist = () => {
  const apiUrl = "http://localhost:3000/api/faculty";
  const [faculty, setFaculty] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(apiUrl);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${apiUrl}/${editing}`, formData);
        setEditing(null);
      } else {
        await axios.post(apiUrl, formData);
      }
      setFormData({ name: "", email: "", department: "" });
      fetchFaculty();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleEdit = (faculty) => {
    setEditing(faculty._id);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Faculty Management System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white rounded-lg p-6 space-y-4"
      >
        <div className="relative">
          <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 pl-10 border rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 pl-10 border rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="w-full p-2 border rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-black focus:border-black"
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 text-base sm:text-lg flex items-center justify-center gap-2 transition duration-200"
        >
          {editing ? (
            <FaEdit className="text-xl" />
          ) : (
            <FaPlus className="text-xl" />
          )}
          {editing ? "Update Faculty" : "Add Faculty"}
        </button>
      </form>

      <div className="space-y-4">
        {faculty.map((member) => (
          <div
            key={member._id}
            className="bg-white duration-200 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg sm:text-xl text-black">
                  {member.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaEnvelope className="text-gray-400" />
                <p className="text-sm sm:text-base text-gray-600">
                  {member.email}
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Department: {member.department}
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 sm:flex-none bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="flex-1 sm:flex-none bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facultylist;
