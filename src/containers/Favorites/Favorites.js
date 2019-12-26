import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faChevronLeft,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import classes from './Favorites.module.css';

class Favorites extends Component {
  state = {
    userFavorites: []
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('userData')).favMovies) {
      if (JSON.parse(localStorage.getItem('userData')).favMovies.length > 0) {
        this.getMovieFavoritesHandler();
      }
    }
    if (JSON.parse(localStorage.getItem('userData')).favTv) {
      if (JSON.parse(localStorage.getItem('userData')).favTv.length > 0) {
        this.getTvFavoritesHandler();
      }
    }
  }

  getMovieFavoritesHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const favs =
      this.props.type === 'favs'
        ? userData.favMovies
        : this.props.type === 'watchlist'
        ? userData.movieWatchlist
        : null;
    favs.map(fav => {
      axios
        .get('https://api.themoviedb.org/3/movie/' + fav, {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US'
          }
        })
        .then(response => {
          const relYear = new Date(response.data.release_date).getFullYear();
          this.setState(prevState => ({
            userFavorites: [
              ...prevState.userFavorites,
              {
                title: response.data.title,
                id: response.data.id,
                poster: response.data.poster_path,
                release: relYear,
                type: 'movie'
              }
            ]
          }));
        })
        .catch(error => {
          console.log('error ' + error);
        });
      return null;
    });
  };

  getTvFavoritesHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const favs =
      this.props.type === 'favs'
        ? userData.favTv
        : this.props.type === 'watchlist'
        ? userData.tvWatchlist
        : null;
    favs.map(fav => {
      axios
        .get('https://api.themoviedb.org/3/tv/' + fav, {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US'
          }
        })
        .then(response => {
          const yearStart = new Date(
            response.data.first_air_date
          ).getFullYear();
          const yearEnd = new Date(response.data.last_air_date).getFullYear();
          this.setState(prevState => ({
            userFavorites: [
              ...prevState.userFavorites,
              {
                title: response.data.name,
                id: response.data.id,
                poster: response.data.poster_path,
                release: yearStart + '-' + yearEnd,
                type: 'tv'
              }
            ]
          }));
        })
        .catch(error => {
          console.log('error ' + error);
        });
      return null;
    });
  };

  render() {
    const stateLength = this.state.userFavorites.length;
    let favorites = null;
    if (stateLength !== 0) {
      favorites = this.state.userFavorites.map(fav => {
        const favLink =
          fav.type === 'tv' ? '/Tv/' + fav.id : '/Movies/' + fav.id;
        return (
          <div className={classes.Fav} key={fav.id}>
            <NavLink to={favLink} key={fav.id}>
              <img src={'http://image.tmdb.org/t/p/w92' + fav.poster} alt="" />
              <div className={classes.FavInfo}>
                <div className={classes.Title}>{fav.title}</div>
                <span className={classes.FavRelYear}>{fav.release}</span>
              </div>
            </NavLink>
          </div>
        );
      });
    }

    return (
      <Aux>
        <div className={classes.FavHeader}>
          {this.props.type === 'favs' ? (
            <div className={classes.Header}>
              <FontAwesomeIcon icon={faHeart} className={classes.FavIcon} />
              <div>Favorites</div>
            </div>
          ) : this.props.type === 'watchlist' ? (
            <div className={classes.Header}>
              <FontAwesomeIcon icon={faStar} className={classes.StarIcon} />
              <div>Watchlist</div>
            </div>
          ) : null}
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={classes.ChevronLeft}
            onClick={this.props.click}
          />
        </div>
        <div
          className={
            classes.Favorites +
            ' ' +
            (this.props.slideIn ? classes.FavSlideIn : '')
          }
        >
          {stateLength !== 0 ? <Aux>{favorites}</Aux> : null}
        </div>
      </Aux>
    );
  }
}

export default Favorites;
