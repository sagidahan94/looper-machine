import { Button } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import React from "react";

function StopButton({ stopMusic, isPlaying }) {
  return (
    <Button onClick={() => stopMusic()}>
      <StopIcon></StopIcon>
    </Button>
  );
}

export default StopButton;
