import React from 'react';
import LazyLoad from 'react-lazy-load';

import classes from './TvSeason.module.css';

const tvSeason = props => (
  <LazyLoad threshold={1400} width={props.lazyWidth}>
    <div
      className={classes.TvSeasonContainer}
      style={{
        width: props.dimensions ? props.dimensions.width : '',
        height: props.dimensions ? props.dimensions.movieHeight : '',
        marginLeft: props.marg,
        marginRight: props.marg,
        marginBottom: props.margB ? props.margB : null
      }}
    >
      <div className={classes.TvSeason}>
        <div className={classes.Thumb} onClick={props.click}>
          {props.tvPoster ? (
            <img
              src={
                'http://image.tmdb.org/t/p/w154' +
                (props.seasonInfo.poster_path
                  ? props.seasonInfo.poster_path
                  : props.tvPoster)
              }
              alt=""
            />
          ) : null}
          <h3 onClick={props.click}>Season {props.seasonInfo.season_number}</h3>
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
  </LazyLoad>
);

export default tvSeason;
