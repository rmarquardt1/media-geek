import React from 'react';
import Tracks from '../Tracks/Tracks';

import classes from './AlbumTracks.module.css';

const albumTracks = props => {
  const tracks = props.tracks.data.map(track => {
    return (
      <Tracks
        key={track.id}
        title={track.title}
        clickPlay={props.clickPlay}
        preview={track.preview}
        trackNumber={track.track_position}
        duration={track.duration}
      />
    );
  });
  return (
    <div className={classes.AlbumTracks}>
      <ul>{tracks}</ul>
    </div>
  );
};

export default albumTracks;
