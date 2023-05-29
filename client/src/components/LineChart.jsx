import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Line
      data={chartData}
      options={{
        layout: {
          padding: 5,
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
              color: colors.grey[400],
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
            grid: {
              color: colors.grey[300],
            },
          },
        },
      }}
    />
  );
}

export default LineChart;
