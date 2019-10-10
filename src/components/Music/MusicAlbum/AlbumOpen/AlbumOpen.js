import React from 'react';
import AlbumTracks from '../../TopFiveTracks/AlbumTracks/AlbumTracks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './AlbumOpen.module.css';

const albumOpen = props => {
  const release = new Date(props.releaseDate);
  const releaseYear = release.getFullYear().toString();

  return (
    <div className={classes.AlbumOpen}>
      <div className={classes.AlbumCover}>
        <img src={props.cover} alt="" />
        <p className={classes.ReleaseYear}>{releaseYear}</p>
      </div>
      <div className={classes.AlbumInfo}>
        <div className={classes.AlbumTitle}>
          <h1>{props.title}</h1>
          <div className={classes.Close}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={classes.CloseIcon}
              onClick={props.close}
            />
          </div>
        </div>
        <hr />
        <div className={classes.AlbumTracks}>
          {props.tracks ? (
            <AlbumTracks tracks={props.tracks} clickPlay={props.clickPlay} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default albumOpen;
