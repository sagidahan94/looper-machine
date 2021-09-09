import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: "white",
  },
  button_record: {
    background: "red",
  },
});

const PlaySessionButton = ({ playRecoding, isRecord, isRecordEmpty }) => {
  const classes = useStyles();

  return <Button onClick={() => playRecoding(0)}>play Session</Button>;
};

export default PlaySessionButton;
