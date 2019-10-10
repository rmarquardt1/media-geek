import React, { Component } from 'react';
import Movie from '../Movies/Movie/Movie';
import TvSeries from '../Tv/TvSeries/TvSeries';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import classes from './List.module.css';

class List extends Component {
  state = {
    inTheatres: null,
    sliceStart: 0,
    sliceEnd: 0,
    mobileDisplay: false,
    rowCount: null,
    fadeOut: false,
    fadeIn: false
  };

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.containerWidthRef = React.createRef();
  }

  componentWillUpdate(prevProp, prevState) {
    if (prevState.sliceEnd !== this.state.sliceEnd) {
      this.getMoviesHandler();
    }
  }

  getMoviesHandler = () => {
    let url = null;
    switch (this.props.listType) {
      case 'inTheatres':
        url = 'https://api.themoviedb.org/3/movie/now_playing?';
        break;
      case 'upcomingReleases':
        url = 'https://api.themoviedb.org/3/movie/upcoming?';
        break;
      case 'topRatedMovies':
        url = 'https://api.themoviedb.org/3/movie/top_rated?';
        break;
      case 'popularMovies':
        url = 'https://api.themoviedb.org/3/movie/popular?';
        break;
      case 'airingThisWeek':
        url = 'https://api.themoviedb.org/3/tv/on_the_air?';
        break;
      case 'airingToday':
        url = 'https://api.themoviedb.org/3/tv/airing_today?';
        break;
      case 'popularTv':
        url = 'https://api.themoviedb.org/3/tv/popular?';
        break;
      case 'topRatedTv':
        url = 'https://api.themoviedb.org/3/tv/top_rated?';
        break;
      default:
        url = null;
    }

    axios
      .get(url, {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US',
          region: 'US'
        }
      })
      .then(response => {
        const movieDimensions = this.state.mobileDisplay
          ? {
              width: '75px',
              height: '110px',
              movieHeight: '160px',
              fontSize: '12px'
            }
          : {
              width: '170px',
              height: '255px',
              movieHeight: '330px',
              fontSize: '14px'
            };
        const releases = response.data.results
          .slice(this.state.sliceStart, this.state.sliceEnd)
          .map(result => {
            if (this.props.mediaType === 'movies') {
              return (
                <NavLink
                  style={{ color: '#fff', textDecoration: 'none' }}
                  to={'/Movies/' + result.id}
                  key={result.id}
                >
                  <Movie
                    ref={this.elementRef}
                    id={result.id}
                    poster={result.poster_path}
                    title={result.title}
                    release={result.release_date}
                    dimensions={movieDimensions}
                  />
                </NavLink>
              );
            }
            if (this.props.mediaType === 'tv') {
              return (
                <NavLink
                  style={{ color: '#fff', textDecoration: 'none' }}
                  to={'/Tv/' + result.id}
                  key={result.id}
                >
                  <TvSeries
                    ref={this.elementRef}
                    id={result.id}
                    backdrop={result.backdrop_path}
                    title={result.name}
                    poster={result.poster_path}
                    release={result.release_date}
                    dimensions={movieDimensions}
                  />
                </NavLink>
              );
            }
          });
        this.setState({ inTheatres: releases });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  resizeHandler = () => {
    const windowW = window.innerWidth;
    if (windowW <= 500) {
      const count = Math.floor(this.containerWidthRef.current.clientWidth / 80);
      this.setState({
        mobileDisplay: true,
        sliceEnd: this.state.sliceStart + count,
        rowCount: count
      });
    } else {
      const count = Math.floor(
        this.containerWidthRef.current.clientWidth / 210
      );
      this.setState({
        mobileDisplay: false,
        sliceEnd: this.state.sliceStart + count,
        rowCount: count
      });
    }
  };

  nextHandler = () => {
    this.setState({ fadeOut: !this.state.fadeOut });
    setTimeout(() => {
      const childCount = this.containerWidthRef.current.childElementCount;
      if (childCount === this.state.rowCount && this.state.sliceEnd < 21) {
        this.setState({
          sliceStart: this.state.sliceStart + this.state.rowCount,
          sliceEnd: this.state.sliceEnd + this.state.rowCount
        });
      }
    }, 300);
    setTimeout(() => {
      this.setState({
        fadeIn: !this.state.fadeIn,
        fadeOut: !this.state.fadeOut
      });
    }, 400);
  };

  backHandler = () => {
    this.setState({ fadeOut: !this.state.fadeOut });
    setTimeout(() => {
      if (this.state.sliceStart - this.state.rowCount < 0) {
        this.setState({
          sliceStart: 0,
          sliceEnd: this.state.rowCount
        });
      } else {
        this.setState({
          sliceStart: this.state.sliceStart - this.state.rowCount,
          sliceEnd: this.state.sliceEnd - this.state.rowCount
        });
      }
    }, 300);
    setTimeout(() => {
      this.setState({
        fadeIn: !this.state.fadeIn,
        fadeOut: !this.state.fadeOut
      });
    }, 400);
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
    this.getMoviesHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    return (
      <div className={classes.List}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}
        >
          <div className={classes.Bar} />
          {this.state.sliceStart !== 0 ? (
            <div className={classes.NavLeft} onClick={this.backHandler}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          ) : null}
          <h2>{this.props.heading}</h2>
          {this.state.sliceEnd < 20 ? (
            <div className={classes.NavRight} onClick={this.nextHandler}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          ) : null}
        </div>
        <div
          className={
            this.state.fadeOut
              ? classes.FadeOut + ' ' + classes.ListItems
              : this.state.fadeIn
              ? classes.FadeIn + ' ' + classes.ListItems
              : classes.ListItems
          }
          ref={this.containerWidthRef}
        >
          {this.state.inTheatres ? this.state.inTheatres : null}
        </div>
      </div>
    );
  }
}

export default List;
