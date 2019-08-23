import React from 'react';
import Tracks from '../Tracks/Tracks';

import classes from './AlbumTracks.module.css';

const albumTracks = (props) => {

  console.log(props);

  const tracks = props.tracks.data.map(track => {
    return (

      <Tracks 
        key={track.id}
        title={track.title}
        // album={song.album.title}
        // thumb={song.album.cover_small}
        clickPlay={props.clickPlay}
        preview={track.preview}
        trackNumber={track.track_position}
        duration={track.duration}
        // artist={song.artist.name}
      />


      
    );



  });
  
  return (
    <div className={classes.AlbumTracks}>
      {/* <h2>Top Tracks</h2> */}
      <ul>
        {tracks}
      </ul>
    </div>
  );

}

export default albumTracks;