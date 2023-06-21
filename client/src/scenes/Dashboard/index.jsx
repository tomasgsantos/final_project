import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import BarChart from "../../components/BarChart";
import { userBarData } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import "../../assets/css/Dashboard.css";
import ValueWidget from "../../components/ValueWidget";
import { calcCatResults } from "../../utils/Calc";


export default function Dashboard({userData, sitTestResults, walkTestResults, varResults, catResults}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [wellnessValue, setWellnessValue] = useState(null);
  
  useEffect(()=>{
    if(catResults){
      const valorFinal = (((sitTestResults + walkTestResults)/ 2 ) * 0.3) + (catResults * 0.3) + (varResults * 0.4);
      setWellnessValue(valorFinal);
    }
  },[catResults, sitTestResults, varResults, walkTestResults])


  const [userGraphData, setUserGraphData] = useState({
    labels: userBarData.map((data) => data.day),
    datasets: [
      {
        label: "Wellness Value",
        data: userBarData.map((data) => data.wv),
        color: ["white"],
        backgroundColor: userBarData.map((data) => {
          if (data.wv >= 75) {
            return "#5ee432"; // Green
          } else if (data.wv > 50) {
            return "#fffa50"; // Yellow
          } else if (data.wv > 25) {
            return "#f7aa38"; // Orange
          } else {
            return "#ef4655"; // Red
          }
        }),
      },
    ],
  });


  

  const handleBarClick = () => {
    navigate("/home/bar");
  };
  

  return (
    <div>
      <Header title={"Dashboard"} subtitle={"Welcome to your dashboard"} />
      <div className="dashboard-widgets">
        <ValueWidget name="Wellness Value" value={wellnessValue} />
      </div>
      <Typography className="dashboard-typography" variant="h4" color="white">
        Your Charts
      </Typography>
      <Box className="dashboard-row">
        <Box className="dashboard-box">
          <BarChart
            className="dashboard-content"
            chartData={userGraphData}
            onClick={handleBarClick}
          />
        </Box>
        <Box className="dashboard-box">
          <LineChart
            className="dashboard-content"
            chartData={userGraphData}
            onClick={handleBarClick}
          />
        </Box>
      </Box>
    </div>
  );
}
