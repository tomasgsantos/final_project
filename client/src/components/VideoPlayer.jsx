import ReactPlayer from "react-player";
import React, { useRef } from "react";


function VideoPlayer() {
  const playerRef = useRef(null);
  const url = "https://www.youtube.com/watch?v=HWMOsqppMlg";
  return <ReactPlayer light={true} ref={playerRef} url={url} controls={true} />

}
export default VideoPlayer;