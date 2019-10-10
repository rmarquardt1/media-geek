import React from 'react';

import classes from './MusicVideo.module.css';

const musicVideo = props => (
  <div className={classes.MusicVideo}>
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <div
        className={classes.VideoThumb}
        style={{ backgroundImage: 'url(' + props.thumb + ')' }}
      ></div>
    </a>
    <div className={classes.VideoTitle}>{props.title}</div>
  </div>
);

export default musicVideo;
