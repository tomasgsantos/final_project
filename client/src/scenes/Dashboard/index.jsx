import React from 'react';
import Header from "../../components/Header"
import {useNavigate} from "react-router-dom";
import {logout} from "../../AuthService"

export default function Dashboard(){

  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Header title={"Dashboard"} subtitle={"welcome to your dashboard"} />
      <h1>Homepage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}