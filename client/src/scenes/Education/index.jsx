import React from 'react';
import Header from '../../components/Header';
import "../../assets/css/Education.css";
import VideoPlayer from '../../components/VideoPlayer';

export default function Education(){
  return(
    <div className='content'>
      <Header title={"Education"} subtitle={"Learn more about COPD !"}/>

      <VideoPlayer />
      
    </div>
  )
}