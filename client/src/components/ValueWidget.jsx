import React from "react";
import "../assets/css/Widget.css"
import Gauge from "./Gauge";

export default function ValueWidget(props){
 const {name, value} = props;
 let defaultOptions = {
    dialStartAngle: 135,
    dialEndAngle: 45,
    dialRadius: 35,
    value: 100,
    // Put any other defaults you want. e.g. dialStartAngle, dialEndAngle, dialRadius, etc.
  };
if (name === "pao2") {
  defaultOptions = {
    ...defaultOptions,
    min: 30,
    max: 108,
    value: 100,
    color: function (value) {
      if (value >= 83 && value <= 108) {
        return "#5ee432"; // Green
      } else if (value >= 65 && value < 83) {
        return "#fffa50"; // Yellow
      } else if (value >= 50 && value < 65) {
        return "#f7aa38"; // Orange
      } else if (value < 50) {
        return "#ef4655"; // Red
      }
    },
  };
} else if (name === "paco2") {
  defaultOptions = {
    ...defaultOptions,
    min: 35,
    max: 100,
    value: 50,
    color: function (value) {
      if (value <= 48) {
        return "#5ee432"; // Green
      } else if (value > 48 && value <= 58) {
        return "#fffa50"; // Yellow
      } else if (value > 58 && value <= 70) {
        return "#f7aa38"; // Orange
      } else if (value > 70) {
        return "#ef4655"; // Red
      }
    },
  };
} else if (name === "temperature") {
  defaultOptions = {
    ...defaultOptions,
    min: 34,
    max: 42,
    value: 36,
    color: function (value) {
      if (value < 37 && value >= 35.5) {
        return "#5ee432"; // Green
      } else if (value >= 37 && value <= 37.8) {
        return "#fffa50"; // Yellow
      } else if (value > 37.8 && value <= 38.5 ) {
        return "#f7aa38"; // Orange
      } else if (value > 38.5 || value < 35.5) {
        return "#ef4655"; // Red
      }
    },
  };
} else if (name === "respiratory rate") {
  defaultOptions = {
    ...defaultOptions,
    min: 4,
    max: 150,
    value: 50,
    color: function (value) {
      if (value < 20 && value >= 6 ) {
        return "#5ee432"; // Green
      } else if (value >= 20 && value <= 25) {
        return "#fffa50"; // Yellow
      } else if (value > 25 && value <= 30) {
        return "#f7aa38"; // Orange
      } else if (value > 30 || value < 6) {
        return "#ef4655"; // Red
      }
    },
  };
} else if (name === "Wellness Value") {
  defaultOptions = {
    ...defaultOptions,
    min: 0,
    max: 100,
    value: 50,
    color: function (value) {
      if (value >= 75) {
        return "#5ee432"; // Green
      } else if (value >= 50 && value < 75) {
        return "#fffa50"; // Yellow
      } else if (value >= 25 && value < 50) {
        return "#f7aa38"; // Orange
      } else if (value < 25) {
        return "#ef4655"; // Red
      }
    },
  };
} 




  return(
    <>
      {value &&  <Gauge value={value} defaultOptions={defaultOptions} />}
    </>
  )
}