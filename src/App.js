import { ButtonGroup } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [sounds, setSounds] = useState(GenerateSounds());
  const [activeSounds, setActiveSounds] = useState([]);
  const [stateCurrInterval, setStateCurrInterval] = useState(1);
  // const [stateNextInterval, setStateNextInterval] = useState(1);
  // const [timeOutState, setTimeOutState] = useState(1);

  useEffect(() => {
    /*if (isPlaying) {
      setTimeOutState(
        setTimeout(() => {
          clearInterval(stateCurrInterval);
          let interval = setInterval(() => updateLooper(), 8000);
          setStateNextInterval(interval);
        }, Math.abs(8000 - (stateCurrInterval.currentTime % 8000)))
      );
    }*/
  }, [activeSounds]);

  const handleSoundClick = (soundId) => {
    const sound = sounds[soundId];
    sound.isActive = !sound.isActive;

    setSounds(sounds);
    let selectedSounds = Object.values(sounds)
      .filter((sounds) => sounds.isActive)
      .map((x) => x.id);
    setActiveSounds(selectedSounds);
    console.log(activeSounds);
  };

  const updateLooper = () => {
    Object.values(sounds).map((sound) => {
      if (sound.isActive) {
        sound.audio.pause();
        sound.audio.currentTime = 0;
        sound.audio.play();
      }
      // sounds[index].audio.loop = true;
      else {
        sound.audio.pause();
        sound.audio.currentTime = 0;
      }
    });
  };

  const playMusic = () => {
    if (!isPlaying && activeSounds.length > 0) {
      console.log("playy");
      setIsPlaying((isPlaying) => !isPlaying);

      // let looper = updateLooper.bind(activeSounds);
      // setTimeout(updateLooper(),8000);
      updateLooper();
      let interval = setInterval(() => updateLooper(), 8000);
      setStateCurrInterval(interval);
    }
  };

  const stopMusic = () => {
    if (isPlaying) {
      setIsPlaying((isPlaying) => !isPlaying);
      clearInterval(stateCurrInterval);
      // clearInterval(stateNextInterval);
      // clearTimeout(timeOutState);
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
