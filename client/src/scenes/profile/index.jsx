import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

export default function Profile(){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return(<Box>
    <Header title={"Profile"} subtitle={"Edit your profile"} />
  </Box>)
}