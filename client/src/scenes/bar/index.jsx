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
import { getChartData } from "../../getData";


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

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}-${dayOfMonth}-${month}-${year}`;
  }

  useEffect(() => {
    const fetchHealthValues = async () => {
      try {
        const paco2Data = await getChartData("1");
        const pao2Data = await getChartData("2");
        const rrData = await getChartData("3");
        const tData = await getChartData("4");
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
        setPaco2(formattedPaco2Data);
        setPao2(formattedPao2Data);
        setRr(formattedRrData);
        setT(formattedTData);
        console.log("paco2Data1 : " + JSON.stringify(paco2Data[0]))
        console.log("paco2Data7 : " + JSON.stringify(paco2Data[6]))

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
        color: ["white"],
        backgroundColor: userBarData.map((data) =>
          data.wv > 75 ? "green" : "red"
        ),
      },
    ],
  });



  //Medical parameter healthy threshold values
  const paco2Threshold = 47 ;//mmHg
  const pao2Threshold = 60 ;//mmHg
  const rrThreshold = 25 ;//mmHg
  const tThreshold = 37 ;//mmHg


  const paco2ChartData = {
    labels: paco2 ? paco2.map((data) => data.timestamp) : [],
    datasets: [
      {
        label: "Carbon Dioxide Blood Pressure",
        data: paco2 ? paco2.map((data) => data.value) : [],
        backgroundColor: paco2
          ? paco2.map((data) => (data.value < paco2Threshold ? "red" : "green"))
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
          ? pao2.map((data) => (data.value < pao2Threshold ? "red" : "green"))
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
          ? rr.map((data) => (data.value < rrThreshold ? "red" : "green"))
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
          ? t.map((data) => (data.value < tThreshold ? "red" : "green"))
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
          sx={{ backgroundColor: colors.green[500], height: "40px" }}
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
        <BarChart chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <LineChart chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={paco2ChartData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={pao2ChartData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={rrChartData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <BarChart chartData={tChartData} />
      </Box>
    </Box>
  );
}
