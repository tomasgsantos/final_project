import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import "../../assets/css/Results.css";

export default function Results({sitStand}){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  const [sitStandCalibration, setSitStandCalibration] = useState("");
  const [sitStandResults, setSitStandResults] = useState("");

  



  return (
    <div className="content">
      <Header title={"Test Results"}></Header>
      <div className="main-div">
        <div className="left-div">
          <p>Results Comming Soon !!!</p>
          {sitStandResults && JSON.stringify(sitStandResults)} 
        </div>
        <div className="right-div">
          <p>6 Minute Walk Test</p>
        </div>
      </div>
    </div>
  );
}