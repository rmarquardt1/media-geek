import React from 'react';

import classes from './VideoThumb.module.css';
import uiClasses from '../UI/Layout/Layout.module.css';

const videoThumb = props => {
  let videoName = props.videoName;
  if (videoName.length > 50) {
    videoName = videoName.substring(0, 50) + '...';
  }

  return (
    <div className={classes.VideoThumbContainer}>
      <div className={classes.VideoThumb}>
        <img
          src={props.thumbnail}
          className={uiClasses.BoxShadow}
          onClick={props.click.bind(this, props.videoUrl)}
          alt=""
        />
        <div className={classes.VideoName}>{videoName}</div>
      </div>
    </div>
  );
};

export default videoThumb;
