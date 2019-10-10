import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import uiClasses from '../../UI/Layout/Layout.module.css';
import classes from './MovieStats.module.css';

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

  const releaseDate = new Date(props.info.release_date);

  return (
    <Aux>
      <div className={classes.MovieStats}>
        {props.info.belongs_to_collection ? (
          <NavLink to={'/Collection/' + props.info.belongs_to_collection.id}>
            <div className={classes.Collection + ' ' + uiClasses.BoxShadow}>
              <div className={classes.PartOfCollection}>Part of:</div>
              <div className={classes.CollectionName}>
                {props.info.belongs_to_collection.name}
              </div>
              <div
                className={classes.PosterContainer}
                style={{
                  backgroundImage:
                    'url("http://image.tmdb.org/t/p/w500/' +
                    props.info.belongs_to_collection.backdrop_path +
                    '")'
                }}
              >
                <img
                  className={classes.CollectionPoster}
                  src={
                    'http://image.tmdb.org/t/p/w185/' +
                    (props.info.belongs_to_collection.poster_path
                      ? props.info.belongs_to_collection.poster_path
                      : props.info.poster_path)
                  }
                  alt=""
                />
              </div>
            </div>
          </NavLink>
        ) : null}

        <div className={classes.Stats1}>
          <div className={classes.Row}>
            <div className={classes.Tagline}>
              {props.info.tagline ? props.info.tagline : props.info.title}
            </div>
          </div>
          <hr />

          {props.genres ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Genre:</div>
              <div className={classes.Value}>{props.genres}</div>
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

          {props.info.release_date ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Release Date:</div>
              <div className={classes.Value}>
                {monthNames[releaseDate.getMonth()] +
                  ' ' +
                  releaseDate.getDate() +
                  ', ' +
                  releaseDate.getFullYear()}
              </div>
            </div>
          ) : null}

          {props.info.runtime ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Runtime:</div>
              <div className={classes.Value}>{props.info.runtime} minutes</div>
            </div>
          ) : null}

          {props.info.budget ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Budget:</div>
              <div className={classes.Value}>
                <CurrencyFormat
                  value={props.info.budget}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </div>
            </div>
          ) : null}

          {props.info.revenue ? (
            <div className={classes.Row}>
              <div className={classes.Label}>Revenue:</div>
              <div className={classes.Value}>
                <CurrencyFormat
                  value={props.info.revenue}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
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
