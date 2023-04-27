import React from "react";
import "../assets/css/Homepage.css";
import Dashboard from "../scenes/Dashboard";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import { Route, Routes } from "react-router-dom";
import Vitals from "../scenes/Vitals";
import Records from "../scenes/Records";
import Education from "../scenes/Education";
import PatientData from "../scenes/patients";
import Contacts from "../scenes/Contacts";
import Form from "../scenes/form";
import FAQ from "../scenes/faq";
import Bar from "../scenes/bar";

export default function Homepage() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/vitals" element={<Vitals />} />
          <Route path="/records" element={<Records />} />
          <Route path="/education" element={<Education />} />
          <Route path="/patients" element={<PatientData />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<FAQ />}/>
          <Route path="/bar" element={<Bar />}/>
          <Route path="/form" element={<Form />}/>
        </Routes>
      </main>
    </div>
  );
}
