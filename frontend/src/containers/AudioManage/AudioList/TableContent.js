import React, {useRef, useState} from 'react';

import Controls from "./controls/Controls";
import {PlayArrow, Stop} from "@material-ui/icons";


export default function TableContent({audioLink}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleIsPlaying = () => {
    const {current: audio} = audioRef;

    let status = !isPlaying;
    if (status) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(status);
  };

  return (
    <>
      <Controls.ActionButton
        className="play"
        onClick={toggleIsPlaying}
      >
        <audio id="ad" preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
          <source src={audioLink} type="audio/wav"/>
        </audio>
        {isPlaying ? <Stop fontSize="small"/> : <PlayArrow fontSize="small"/>}
      </Controls.ActionButton>
    </>
  );
}
