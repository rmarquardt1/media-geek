import React, { Component } from 'react';
import axios from 'axios';
import TvEpisode from '../../../components/Tv/TvEpisode/TvEpisode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './OpenSeason.module.css';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';

class OpenSeason extends Component {
  state = {
    episodeList: null
  };

  componentDidMount() {
    this.getEpisodes();
    console.log(this.props);
  }

  getEpisodes = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/tv/' +
          this.props.tvId +
          '/season/' +
          this.props.seasonInfo.season_number,
        {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772'
          }
        }
      )
      .then(response => {
        this.setState({ episodeList: response.data.episodes });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    let episodes = null;
    if (this.state.episodeList) {
      episodes = this.state.episodeList.map(episode => {
        return (
          <TvEpisode
            key={episode.id}
            id={episode.id}
            name={episode.name}
            overview={episode.overview}
            airDate={episode.air_date}
            guestStars={episode.guest_star}
            image={
              episode.still_path ? episode.still_path : this.props.tvBackdrop
            }
            episodeNumber={episode.episode_number}
          />
        );
      });
    }
    return (
      <div>
        <div className={classes.SeasonInfo}>
          <div className={classes.Info}>
            <div className={classes.InfoHeading}></div>
            <div style={{ marginTop: '10px' }}>
              <img
                src={
                  'http://image.tmdb.org/t/p/w92' +
                  (this.props.seasonInfo.poster_path
                    ? this.props.seasonInfo.poster_path
                    : this.props.tvPoster)
                }
                style={{ float: 'left', marginRight: '20px' }}
                alt=""
              />
              <h2>Season {this.props.seasonInfo.season_number}</h2>
              <hr />
              <p>
                {this.props.seasonInfo.overview
                  ? this.props.seasonInfo.overview
                  : 'No Summary'}
              </p>
            </div>

            <div
              className={uiClasses.Close}
              style={{ right: '10px', top: '16px' }}
              onClick={this.props.click}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                className={uiClasses.CloseIcon}
              />
            </div>
          </div>
        </div>
        <div className={classes.Episodes}>{episodes}</div>
      </div>
    );
  }
}

export default OpenSeason;
