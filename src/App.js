import { ButtonGroup } from "@material-ui/core";
import { createStyles, makeStyles, s } from "@material-ui/core/styles";
import React, { useState, useCallback } from "react";
import Pad from "./components/Pad.jsx";
import PlayButton from "./components/PlayButton.jsx";
import PlaySessionButton from "./components/PlaySessionButton.jsx";
import RecordButton from "./components/RecordButton.jsx";
import StopButton from "./components/StopButton.jsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

// Use Styles
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      buttons: {},
      pads: {},
    },
  })
);

// Initiailize the sounds object
function GenerateSounds() {
  return {
    1: {
      id: 1,
      name: "Bass",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL +
          "/sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3"
      ),
    },
    2: {
      id: 2,
      name: "Electric guitar",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL +
          "/sounds/electric guitar coutry slide 120bpm - B.mp3"
      ),
    },
    3: {
      id: 3,
      name: "Stompy Slosh",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL + "/sounds/FUD_120_StompySlosh.mp3"
      ),
    },
    4: {
      id: 4,
      name: "Funck Beats",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL + "/sounds/future_funk_beats_25_120.mp3"
      ),
    },
    5: {
      id: 5,
      name: "GroobeB",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL + "/sounds/GrooveB_120bpm_Tanggu.mp3"
      ),
    },
    6: {
      id: 6,
      name: "Maze Politics",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL + "/sounds/MazePolitics_120_Perc.mp3"
      ),
    },
    7: {
      id: 7,
      name: "PAS3GROOVE1",
      isActive: false,
      audio: new Audio(process.env.PUBLIC_URL + "/sounds/PAS3GROOVE1.03B.mp3"),
    },
    8: {
      id: 8,
      name: "Silent Star",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL + "/sounds/SilentStar_120_Em_OrganSynth.mp3"
      ),
    },
    9: {
      id: 9,
      name: "Organ Synth",
      isActive: false,
      audio: new Audio(
        process.env.PUBLIC_URL + "/sounds/stutter_breakbeats_16_120.mp3"
      ),
    },
  };
}

function App() {
  // Styles
  const classes = useStyles();

  // force update - for objects only
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecord, setIsRecord] = useState({ value: false });
  const [sounds, setSounds] = useState(GenerateSounds());
  const [stateCurrInterval, setStateCurrInterval] = useState(1);
  // const [soundsRecorded, setSoundsRecorded] = useState(GenerateSounds());
  const [recordInterval, setRecordInterval] = useState([]);

  // Check if record is empty
  const recordIsEmpty = () => {
    return recordInterval.length === 0;
  };

  // Handle in pad(sound) click
  const handleSoundClick = (soundId) => {
    let sound = sounds[soundId];
    sound.isActive = !sound.isActive;
    setSounds(sounds);
    forceUpdate();
  };

  // Handle record click
  const handleRecordClick = () => {
    if (!isRecord.value) {
      // Set record state
      let record = isRecord;
      record.value = !record.value;
      setIsRecord(isRecord);
      forceUpdate();

      // Update the first interval of recording - when click on recording
      if (isPlaying) {
        const activeSounds = Object.values(sounds).filter((x) => x.isActive);
        if (activeSounds.length === 0) return;
        const startTime = activeSounds[0].audio.currentTime * 1000;
        recordInterval.push({
          startTime: startTime,
          durationTime: 8000 - startTime,
          ids: activeSounds.map((x) => x.id),
        });
      }
    }
    // Set the last interval of recording - when click off recording
    else {
      // Set record
      let record = isRecord;
      record.value = !record.value;
      setIsRecord(isRecord);
      forceUpdate();
      // Set the last session of the record
      const activeSounds = Object.values(sounds).filter((x) => x.isActive);
      const endTime = activeSounds[0].audio.currentTime * 1000;
      const lastRecord = recordInterval[recordInterval.length - 1];
      lastRecord.durationTime = endTime;
      setRecordInterval(recordInterval);
    }
  };

  // Play the record Session
  const playRecoding = (index) => {
    if (index == 0) {
      // stopMusic();  // stop the music when play session
      Object.values(sounds).map((sound) => {
        sound.audio.pause();
        sound.audio.currentTime = 0;
      });
    }

    // Change state to playing
    if (!isPlaying) {
      setIsPlaying((isPlaying) => !isPlaying);
    }

    // Start playing intervals one by one
    const currentRecord = recordInterval[index];
    if (currentRecord) {
      for (let j = 0; j < currentRecord.ids.length; j++) {
        const currentSoundId = currentRecord.ids[j];
        sounds[currentSoundId].isActive = true;
        sounds[currentSoundId].audio.currentTime =
          currentRecord.startTime / 1000.0;
        sounds[currentSoundId].audio.play();
        setTimeout(() => {
          playRecoding(index + 1); // Recursive call to this function
        }, currentRecord.durationTime);
      }
    }
  };

  const updateLooper = () => {
    // If recording- update the intervals
    if (isRecord.value) {
      recordInterval.push({
        startTime: 0,
        durationTime: 8000,
        ids: Object.values(sounds)
          .filter((x) => x.isActive)
          .map((x) => x.id),
      });
    }

    // Playing the sound in intervals
    firstInvokeUpdateLooper();
  };

  // Playing the sound in intervals
  const firstInvokeUpdateLooper = () => {
    Object.values(sounds).map((sound) => {
      if (sound.isActive) {
        sound.audio.pause();
        sound.audio.currentTime = 0;
        sound.audio.play();
      } else {
        sound.audio.pause();
        sound.audio.currentTime = 0;
      }
    });
  };

  // Start to play the music - set interval
  const playMusic = () => {
    if (!isPlaying) {
      setIsPlaying((isPlaying) => !isPlaying);

      firstInvokeUpdateLooper();
      const interval = setInterval(() => updateLooper(), 8000);
      setStateCurrInterval(interval);
    }
  };

  // Stop all the sounds that play
  const stopMusic = () => {
    //Only if play state - true
    if (isPlaying) {
      // Yarden coded: extract to function
      if (isRecord.value) {
        let record = isRecord;
        record.value = !record.value;
        setIsRecord(isRecord);
        forceUpdate();
      }

      // Change state of playing
      setIsPlaying((isPlaying) => !isPlaying);
      // Clear the interval
      clearInterval(stateCurrInterval);
      // Stop all the sounds
      Object.values(sounds).map((sound) => {
        sound.audio.pause();
        sound.audio.currentTime = 0;
      });
    }
  };

  // Render
  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttons} className="music-sounds">
        <PlaySessionButton
          playSession={playRecoding}
          isRecord={isRecord.value}
          isRecordEmpty={recordIsEmpty}
        />
        <RecordButton
          isPlaying={isPlaying}
          recordMusic={handleRecordClick}
          isRecord={isRecord.value}
        />
        <StopButton stopMusic={stopMusic} isPlaying={isPlaying} />
        <PlayButton playMusic={playMusic} isPlaying={isPlaying} />
      </ButtonGroup>
      <Box>
        <Grid className={classes.pads} className="my-button">
          {Object.values(sounds).map((sound) => (
            <Pad key={sound.id} sound={sound} updatedSound={handleSoundClick} />
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
