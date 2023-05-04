import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { userBarData } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import "../../assets/css/bar.css";

export default function Bar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  return (
    <Box className="content-box">
      <Header title="Bar Chart" subtitle="Simple bar chart" />
      <Typography variant="h5" sx={{m: 10}}>
        This is your Data! Here you have displayed in simple charts your
        Wellness Value troughout the week
      </Typography>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <LineChart chartData={userData} />
      </Box>
    </Box>
  );
}
