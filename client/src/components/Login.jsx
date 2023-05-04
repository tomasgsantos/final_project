import React, { useState } from "react";
import "../assets/css/Login.css";
import logo from "../assets/images/copdeck_logo.png";
import { useNavigate } from "react-router-dom";
import { login } from "../AuthService";
import { Button } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const dbPort = "http://localhost:5001";
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      setError("");
      localStorage.setItem("user", username)
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleProtectedRoute = async () => {
    const response = await fetch(`${dbPort}/api/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      setError("Authentication failed");
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

        {token && (
          <button onClick={handleProtectedRoute}>Access protected route</button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
