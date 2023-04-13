import React from "react";
import "../assets/css/Navbar.css";
import logo from "../assets/images/copdeck_logo.png";
import vitals from "../assets/images/lungs.png";
import education from "../assets/images/mortarboard.png";
import { useNavigate } from "react-router-dom"

export default function Navbar(){
  const navigate = useNavigate()

  
  return(
    <div className="navbar">
      <img className="home-icon" onClick={()=>navigate("/home")} src={logo} alt="Home" />
      <img className="nav-icon" onClick={()=>navigate("/vitals")} src={vitals} alt="Home" />
      <img className="nav-icon" onClick={()=>navigate("/education")} src={education} alt="Home" />
      <img className="nav-icon" onClick={()=>navigate("/")} src={vitals} alt="Home" />
      <img className="nav-icon" onClick={()=>navigate("/")} src={vitals} alt="Home" />
      <img className="nav-icon" onClick={()=>navigate("/")} src={vitals} alt="Home" />
      <img className="nav-icon" onClick={()=>navigate("/")} src={vitals} alt="Home" />
    </div>
  )
}