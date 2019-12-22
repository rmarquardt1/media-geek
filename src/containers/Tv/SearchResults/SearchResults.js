import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TvSeries from '../TvSeries/TvSeries';
import NavSearch from '../../Search/NavSearch/NavSearch';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './SearchResults.module.css';

class SrchResults extends Component {
  state = {
    listData: null,
    list: null,
    containerWidth: 0,
    currentElPosition: 0,
    listLoaded: false,
    scrollWidth: 0,
    moveRight: 0,
    searchQuery: this.props.match.params.search
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.props.match.params.search) {
      this.getResultsHandler();
      this.setState({ searchQuery: this.props.match.params.search });
    }
    if (
      prevState.listLoaded !== this.state.listLoaded &&
      this.state.scrollWidth !== this.containerWidthRef.current.scrollWidth
    ) {
      this.setState({
        scrollWidth: this.containerWidthRef.current.scrollWidth
      });
    }
  }

  componentDidMount() {
    this.setState({
      containerWidth: this.containerWidthRef.current.clientWidth,
      searchQuery: this.props.match.params.search
    });
    window.addEventListener('resize', this.resizeHandler);
    this.getResultsHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getResultsHandler = async () => {

    let page = {};
    for (let i = 1; i < 4; i++) {
      await axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US',
            query: this.props.match.params.search,
            include_adult: 'false',
            sort_by: 'popularity.desc',
            page: i
          }
        })
        .then(response => {
          page[i] = response.data.results;
        })
        .catch(error => {
          console.log('error ' + error);
        });
    }
    if (page[1] && page[2] && page[3]) {
      this.setState({ listData: [...page[1], ...page[2], ...page[3]] });
    } else if (page[1] && page[2]) {
      this.setState({ listData: [...page[1], ...page[2]] });
    } else if (page[1]) {
      this.setState({ listData: [...page[1]] });
    }
    this.resizeHandler();
  };

  loadListHandler = (marg, navLeftClicked) => {
    const windowW = window.innerWidth;
    const movieDimensions =
      windowW <= 500
        ? {
            width: '75px',
            lazyW: 75,
            lazyH: 170,
            height: '110px',
            movieHeight: '160px',
            fontSize: '12px'
          }
        : {
            width: '170px',
            lazyW: 170,
            lazyH: 350,
            height: '255px',
            movieHeight: '330px',
            fontSize: '14px'
          };
    const releases = this.state.listData
      ? this.state.listData.map(result => {
          return (
            <NavLink
              style={{ color: '#fff', textDecoration: 'none' }}
              to={'/Tv/' + result.id}
              key={result.id}
            >
              <TvSeries
                marg={marg + 'px'}
                lazyWidth={marg * 2 + movieDimensions.lazyW}
                lazyHeight={movieDimensions.lazyH}
                thresh={500}
                id={result.id}
                backdrop={result.backdrop_path}
                title={result.name}
                poster={result.poster_path}
                release={result.release_date}
                dimensions={movieDimensions}
              />
            </NavLink>
          );
        })
      : null;
    this.setState({
      list: releases,
      listLoaded: true
    });
  };

  resizeHandler = async (elPos, navLeftClicked) => {
    console.log(this.containerWidthRef.current.clientWidth);
    const windowW = window.innerWidth;
    if (this.containerWidthRef.current) {
      const containerW = this.containerWidthRef.current.clientWidth;
      const scrollW = this.containerWidthRef.current.scrollWidth;
      const thumbW = windowW <= 500 ? 95 : 190;
      const elCount = Math.floor(containerW / thumbW);
      const marg = (containerW / elCount - thumbW) / 2 + 10;
      const move =
        typeof elPos === 'number'
          ? elPos * (thumbW - 20 + marg * 2)
          : this.state.currentElPosition * (thumbW - 20 + marg * 2);
      this.setState({
        containerWidth: containerW,
        scrollWidth: scrollW
      });
      this.loadListHandler(marg, navLeftClicked);
      this.containerWidthRef.current.scrollTo({
        left: move,
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  render() {
    return (
      <div className={classes.SearchResultsContainer}>
        <div
          className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}
          style={{ justifyContent: 'center' }}
        >
          <div className={uiClasses.PageTitle}>
            <FontAwesomeIcon className={classes.TvIcon} icon={faTv} />
            <h2>Television</h2>
          </div>
        </div>
        <div className={classes.SearchSectionShow + ' ' + classes.SearchSection}>
          <NavSearch searchType="tv" placeholder="Search Television" />
        </div>
        <div className={classes.SearchResultsFor + ' ' + classes.SearchResultsForSlideDown}>
          Search Results for
          <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
            {' "' + this.props.match.params.search + '"'}
          </span>
        </div>
        <div className={classes.List + ' ' + classes.ListSlideDown}>
          <div className={classes.ListContainer}>
            <div className={classes.ListItems} ref={this.containerWidthRef}>
              {this.state.list ? this.state.list : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SrchResults;
