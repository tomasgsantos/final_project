import React from "react";
import "../assets/css/LandingTopbar.css";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import Home from "../assets/images/copdeck_logo.png";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";

const LandingTopbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const loginButtonSx = {
    backgroundColor: colors.green[500],
    color: colors.green[900],
    height: 50,
    width: 130,
    "&:hover":{
      backgroundColor: colors.green[600],
      borderColor: colors.green[200],
      border: 1,
    }
  };

  const registerButtonSx = {
    backgroundColor: colors.grey[100],
    color: colors.green[900],
    border: "solid",
    borderColor: colors.green[500],
    height: 50,
    width: 130,
    "&:hover": {
      backgroundColor: colors.grey[200],
      border: 3,
      borderColor:colors.green[500]
    },
  };

  return (
    <div className="landing-topbar">
      <div
        className="box-a"
        
        BackgroundColor={
          theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.primary[900]
        }
      >
        <img src={Home} alt="Home_logo" width="95px" height="70px" />
      </div>
      <div className="box-c">
        <a className="landing-topbar-a">About us</a>
        <a className="landing-topbar-a">Contact us</a>
      </div>
      {/* Icons */}
      <div className="box-b">
        <Button
          sx={loginButtonSx}
          variant="contained"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={registerButtonSx}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};



export default LandingTopbar;
