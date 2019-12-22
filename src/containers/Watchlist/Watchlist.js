import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import classes from './Watchlist.module.css';

class Watchlist extends Component {
  state = {
    userWatchlist: []
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('userData')).movieWatchlist) {
      if (
        JSON.parse(localStorage.getItem('userData')).movieWatchlist.length > 0
      ) {
        this.getMovieWatchlistHandler();
      }
    }
    if (JSON.parse(localStorage.getItem('userData')).tvWatchlist) {
      if (JSON.parse(localStorage.getItem('userData')).tvWatchlist.length > 0) {
        this.getTvWatchlistHandler();
      }
    }
  }

  getMovieWatchlistHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const watch = userData.movieWatchlist.filter(fav => {
      return fav !== null;
    });
    watch.map(w => {
      axios
        .get('https://api.themoviedb.org/3/movie/' + w, {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US'
          }
        })
        .then(response => {
          const relYear = new Date(response.data.release_date).getFullYear();
          if (response.data) {
            this.setState(prevState => ({
              userWatchlist: [
                ...prevState.userWatchlist,
                {
                  title: response.data.title,
                  id: response.data.id,
                  poster: response.data.poster_path,
                  release: relYear,
                  type: 'movie'
                }
              ]
            }));
          }
          return null;
        })
        .catch(error => {
          console.log('error ' + error);
        });
      return null;
    });
  };

  getTvWatchlistHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const favs = userData.tvWatchlist;
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
            userWatchlist: [
              ...prevState.userWatchlist,
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
    const stateLength = this.state.userWatchlist.length;
    let watch = null;
    if (stateLength !== 0) {
      watch = this.state.userWatchlist.map(fav => {
        const watchLink =
          fav.type === 'tv' ? '/Tv/' + fav.id : '/Movies/' + fav.id;
        return (
          <NavLink to={watchLink} key={fav.id}>
            <li className={classes.Fav}>
              <img src={'http://image.tmdb.org/t/p/w92' + fav.poster} alt="" />
              <div className={classes.FavInfo}>
                <span className={classes.Title}>{fav.title}</span>
                <span className={classes.FavRelYear}>{fav.release}</span>
              </div>
            </li>
          </NavLink>
        );
      });
    }
    return <Aux>{stateLength !== 0 ? <Aux>{watch}</Aux> : null}</Aux>;
  }
}

export default Watchlist;
