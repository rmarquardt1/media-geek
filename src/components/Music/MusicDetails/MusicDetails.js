import React from 'react';

import classes from './MusicDetails.module.css';

const musicDetails = props => {
  const albumTitle =
    props.title && props.title.length > 15
      ? props.title.substring(0, 15) + '...'
      : props.title;
  return (
    <div className={classes.MusicDetails}>
      <div className={classes.Title}>{albumTitle}</div>
      {props.artistName ? (
        <div className={classes.ArtistName}>{props.artistName}</div>
      ) : null}
    </div>
  );
};

export default musicDetails;
