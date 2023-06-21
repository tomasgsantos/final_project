import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getUserData, getRecord, getFaq, getSitStand, getWalkTest, getCat } from "../utils/getData";
import { convertUser, convertRecords } from "../utils/userConverter";
import { calcSitStand, calcWalkResults, calcVarResults, calcCatResults } from "../utils/Calc";
import { isAuthenticated } from "../utils/AuthService";
import Dashboard from "../scenes/Dashboard";
import Vitals from "../scenes/Vitals";
import Education from "../scenes/Education";
import PatientData from "../scenes/patients";
import Contacts from "../scenes/Contacts";
import Form from "../scenes/form";
import FAQ from "../scenes/faq";
import Bar from "../scenes/bar";
import Profile from "../scenes/profile";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import Cat from "../scenes/Cat";
import Results from "../scenes/Results";

export default function Homepage() {
  const [userData, setUserData] = useState(null);
  const [faq , setFaq] = useState(null);
  const isAutenticado = isAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRecords, setUserRecords] = useState(null);
  const [varResults, setVarResults] = useState(null);
  const [sitStand, setSitStand] = useState(null);
  const [sitTestResults, setSitTestResults] = useState(null);
  const [walkResults, setWalkResults] = useState(null);
  const [walkTestResults, setWalkTestResults] = useState(null);
  const [cat, setCat]= useState(null); 
  const [catResults, setCatResults]= useState(null);

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
        setUserRecords(convertedRecords);
      }catch (error){
        console.error(error.message);
      }
    }
    const fetchFaq = async () =>{
      try{
        const data = await getFaq();
        setFaq(data);
      }catch(err){
        console.error(err.message);
      }
    }
    const fetchSitStand = async () =>{
      try{
        const data = await getSitStand();
        setSitStand(data);
      }catch(err){
        console.error(err.message);
      }
    }
    const fetchWalkTest = async () =>{
      try{
        const data = await getWalkTest();
        setWalkResults(data);
      }catch(err){
        console.error(err.message);
      }
    } 
    const fetchCat = async () => {
      try{
        const data = await getCat();
        setCat(data);

      }catch(err){
        console.error(err.message);
      }
    }

    fetchData();
    fetchRecords();
    fetchFaq();
    fetchSitStand();
    fetchWalkTest();
    fetchCat();
  }, []);

  useEffect(()=>{
    if(sitStand){
      const data = calcSitStand(sitStand);
      setSitTestResults(data);
    }
  }, [sitStand]);

  useEffect(()=>{
    if(walkResults){
      const data = calcWalkResults(walkResults);
      setWalkTestResults(data);
    }
  }, [walkResults]);

  useEffect(()=>{
    if(userRecords){
      const data = calcVarResults(userRecords);
      setVarResults(data.allVariablesImpact);
    }
  },[userRecords]);

  useEffect(()=>{
    if(cat){
      const data = calcCatResults(cat);
      setCatResults(data)
    }
  },[cat]);

  
  return (
    <div className="app">
      <Sidebar userData={userData} />
      <main className="content">
        <Topbar userData={userData} />
        <Routes>
          {isLoggedIn && <Route path="/" element={<Dashboard userData={userData} sitTestResults={sitTestResults} walkTestResults={walkTestResults} varResults={varResults} catResults={catResults}/>} />}
          {isLoggedIn && <Route path="/vitals" element={<Vitals />} />}
          {isLoggedIn && <Route path="/education" element={<Education />} />}
          {userData && (userData.role == "patient" ? null : <Route path="/patients" element={<PatientData />} />)}
          {isLoggedIn && <Route path="/contacts" element={<Contacts />} />}
          {isLoggedIn && <Route path="/faq" element={<FAQ faqData={faq}/>} />}
          {isLoggedIn && <Route path="/bar" element={<Bar userRecords={userRecords} />} />}
          {isLoggedIn && <Route path="/form" element={<Form />} />}
          {isLoggedIn && <Route path="/profile" element={<Profile userData={userData} />} />}
          {isLoggedIn && <Route path="/cat" element={<Cat />} />}
          {isLoggedIn && <Route path="/results" element={<Results sitStand={sitStand} />} />}
          {/* {!isLoggedIn && <Navigate to="/" replace={true} />} */}
        </Routes>
      </main>
    </div>
  );
}
