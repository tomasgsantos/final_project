import React from "react";
import "../assets/css/Homepage.css";
import Dashboard from "../scenes/Dashboard/Dashboard";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import { Route, Routes } from "react-router-dom";
import Vitals from "../scenes/Vitals/Vitals";

export default function Homepage() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vitals" element={<Vitals />} />{" "}
          {/* Add this line for /vitals route */}
        </Routes>
      </main>
    </div>
  );
}
