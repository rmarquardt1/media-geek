import React from 'react';

import classes from './TvEpisode.module.css';

const tvEpisode = (props) => {







  return (

    <div className={classes.Episode}>
      <div className={classes.EpisodeNumber}>
        Episode {props.episodeNumber}
      </div>
      <div className={classes.Thumb}>
        <div className={classes.EpisodeName}>{props.name}</div>
        <img src={'http://image.tmdb.org/t/p/w342/' + props.image} alt="" />
      </div>

      <div className={classes.EpisodeInfo}>
        
        {props.overview}
      </div>

      
    </div>



  )





}

export default tvEpisode;





