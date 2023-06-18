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


export default function Dashboard({userData}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
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
        <ValueWidget name="Wellness Value" value="90" />
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
