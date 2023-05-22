import React, { useState } from "react";
import "../assets/css/Register.css";
import "../assets/css/Login.css";
import logo from "../assets/images/copdeck_logo.png";
import { useNavigate } from "react-router-dom";
import { login } from "../AuthService";
import { Button } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      setError("");
      navigate("/");
      navigate(0);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="register-page">
      <img className="logo" src={logo} alt="logo" width={300}/>
      <form className="register-form">
        <h1 className="login-title">Login</h1>
        <label htmlFor="email" className="login-label">
          E-mail
        </label>
        <input
          className="text-input"
          type="text"
          placeholder="e-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          className="text-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="login-B"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="registBr-button"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        {error && <p className="error" sx={{color: "black"}}>{error}</p>}
      </form>
    </div>
  );
}
