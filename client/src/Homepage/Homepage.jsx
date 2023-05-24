import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getUserData, getRecord  } from "../utils/getData";
import { convertUser, convertRecords } from "../utils/userConverter";
import { isAuthenticated } from "../utils/AuthService";
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
  const isAutenticado = isAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => { 
    setIsLoggedIn(isAutenticado);
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
        const data = await getRecord();
        const convertedRecords = convertRecords(data);
        console.log("Converted records: " + JSON.stringify(convertedRecords))
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
          {isLoggedIn && <Route path="/" element={<Dashboard userData={userData} />} />}
          {isLoggedIn && <Route path="/vitals" element={<Vitals />} />}
          {isLoggedIn && <Route path="/records" element={<Records />} />}
          {isLoggedIn && <Route path="/education" element={<Education />} />}
          {userData && (userData.role == "patient" ? null : <Route path="/patients" element={<PatientData />} />)}
          {isLoggedIn && <Route path="/contacts" element={<Contacts />} />}
          {isLoggedIn && <Route path="/faq" element={<FAQ />} />}
          {isLoggedIn && <Route path="/bar" element={<Bar userRecords={userRecords} />} />}
          {isLoggedIn && <Route path="/form" element={<Form />} />}
          {isLoggedIn && <Route path="/profile" element={<Profile userData={userData} />} />}
          {/* {!isLoggedIn && <Navigate to="/" replace={true} />} */}
        </Routes>
      </main>
    </div>
  );
}
