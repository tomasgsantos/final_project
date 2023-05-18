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

export default function Bar({userRecords}) {
  console.log("Bar userRecords: ", userRecords);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paco2, setPaco2] = useState(null);
  const [pao2, setPao2] = useState(null);
  const [respiratoryFreq, setRespiratoryFreq] = useState(null);
  const [temperature, setTemperature] = useState(null);
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
    if(userRecords){
    setPaco2(userRecords.paco2);
    setPao2(userRecords.pao2);
    setRespiratoryFreq(userRecords.respiratory_freq);
    setTemperature(userRecords.temperature);
    }
  }, [userRecords]);

  return (
    <Box className="content-box">
      <Header title="Your Charts" />
      <Typography variant="h5" sx={{ m: 10 }}>
        This is your Data! Here you have displayed in simple charts your
        Wellness Value troughout the week.
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
        <ValueWidget name="Wellness Value" value="90" />
        {paco2 ? (
          <ValueWidget name="PaCO2" value={paco2} />
        ) : (
          <Typography>Loading PaCO2...</Typography>
        )}

        {pao2 ? (
          <ValueWidget name="PaO2" value={pao2} />
        ) : (
          <Typography>Loading PaO2...</Typography>
        )}

        {temperature ? (
          <ValueWidget name="Temperature" value={temperature} />
        ) : (
          <Typography>Loading Temperature...</Typography>
        )}
      </div>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <LineChart chartData={userData} />
      </Box>
    </Box>
  );
}
