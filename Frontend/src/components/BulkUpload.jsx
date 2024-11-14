import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaDownload } from "react-icons/fa";

const BulkUpload = () => {
  const apiUrl = "http://localhost:3000/api/students/bulk-upload";
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

  // Function to download sample template
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Bulk Upload Students
      </h1>

      <div className="mb-8 bg-white rounded-lg p-6 space-y-4">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex flex-col items-center justify-center w-full">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg text-base focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          {file && (
            <p className="text-sm text-gray-600">Selected: {file.name}</p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 text-base sm:text-lg flex items-center justify-center gap-2 transition duration-200"
            disabled={!file}
          >
            <FaUpload />
            Upload Students
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkUpload;
