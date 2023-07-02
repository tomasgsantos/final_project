import React from 'react';
import "../../assets/css/Topbar.css"
import { IconButton, useTheme} from '@mui/material'
import { useContext } from 'react';
import { ColorModeContext} from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'; 
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'; 

const Topbar = ({userData})=>{
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext);



  return (
    <div className="mode-switcher">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
            )}
      </IconButton>
    </div>
    // <Box className="box-a">
    //   {/* Search bar*/}
    //   <Box
    //     display="flex"
    //     backgroundColor={
    //       theme.palette.mode === "dark"
    //         ? colors.primary[400]
    //         : colors.primary[900]
    //     }
    //     borderRadius="3px"
    //   >
    //     <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
    //     <IconButton>
    //       <SearchIcon />
    //     </IconButton>
    //   </Box>

    //   {/* Icons */}
    //   <Box display="flex">
    //     <IconButton onClick={colorMode.toggleColorMode}>
    //       {theme.palette.mode === "dark" ? (
    //         <DarkModeOutlinedIcon />
    //       ) : (
    //         <LightModeOutlinedIcon />
    //       )}
    //     </IconButton>
    //     <IconButton>
    //       <SettingsOutlinedIcon type="button" />
    //     </IconButton>
    //     <IconButton>
    //       <PersonOutlineOutlinedIcon onClick={()=>{navigate("/profile")}}type="button" />
    //     </IconButton>
    //     <Box display="flex" sx={{ flexDirection: "column", maxHeight: 40 }}>
    //       <p className="topbar-text">{userData && userData.name}</p>
    //     </Box>
    //   </Box>
    // </Box>
  );
}

export default Topbar