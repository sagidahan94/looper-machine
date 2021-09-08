import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "white",
  },
  root_selected: {
    background: "red",
  },
});

const Pad = ({ key, sound, updatedSound }) => {
  const classes = useStyles();

  return (
    <Button
      className={sound.isActive ? classes.root_selected : classes.root}
      key={sound.id}
      onClick={() => updatedSound(sound.id)}
    >
      {sound.name}
    </Button>
  );
};

export default Pad;
