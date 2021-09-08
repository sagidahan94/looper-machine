import React from "react";
import { Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: "white",
  },
  button_record: {
    background: "red",
  },
});

function PlaySessionButton({ playSession, isRecord, isRecordEmpty }) {
  const classes = useStyles();

  return <Button onClick={() => playSession(0)}>play Session</Button>;
}

export default PlaySessionButton;
