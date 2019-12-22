import React, { Component } from 'react';
import Movie from '../Movies/Movie/Movie';
import TvSeries from '../Tv/TvSeries/TvSeries';
import listUrl from '../../references/listUrl';
import listAxiosParams from '../../references/listAxiosParams';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './List.module.css';

class List extends Component {
  axiosCancel = axios.CancelToken.source();

  state = {
    listData: null,
    list: [],
    containerWidth: 0,
    currentElPosition: 0,
    listLoaded: false,
    scrollWidth: 0,
    moveRight: 0,
    headerMoveLeft: false,
    showNavRight: true,
    scrollPos: null,
    scrollMax: 0,
    showAll: false,
    noResults: false
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
    this.tryAgainTimer = null;
  }

  componentDidUpdate(prevState) {
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
      containerWidth: this.containerWidthRef.current.clientWidth
    });
    window.addEventListener('resize', this.resizeHandler);
    this.getListHandler();
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
    this.axiosCancel.cancel('axios list request cancelled');
    if (this.tryAgainTimer) {
      clearTimeout(this.tryAgainTimer);
    }
  }

  getListHandler = async () => {
    const axiosParams = listAxiosParams(
      this.props.listType,
      this.props.query,
      this.props.actorId
    );
    const url = listUrl(this.props.listType, this.props.movieId);
    let page = {};
    for (let i = 1; i < 4; i++) {
      await axios
        .get(url, {
          cancelToken: this.axiosCancel.token,
          params: { ...axiosParams, page: i }
        })
        .then(response => {
          page[i] = response.data.results;
        })
        .catch(error => {
          // if (error.response && error.response.status === 429) {
          //   const timeOut = parseInt(
          //     error.response.headers['retry-after'] + '000'
          //   );
          //   this.getListTryAgainHandler(timeOut);
          // } else {
          //   console.log('error: ' + error);
          // }
          console.log('error: ' + error);
        });
    }
    if (page[1] && page[2] && page[3]) {
      this.setState({ listData: [...page[1], ...page[2], ...page[3]] });
    } else if (page[1] && page[2]) {
      this.setState({ listData: [...page[1], ...page[2]] });
    } else if (page[1]) {
      this.setState({ listData: [...page[1]] });
    }
    if (typeof page[1] !== 'undefined') {
      if (page[1].length === 0) {
        this.setState({ noResults: true });
      }
    }
    this.resizeHandler();
  };

  getListTryAgainHandler = timeOut => {
    this.tryAgainTimer = setTimeout(() => {
      this.getListHandler();
    }, timeOut);
  };

  loadListHandler = (marg, navLeftClicked) => {
    const windowW = window.innerWidth;
    const movieDimensions =
      windowW <= 500
        ? {
            width: '90px',
            lazyW: 90,
            height: '135px',
            movieHeight: '160px',
            fontSize: '12px'
          }
        : {
            width: '195px',
            lazyW: 195,
            height: '293px',
            // movieHeight: '350px',
            fontSize: '14px'
          };

    const releases = this.state.listData
      ? this.state.listData.map((result, index) => {
          if (this.props.mediaType === 'movies') {
            return (
              <NavLink
                style={{ color: '#fff', textDecoration: 'none' }}
                to={'/Movies/' + result.id}
                key={index}
              >
                <Movie
                  marg={marg + 'px'}
                  lazyWidth={marg * 2 + movieDimensions.lazyW}
                  id={result.id}
                  poster={result.poster_path}
                  title={result.title}
                  release={result.release_date}
                  dimensions={movieDimensions}
                />
              </NavLink>
            );
          }
          if (this.props.mediaType === 'tv' && result.poster_path) {
            return (
              <NavLink
                style={{ color: '#fff', textDecoration: 'none' }}
                to={'/Tv/' + result.id}
                key={index}
              >
                <TvSeries
                  marg={marg + 'px'}
                  lazyWidth={marg * 2 + movieDimensions.lazyW}
                  id={result.id}
                  backdrop={result.backdrop_path}
                  title={result.name}
                  poster={result.poster_path}
                  release={result.release_date}
                  dimensions={movieDimensions}
                  streaming={this.props.streaming}
                />
              </NavLink>
            );
          }
        })
      : null;
    this.setState({
      list: releases,
      listLoaded: true
    });
    this.showNavRightHandler(navLeftClicked);
  };

  showNavRightHandler = navLeftClicked => {
    const scrollPosition = this.containerWidthRef.current.scrollLeft;
    const scrollMax =
      this.containerWidthRef.current.scrollWidth -
      this.containerWidthRef.current.clientWidth -
      this.containerWidthRef.current.clientWidth;
    this.setState({
      showNavRight:
        scrollPosition < scrollMax ? true : navLeftClicked ? true : false
    });
  };

  resizeHandler = async (elPos, navLeftClicked) => {
    const windowW = window.innerWidth;
    if (this.containerWidthRef.current) {
      const containerW = this.containerWidthRef.current.clientWidth;
      const scrollW = this.containerWidthRef.current.scrollWidth;
      // const thumbW = windowW <= 500 ? 95 : 190;
      const thumbW = windowW <= 500 ? 90 : 195;
      const elCount = Math.floor(containerW / thumbW);
      // const marg = (containerW / elCount - thumbW) / 2 + 10;
      const marg = (containerW / elCount - thumbW) / 2;
      // const move =
      //   typeof elPos === 'number'
      //     ? elPos * (thumbW - 20 + marg * 2)
      //     : this.state.currentElPosition * (thumbW - 20 + marg * 2);
      const move =
        typeof elPos === 'number'
          ? elPos * (thumbW + marg * 2)
          : this.state.currentElPosition * (thumbW + marg * 2);

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

  navHandler = direction => {
    const windowW = window.innerWidth;
    const containerW = this.containerWidthRef.current.clientWidth;
    const scrollW = this.containerWidthRef.current.scrollWidth;
    const thumbW = windowW <= 500 ? 95 : 190;
    const actElCount = Math.floor(containerW / thumbW);
    const currentElPos = { ...this.state }.currentElPosition;

    switch (direction) {
      case 'right':
        this.setState({
          moveRight: containerW + { ...this.state }.containerWidth,
          containerWidth: containerW + { ...this.state }.containerWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition: currentElPos + actElCount
        });
        this.resizeHandler(currentElPos + actElCount, false);
        break;
      case 'left':
        this.setState({
          moveRight: containerW - { ...this.state }.containerWidth,
          containerWidth: containerW - { ...this.state }.containerWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition:
            currentElPos - actElCount >= 0 ? currentElPos - actElCount : 0,
          showNavRight: true
        });
        this.resizeHandler(currentElPos - actElCount, true);
        break;
      default:
        this.setState({
          moveRight: 0,
          containerWidth: 0,
          scrollWidth: 0,
          headerMoveLeft: false,
          currentElPosition: 0
        });
    }
  };

  showAllHandler = () => {
    this.setState({
      showAll: !this.state.showAll
    });
    this.navHandler();
  };

  render() {
    return (
      <div className={classes.List}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}
        >
          <div className={classes.Bar} />
          {this.state.currentElPosition > 0 ? (
            <div
              className={classes.NavLeft}
              onClick={() => this.navHandler('left')}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          ) : null}

          {this.props.listType === 'netflix' ? (
            <React.Fragment>
              <div className={classes.NetworkLogo + ' ' + classes.Netflix} />
              <h2 style={{ marginLeft: 0 }}>{this.props.heading}</h2>
            </React.Fragment>
          ) : this.props.listType === 'amazon' ? (
            <React.Fragment>
              <div className={classes.NetworkLogo + ' ' + classes.Amazon} />
              <h2 style={{ marginLeft: 0 }}>{this.props.heading}</h2>
            </React.Fragment>
          ) : this.props.listType === 'hulu' ? (
            <React.Fragment>
              <div className={classes.NetworkLogo + ' ' + classes.Hulu} />
              <h2 style={{ marginLeft: 0 }}>{this.props.heading}</h2>
            </React.Fragment>
          ) : this.props.listType === 'disneyPlus' ? (
            <React.Fragment>
              <div className={classes.NetworkLogo + ' ' + classes.DisneyPlus} />
              <h2 style={{ marginLeft: 0 }}>{this.props.heading}</h2>
            </React.Fragment>
          ) : (
            <h2>{this.props.heading}</h2>
          )}

          <div className={classes.NavRight}>
            {this.state.list === null ? null : this.state.list.length > 0 ? (
              <div className={classes.ShowAll} onClick={this.showAllHandler}>
                <FontAwesomeIcon
                  icon={this.state.showAll ? faChevronUp : faChevronDown}
                  className={classes.ShowChevronDown}
                />
                {this.state.showAll ? 'Show Less' : 'Show All'}
              </div>
            ) : null}
            {this.state.showNavRight && !this.state.showAll ? (
              <FontAwesomeIcon
                icon={faChevronRight}
                className={classes.chevronArrow}
                onClick={() => this.navHandler('right')}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.ListContainer}>
          <div
            className={
              this.state.showAll ? classes.ListItemsShowAll : classes.ListItems
            }
            ref={this.containerWidthRef}
          >
            {this.state.list !== null
              ? this.state.list.length > 0
                ? this.state.list
                : null
              : null}
            {this.state.noResults ? (
              <h2 className={uiClasses.NoResults}>No Results Found</h2>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
