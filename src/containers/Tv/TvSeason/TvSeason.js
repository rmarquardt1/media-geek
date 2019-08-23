import React, {Component} from 'react';
import classes from './TvSeason.module.css';

class TvSeason extends Component {



render() {

  console.log(this.props);

  return (

    <div className={classes.TvSeason}>
      <img src={'http://image.tmdb.org/t/p/w92' + this.props.seasonInfo.poster_path} alt="" />
      <div className={classes.Details}>
        <h2>Season {this.props.seasonInfo.season_number}</h2>
        <hr/>
        <div className={classes.Overview}>
          <div>{this.props.seasonInfo.overview}</div>
          <div className={classes.ViewEpisodes}>View Episodes</div>
        </div>
        


      </div>


    </div>

  )




}







}

export default TvSeason;