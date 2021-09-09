import { Button } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import React from "react";

const StopButton = ({ handleStopMusicClick, isPlaying }) => {
  return (
    <Button onClick={() => handleStopMusicClick()}>
      <StopIcon></StopIcon>
    </Button>
  );
};

export default StopButton;
