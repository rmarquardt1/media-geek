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

  const lastEpisode = props.info.last_episode_to_air;
  const lastAirDate = lastEpisode ? new Date(lastEpisode.air_date) : null;
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
          <div className={classes.MobileLastEpisode}>
            <div className={classes.PartOfCollection}>Last Episode to Air:</div>
            <div className={classes.CollectionName}>
              {lastEpisode ? lastEpisode.name : null}
            </div>
            <div className={classes.LastEpisodeAirDate}>
              {lastEpisode
                ? monthNames[lastAirDate.getMonth()] +
                  ' ' +
                  lastAirDate.getDate() +
                  ', ' +
                  lastAirDate.getFullYear()
                : null}
            </div>
            <div className={classes.LastEpisodeSeason}>
              {lastEpisode
                ? 'Season' +
                  lastEpisode.season_number +
                  ', Ep' +
                  lastEpisode.episode_number
                : null}
            </div>
          </div>
          {props.info.backdrop_path ? (
            <img
              className={
                classes.CollectionPoster + ' ' + classes.CollectionPosterMobile
              }
              src={
                lastEpisode && lastEpisode.still_path
                  ? 'http://image.tmdb.org/t/p/w300/' + lastEpisode.still_path
                  : 'http://image.tmdb.org/t/p/w300/' + props.info.backdrop_path
              }
              alt=""
            />
          ) : null}
          <div className={classes.LastEpisode}>
            <div className={classes.PartOfCollection}>Last Episode to Air:</div>
            <hr />
            <div className={classes.CollectionName}>
              {lastEpisode ? lastEpisode.name : null}
            </div>
            <div className={classes.LastEpisodeAirDate}>
              {lastEpisode
                ? monthNames[lastAirDate.getMonth()] +
                  ' ' +
                  lastAirDate.getDate() +
                  ', ' +
                  lastAirDate.getFullYear()
                : null}
            </div>
            <div className={classes.LastEpisodeSeason}>
              {lastEpisode
                ? 'Season' +
                  lastEpisode.season_number +
                  ', Ep' +
                  lastEpisode.episode_number
                : null}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
            {props.info.backdrop_path ? (
              <img
                className={classes.CollectionPoster}
                src={
                  lastEpisode && lastEpisode.still_path
                    ? 'http://image.tmdb.org/t/p/w300/' + lastEpisode.still_path
                    : 'http://image.tmdb.org/t/p/w300/' +
                      props.info.backdrop_path
                }
                alt=""
              />
            ) : null}
            <div className={classes.LastEpisodeTablet}>
              <div className={classes.PartOfCollection}>
                Last Episode to Air:
              </div>
              <hr />
              <div className={classes.CollectionName}>
                {lastEpisode ? lastEpisode.name : null}
              </div>
              <div className={classes.LastEpisodeAirDate}>
                {lastEpisode
                  ? monthNames[lastAirDate.getMonth()] +
                    ' ' +
                    lastAirDate.getDate() +
                    ', ' +
                    lastAirDate.getFullYear()
                  : null}
              </div>
              <div className={classes.LastEpisodeSeason}>
                {lastEpisode
                  ? 'Season' +
                    lastEpisode.season_number +
                    ', Ep' +
                    lastEpisode.episode_number
                  : null}
              </div>
              <div
                className={classes.LastEpisodeOverview + ' ' + classes.Tablet}
              >
                {lastEpisode ? props.info.last_episode_to_air.overview : null}
              </div>
            </div>
          </div>
          <div className={classes.LastEpisodeOverview}>
            {lastEpisode ? props.info.last_episode_to_air.overview : null}
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
                  className={classes.HomePage}
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
        <div>
          {props.info.networks.length > 0 ? (
            <img
              src={
                'http://image.tmdb.org/t/p/w92' +
                props.info.networks[0].logo_path
              }
              alt=""
              className={classes.NetworkLogo + ' ' + uiClasses.BoxShadow}
            />
          ) : null}
        </div>
      </div>
    </Aux>
  );
};

export default movieStats;
