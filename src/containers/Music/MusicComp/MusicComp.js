import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import MusicDetails from '../../../components/Music/MusicDetails/MusicDetails';
import Loader from '../../../components/UI/Loader/Loader';

import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './MusicComp.module.css';

class MusicComp extends Component {
  state = {
    imgLoaded: false,
    artistPoster: this.props.poster,
    show: false,
    posterHeight: null
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
    if (
      this.state.artistPoster ===
      'https://e-cdns-images.dzcdn.net/images/artist//500x500-000000-80-0-0.jpg'
    ) {
      this.checkImageHandler();
    }
    if (
      this.state.artistPoster ===
      'https://cdns-images.dzcdn.net/images/artist//500x500-000000-80-0-0.jpg'
    ) {
      this.checkImageHandler();
    } else {
      this.setState({ show: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    if (this.posterRef.current) {
      this.setState({
        posterHeight:
          this.posterRef.current.clientWidth / 2 +
          this.posterRef.current.clientWidth
      });
    }
  };

  checkImageHandler = () => {
    axios
      .get('https://api.deezer.com/artist/' + this.props.id + '/albums', {
        params: {
          limit: 1
        }
      })
      .then(response => {
        if (response.data.data[0].cover_big) {
          this.setState({
            artistPoster: response.data.data[0].cover_big,
            show: true
          });
        }
      })
      .catch(error => {
        this.setState({ artistPoster: null, show: false });
      });
  };

  render() {
    return this.state.show ? (
      <NavLink
        style={{ color: '#fff', textDecoration: 'none' }}
        to={'/Music/Artist/' + this.props.id}
      >
        <div
          className={classes.Movie}
          style={{
            width: this.props.dimensions ? this.props.dimensions.width : '',
            height: this.props.dimensions
              ? this.props.dimensions.musicHeight
              : ''
          }}
        >
          <div
            className={classes.Poster}
            style={{
              width: this.props.dimensions ? this.props.dimensions.width : '',
              height: this.props.dimensions ? this.props.dimensions.height : ''
            }}
          >
            {this.state.imgLoaded ? null : (
              <Loader addStyle={{ margin: 'auto' }} />
            )}
            <img
              alt=""
              className={uiClasses.BoxShadow}
              style={this.state.imgLoaded ? {} : { display: 'none' }}
              src={this.state.artistPoster}
              onLoad={() => this.setState({ imgLoaded: true })}
              onError={() => this.setState({ imgLoaded: true })}
            />
          </div>
          <MusicDetails
            title={this.props.title}
            artistName={this.props.artist}
            release={this.props.release}
            artistId={this.props.id}
          />
        </div>
      </NavLink>
    ) : null;
  }
}

export default MusicComp;
