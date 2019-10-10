import React from 'react';
import Tracks from './Tracks/Tracks';

import classes from './TopFiveTracks.module.css';

const topFiveTracks = props => {
  const songs = props.tracks.data.map(song => {
    return (
      <Tracks
        key={song.id}
        title={song.title}
        album={song.album.title}
        thumb={song.album.cover_small}
        cover={song.album.cover_big}
        clickPlay={props.clickPlay}
        preview={song.preview}
        artist={song.artist.name}
      />
    );
  });

  return (
    <div className={classes.TopFiveTracks}>
      <h2>Top Tracks</h2>
      <ul>{songs}</ul>
    </div>
  );
};

export default topFiveTracks;
