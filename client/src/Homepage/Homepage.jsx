import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getUserData, getRecords } from "../getData";
import { convertUser, convertRecords } from "../userConverter";
import Dashboard from "../scenes/Dashboard";
import Vitals from "../scenes/Vitals";
import Records from "../scenes/Records";
import Education from "../scenes/Education";
import PatientData from "../scenes/patients";
import Contacts from "../scenes/Contacts";
import Form from "../scenes/form";
import FAQ from "../scenes/faq";
import Bar from "../scenes/bar";
import Profile from "../scenes/profile";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";

export default function Homepage() {
  const [userData, setUserData] = useState(null);
  const [userRecords, setUserRecords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        const convertedData = convertUser(data);
        setUserData(convertedData);
      } catch (error) {
        console.error(error.message);
      }
    }
    const fetchRecords = async () =>{
      try{
        const data = await getRecords();
        console.log("Records data: " + JSON.stringify(data));
        const convertedRecords = convertRecords(data);
        console.log("Converted records: " + convertedRecords)
        setUserRecords(convertedRecords);
      }catch (error){
        console.error(error.message);
      }
    }

    fetchData();
    fetchRecords();
  }, []);

  return (
    <div className="app">
      <Sidebar userData={userData} />
      <main className="content">
        <Topbar userData={userData} />
        <Routes>
          <Route index element={<Dashboard userData={userData} />} />
          <Route path="/vitals" element={<Vitals />} />
          <Route path="/records" element={<Records />} />
          <Route path="/education" element={<Education />} />
          <Route path="/patients" element={<PatientData />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/bar" element={<Bar userRecords={userRecords} />} />
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
