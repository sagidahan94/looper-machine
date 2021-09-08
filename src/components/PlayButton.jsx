import React from "react";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: "white",
  },
  button_selected: {
    background: "blue",
  },
});

const PlayButton = ({ playMusic, isPlaying, isSoundsClicked }) => {
  const classes = useStyles();

  return (
    <Button
      disabled={!isSoundsClicked}
      className={isPlaying ? classes.button_selected : classes.button}
      onClick={() => playMusic()}
    >
      <PlayArrowIcon></PlayArrowIcon>
    </Button>
  );
};

export default PlayButton;
