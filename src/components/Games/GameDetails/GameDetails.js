import React from 'react';

import classes from './GameDetails.module.css';

const movieDetails = props => {
  return (
    <div className={classes.GameDetails}>
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Deck}>{props.deck}</div>
    </div>
  );
};

export default movieDetails;
