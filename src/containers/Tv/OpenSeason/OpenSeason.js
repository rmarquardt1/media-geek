import React, { Component } from 'react';
import axios from 'axios';
import TvEpisode from '../TvEpisode/TvEpisode';

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
  }

  getEpisodes = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/tv/' +
          this.props.tvId +
          '/season/' +
          this.props.seasonNumber,
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
            image={episode.still_path}
            episodeNumber={episode.episode_number}
          />
        );
      });
    }
    return (
      <div className={classes.Episodes}>
        <div
          className={uiClasses.Close}
          style={{ right: '10px', top: '7px' }}
          onClick={this.props.click}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={uiClasses.CloseIcon}
          />
        </div>
        {episodes}
      </div>
    );
  }
}

export default OpenSeason;
