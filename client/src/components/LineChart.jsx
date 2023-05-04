import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return <Line data={chartData} />;
}

export default LineChart;
