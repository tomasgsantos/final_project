import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LandingTopbar from "./LandingTopbar";
import "../assets/css/LandingPage.css"
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

export default function LandingPage(){
  const navigate = useNavigate();
  const theme = useTheme();
  const color = tokens(theme.palette.mode)


  return (
    <div className="app">
      <main className="content">
        <LandingTopbar />
        <div className="landing-content" >
          <h1 className="landing-title">Welcome to Landing Page</h1>
        </div>
      </main>
    </div>
  );
}