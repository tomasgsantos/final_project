import React from "react";
import { Box, Typography } from "@mui/material";
import "../assets/css/Widget.css"
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function ValueWidget(props){
 const {name, value} = props;
 const theme = useTheme()
 const colors = tokens(theme.palette.mode)

  return(
  <Box className="well-box">
    <Typography className="text" variant="h5" color="white">
      {name}
    </Typography>
    <Box sx={{backgroundColor: value < 60 ? colors.green[600] : colors.red[500] }}className="well-widget">
      <Typography className="dashboard-typography" variant="h4" color="white">
        {value && value}
      </Typography>
    </Box>
  </Box>
  )
}