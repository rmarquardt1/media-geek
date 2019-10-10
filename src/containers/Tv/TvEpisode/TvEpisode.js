import React, { Component } from 'react';

import classes from './TvEpisode.module.css';

class TvEpisode extends Component {
  state = {
    showFull: false
  };

  showMoreLess = () => {
    this.setState({ showFull: !this.state.showFull });
  };

  render() {
    return (
      <div className={classes.Episode}>
        <div className={classes.EpisodeNumber}>
          Episode {this.props.episodeNumber}
        </div>
        <div className={classes.Thumb}>
          <div className={classes.EpisodeName}>{this.props.name}</div>
          <img
            src={'http://image.tmdb.org/t/p/w342/' + this.props.image}
            alt=""
          />
        </div>
        <div className={classes.EpisodeInfo}>
          {/* {this.props.overview.length ? summary : 'No Summary'} */}
          {this.props.overview.length > 250 && !this.state.showFull
            ? this.props.overview.substr(0, 250) + '...'
            : this.props.overview}
          {this.props.overview.length > 250 && !this.state.showFull ? (
            <p className={classes.ReadMore} onClick={this.showMoreLess}>
              Read More...
            </p>
          ) : this.props.overview.length > 250 && this.state.showFull ? (
            <p className={classes.ReadMore} onClick={this.showMoreLess}>
              Read Less...
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TvEpisode;
