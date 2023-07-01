import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Button, IconButton, Typography, capitalize, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Home from "../../assets/images/copdeck_logo.png"
import profileLogo from "../../assets/images/profile.jpeg"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ViewListIcon from '@mui/icons-material/ViewList';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../utils/AuthService";
import "../../assets/css/Sidebar.css";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dbPort = 'http:/localhost:5001';

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar = ({userData}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const handleLogout = () => {
    logout();
    navigate("/");
    navigate(0);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `var(--sidebar-background) !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item": {
          background: `var(--sidebar-background)`,
        },
        "& .user-badge": {
          background: `var(--sidebar-background)`,
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              padding: "10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img src={Home} alt="Home_logo" width="95px" height="70px" />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box
              mb="25px"
              className="user-badge"
              sx={{ background: `${colors.primary[600]}` }}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  onClick={() => {
                    navigate("/profile");
                  }}
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profileLogo}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData && userData.name}
                </Typography>
                <div className="d-flex gap-8 j-c-center a-i-center">
                  <Typography variant="h5" color={colors.green[300]}>
                    {userData && capitalize(userData.role)}
                  </Typography>
                  <IconButton
                    onClick={handleLogout}
                    size="small"
                    title="Logout"
                  >
                    <LogoutIcon />
                  </IconButton>
                </div>
              </Box>
            </Box>
          )}

          <Box
            className="nav-menu"
            paddingLeft={isCollapsed ? undefined : "10%"}
          >
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Test Results"
              to="/results"
              icon={<MonitorHeartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Charts"
              to="/bar"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {userData &&
              (userData.role == "patient" ? null : (
                <Item
                  title="Patients Data"
                  to="/patients"
                  icon={<ViewListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            <Item
              title="Education"
              to="/education"
              icon={<SchoolOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="CAT"
              to="/cat"
              icon={<ContentPasteSearchIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Emergency"
              to="/emergency"
              icon={<LocalHospitalOutlinedIcon sx={{ color: "red" }} />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="FAQ"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Contacts"
              to="/contacts"
              icon={<AlternateEmailIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Form"
              to="/form"
              icon={<FormatAlignLeftIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;