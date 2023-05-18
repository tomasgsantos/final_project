import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register.css";
import { Button } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [copdSeverity, setCopdSeverity] = React.useState("");
  const [heightInCm, setHeightInCm] = React.useState("");
  const [weightInKg, setWeightInKg] = React.useState("");
  const dbPort = "http://localhost:5001";
    

  function handleRegister() {
    const crypto = require("crypto");

    // Generate a random salt value
    const generateSalt = () => {
      return crypto.randomBytes(16).toString("hex");
    };

    // Example usage
    const salt = generateSalt();
    if (
      email.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      dateOfBirth.length === 0 ||
      copdSeverity.length === 0 ||
      heightInCm.length === 0 ||
      weightInKg.length === 0
    ) {
      alert("Please fill in all fields");
    } else {
      fetch(`${dbPort}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          salt: salt,
          name: name,
          dateOfBirth: dateOfBirth,
          copdSeverity: copdSeverity,
          heightInCm: heightInCm,
          weightInKg: weightInKg,
        }),
      })
        .then((res) => res.json())
        .then(() => navigate("/home"))
        .catch((err) => {
          console.error(err);
          alert("Error occurred during registration");
        });
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
          Back to Login
        </Button>
      </form>
    </div>
  );
}
