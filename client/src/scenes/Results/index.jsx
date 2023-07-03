import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import { useTheme, Box, ButtonGroup, IconButton, Tooltip,  } from "@mui/material";
import { tokens } from "../../theme";
import { getAllSitData, getAllWalkData } from "../../utils/getData";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { formatDate } from "../../utils/FormatDate";
import BarChartIcon from "@mui/icons-material/BarChart";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import "../../assets/css/Results.css";

export default function Results({sitStand}){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  const [sitData, setSitData]= useState(null);
  const [walkData, setWalkData]= useState(null);

  const [switchB, setSwitchB] = useState(true);
  const [switchD, setSwitchD] = useState(true);

  

  useEffect(()=>{
    const fetchSitStand = async () => {
      try {
        const data = await getAllSitData();
        const formatedData = data.map((sitData)=>{
          return{
            ...sitData,
            timestamp: formatDate(sitData.date1test),
          };
        });
        setSitData(formatedData);
      } catch (err) {
        console.error(err.message);
      }
    };
    const fetchWalk = async () => {
      try {
        const data = await getAllWalkData();
        const formatedData = data.map((walkData) => {
          return {
            ...walkData,
            timestamp: formatDate(walkData.date6test),
          };
        });
        setWalkData(formatedData);
      } catch (err) {
        console.error(err.message);
      }
    }; 

    fetchSitStand();
    fetchWalk();
  }, [])


  const sitChartData = {
    labels: sitData ? sitData.map((sit) => sit.timestamp) : null,
    datasets: [
      {
        label: "Sit to Stand Test - Average Heart Rate",
        data: sitData
          ? sitData.map(
              (sit) => (sit.initialpulsation + sit.finalpulsation) / 2
            )
          : [],
        backgroundColor: colors.green[100],
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
        border: "1px solid ",
      },
      {
        label: "Sit to Stand Test - nº Repetitions",
        data: sitData ? sitData.map((sit) => sit.countcycles) : [],
        backgroundColor: colors.blue[300],
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
      },
    ],
    options: {
      scales: {
        y: {
          min: 40,
          max: 130,
        },
      },
    },
  };



  const walkChartData = {
    labels: walkData ? walkData.map((walk) => walk.timestamp) : null,
    datasets: [
      {
        label: "6 Min Walk Test - Average Heart Rate",
        data: walkData
          ? walkData.map(
              (walk) => (walk.initialpulsation + walk.finalpulsation) / 2
            )
          : [],
        backgroundColor: colors.green[300],
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
      },
      {
        label: "6 Min Walk Test - nº Steps",
        data: walkData ? walkData.map((walk) => walk.numbersteps) : [],
        backgroundColor: colors.blue[300],
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
      },
    ],
  };




  return (
    <div className="content-box">
      <Header title={"Test Results"}></Header>
      <div className="result-box d-flex  a-i-center gap-8">
        <div className="result-box__header">
          <div className="result-box__title">
            <h2>Sit to Stand Test</h2>
          </div>
          <div className="result-box__bar">
            <ButtonGroup
              variant="outlined"
              className="chart-type-switch"
              aria-label="outlined button group"
            >
              <Tooltip title="Bar chart">
                <IconButton
                  className={switchD ? "active" : "noot"}
                  onClick={() => setSwitchD(!switchD)}
                  size="small"
                >
                  <BarChartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Line chart">
                <IconButton
                  onClick={() => setSwitchD(!switchD)}
                  size="small"
                >
                  <SsidChartIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </div>
        </div>
        <Box className="chart-box">
          {switchD ? (
            <BarChart className="charts" chartData={sitChartData} />
          ) : (
            <LineChart className="charts" chartData={sitChartData} />
          )}
        </Box>
      </div>
      <div className="result-box d-flex  a-i-center gap-8">
        <div className="result-box__header">
          <div className="result-box__title">
            <h2>- 6 Min Walk Test</h2>
          </div>
          <div className="result-box__bar">
            <ButtonGroup
              variant="outlined"
              className="chart-type-switch"
              aria-label="outlined button group"
            >
              <Tooltip title="Bar chart">
                <IconButton
                  className={switchD ? "active" : "noot"}
                  onClick={() => setSwitchB(!switchB)}
                  size="small"
                >
                  <BarChartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Line chart">
                <IconButton
                  onClick={() => setSwitchB(!switchB)}
                  size="small"
                >
                  <SsidChartIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </div>
        </div>
       
        <Box className="chart-box">
          {switchB ? (
            <BarChart className="charts" chartData={walkChartData} />
          ) : (
            <LineChart className="charts" chartData={walkChartData} />
          )}
        </Box>
      </div>
    </div>
  );
}