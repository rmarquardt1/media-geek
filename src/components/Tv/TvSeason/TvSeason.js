import React from 'react';

import classes from './TvSeason.module.css';

const tvSeason = props => (
  <div className={classes.TvSeasonContainer}>
    <div className={classes.TvSeason}>
      <div className={classes.Thumb} onClick={props.click}>
        <img
          src={'http://image.tmdb.org/t/p/w154' + props.seasonInfo.poster_path}
          alt=""
        />
      </div>
      <div className={classes.Details}>
        <h3 onClick={props.click}>Season {props.seasonInfo.season_number}</h3>
        <hr />
        <div className={classes.Overview}>
          <div className={classes.OverviewInfo}>
            {props.seasonInfo.overview
              ? props.seasonInfo.overview
              : 'No Summary'}
          </div>
          <div className={classes.ViewEpisodes} onClick={props.click}>
            View Episodes
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default tvSeason;
