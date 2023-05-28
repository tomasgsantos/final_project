import React, {useState, useEffect} from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import LandingTopbar from "./LandingTopbar";
import "../assets/css/LandingPage.css"
import { tokens } from "../theme";
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
  

  const googleIcon = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0031 4C9.82113 4 7.78313 4.861 6.26313 6.426C4.74313 7.989 3.94113 10.052 4.00413 12.235C4.12113 16.339 7.55313 19.818 11.6531 19.992C16.0351 20.165 19.7721 16.78 19.9951 12.419C20.0021 12.291 20.0011 11.726 19.9991 11.2H12.9971V12.782H18.3061L17.9011 14.08C17.1801 16.394 15.3521 17.982 13.0111 18.328C11.2651 18.581 9.44613 18.082 8.02313 16.945C6.62613 15.832 5.75013 14.214 5.61813 12.505C5.48013 10.698 6.07713 8.976 7.30313 7.653C8.96913 5.853 11.6621 5.16 13.9701 5.909L14.7431 4.48C13.8681 4.161 12.9491 4 12.0031 4M11.9961 21.999C11.8551 21.999 11.7121 21.996 11.5691 21.99C6.44113 21.773 2.15113 17.423 2.00413 12.292C1.92713 9.564 2.92913 6.986 4.82813 5.032C6.72913 3.077 9.27613 2 12.0031 2C13.4371 2 14.8231 2.298 16.1221 2.885C16.4831 3.048 16.7641 3.358 16.8911 3.736C17.0201 4.119 16.9841 4.543 16.7921 4.898L15.5001 7.282C15.1491 7.934 14.3571 8.214 13.6651 7.925C12.0121 7.252 9.99213 7.692 8.77013 9.012C7.92813 9.921 7.51713 11.107 7.61213 12.351C7.70213 13.509 8.30613 14.613 9.27013 15.382C10.2641 16.175 11.5261 16.528 12.7181 16.35C13.8181 16.187 14.7301 15.635 15.3501 14.782H12.4471C11.6481 14.782 10.9971 14.132 10.9971 13.332V10.65C10.9971 9.851 11.6481 9.2 12.4471 9.2H20.5471C21.3401 9.2 21.9911 9.845 21.9971 10.638C22.0001 11.269 22.0021 12.336 21.9931 12.52C21.7201 17.832 17.2771 21.999 11.9961 21.999"
        fill="white"
      />
    </svg>
  );

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
              {googleIcon}
              {`GET IT ON \n
              GOOGLE PLAY`}
            </Button>
            <Button
              className="arrow-btn"
              variant="contained"
              onClick={toggleAppShow}
            >
              \/
            </Button>
            {showDiv ? (
              <div className="gsap-div"><p>Why are you a gay man</p></div>
            ) : (
              <div className="gsap-div"></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}