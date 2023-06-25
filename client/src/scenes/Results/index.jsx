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
        label: "Average Heart Rate during Tests",
        data: sitData
          ? sitData.map(
              (sit) => (sit.initialpulsation + sit.finalpulsation) / 2
            )
          : [],
        backgroundColor: "white",
        pointRadius: 7,
        pointHoverRadius: 12,
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
    labels: sitData ? sitData.map((sit)=> sit.timestamp): null,
    datasets: [
      {
        label: "Sit to Stand Test Repetitions",
        data: sitData ? sitData.map((sit) => sit.countcycles): [],
        options: {
          scales:{
            x: {

            }
          }
        }
      }
    ]
  }


  useEffect(()=>{
    if(walkData){
      console.log("Walk data loaded successfully:" + JSON.stringify(walkData));
    }
  },[walkData])

  return (
    <div className="content-box">
      <Header title={"Test Results"}></Header>
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
    </div>
  );
}