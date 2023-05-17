import React, { useState } from "react";
import "../assets/css/Login.css";
import logo from "../assets/images/copdeck_logo.png";
import { useNavigate } from "react-router-dom";
import { login, getUserData } from "../AuthService";
import { Button } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      setError("");
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="register-page">
      <img className="logo" src={logo} alt="logo" />
      <form className="register-form">
        <h1 className="login-title">Login</h1>
        <label htmlFor="username" className="login-label">
          Username
        </label>
        <input
          className="text-input"
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
