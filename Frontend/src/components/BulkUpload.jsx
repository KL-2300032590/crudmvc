import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaDownload, FaFileAlt } from "react-icons/fa";

const BulkUpload = () => {
  const apiUrl = "https://crudmvc-1-5qnp.onrender.com/api/students/bulk-upload";
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`Success! ${response.data.count} students uploaded.`);
      setFile(null);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Upload failed");
      console.error("Upload error details:", error.response?.data);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "name,email,grade\nJohn Doe,john@example.com,A";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
            Bulk Upload Students
          </h1>
          <p className="text-lg text-gray-600">
            Upload multiple students at once using a CSV file
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <button
              onClick={downloadTemplate}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition duration-200"
            >
              <FaDownload className="text-xl" />
              <span className="font-medium">Download Sample Template</span>
            </button>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  className="w-full flex flex-col items-center px-4 py-6 bg-indigo-50 text-indigo-700 rounded-xl border-2 border-dashed border-indigo-300 cursor-pointer hover:bg-indigo-100 transition duration-200"
                >
                  <FaFileAlt className="text-3xl mb-3" />
                  <span className="text-sm font-medium mb-1">Choose a file</span>
                  <span className="text-xs text-gray-500">CSV, XLSX or XLS</span>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {file && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  Selected file: {file.name}
                </div>
              )}
              
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              {message && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!file}
              >
                <FaUpload className="text-xl" />
                <span className="font-medium">Upload Students</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
