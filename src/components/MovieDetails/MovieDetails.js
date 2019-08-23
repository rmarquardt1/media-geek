import React from 'react';
import MovieScores from '../../components/Movie/MovieScores/MovieScores';

import classes from './MovieDetails.module.css';

const movieDetails = (props) => {
  // console.log(props);
  const relDate = new Date(props.release);
  const relYear = relDate.getFullYear();
  return (
    
    <div className={classes.MovieDetails}>
      <div className={classes.Title}>{props.title}</div>
    <div>
      <MovieScores imdb={props.imdb} rt={props.rt} mc={props.mc} 
      cssOverride={{fontSize: '12px', marginRight:'5px'}}
      imgOverride={{height:'16px'}}
      scoresOverride={{marginRight: '5px'}}
      />
      </div>


        <div className={classes.ReleaseDate}>
        {relYear}{props.rating != '' ? ' / ' : null}
        <span className={classes.Rating}>{props.rating}</span>
      </div>
    </div>
  );
}

export default movieDetails;