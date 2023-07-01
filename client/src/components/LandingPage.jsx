import React, {useState, useEffect} from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LandingTopbar from "./LandingTopbar";
import "../assets/css/LandingPage.css"
import { tokens } from "../theme";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme, Button } from "@mui/material";
import doctor from "../assets/images/doctor_dashboard.png"
import { gsap} from "gsap";

export default function LandingPage(){
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() =>{
      if(showDiv){
        gsap.to(".gsap-div" , {duration: 2, y: 10, background: colors.green[500], width: "100%", height: 50, opacity: 1});
      }else{
         gsap.to(".gsap-div", { duration: 2, y: -10, opacity: 0, height: 0, width: 0});
      }
  }, [showDiv] )

  const toggleAppShow = () =>{
    setShowDiv((prev => !prev));
    
  }


  const startBtn = {
    backgroundColor: "#695987",
    
  };

  const googleBtn = {
    "&:hover": {
      backgroundColor: "#695987",
    }
  }


  return (
    <div className="landing-app">
      <main className="landing-main">
        <LandingTopbar />
        <div className="landing-content">
          <h1 className="landing-title">COPD Dashboard</h1>
          <div className="web-section">
            <p className="landing-p">
              Copdeck Dashboard is your centralized hub for comprehensive
              insights into your COPD management journey. Seamlessly integrated
              with the COPD app, this intuitive and powerful dashboard offers a
              deep dive into your COPD variables, allowing you to monitor your
              progress, analyze trends, and make informed decisions for optimal
              lung health.
            </p>
            <img
              className="doctor-img"
              src={doctor}
              alt="Doctor image"
              width="300"
              height="300"
            />
          </div>
          <div className="btn-div">
            <Button
              className="start-btn"
              variant="contained"
              sx={startBtn}
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>
          <div className="app-section">
            <h1 className="landing-title">COPD App</h1>
            <p className="landing-p">
              COPD App is a cutting-edge COPD management app designed to
              revolutionize the way individuals track and manage their chronic
              obstructive pulmonary disease (COPD). With seamless sensor
              connectivity, this innovative app monitors and analyzes crucial
              COPD parameters, providing users with real-time insights for
              personalized care.
            </p>

            <Button
              className="google-btn"
              variant="contained"
              onClick={() => console.log("Logic for app link")}
            >
              <GoogleIcon />
              {`GET IT ON \n
              GOOGLE PLAY`}
            </Button>
            {/* <Button
              className="arrow-btn"
              variant="contained"
              onClick={toggleAppShow}
            >
              \/
            </Button>
            {showDiv ? (
              <div className="gsap-div"><p></p></div>
            ) : (
              <div className="gsap-div"></div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}