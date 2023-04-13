import React from "react";
import "../assets/css/Vitals.css";
import Navbar from "./Navbar";

export default function Vitals(){
  return(
    <div className="page">
      <Navbar className="navbar" />
      <h1 className="red">Vitals</h1>
    </div>
  )
}