import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: "white",
    padding: 10,
    borderSpacing: 10,
  },
  button_selected: {
    background: "yellow",
    padding: 10,
    borderSpacing: 10,
  },
});

const Pad = ({ key, sound, updatedSound }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={sound.isActive ? classes.button_selected : classes.button}
      key={sound.id}
      onClick={() => updatedSound(sound.id)}
    >
      {sound.name}
    </Button>
  );
};

export default Pad;
