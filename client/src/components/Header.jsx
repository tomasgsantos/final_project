import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import {tokens} from "../theme";

export default function Header ({title, subtitle}) {
  const theme = useTheme();
  const color = tokens(theme.palette.mode)
  return (
    <Box mb={"30px"}>
      <Typography variant="h2" color={color.grey[100]} fontWeight={"bold"} sx={{mb : "5px"}}>{title}</Typography>
      <Typography variant="h5" color={color.grey[400]}>{subtitle}</Typography>
    </Box>
  )
}