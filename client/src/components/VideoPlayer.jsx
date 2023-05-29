import ReactPlayer from "react-player";
import React, { useRef } from "react";


function VideoPlayer({videoUrl}) {
  const playerRef = useRef(null);
  const url = videoUrl;
  return <ReactPlayer light={true} ref={playerRef} url={url} controls={true} />

}
export default VideoPlayer;