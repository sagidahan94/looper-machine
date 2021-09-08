import React from "react";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function PlayButton({ playMusic, isPlaying }) {
  return (
    <Button onClick={() => playMusic()}>
      <PlayArrowIcon></PlayArrowIcon>
    </Button>
  );
}

export default PlayButton;
