import React from "react";
import { Button } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function RecordButton({ recordMusic }) {
  return (
    <Button onClick={() => recordMusic()}>
      <FiberManualRecordIcon></FiberManualRecordIcon>
    </Button>
  );
}

export default RecordButton;
