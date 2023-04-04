import './css/App.css';
import {Route, Routes} from "react-router-dom"
import Login from './components/Login';
import Homepage from './components/Homepage';
import Register from './components/Register';



function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
