import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEnvelope,
} from "react-icons/fa";

const Studentlist = () => {
  const apiUrl = "http://localhost:3000/api/students";
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
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
      setFormData({ name: "", email: "", grade: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditing(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      grade: student.grade,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Student Management System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white rounded-lg p-6 space-y-4"
      >
        <div className="relative">
          <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 pl-10 border rounded-lg text-base sm:text-lg focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
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
          placeholder="Grade"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
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
          {editing ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white duration-200 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg sm:text-xl text-black">
                  {student.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaEnvelope className="text-gray-600" />
                <p className="text-sm sm:text-base text-gray-600">
                  {student.email}
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Grade: {student.grade}
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleEdit(student)}
                className="flex-1 sm:flex-none bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(student._id)}
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

export default Studentlist;
