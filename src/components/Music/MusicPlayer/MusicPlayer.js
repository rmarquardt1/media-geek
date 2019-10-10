import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

const MusicPlayer = props => {
  const options = {
    audioLists: [
      {
        name: props.track.title,
        singer: props.track.artist,
        cover: props.track.cover,
        musicSrc: props.track.preview
      }
    ],
    playIndex: 0,
    mode: 'full',
    closeText: 'Close',
    defaultPosition: { bottom: 20, right: 20 }
  };
  return <ReactJkMusicPlayer {...options} />;
};

export default MusicPlayer;
