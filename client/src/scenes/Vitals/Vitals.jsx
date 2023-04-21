import React from "react";
import "../../assets/css/Vitals.css";
import { useEffect } from "react";

export default function Vitals(){
  useEffect(() =>{
    console.log("vitlas loaded")
  },[])
  
  return(
    <div className="page">
      <h1 className="red">Vitals</h1>
    </div>
  )
}