import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './Tracks.module.css';

class Tracks extends Component {
  state = {
    title: this.props.title,
    artist: this.props.artist,
    cover: this.props.cover,
    preview: this.props.preview
  };

  render() {
    let minutes = null;
    let seconds = null;
    let time = null;

    if (this.props.duration) {
      minutes = Math.floor(parseInt(this.props.duration) / 60);
      seconds = parseInt(this.props.duration) - minutes * 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      time = minutes + ':' + seconds;
    }

    return (
      <li className={classes.Tracks}>
        {this.props.trackNumber ? (
          <div style={{ marginRight: '10px' }}>{this.props.trackNumber}</div>
        ) : null}
        <div className={classes.Thumb}>
          <img src={this.props.thumb} alt="" />
        </div>
        <div className={classes.TrackInfo}>
          <span>
            <strong>{this.props.title}</strong>
          </span>
          <span>{time}</span>
          <span className={classes.AlbumName}>{this.props.album}</span>
        </div>
        <div style={{ flexGrow: 1, margin: 'auto' }}>
          <FontAwesomeIcon
            onClick={this.props.clickPlay.bind(this, { ...this.state })}
            className={classes.PlayIcon}
            icon={faPlayCircle}
          />
        </div>
      </li>
    );
  }
}

export default Tracks;
