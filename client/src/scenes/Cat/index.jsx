import React, {useState} from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import RadioComponent from '../../components/RadioComponent';
import "../../assets/css/Cat.css"
import VideoPlayer from '../../components/VideoPlayer';

export default function Cat () {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [formData, setFormData] = useState({
    cough: "",
    phlegm: "",
    chestTightness: "",
    breathlessness: "",
    activitiesLimitation: "",
    leavingHomeConfidence: "",
    sleepQuality: "",
    energyLevel: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data, e.g., submit it to the server
    console.log(formData);
  };

  return (
    <div>
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
      <div className="video-div">
        <VideoPlayer videoUrl={"https://www.youtube.com/watch?v=OaTOd3oSGwU"} />
      </div>
      <h2>CAT</h2>
      <RadioComponent
        questionId={"cough"}
        worst={"I never cough"}
        best={"I cough all the time"}
      />
      <RadioComponent
        questionId={"phlegm"}
        worst={"I have no phlegm (mucus) in my chest at all"}
        best={"My chest is completely full of phlegm (mucus)"}
      />
      <RadioComponent
        questionId={"chest"}
        worst={"My chest does not feel tight at all"}
        best={"My chest feels very tight"}
      />
      <RadioComponent
        questionId={"breathless"}
        worst={
          "When I walk up a hill or one flight of stairs I am not breathless"
        }
        best={
          "When I walk up a hill or one flight of stairs I am very breathless"
        }
      />
      <RadioComponent
        questionId={"activity"}
        worst={"I am not limited doing any activities at home"}
        best={"I am very limited doing activities at home"}
      />
      <RadioComponent
        questionId={"house"}
        worst={"I am confident leaving my home despite my lung condition"}
        best={
          "I am not at all confident leaving my home because of my lung condition"
        }
      />
      <RadioComponent
        questionId={"sleep"}
        worst={"I sleep soundly"}
        best={`I dont sleep soundly because of my lung condition`}
      />
      <RadioComponent
        questionId={"energy"}
        worst={"I have lots of energy"}
        best={"I have no energy at all"}
      />
    </div>
  );
}