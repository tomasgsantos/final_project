import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register.css";
import { Button } from "@mui/material";
import { register } from "../utils/AuthService";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [copdSeverity, setCopdSeverity] = React.useState("");
  const [heightInCm, setHeightInCm] = React.useState("");
  const [weightInKg, setWeightInKg] = React.useState("");
  
  const [error, setError] = useState("");
    

  const handleRegister = async () => {
    try{
      await register(email, password, name, dateOfBirth, copdSeverity, heightInCm, weightInKg)
      setError("")
      navigate("/")
    }catch(err){
      console.log(err)
      alert("An error has occurred while Registering")
    }
  }

  return (
    <div className="register-page">
      <form className="register-form">
        <h1 className="title">Register</h1>
        <input
          className="text-input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="date-input"
          type="text"
          placeholder="Date of Birth (MMDDAAAA)"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          className="text-input"
          type="text"
          placeholder="COPD Severity"
          name="copdSeverity"
          value={copdSeverity}
          onChange={(e) => setCopdSeverity(e.target.value)}
        />
        <input
          className="text-input"
          type="float"
          placeholder="Height (cm)"
          name="heightInCm"
          value={heightInCm}
          onChange={(e) => setHeightInCm(e.target.value)}
        />
        <input
          className="text-input"
          type="number"
          placeholder="Weight (kg)"
          name="weightInKg"
          value={weightInKg}
          onChange={(e) => setWeightInKg(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to the Landing Page
        </Button>
      </form>
    </div>
  );
}
