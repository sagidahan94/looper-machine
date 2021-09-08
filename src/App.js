import { ButtonGroup } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState, useCallback } from "react";
import Pad from "./components/Pad.jsx";
import PlayButton from "./components/PlayButton.jsx";
import RecordButton from "./components/RecordButton.jsx";
import StopButton from "./components/StopButton.jsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

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
  const classes = useStyles();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [sounds, setSounds] = useState(GenerateSounds());
  const [stateCurrInterval, setStateCurrInterval] = useState(1);

  const handleSoundClick = (soundId) => {
    let sound = sounds[soundId];
    sound.isActive = !sound.isActive;

    setSounds(sounds);
    forceUpdate();
  };

  const updateLooper = () => {
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

  const playMusic = () => {
    if (!isPlaying) {
      setIsPlaying((isPlaying) => !isPlaying);

      updateLooper();
      let interval = setInterval(() => updateLooper(), 8000);
      setStateCurrInterval(interval);
    }
  };

  const stopMusic = () => {
    if (isPlaying) {
      setIsPlaying((isPlaying) => !isPlaying);
      clearInterval(stateCurrInterval);
      Object.values(sounds).map((sound) => {
        sound.audio.pause();
        sound.audio.currentTime = 0;
      });
    }
  };

  return (
    <div className="App">
      <ButtonGroup>
        <RecordButton />
        <StopButton stopMusic={stopMusic} isPlaying={isPlaying} />
        <PlayButton playMusic={playMusic} isPlaying={isPlaying} />
      </ButtonGroup>
      <ButtonGroup className={classes.root}>
        {Object.values(sounds).map((sound) => (
          <Pad key={sound.id} sound={sound} updatedSound={handleSoundClick} />
        ))}
      </ButtonGroup>
    </div>
  );
}

export default App;
