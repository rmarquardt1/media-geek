import React from 'react';

import classes from './MovieTrailer.module.css'; 
import uiClasses from '../../UI/Layout/Layout.module.css'

const movieTrailer = (props) => {


  let videoName = props.videoName;

  if (videoName.length > 50) {
    videoName = videoName.substring(0, 50) + '...';
  }

  return (
    <div className={classes.MovieTrailer}>
      <div 
      className={classes.MovieThumb} 
      >
      
        {/* <embed width="320" height="180" src={props.videoUrl} crossOrigin="anonymous"/> */}
        {/* <a href={props.videoUrl} target="_blank" rel="noopener noreferrer"> */}
          <img src={props.thumbnail} className={uiClasses.BoxShadow }onClick={props.click.bind(this, props.videoUrl)} alt="" />
        {/* </a> */}
        <div className={classes.VideoName}>{videoName}</div>

        </div>
    </div>
  );
}

export default movieTrailer;