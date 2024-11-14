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
  const apiUrl = "https://crudmvc-1-5qnp.onrender.com/api/students";
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    phoneNumber: "",
    address: "",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-12">
          Student Directory
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-indigo-900 mb-6">
                {editing ? "Edit Student" : "Add New Student"}
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <input
                    type="text"
                    placeholder="Enter grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2"
              >
                {editing ? <FaEdit /> : <FaPlus />}
                {editing ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>

          {/* Students List Section */}
          <div className="md:col-span-2">
            <div className="grid gap-4">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-900">
                        {student.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-gray-600">
                        <FaEnvelope className="text-indigo-500" />
                        <span>{student.email}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          Grade: {student.grade}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="inline-flex items-center px-4 py-2 border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-50 transition duration-200"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentlist;
