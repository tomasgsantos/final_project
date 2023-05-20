import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { userBarData } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import "../../assets/css/bar.css";
import { useNavigate } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ValueWidget from "../../components/ValueWidget";

export default function Bar({ userRecords }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    labels: userBarData.map((data) => data.day),
    datasets: [
      {
        label: "Wellness Value",
        data: userBarData.map((data) => data.wv),
        color: ["white"],
        backgroundColor: userBarData.map((data) =>
          data.wv > 75 ? "green" : "red"
        ),
      },
    ],
  });

  useEffect(() => {
    if (userRecords) {
      console.log("userRecords Bar: " + userRecords);
    }
  }, [userRecords]);

  return (
    <Box className="content-box">
      <Header title="Your Charts" />
      <Typography variant="h5" sx={{ m: 10 }}>
        This is your Data! Here you have displayed in simple charts your
        Wellness Value throughout the week.
      </Typography>

      <div className="learn-more">
        <Typography className="learn-text" variant="h5">
          Learn more about your Data here!
        </Typography>
        <Button
          variant="learn-btn"
          sx={{ backgroundColor: colors.green[500], height: "40px" }}
          onClick={() => navigate("/home/education")}
        >
          <SchoolOutlinedIcon />
        </Button>
      </div>
      <div className="widgets">
        {userRecords && (userRecords.map((record) => {
          const { sensorPurpose, value } = record;

          switch (sensorPurpose) {
            case "paco2":
              return value ? (
                <ValueWidget name="PaCO2" value={value} />
              ) : (
                <Typography>Loading CO2 Blood Pressure...</Typography>
              );
            case "pao2":
              return value ? (
                <ValueWidget name="PaO2" value={value} />
              ) : (
                <Typography>Loading O2 Blood Pressure...</Typography>
              );
            case "respiratory rate":
              return value ? (
                <ValueWidget name="Respiratory Frequency" value={value} />
              ) : (
                <Typography>Loading Respiratory Frequency...</Typography>
              );
            case "temperature":
              return value ? (
                <ValueWidget name="Temperature" value={value} />
              ) : (
                <Typography>Loading Temperature...</Typography>
              );
            default:
              return null;
          }
        }))}
      </div>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <LineChart chartData={userData} />
      </Box>
      {/* <Box className="chart-box" height="75vh">
        <BarChart chartData={} />
      </Box> */}
    </Box>
  );
}
