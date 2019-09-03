import React from 'react';
// import MovieScores from '../../components/Movie/MovieScores/MovieScores';

import classes from './TvDetails.module.css';

const tvDetails = (props) => {
  // const relDate = new Date(props.release);
  // const relYear = relDate.getFullYear();
  return (
    
    <div className={classes.TvDetails}>
      <div className={classes.TitleSeasons}>
        <div style={props.fontSize ? {fontSize: props.fontSize} : null} className={classes.Title}>{props.title}</div>
        <div className={classes.Seasons}>{props.seasons} 
        {props.seasons === 1 ? ' season' : props.seasons > 1 ? ' seasons' : null}
        </div>
      </div>
      <div>
        {/* <MovieScores imdb={props.imdb} rt={props.rt} mc={props.mc} 
        cssOverride={{fontSize: '12px', marginRight:'5px'}}
        imgOverride={{height:'16px'}}
        scoresOverride={{marginRight: '5px'}}
        /> */}
      </div>
        <div className={classes.ReleaseDate} 
        style={props.fontSize ? {fontSize: props.fontSize} : null}>
        {props.airDates}
        <span className={classes.Rating}>{props.rating}</span>
      </div>
    </div>
  );
}

export default tvDetails;