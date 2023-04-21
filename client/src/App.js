import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./assets/css/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Homepage from "./Homepage/Homepage.jsx";
import Register from "./components/Register.jsx";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Homepage />}/>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
