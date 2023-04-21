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
    <>
      <Header title={"DASHBOARD"} subtitle={"welcome to your dashboard"} />
      <h1>Homepage</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* <MainContent /> Render the main content */}
    </>
  );
}