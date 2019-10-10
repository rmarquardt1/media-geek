import React, { Component } from 'react';
import Loader from '../../../UI/Loader/Loader';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

import classes from './AlbumThumb.module.css';

class AlbumThumb extends Component {
  state = {
    imgLoaded: false,
    albumSelected: false
  };

  render() {
    const releaseDate = new Date(this.props.releaseDate);
    const releaseYear = releaseDate.getFullYear();
    const titleLength = this.props.title.length;
    const albumTitle =
      titleLength > 45
        ? this.props.title.substring(0, 45) + '...'
        : this.props.title;
    return (
      <Aux>
        <div
          style={{ margin: '10px', maxWidth: '200px' }}
          className={classes.AlbumThumbContainer}
          onClick={this.props.click.bind(this, this.props)}
        >
          <div className={classes.AlbumThumb}>
            <img
              src={this.props.thumb}
              alt=""
              onLoad={() => this.setState({ imgLoaded: true })}
              onError={() => this.setState({ imgLoaded: true })}
            />
            <div className={classes.AlbumTitle}>{albumTitle}</div>
            <div className={classes.ReleaseDate}>{releaseYear}</div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default AlbumThumb;
