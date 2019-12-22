import React from 'react';

import classes from './TvEpisode.module.css';

const tvEpisode = props => (
  <div className={classes.Episode}>
    <div style={{ width: '100%' }}>
      <div className={classes.EpisodeNumber}>Episode {props.episodeNumber}</div>
      <div className={classes.Thumb}>
        <div className={classes.EpisodeName}>{props.name}</div>
        <img src={'http://image.tmdb.org/t/p/w342/' + props.image} alt="" />
      </div>
    </div>
    <div className={classes.EpisodeInfo}>
      <p>{props.overview ? props.overview : 'No Summary'}</p>
    </div>
  </div>
);

export default tvEpisode;
