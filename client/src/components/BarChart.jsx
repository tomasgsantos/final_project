import React from "react";
import {useTheme} from "@mui/material";
import { tokens } from "../theme";
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'




function BarChart ({chartData}) {
const theme = useTheme();
const colors = tokens(theme.palette.mode);

  return <Bar data={chartData} />
  };

export default BarChart;