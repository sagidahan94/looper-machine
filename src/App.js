import { ButtonGroup, Typography } from "@material-ui/core";
import "./App.css";
import { createStyles, makeStyles } from "@material-ui/core/styles";
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
const GenerateSounds = () => {
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
};

const App = () => {
  // Styles
  const classes = useStyles();

  // force update - for objects only
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSoundsClicked, setIsSoundsClicked] = useState(false);
  const [isRecord, setIsRecord] = useState({ value: false });
  const [sounds, setSounds] = useState(GenerateSounds());
  const [stateCurrInterval, setStateCurrInterval] = useState(1);
  const [recordInterval, setRecordInterval] = useState([]);

  // Check if record is empty
  const recordIsEmpty = () => {
    return recordInterval.length === 0;
  };

  // Update isRecord state
  const updateIsRecord = () => {
    let record = isRecord;
    record.value = !record.value;
    setIsRecord(isRecord);
    forceUpdate();
  };

  // Update the state isSoundsClicked
  const updateIsSoundClicked = () => {
    if (Object.values(sounds).filter((x) => x.isActive).length > 0) {
      setIsSoundsClicked(true);
    } else {
      setIsSoundsClicked(false);
    }
  };

  // Handle in pad(sound) click
  const handleSoundClick = (soundId) => {
    let sound = sounds[soundId];
    sound.isActive = !sound.isActive;
    setSounds(sounds);
    updateIsSoundClicked();
    forceUpdate();
  };

  // Handle record click
  const handleRecordClick = () => {
    if (!isRecord.value) {
      setRecordInterval([]);
      // Set record state
      updateIsRecord();

      // Update the first interval of recording - when click on recording
      if (isPlaying) {
        const activeSounds = Object.values(sounds).filter((x) => x.isActive);
        if (activeSounds.length === 0) return;
        const startTime = activeSounds[0].audio.currentTime * 1000;
        let intervalToPush = {
          startTime: startTime,
          durationTime: 8000 - startTime,
          ids: activeSounds.map((x) => x.id),
        };
        setRecordInterval((prev) => [...prev, intervalToPush]);
      }
    }
    // Set the last interval of recording - when click off recording
    else {
      // Set record state
      updateIsRecord();

      // Set the last session of the record
      const activeSounds = Object.values(sounds).filter((x) => x.isActive);
      const endTime = activeSounds[0].audio.currentTime * 1000;
      const lastRecord = recordInterval[recordInterval.length - 1];
      lastRecord.durationTime = endTime;
      setRecordInterval(recordInterval);
    }
  };

  // Handle stop music clicked
  const handleStopMusicClick = () => {
    //Only if play state - true
    if (isPlaying) {
      if (isRecord.value) {
        // Set record state
        updateIsRecord();
      }

      // Change state of playing
      setIsPlaying((isPlaying) => !isPlaying);
      // Clear the interval
      clearInterval(stateCurrInterval);
      // Stop all the sounds
      Object.values(sounds).map((sound) => {
        sound.isActive = false;
        sound.audio.pause();
        sound.audio.currentTime = 0;
      });

      setSounds(sounds);
      forceUpdate();

      // Update the state isSoundsClicked when click stop
      updateIsSoundClicked();
    }
  };

  // Start to play the music - set interval
  const handlePlayMusicClick = () => {
    if (!isPlaying) {
      setIsPlaying((isPlaying) => !isPlaying);
      playSoundsInterval();
      const interval = setInterval(() => updateLooper(), 8000);
      setStateCurrInterval(interval);
    }
  };

  // Play the record Session
  const playRecoding = (index) => {
    if (index === 0) {
      handleStopMusicClick();
    } // stop the music when play session
    else {
      Object.values(sounds).map((sound) => {
        sound.isActive = false;
        sound.audio.pause();
        sound.audio.currentTime = 0;
      });
      setSounds(sounds);
      forceUpdate();
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
      }
      setSounds(sounds);
      forceUpdate();

      setTimeout(() => {
        playRecoding(index + 1); // Recursive call to this function
      }, currentRecord.durationTime);
    }
  };

  // Playing the sound in intervals
  const playSoundsInterval = () => {
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

    if (Object.values(sounds).filter((x) => x.isActive).length === 0) {
      setIsPlaying(false);
    }
  };

  // Looper that play the selected sound in loop
  const updateLooper = () => {
    // If recording- update the intervals
    if (isRecord.value) {
      let intevalToPush = {
        startTime: 0,
        durationTime: 8000,
        ids: Object.values(sounds)
          .filter((x) => x.isActive)
          .map((x) => x.id),
      };
      setRecordInterval((prev) => [...prev, intevalToPush]);
    }

    // Playing the sound in intervals
    playSoundsInterval();
  };

  // Render
  return (
    <div className="button-container">
      <h1 className="header">My Looper</h1>
      <ButtonGroup className="music-sounds">
        <PlaySessionButton
          playRecoding={playRecoding}
          isRecord={isRecord.value}
          isRecordEmpty={recordIsEmpty}
        />
        <RecordButton
          className="Button-root"
          isPlaying={isPlaying}
          recordMusic={handleRecordClick}
          isRecord={isRecord.value}
        />
        <StopButton
          className="Button-root"
          handleStopMusicClick={handleStopMusicClick}
          isPlaying={isPlaying}
        />
        <PlayButton
          className="Button-root"
          handlePlayMusicClick={handlePlayMusicClick}
          isPlaying={isPlaying}
          isSoundsClicked={isSoundsClicked}
        />
      </ButtonGroup>
      <div className="sounds">
        <Box className="Box">
          <Grid className={classes.pads}>
            {Object.values(sounds).map((sound, index) => (
              <Pad
                className="Button-root"
                key={index}
                sound={sound}
                updatedSound={handleSoundClick}
              />
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default App;
