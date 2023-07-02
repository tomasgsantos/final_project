import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import BarChart from "../../components/BarChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import { getWV, getAllWv, getCat } from "../../utils/getData";
import { postWv } from "../../utils/postData";
import { formatDate } from "../../utils/FormatDate";
import "../../assets/css/Dashboard.css";
import ValueWidget from "../../components/ValueWidget";
import InfoIcon from "@mui/icons-material/Info";

export default function Dashboard({
  userData,
  sitWvTestResults,
  walkWvTestResults,
  varResults,
  catResults,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [wellnessValue, setWellnessValue] = useState(null);
  const [prevWv, setPrevWv] = useState(null);
  const [wvChartData, setWvChartData] = useState(null);

  const fetchCat = async () => {
    try {
      const data = await getCat();
      catResults = data;
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchCat();
    if (catResults) {
      const valorFinal =
        ((sitWvTestResults + walkWvTestResults) / 2) * 0.3 +
        catResults * 0.3 +
        varResults * 0.4;
        console.log("ValorFinal: ", valorFinal < 5 ? 5 : valorFinal);
      setWellnessValue(valorFinal < 5 ? 5 : valorFinal);
    }
  }, [catResults, sitWvTestResults, varResults, walkWvTestResults]);

  useEffect(() => {
    if (wellnessValue) {
      const fetchPrevWV = async () => {
        try {
          const prevWvData = await getWV();
          setPrevWv(prevWvData);
        } catch (err) {
          console.error(err.message);
        }
      };
      const fetchAllWv = async () => {
        try {
          const WvData = await getAllWv();
          const formattedWv = WvData.map((data) => {
            return {
              ...data,
              date: formatDate(data.date),
            };
          });
          setWvChartData(formattedWv);
        } catch (err) {
          console.error(err.message);
        }
      };

      fetchPrevWV();
      fetchAllWv();
    }
  }, [wellnessValue]);

  useEffect(() => {
    if (wvChartData) {
      console.log("Wv Chart Data: " + JSON.stringify(wvChartData));
    }
  }, [wvChartData]);

    
  const handleWVClick = async () => {
    try {
      const prevValue = prevWv.value;
      const change = Math.abs(prevValue - wellnessValue);
      if (change > 2 || change < -2) {
        try {
          postWv(wellnessValue);
          console.log(
            "Wellness value changed " + change + " and updated to DB"
          );
        } catch (error) {
          console.error(error);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const wvHistory = {
    labels: wvChartData ? wvChartData.map((data) => data.date) : [],
    datasets: [
      {
        label: "Wellness Value",
        data: wvChartData ? wvChartData.map((data) => data.value) : [],
        color: ["white"],
        backgroundColor: wvChartData
          ? wvChartData.map((data) => {
              if (data.value >= 75) {
                return "#5ee432"; // Green
              } else if (data.value > 50) {
                return "#fffa50"; // Yellow
              } else if (data.value > 25) {
                return "#f7aa38"; // Orange
              } else {
                return "#ef4655"; // Red
              }
            })
          : [],
      },
    ],
  };

  const handleBarClick = () => {
    navigate("/home/bar");
  };

  return (
    <div className="content-box">
      {userData && (
        <Header
          title={`Hello ${userData.name}`}
          subtitle={"Welcome to your dashboard"}
        />
      )}
      <div className="wellness-widget">
        <div className="wellness-widget__chart">
          <ValueWidget name="Wellness Value" value={wellnessValue} />
        </div>
        <div className="wellness-widget__info">
          <h2>This is your Wellness Value</h2>
          <p>
            The Wellness Value is calculated using your Test Results, your
            Medical Variables and you COPD Assesment Test Score.
            <Tooltip
              title=" Here's the formula:
             (Test x 0.3) + (Variables x 0.4) + (CAT x 0.3)"
            >
              <span>
                <InfoIcon />
              </span>
            </Tooltip>
          </p>
          <p>
            Perform a Copd Assessment Test to update the Wellness Value, or
            store the current value.
          </p>
          <div className="d-col gap-8">
            <Button
              variant="contained"
              onClick={() => navigate("/cat")}
            >
              Perform a CAT
            </Button>
            
            <Button
              variant="contained"
              onClick={handleWVClick}
              sx={{ backgroundColor: colors.green[500] }}
            >
              Store Value
            </Button>
          </div>
        </div>
      </div>

      <Typography className="dashboard-typography" variant="h4" color="white">
        Wellness Value History
      </Typography>
      <Box className="dashboard-row">
        <Box className="dashboard-box">
          <BarChart
            className="dashboard-content"
            chartData={wvHistory}
            onClick={handleBarClick}
          />
        </Box>
        <Box className="dashboard-box">
          <LineChart
            className="dashboard-content"
            chartData={wvHistory}
            onClick={handleBarClick}
          />
        </Box>
      </Box>
    </div>
  );
}
