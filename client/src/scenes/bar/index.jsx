import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { userBarData } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import { useNavigate } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ValueWidget from "../../components/ValueWidget";
import { getChartData } from "../../utils/getData";
import { formatDate } from "../../utils/FormatDate";
import "../../assets/css/bar.css";

export default function Bar({ userRecords }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paco2, setPaco2] = useState(null);
  const [pao2, setPao2] = useState(null);
  const [rr, setRr] = useState(null);
  const [t, setT] = useState(null);
  const navigate = useNavigate();
  const [switchA, setSwitchA] = useState(true)
  const [switchB, setSwitchB] = useState(true)
  const [switchC, setSwitchC] = useState(true)
  const [switchD, setSwitchD] = useState(true)



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
  const paco2Threshold = 47; //mmHg
  const pao2Threshold = 60; //mmHg
  const rrThreshold = 25; //bpm
  const tThreshold = 37; // Cº

  const paco2ChartData = {
    labels: paco2 ? paco2.map((data) => data.timestamp) : [],
    datasets: [
      {
        label: "Carbon Dioxide Blood Pressure",
        data: paco2 ? paco2.map((data) => data.value) : [],
        backgroundColor: paco2
          ? paco2.map(
              (data) =>
                data.value > 70
                  ? "#ef4655" // Red
                  : data.value > 58
                  ? "#f7aa38" // Orange
                  : data.value > 48
                  ? "#fffa50" // Yellow
                  : "#5ee432" // Green
            )
          : [],
        pointRadius: 7,
        pointHoverRadius: 12,
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
          ? pao2.map(
              (data) =>
                data.value < 50
                  ? "#ef4655" // Red
                  : data.value < 65
                  ? "#f7aa38" // Orange
                  : data.value < 83
                  ? "#fffa50" // Yellow
                  : "#5ee432" // Green
            )
          : [],
        pointRadius: 7,
        pointHoverRadius: 12,
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
          ? rr.map(
              (data) =>
                data.value > 30
                  ? "#ef4655" // Red
                  : data.value > 25
                  ? "#f7aa38" // Orange
                  : data.value > 20
                  ? "#fffa50" // Yellow
                  : "#5ee432" // Green
            )
          : [],
        pointRadius: 7,
        pointHoverRadius: 12,
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
          ? t.map(
              (data) =>
                data.value > 38.5
                  ? "#ef4655" // Red
                  : data.value >= 37.9 && data.value <= 38.5
                  ? "#f7aa38" // Orange
                  : data.value >= 37 && data.value < 37.9
                  ? "#fffa50" // Yellow
                  : "#5ee432" // Green
            )
          : [],
        pointRadius: 7,
        pointHoverRadius: 12,
      },
    ],
  };


  return (
    <Box className="content-box">
      <Header title="Your Charts" />
      <Typography variant="h5" sx={{ m: 10 }}>
        This is your Data! Here you have displayed in simple widgets and charts
        your Wellness Value throughout the week.
      </Typography>
      <div className="learn-more">
        <Typography className="learn-text" variant="h5">
          Learn more about your Data here!
        </Typography>
        <Button
          variant="learn-btn"
          sx={{ backgroundColor: colors.green[600], height: "40px" }}
          onClick={() => navigate("/education")}
        >
          <SchoolOutlinedIcon />
        </Button>
      </div>
      <div className="color-guide">
        <div className="color-line">
          <div className="green"></div>
          <p> - Good</p>
        </div>
        <div className="color-line">
          <div className="yellow"></div>
          <p> - Mild</p>
        </div>
        <div className="color-line">
          <div className="orange"></div>
          <p> - Severe</p>
        </div>
        <div className="color-line">
          <div className="red"></div>
          <p> - Very Severe</p>
        </div>
      </div>
      <div className="widgets">
        {userRecords &&
          userRecords.map((record) => {
            const { sensorPurpose, value } = record;

            switch (sensorPurpose) {
              case "paco2":
                return value ? (
                  <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="accordion-summary">
                        <ValueWidget name="PaCO2" value={value} />
                        <p>
                          Paco2 stands for partial pressure of carbon dioxide.
                          It measures the amount of carbon dioxide in your
                          blood. In COPD, it helps determine how well your lungs
                          are functioning. Higher Paco2 levels indicate poor
                          lung function, while lower levels suggest better lung
                          function.
                        </p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {switchD ? (
                        <Button
                          variant="outlined"
                          sx={{ color: "white", borderColor: "white" }}
                          onClick={() => setSwitchD(!switchD)}
                        >
                          Line Chart
                        </Button>
                      ) : (
                        <Button
                          sx={{ color: "white", borderColor: "white" }}
                          variant="outlined"
                          onClick={() => setSwitchD(!switchD)}
                        >
                          Bar Chart
                        </Button>
                      )}
                      <Box className="chart-box" height="75vh">
                        {switchD ? (
                          <BarChart
                            className="charts"
                            chartData={paco2ChartData}
                          />
                        ) : (
                          <LineChart
                            className="charts"
                            chartData={paco2ChartData}
                          />
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Typography>Loading CO2 Blood Pressure...</Typography>
                );
              case "pao2":
                return value ? (
                  <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="accordion-summary">
                        <ValueWidget name="PaO2" value={value} />
                        <p>
                          PaO2 stands for partial pressure of oxygen. It
                          measures the amount of oxygen in your blood. In COPD,
                          it indicates how well your lungs are able to oxygenate
                          your body. Higher PaO2 levels indicate better
                          oxygenation, while lower levels suggest reduced oxygen
                          levels in the blood.
                        </p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {switchA ? (
                        <Button
                          variant="outlined"
                          sx={{ color: "white", borderColor: "white" }}
                          onClick={() => setSwitchA(!switchA)}
                        >
                          Bar Chart
                        </Button>
                      ) : (
                        <Button
                          sx={{ color: "white", borderColor: "white" }}
                          variant="outlined"
                          onClick={() => setSwitchA(!switchA)}
                        >
                          Line Chart
                        </Button>
                      )}
                      <Box className="chart-box" height="75vh">
                        {!switchA ? (
                          <BarChart
                            className="charts"
                            chartData={pao2ChartData}
                          />
                        ) : (
                          <LineChart
                            className="charts"
                            chartData={pao2ChartData}
                          />
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Typography>Loading O2 Blood Pressure...</Typography>
                );
              case "respiratory rate":
                return value ? (
                  <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="accordion-summary">
                        <ValueWidget
                          name="Respiratory Frequency"
                          value={value}
                        />
                        <p>
                          Respiratory rate refers to the number of breaths you
                          take per minute. It is an important measure of how
                          fast or slow you are breathing. In COPD, an increased
                          respiratory rate may indicate difficulty in breathing
                          or inadequate oxygen exchange. Monitoring your
                          respiratory rate helps assess your breathing status.
                        </p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {switchB ? (
                        <Button
                          variant="outlined"
                          sx={{ color: "white", borderColor: "white" }}
                          onClick={() => setSwitchB(!switchB)}
                        >
                          Line Chart
                        </Button>
                      ) : (
                        <Button
                          sx={{ color: "white", borderColor: "white" }}
                          variant="outlined"
                          onClick={() => setSwitchB(!switchB)}
                        >
                          Bar Chart
                        </Button>
                      )}
                      <Box className="chart-box" height="75vh">
                        {switchB ? (
                          <BarChart
                            className="charts"
                            chartData={rrChartData}
                          />
                        ) : (
                          <LineChart
                            className="charts"
                            chartData={rrChartData}
                          />
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Typography>Loading Respiratory Frequency...</Typography>
                );
              case "temperature":
                return value ? (
                  <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="accordion-summary">
                        <ValueWidget name="Temperature" value={value} />
                        <p>
                          Temperature refers to the level of heat in your body.
                          While it is not directly related to COPD, changes in
                          temperature can affect your overall comfort and
                          well-being. It is important to maintain a comfortable
                          temperature and avoid extreme cold or heat, as they
                          can impact your respiratory symptoms.
                        </p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {switchC ? (
                        <Button
                          variant="outlined"
                          sx={{ color: "white", borderColor: "white" }}
                          onClick={() => setSwitchC(!switchC)}
                        >
                          Line Chart
                        </Button>
                      ) : (
                        <Button
                          sx={{ color: "white", borderColor: "white" }}
                          variant="outlined"
                          onClick={() => setSwitchC(!switchC)}
                        >
                          Bar Chart
                        </Button>
                      )}
                      <Box className="chart-box" height="75vh">
                        {switchC ? (
                          <BarChart
                            className="charts"
                            chartData={tChartData}
                          />
                        ) : (
                          <LineChart
                            className="charts"
                            chartData={tChartData}
                          />
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Typography>Loading Temperature...</Typography>
                );
              default:
                return null;
            }
          })}
      </div>
      {/* <Box className="chart-box" height="75vh">
        <BarChart className="charts" chartData={userData} />
      </Box>
      <Box className="chart-box" height="75vh">
        <LineChart chartData={userData} />
      </Box> */}
    </Box>
  );
}
