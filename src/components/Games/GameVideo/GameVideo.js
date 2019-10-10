import React from 'react';

import classes from './GameVideo.module.css';

const gameVideo = props => (
  <div className={classes.GameVideo}>
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <div
        className={classes.VideoThumb}
        style={{ backgroundImage: 'url(' + props.thumb + ')' }}
      ></div>
    </a>
    <div className={classes.VideoTitle}>{props.title}</div>
  </div>
);

export default gameVideo;
