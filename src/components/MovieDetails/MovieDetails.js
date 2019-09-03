import React from 'react';
import MovieScores from '../../components/Movie/MovieScores/MovieScores';

import classes from './MovieDetails.module.css';

const movieDetails = (props) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const relDate = new Date(props.release);
  const relMonth = monthNames[relDate.getMonth()];
  const relYear = props.type === 'upcoming' ? relMonth + ' ' + relDate.getDate() + ', ' + relDate.getFullYear() : relDate.getFullYear();

  return (
    <div className={classes.MovieDetails}>
      <div style={props.fontSize ? {fontSize: props.fontSize} : null} className={classes.Title}>{props.title}</div>
    <div className={classes.MovieScores}>
      <MovieScores imdb={props.imdb} rt={props.rt} mc={props.mc} 
      cssOverride={{fontSize: '12px', marginRight:'5px'}}
      imgOverride={{height:'16px'}}
      scoresOverride={{marginRight: '5px'}}
      />
      </div>
      <div className={classes.ReleaseDate} style={props.fontSize ? {fontSize: props.fontSize} : null}>
        {relYear}
        <span className={classes.Rating}>{props.rating !== '' ? ' / ' : null}{props.rating}</span>
      </div>
    </div>
  );
}

export default movieDetails;