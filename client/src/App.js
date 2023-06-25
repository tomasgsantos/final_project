import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./assets/css/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Homepage from "./Homepage/Homepage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Register from "./components/Register.jsx";
import { isAuthenticated } from "./utils/AuthService";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AboutUs from "./components/AboutUs";

function App() {
  const [theme, colorMode] = useMode();
  const isAuthenticado = isAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isAuthenticado);
  }, []);
  console.log("theme",theme.palette.mode);
  return (
    <div className={`theme-${theme.palette.mode}`}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {!isLoggedIn && <Route path="/" element={<LandingPage />} />}
            {isLoggedIn && <Route path="/*" element={<Homepage />} />}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
