import React, {Component} from 'react';
import axios from 'axios';
import TvEpisode from '../../../components/Tv/TvEpisode/TvEpisode';

import classes from './TvSeason.module.css';

class TvSeason extends Component {

  state = {
    episodeList: null
  }



componentDidMount() {
  // this.getEpisodes();
}




  // getEpisodes = () => {

  //   console.log(this.props.tvId);
  //   console.log(this.props.seasonInfo.season_number);

  //   axios.get('https://api.themoviedb.org/3/tv/' + this.props.tvId + '/season/' + this.props.seasonInfo.season_number,
  //   {params: {
  //     api_key: '4c7294000365c14a8e42109c863ff772'
  //   }}
  //   ).then(response => {
  //     console.log(response.data.episodes);
  //     this.setState({episodeList: response.data.episodes});
  //   }).catch(error => {
  //     console.log('error ' + error);
  //   });

  // }



render() {

  // let episodes = null;

  // if (this.state.episodeList) {

  //  episodes = this.state.episodeList.map(episode => {
  //     return (
  //       <TvEpisode
  //         key={episode.id}
  //         id={episode.id}
  //         name={episode.name}
  //         overview={episode.overview}
  //         airDate={episode.air_date}
  //         guestStars={episode.guest_star}
  //         image={episode.still_path}
  //       />



  //     );




  //   })

  // }


  // console.log(this.props);

  return (

    <div className={classes.TvSeasonContainer}>

    <div className={classes.TvSeason}>


    <div className={classes.Thumb} onClick={this.props.click}>
      <img src={'http://image.tmdb.org/t/p/w154' + this.props.seasonInfo.poster_path} alt="" />
    </div>



      <div className={classes.Details}>
        <h3 onClick={this.props.click}>Season {this.props.seasonInfo.season_number}</h3>
        <hr/>
        <div className={classes.Overview}>
          <div className={classes.OverviewInfo}>{this.props.seasonInfo.overview}</div>
          <div className={classes.ViewEpisodes} onClick={this.props.click}>View Episodes</div>
        </div>
      </div>
    </div>

    {/* <div className={classes.TvEpisodes}>
      {episodes}
    </div> */}





    </div>

  )




}







}

export default TvSeason;