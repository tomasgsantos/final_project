import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

export default function Bar(){
  return(
    <Box>
      <Header title="Bar Chart" subtitle="Simple bar chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  )
}