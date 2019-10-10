import React, { Component } from 'react';
import Movie from '../../../Movies/Movie/Movie';
import TvSeries from '../../../Tv/TvSeries/TvSeries';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import NavBar from '../../../UI/NavBar/NavBar';
import SideBar from '../../../UI/SideBar/SideBar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faTv,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../../components/UI/Layout/Layout.module.css';
import classes from './SearchAllResults.module.css';

class SearchAllResults extends Component {
  state = {
    movieSearchResults: null,
    tvSearchResults: null,
    searchQuery: this.props.match.params.search,
    mobileDisplay: null,
    movieSliceStart: 0,
    movieSliceEnd: null,
    movieRowCount: null,
    movieTotalCount: null,
    tvSliceStart: 0,
    tvSliceEnd: null,
    tvRowCount: null,
    tvTotalCount: null
  };

  constructor(props) {
    super(props);
    this.tvContainerWidthRef = React.createRef();
    this.containerWidthRef = React.createRef();
  }

  componentWillUpdate(prevProp, prevState) {
    if (prevState.movieSliceEnd !== this.state.movieSliceEnd) {
      this.getMoviesHandler();
    }
    if (prevState.tvSliceEnd !== this.state.tvSliceEnd) {
      this.getTvHandler();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.props.match.params.search) {
      this.getMoviesHandler();
      this.getTvHandler();
      this.setState({ searchQuery: this.props.match.params.search });
    }
  }

  componentDidMount() {
    this.getMoviesHandler();
    this.getTvHandler();
    if (this.containerWidthRef.current) {
      window.addEventListener('resize', this.resizeHandler.bind(this));
      this.resizeHandler();
    }
  }

  resizeHandler = () => {
    let elWidth = null;
    let rowCount = null;
    if (this.containerWidthRef.current) {
      const w = window.innerWidth;
      elWidth = w < 500 ? 100 : 220;
      rowCount = Math.floor(
        this.containerWidthRef.current.clientWidth / elWidth
      );
      const movieTotalCount = this.containerWidthRef.current.getElementsByTagName(
        'a'
      ).length;
      if (window.innerWidth <= 500) {
        this.setState({
          mobileDisplay: true,
          movieSliceEnd: this.state.movieSliceStart + rowCount * 2,
          movieRowCount: rowCount,
          movieResultCount: movieTotalCount,
          tvSliceEnd: this.state.tvSliceStart + rowCount * 2,
          tvRowCount: rowCount
        });
      } else {
        this.setState({
          mobileDisplay: false,
          movieSliceEnd: this.state.movieSliceStart + rowCount * 2,
          movieRowCount: rowCount,
          movieResultCount: movieTotalCount,
          tvSliceEnd: this.state.tvSliceStart + rowCount * 2,
          tvRowCount: rowCount
        });
      }
    }
  };

  getMoviesHandler = () => {
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US',
          query: this.props.match.params.search,
          include_adult: 'false',
          sort_by: 'popularity.desc'
        }
      })
      .then(response => {
        const movieDimensions = this.state.mobileDisplay
          ? {
              width: '80px',
              height: '120px',
              movieHeight: '160px',
              fontSize: '12px',
              imgMax: '120px',
              posterHeight: '120px'
            }
          : {
              width: '200px',
              height: '300px',
              movieHeight: '370px',
              fontSize: '14px',
              imgMax: '300px'
            };
        const movieTotal = response.data.results.filter(f => {
          return f.poster_path !== null;
        }).length;
        const moviesOnPage = response.data.results
          .filter(f => {
            return f.poster_path !== null;
          })
          .slice(this.state.movieSliceStart, this.state.movieSliceEnd).length;
        const movieResults = response.data.results
          .filter(f => {
            return f.poster_path !== null;
          })
          .slice(this.state.movieSliceStart, this.state.movieSliceEnd)
          .map(item => {
            return (
              <NavLink
                style={{ color: '#fff', textDecoration: 'none' }}
                to={'/Movies/' + item.id}
                key={item.id}
              >
                <Movie
                  ref={this.elementRef}
                  id={item.id}
                  backdrop={item.backdrop_path}
                  title={item.title}
                  summary={item.overview}
                  poster={item.poster_path}
                  release={item.release_date}
                  popularity={item.popularity}
                  dimensions={movieDimensions}
                />
              </NavLink>
            );
          });
        let flexAdd = null;
        if (moviesOnPage < this.state.movieRowCount) {
          flexAdd = this.state.movieRowCount - moviesOnPage;
        }
        if (moviesOnPage > this.state.movieRowCount) {
          flexAdd = this.state.movieRowCount * 2 - moviesOnPage;
        }
        if (flexAdd > 0) {
          for (let step = 0; step < flexAdd; step++) {
            movieResults.push(
              <div
                key={step}
                style={{
                  content: '""',
                  flex: 'auto',
                  width: this.state.mobileDisplay ? '100px' : '220px',
                  maxWidth: this.state.mobileDisplay ? '100px' : '220px'
                }}
              ></div>
            );
          }
        }
        this.setState({
          movieSearchResults: movieResults,
          movieTotalCount: movieTotal
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  moviesNextHandler = () => {
    const childCount = this.containerWidthRef.current.childElementCount;
    if (
      childCount === this.state.movieRowCount * 2 &&
      this.state.movieSliceEnd < 21
    ) {
      this.setState({
        movieSliceStart:
          this.state.movieSliceStart + this.state.movieRowCount * 2,
        movieSliceEnd: this.state.movieSliceEnd + this.state.movieRowCount * 2
      });
    }
  };

  moviesBackHandler = () => {
    if (this.state.movieSliceStart - this.state.movieRowCount * 2 < 0) {
      this.setState({
        movieSliceStart: 0,
        movieSliceEnd: this.state.movieRowCount * 2
      });
    } else {
      this.setState({
        movieSliceStart:
          this.state.movieSliceStart - this.state.movieRowCount * 2,
        movieSliceEnd: this.state.movieSliceEnd - this.state.movieRowCount * 2
      });
    }
  };

  getTvHandler = () => {
    axios
      .get('https://api.themoviedb.org/3/search/tv', {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US',
          query: this.props.match.params.search,
          include_adult: 'false',
          sort_by: 'popularity.desc'
        }
      })
      .then(response => {
        const tvDimensions = this.state.mobileDisplay
          ? {
              width: '80px',
              height: '120px',
              tvHeight: '160px',
              fontSize: '12px',
              imgMax: '120px',
              posterHeight: '120px'
            }
          : {
              width: '200px',
              height: '300px',
              tvHeight: '370px',
              fontSize: '14px',
              imgMax: '300px'
            };
        const tvTotal = response.data.results.filter(f => {
          return f.poster_path !== null;
        }).length;
        const tvOnPage = response.data.results
          .filter(f => {
            return f.poster_path !== null;
          })
          .slice(this.state.tvSliceStart, this.state.tvSliceEnd).length;
        const tvResults = response.data.results
          .filter(f => {
            return f.poster_path !== null;
          })
          .slice(this.state.tvSliceStart, this.state.tvSliceEnd)
          .map(item => {
            return (
              <NavLink
                style={{ color: '#fff', textDecoration: 'none' }}
                to={'/Tv/' + item.id}
                key={item.id}
              >
                <TvSeries
                  ref={this.elementRef}
                  id={item.id}
                  backdrop={item.backdrop_path}
                  title={item.name}
                  summary={item.overview}
                  poster={item.poster_path}
                  release={item.release_date}
                  popularity={item.popularity}
                  dimensions={tvDimensions}
                />
              </NavLink>
            );
          });
        let flexAdd = null;
        if (tvOnPage < this.state.tvRowCount) {
          flexAdd = this.state.tvRowCount - tvOnPage;
        }
        if (tvOnPage > this.state.tvRowCount) {
          flexAdd = this.state.tvRowCount * 2 - tvOnPage;
        }
        if (flexAdd > 0) {
          for (let step = 0; step < flexAdd; step++) {
            tvResults.push(
              <div
                key={step}
                style={{
                  content: '""',
                  flex: 'auto',
                  width: this.state.mobileDisplay ? '100px' : '220px',
                  maxWidth: this.state.mobileDisplay ? '100px' : '220px'
                }}
              ></div>
            );
          }
        }
        this.setState({ tvSearchResults: tvResults, tvTotalCount: tvTotal });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  tvNextHandler = () => {
    const childCount = this.containerWidthRef.current.childElementCount;
    if (
      childCount === this.state.tvRowCount * 2 &&
      this.state.tvSliceEnd < 21
    ) {
      this.setState({
        tvSliceStart: this.state.tvSliceStart + this.state.tvRowCount * 2,
        tvSliceEnd: this.state.tvSliceEnd + this.state.tvRowCount * 2
      });
    }
  };

  tvBackHandler = () => {
    if (this.state.tvSliceStart - this.state.tvRowCount * 2 < 0) {
      this.setState({
        tvSliceStart: 0,
        tvSliceEnd: this.state.tvRowCount * 2
      });
    } else {
      this.setState({
        tvSliceStart: this.state.tvSliceStart - this.state.tvRowCount * 2,
        tvSliceEnd: this.state.tvSliceEnd - this.state.tvRowCount * 2
      });
    }
  };

  render() {
    return (
      <Aux>
        <SideBar />
        <NavBar searchType="movies" />
        <div className={classes.SearchResultsFor}>
          <div>
            Search Results for "
            <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              {this.props.match.params.search}
            </span>
            "
          </div>
        </div>
        <div className={classes.SearchResultsContainer}>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              {this.state.movieSliceStart !== 0 ? (
                <div
                  className={classes.NavLeft}
                  onClick={this.moviesBackHandler}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              ) : null}
              <FontAwesomeIcon className={classes.MoviesIcon} icon={faFilm} />
              <h2>Movies</h2>
              {this.state.movieTotalCount > this.state.movieSliceEnd ? (
                <div
                  className={classes.NavRight}
                  onClick={this.moviesNextHandler}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes.SearchResults} ref={this.containerWidthRef}>
            {this.state.movieSearchResults}
          </div>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              {this.state.tvSliceStart !== 0 ? (
                <div className={classes.NavLeft} onClick={this.tvBackHandler}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              ) : null}
              <FontAwesomeIcon className={classes.TvIcon} icon={faTv} />
              <h2>Television</h2>
              {this.state.tvTotalCount > this.state.tvSliceEnd ? (
                <div className={classes.NavRight} onClick={this.tvNextHandler}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              ) : null}
            </div>
          </div>
          <div className={classes.SearchResults} ref={this.tvContainerWidthRef}>
            {this.state.tvSearchResults}
          </div>
        </div>
      </Aux>
    );
  }
}

export default SearchAllResults;
