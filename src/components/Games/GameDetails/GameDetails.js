import React from 'react';

import classes from './GameDetails.module.css';

const movieDetails = (props) => {

// console.log(props.popularity);
return (
  
  <div className={classes.GameDetails}>
    <div className={classes.Title}>{props.title}</div>
    <div className={classes.Deck}>{props.deck}</div>

    {/* <div className={classes.ReleaseDate}>{props.release}</div> */}
  </div>

);
}

export default movieDetails;