import React, {useState} from 'react';
import Header from "../../components/Header"
import {useNavigate} from "react-router-dom";
import { Box} from "@mui/material"
import BarChart from '../../components/BarChart';
import { userBarData } from "../../data/mockData";
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import LineChart from '../../components/LineChart';


export default function Dashboard(){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate()
  

  const [userData, setUserData] = useState({
    labels: userBarData.map((data) => data.day),
    datasets: [
      {
        label: "Wellness Value",
        data: userBarData.map((data) => data.wv),
        color: ["white"],
        backgroundColor: userBarData.map((data) =>
          data.wv > 75 ? colors.green[500] : colors.red[500],
        ),
      },
    ],
  });

  return (
    <div>
      <Header title={"Dashboard"} subtitle={"welcome to your dashboard"} />
      <Box className="dashboard-box">
        <BarChart className="dasboard-content" chartData={userData} />
        <LineChart className="dashboard-content"chartData={userData} />
      </Box>
    </div>
  );
}