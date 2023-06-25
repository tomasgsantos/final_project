import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import {tokens} from "../theme";

export default function Header ({title, subtitle}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  return (
    <Box className="page-title">
      <Typography variant="h1" color={colors.grey[100]} fontWeight={"bold"} sx={{mb : "5px"}}>{title}</Typography>
      {subtitle && 
        <Typography variant="h5" color={colors.grey[100]}>{subtitle}</Typography>
      }
    </Box>
  )
}