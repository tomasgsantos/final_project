import { Button, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/LandingTopbar.css";
import Home from "../assets/images/copdeck_logo.png";
import { ColorModeContext, tokens } from "../theme";

const LandingTopbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const loginButtonSx = {
    backgroundColor: colors.green[400],
    color: colors.green[900],
    height: 50,
    width: 130,
    "&:hover":{
      backgroundColor: colors.green[600],
      borderColor: colors.grey[200],
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
      backgroundColor: colors.green[200],
      border: 3,
      borderColor:colors.green[500]
    },
  };

  return (
    <div className="landing-topbar">
      <div
        className="box-a"
        
      
      >
        <img src={Home} alt="Home_logo" width="95px" height="70px" onClick={() => navigate("/")}/>
      </div>
      <div className="box-c">
        <a href="/about" className="landing-topbar-a">About us</a>
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
