import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Studentlist from "./components/Studentlist";
import Facultylist from "./components/Facultylist";
import BulkUpload from "./components/BulkUpload";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-center space-x-6 mb-8">
          <Link
            to="/students" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Students
          </Link>
          <Link
            to="/faculty"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Faculty
          </Link>
          <Link
            to="/bulk-upload"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Bulk Upload
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Studentlist />} />
          <Route path="/students" element={<Studentlist />} />
          <Route path="/faculty" element={<Facultylist />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
