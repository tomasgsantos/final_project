import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Line
      data={chartData}
      options={{
        plugins: {
          legend: {
            labels: {
              color: colors.grey[100],
              font: {
                size: 14,
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 5,
        },
        scales: {
          y: {
            ticks: {
              color: "white",
              font: {
                size: 12,
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
                size: 12,
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
