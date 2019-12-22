import React from 'react';
import Scores from '../../../containers/Scores/Scores';

import classes from './MovieDetails.module.css';

const movieDetails = props => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  const relDate = new Date(props.release);
  const relMonth = monthNames[relDate.getMonth()];
  const relYear =
    props.type === 'upcoming'
      ? relMonth + ' ' + relDate.getDate() + ', ' + relDate.getFullYear()
      : relDate.getFullYear();

  return (
    <div className={classes.MovieDetails}>
      <div
        style={props.fontSize ? { fontSize: props.fontSize } : null}
        className={classes.Title}
      >
        {props.title}
      </div>
      <div className={classes.Scores}>
        <Scores
          title={props.title}
          type={props.type}
          cssOverride={{ fontSize: '12px', marginRight: '5px' }}
          imgOverride={{ height: '16px' }}
          scoresOverride={{ marginRight: '5px' }}
        />
      </div>
      <div
        className={classes.ReleaseDate}
        style={props.fontSize ? { fontSize: props.fontSize } : null}
      >
        {props.release ? relYear : null}
        <span className={classes.Rating}>
          {props.rating !== '' && props.release ? ' / ' : null}
          {props.rating}
        </span>
      </div>
    </div>
  );
};

export default movieDetails;
