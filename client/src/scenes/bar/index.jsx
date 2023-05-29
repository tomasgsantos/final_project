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
import { getChartData } from "../../utils/getData";
import { formatDate } from "../../utils/FormatDate";


export default function Bar({ userRecords }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paco2, setPaco2] = useState(null);
  const [pao2, setPao2] = useState(null);
  const [rr, setRr] = useState(null);
  const [t, setT] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRecords) {
      console.log("userRecords Bar: " + userRecords);
    }
  }, [userRecords]);

  

  useEffect(() => {
    const fetchHealthValues = async () => {
      try {
        const paco2Data = await getChartData("1");
        const pao2Data = await getChartData("2");
        const rrData = await getChartData("3");
        const tData = await getChartData("4");
        // paco2Data.reverse();
        const formattedPaco2Data = paco2Data.map((data) => {
          return {
            ...data,
            timestamp: formatDate(data.timestamp),
          };
        });
        const formattedPao2Data = pao2Data.map((data) => {
          return {
            ...data,
            timestamp: formatDate(data.timestamp),
          };
        });
        const formattedRrData = rrData.map((data) => {
          return {
            ...data,
            timestamp: formatDate(data.timestamp),
          };
        });
        const formattedTData = tData.map((data) => {
          return {
            ...data,
            timestamp: formatDate(data.timestamp),
          };
        });
        formattedPaco2Data.reverse();
        formattedPao2Data.reverse();
        formattedRrData.reverse();
        formattedTData.reverse();
        setPaco2(formattedPaco2Data);
        setPao2(formattedPao2Data);
        setRr(formattedRrData);
        setT(formattedTData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchHealthValues();
  }, []);
  
  const [userData, setUserData] = useState({
    labels: userBarData.map((data) => data.day),
    datasets: [
      {
        label: "Wellness Value",
        data: userBarData.map((data) => data.wv),
        backgroundColor: userBarData.map((data) =>
          data.wv > 75 ? colors.green[600] : colors.red[500]
        ),
        pointRadius: 5,
        borderColor: colors.grey[200],
      },
    ],
  });



  //Medical parameter healthy threshold values
  const paco2Threshold = 47 ;//mmHg
  const pao2Threshold = 60 ;//mmHg
  const rrThreshold = 25 ;//bpm
  const tThreshold = 37 ;// Cº



  const paco2ChartData = {
    labels: paco2 ? paco2.map((data) => data.timestamp) : [],
    datasets: [
      {
        label: "Carbon Dioxide Blood Pressure",
        data: paco2 ? paco2.map((data) => data.value) : [],
        backgroundColor: paco2
          ? paco2.map((data) => (data.value > paco2Threshold ? colors.red[500] : colors.green[600]))
          : [],
      },
    ],
  };
  const pao2ChartData = {
    labels: pao2 ? pao2.map((data) => data.timestamp) : [],
    datasets: [
      {
        label: "Oxygen Blood Pressure",
        data: pao2 ? pao2.map((data) => data.value) : [],
        backgroundColor: pao2
          ? pao2.map((data) => (data.value < pao2Threshold ? colors.red[500] : colors.green[600]))
          : [],
      },
    ],
  };
  const rrChartData = {
    labels: rr ? rr.map((data) => data.timestamp) : [],
    datasets: [
      {
        label: "Respiratory Frequency",
        data: rr ? rr.map((data) => data.value) : [],
        backgroundColor: rr
          ? rr.map((data) => (data.value > rrThreshold ? colors.red[500] : colors.green[600]))
          : [],
        
      },
    ],
  };
  const tChartData = {
    labels: t ? t.map((data) => data.timestamp) : [],
    datasets: [
      {
        label: "Temperature",
        data: t ? t.map((data) => data.value) : [],
        backgroundColor: t
          ? t.map((data) => (data.value > tThreshold ? colors.red[500] : colors.green[600]))
          : [],
      },
    ],
  };

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
          sx={{ backgroundColor: colors.green[600], height: "40px"}}
          onClick={() => navigate("/home/education")}
        >
          <SchoolOutlinedIcon />
        </Button>
      </div>
      <div className="widgets">
        {userRecords &&
          userRecords.map((record) => {
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
          })}
      </div>
      <Box className="chart-box" height="75vh">
        <BarChart className="charts" chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <LineChart chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart className="charts" chartData={paco2ChartData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart className="charts" chartData={pao2ChartData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart className="charts" chartData={rrChartData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart className="charts" chartData={tChartData} />
      </Box>
    </Box>
  );
}
