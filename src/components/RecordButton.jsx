import React from "react";
import { Button } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: "white",
  },
  button_record: {
    background: "red",
  },
});

const RecordButton = ({ recordMusic, isRecord, isPlaying }) => {
  const classes = useStyles();

  return (
    <Button
      disabled={!isPlaying}
      className={isRecord ? classes.button_record : classes.button}
      onClick={() => recordMusic()}
    >
      <FiberManualRecordIcon></FiberManualRecordIcon>
    </Button>
  );
};

export default RecordButton;
