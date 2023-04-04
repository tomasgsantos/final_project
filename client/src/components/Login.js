import React, { useState } from "react";
import "../css/Login.css";
import logo from "../images/copdeck_logo.png";
import {useNavigate} from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const dbPort = 'http://localhost:5001';
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(`${dbPort}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      setError("");
      navigate('/home');
    } else {
      setError('Invalid credentials');
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
      console.log(data.message);
    } else {
      setError('Authentication failed');
    }
  };

  return (
    <div className="login-form">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="h1">Login</h1>
      <input
        className="text-input"
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="text-input"
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="register-button" onClick={() => navigate('/register')}>Register</button>

      {token && (
        <button onClick={handleProtectedRoute}>
          Access protected route
        </button>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
