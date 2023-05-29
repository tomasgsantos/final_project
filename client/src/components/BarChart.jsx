import React from "react";
import {useTheme} from "@mui/material";
import { tokens } from "../theme";
import {Bar} from "react-chartjs-2"
import {
  Chart,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

Chart.register(PieController, ArcElement, Title, Legend, Tooltip);




function BarChart ({chartData}) {
const theme = useTheme();
const colors = tokens(theme.palette.mode);

  return (
    <Bar
      data={chartData}
      options={{
        layout: {
          padding :5
        },
        scales: {
          y: {
            ticks: {
              color: "white",
              font: {
                size: 14,
              },
            },
            grid: {
              color: colors.grey[300],
            },
          },
          x: {
            ticks: {
              color: "white",
              font: {
                size: 17,
                border: 1,
                borderColor: "white",
              },
            },
            grid:{
              display: false,
            }
          },
        },
      }}
    />
  );
  };

export default BarChart;


    