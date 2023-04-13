import React from 'react';
import './assets/css/App.css';
import {Route, Routes} from "react-router-dom"
import Login from './components/Login';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Vitals from './components/Vitals';
import Education from './components/Education';



function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vitals" element={<Vitals />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </div>
  );
}

export default App;
