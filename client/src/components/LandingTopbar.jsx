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

  return (
    <Box className="box-a">
      <Box
        display="flex"
        BackgroundColor={
          theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.primary[900]
        }
      >
        <img src={Home} alt="Home_logo" width="95px" height="70px" />
      </Box>
      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon type="button" />
        </IconButton>
        <Button sx={{backgroundColor: colors.green[500], height: 50}} variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LandingTopbar;
