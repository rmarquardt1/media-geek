import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import uiClasses from '../../UI/Layout/Layout.module.css';
import classes from './TvStats.module.css';

const movieStats = props => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  console.log(props);
  const lastAirDate = new Date(props.info.last_episode_to_air.air_date);
  const firstAirDate = new Date(props.info.first_air_date);

  let creators = '';
  for (let i = 0; i < props.info.created_by.length; i++) {
    creators = creators.concat(props.info.created_by[i].name + ', ');
  }
  const createdBy = creators.substr(0, creators.length - 2);

  return (
    <Aux>
      <div className={classes.MovieStats}>
        <div className={classes.Collection + ' ' + uiClasses.BoxShadow}>
          <div className={classes.PartOfCollection}>Last Episode to Air:</div>
          <div className={classes.CollectionName}>
            {props.info.last_episode_to_air.name}
          </div>
          <div className={classes.LastEpisodeAirDate}>
            {monthNames[lastAirDate.getMonth()] +
              ' ' +
              lastAirDate.getDate() +
              ', ' +
              lastAirDate.getFullYear()}
          </div>
          <div className={classes.LastEpisodeSeason}>
            Season {props.info.last_episode_to_air.season_number}, Ep
            {props.info.last_episode_to_air.episode_number}
          </div>
          <div className={classes.PosterContainer}>
            <img
              className={classes.CollectionPoster}
              src={
                'http://image.tmdb.org/t/p/w300/' +
                props.info.last_episode_to_air.still_path
              }
              alt=""
            />
          </div>
          <div className={classes.LastEpisodeOverview}>
            {props.info.last_episode_to_air.overview}
          </div>
        </div>
        <div className={classes.Stats1}>
          {props.genres ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Genre:</div>
              <div className={classes.Value}>{props.genres}</div>
            </div>
          ) : null}
          {props.genres ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Created By:</div>
              <div className={classes.Value}>{createdBy}</div>
            </div>
          ) : null}
          {props.info.homepage ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Homepage:</div>
              <div className={classes.Value}>
                <a
                  href={props.info.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.info.homepage}
                </a>
              </div>
            </div>
          ) : null}
          {props.info.first_air_date ? (
            <div className={classes.Row}>
              <div className={classes.Label}>First Aired:</div>
              <div className={classes.Value}>
                {monthNames[firstAirDate.getMonth()] +
                  ' ' +
                  firstAirDate.getDate() +
                  ', ' +
                  firstAirDate.getFullYear()}
              </div>
            </div>
          ) : null}
          {props.info.episode_run_time ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Runtime:</div>
              <div className={classes.Value}>
                {props.info.episode_run_time} minutes
              </div>
            </div>
          ) : null}
          {props.info.status ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Status:</div>
              <div className={classes.Value}>{props.info.status}</div>
            </div>
          ) : null}
        </div>
      </div>
    </Aux>
  );
};

export default movieStats;
