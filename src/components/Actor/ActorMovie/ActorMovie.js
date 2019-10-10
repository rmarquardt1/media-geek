import React from 'react';

import uiClasses from '../../UI/Layout/Layout.module.css';
import classes from './ActorMovie.module.css';

const actorMovie = props => {
  return (
    <div className={classes.ActorMovie}>
      <img
        src={'http://image.tmdb.org/t/p/w154/' + props.poster}
        className={uiClasses.BoxShadow}
        alt=""
      />
      <div className={classes.Title}>{props.title}</div>
    </div>
  );
};

export default actorMovie;
