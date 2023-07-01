import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import { useTheme, Box, Button } from "@mui/material";
import { tokens } from "../../theme";
import { getAllSitData, getAllWalkData } from "../../utils/getData";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { formatDate } from "../../utils/FormatDate";
import "../../assets/css/Results.css";

export default function Results({sitStand}){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)

  const [sitData, setSitData]= useState(null);
  const [walkData, setWalkData]= useState(null);

  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(true);
  const [switchC, setSwitchC] = useState(true);
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


  const pulsationSitChartData = {
    labels: sitData ? sitData.map((sit) => sit.timestamp) : null,
    datasets: [
      {
        label: "Sit to Stand Test - Average Heart Rate",
        data: sitData
          ? sitData.map(
              (sit) => (sit.initialpulsation + sit.finalpulsation) / 2
            )
          : [],
        backgroundColor: "blue",
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
        border: "1px solid ",
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

  const countSitChartData = {
    labels: sitData ? sitData.map((sit) => sit.timestamp) : null,
    datasets: [
      {
        label: "Sit to Stand Test - nº Repetitions",
        data: sitData ? sitData.map((sit) => sit.countcycles) : [],
        backgroundColor: "blue",
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
      },
    ],
  };

  const pulsationWalkChartData = {
    labels: walkData ? walkData.map((walk) => walk.timestamp) : null,
    datasets: [
      {
        label: "6 Min Walk Test - Average Heart Rate",
        data: walkData
          ? walkData.map(
              (walk) => (walk.initialpulsation + walk.finalpulsation) / 2
            )
          : [],
        backgroundColor: "peru",
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
      },
    ],
  };

  const stepsWalkChartData = {
    labels: walkData ? walkData.map((walk) => walk.timestamp) : [],
    datasets: [
      {
        label: "6 Min Walk Test - nº Steps",
        data: walkData ? walkData.map((walk) => walk.numbersteps) : [],
        backgroundColor: "peru",
        pointRadius: 7,
        pointHoverRadius: 12,
        borderColor: colors.grey[100],
      },
    ],
  };


  useEffect(()=>{
    if(walkData){
      console.log("Walk data loaded successfully:" + JSON.stringify(walkData));
    }
  },[walkData])

  return (
    <div className="content-box">
      <Header title={"Test Results"}></Header>
      <div className="d-flex  a-i-center gap-8">
        <div className="blue"></div>
        <h4>- Sit to Stand Test</h4>
      </div>
      <div className="main-div">
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
        <Box className="chart-box">
          {switchD ? (
            <BarChart className="charts" chartData={pulsationSitChartData} />
          ) : (
            <LineChart className="charts" chartData={pulsationSitChartData} />
          )}
        </Box>
      </div>
      <div className="main-div">
        {switchA ? (
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
            onClick={() => setSwitchA(!switchA)}
          >
            Line Chart
          </Button>
        ) : (
          <Button
            sx={{ color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={() => setSwitchA(!switchA)}
          >
            Bar Chart
          </Button>
        )}
        <Box className="chart-box">
          {switchA ? (
            <BarChart className="charts" chartData={countSitChartData} />
          ) : (
            <LineChart className="charts" chartData={countSitChartData} />
          )}
        </Box>
      </div>
      <div className="d-flex  a-i-center gap-8">
        <div className="purple"></div>
        <h4>- 6 Min Walk Test</h4>
      </div>
      <div className="main-div">
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
        <Box className="chart-box">
          {switchB ? (
            <BarChart className="charts" chartData={pulsationWalkChartData} />
          ) : (
            <LineChart className="charts" chartData={pulsationWalkChartData} />
          )}
        </Box>
      </div>
      <div className="main-div">
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
        <Box className="chart-box">
          {switchC ? (
            <BarChart className="charts" chartData={stepsWalkChartData} />
          ) : (
            <LineChart className="charts" chartData={stepsWalkChartData} />
          )}
        </Box>
      </div>
    </div>
  );
}