import React from 'react';
import "../../assets/css/Topbar.css"
import {Box, IconButton, useTheme} from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'; 
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'; 
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Topbar = ()=>{
  const theme = useTheme()
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);



  return (
    <Box className="box-a">
      {/* Search bar*/}
      <Box
        display="flex"
        backgroundColor={
          theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.primary[900]
        }
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton>
          <SearchIcon />
        </IconButton>
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
          <SettingsOutlinedIcon type="button"/>
        </IconButton>
        <IconButton>
            <PersonOutlineOutlinedIcon type="button" />
        </IconButton>
        <Box display="flex" sx={{ flexDirection: "column", maxHeight: 40 }}>
          <p className="topbar-text">name last_name</p>
          <p className="topbar-text">country</p>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar