import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getUserData, getRecord, getFaq, getSitWvStand, getWalkWvTest, getCat } from "../utils/getData";
import { convertUser, convertRecords } from "../utils/userConverter";
import { calcSitWvStand, calcWalkWvResults, calcVarResults, calcCatResults } from "../utils/Calc";
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
  const [sitWvStand, setSitWvStand] = useState(null);
  const [sitWvTestResults, setSitWvTestResults] = useState(null);
  const [walkWvResults, setWalkWvResults] = useState(null);
  const [walkWvTestResults, setWalkWvTestResults] = useState(null);
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
    const fetchSitWvStand = async () =>{
      try{
        const data = await getSitWvStand();
        setSitWvStand(data);
      }catch(err){
        console.error(err.message);
      }
    }
    const fetchWalkWvTest = async () =>{
      try{
        const data = await getWalkWvTest();
        setWalkWvResults(data);
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
    fetchSitWvStand();
    fetchWalkWvTest();
    fetchCat();
  }, []);

  useEffect(()=>{
    if(sitWvStand){
      const data = calcSitWvStand(sitWvStand);
      setSitWvTestResults(data);
      console.log("sit: "+sitWvTestResults)
    }
  }, [sitWvStand]);

  useEffect(()=>{
    if(walkWvResults){
      const data = calcWalkWvResults(walkWvResults);
      setWalkWvTestResults(data);
      console.log("walk: "+walkWvTestResults)
    }
  }, [walkWvResults]);

  useEffect(()=>{
    if(userRecords){
      const data = calcVarResults(userRecords);
      setVarResults(data.allVariablesImpact);
      console.log("var: "+ varResults)
    }
  },[userRecords]);

  useEffect(()=>{
    if(cat){
      const data = calcCatResults(cat);
      setCatResults(data)
      console.log("cat: " + catResults)
    }
  },[cat]);

  
  return (
    <div className="app">
      <Sidebar userData={userData} />
      <main className="content">
        <Topbar userData={userData} />
        <Routes>
          {isLoggedIn && <Route path="/" element={<Dashboard userData={userData} sitWvTestResults={sitWvTestResults} walkWvTestResults={walkWvTestResults} varResults={varResults} catResults={catResults}/>} />}
          {isLoggedIn && <Route path="/vitals" element={<Vitals />} />}
          {isLoggedIn && <Route path="/education" element={<Education />} />}
          {userData && (userData.role == "patient" ? null : <Route path="/patients" element={<PatientData />} />)}
          {isLoggedIn && <Route path="/contacts" element={<Contacts />} />}
          {isLoggedIn && <Route path="/faq" element={<FAQ faqData={faq}/>} />}
          {isLoggedIn && <Route path="/bar" element={<Bar userRecords={userRecords} />} />}
          {isLoggedIn && <Route path="/form" element={<Form />} />}
          {isLoggedIn && <Route path="/profile" element={<Profile userData={userData} />} />}
          {isLoggedIn && <Route path="/cat" element={<Cat />} />}
          {isLoggedIn && <Route path="/results" element={<Results />} />}
          {/* {!isLoggedIn && <Navigate to="/" replace={true} />} */}
        </Routes>
      </main>
    </div>
  );
}
