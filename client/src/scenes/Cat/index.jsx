import React, { useState } from "react";
import { useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import RadioComponent from "../../components/RadioComponent";
import "../../assets/css/Cat.css";
import VideoPlayer from "../../components/VideoPlayer";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { postCat } from "../../utils/postData";

export default function Cat() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    cough: 0,
    phlegm: 0,
    chest: 0,
    breathless: 0,
    activity: 0,
    house: 0,
    sleep: 0,
    energy: 0,
  });

  const handleRatingChange = ({ questionId, rating }) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data, e.g., submit it to the server
    postCat(formData).then(()=>{
      alert("Form submitted successfully");
    });
  };

  return (
    <form className="cat-form">
      <Header title={"Copd Assessment Test"} />
      <p className="description">
        Welcome to the COPD Assessment Test (CAT) page! This test helps evaluate
        the impact of chronic obstructive pulmonary disease (COPD) on your daily
        life. Answer eight simple questions and rate your symptoms on a scale of
        <strong> Super Happy to Super Sad.</strong> The higher the score, the
        greater the impact of COPD. This self-assessment tool provides insights
        for better management. Remember, it's not a diagnostic tool. Consult
        your healthcare provider for further guidance.
      </p>
      <p className="description">
        The next video should help you better understand the concept
      </p>
      <div className="icon">
        <ArrowDownwardIcon fontSize="large" />
      </div>
      <div className="video-div">
        <VideoPlayer videoUrl={"https://www.youtube.com/watch?v=OaTOd3oSGwU"} />
      </div>

      <h2>CAT</h2>
      <RadioComponent
        questionId={"cough"}
        worst={"I never cough"}
        best={"I cough all the time"}
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"phlegm"}
        worst={"I have no phlegm (mucus) in my chest at all"}
        best={"My chest is completely full of phlegm (mucus)"}
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"chest"}
        worst={"My chest does not feel tight at all"}
        best={"My chest feels very tight"}
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"breathless"}
        worst={
          "When I walk up a hill or one flight of stairs I am not breathless"
        }
        best={
          "When I walk up a hill or one flight of stairs I am very breathless"
        }
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"activity"}
        worst={"I am not limited doing any activities at home"}
        best={"I am very limited doing activities at home"}
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"house"}
        worst={"I am confident leaving my home despite my lung condition"}
        best={
          "I am not at all confident leaving my home because of my lung condition"
        }
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"sleep"}
        worst={"I sleep soundly"}
        best={`I dont sleep soundly because of my lung condition`}
        onRatingChange={handleRatingChange}
      />
      <RadioComponent
        questionId={"energy"}
        worst={"I have lots of energy"}
        best={"I have no energy at all"}
        onRatingChange={handleRatingChange}
      />
      <div className="cat-submit">
        <Button
          sx={{
            width: "40%",
            height: "60px",
            mt: "20px",
            borderRadius: "1rem",
            backgroundColor: colors.green[300],
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
