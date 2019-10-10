import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './BgImages.module.css';

class BgImages extends Component {
  state = {
    images: null,
    movieBgs: null,
    sliceStart: 0,
    sliceEnd: 0,
    rowCount: null,
    showAll: false,
    moveRight: 0,
    containerWidth: null
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
  }

  componentWillUpdate(prevProp, prevState) {
    if (prevState.sliceEnd !== this.state.sliceEnd) {
      this.loadImagesHandler();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.getImagesHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getImageMargin = () => {
    const windowW = window.innerWidth;
    const imageW = windowW < 500 ? 100 : windowW < 768 ? 130 : 200;
    const thumbWidth =
      this.containerWidthRef.current.clientWidth / this.state.rowCount;
    return (thumbWidth - imageW) / 2;
  };

  getImagesHandler = () => {
    axios
      .get('http://webservice.fanart.tv/v3/movies/' + this.props.imdbId, {
        params: {
          api_key: 'c3f4fba1e26da407177b194566ca2d3f'
        }
      })
      .then(response => {
        this.setState({
          images: response.data.moviebackground,
          bgCount: response.data.moviebackground.length
        });
        this.loadImagesHandler(response.data.moviebackground);
        this.resizeHandler();
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  loadImagesHandler = images => {
    const movieImages = images ? images : this.state.images;
    const marg = this.getImageMargin() + 'px';
    const movieBackgrounds = movieImages
      .slice(this.state.sliceStart, this.state.sliceEnd)
      .map(result => {
        const url = result.url.replace('/fanart/', '/preview/');
        return (
          <div
            style={{ marginLeft: marg, marginRight: marg }}
            className={classes.ImageThumb}
            key={Math.random()}
          >
            <img
              className={uiClasses.BoxShadow}
              src={url}
              alt=""
              onClick={() =>
                this.props.imgClick(result.url, movieImages, result.id)
              }
            />
          </div>
        );
      });
    if (movieBackgrounds.length < this.state.rowCount) {
      const w = window.innerWidth;
      const diff = this.state.rowCount - movieBackgrounds.length;
      for (let step = 0; step < diff; step++) {
        movieBackgrounds.push(
          <div
            key={step}
            style={{
              content: '""',
              flex: 'auto',
              width: w <= 500 ? 110 : w <= 768 ? 150 : 220,
              maxWidth: w <= 500 ? 110 : w <= 768 ? 150 : 220
            }}
          ></div>
        );
      }
    }
    this.setState({
      movieBgs: movieBackgrounds
    });
  };

  navHandler = direction => {
    const elWidth = this.containerWidthRef.current.clientWidth;
    const scrollW = this.containerWidthRef.current.scrollWidth;
    const currentPos = { ...this.state }.moveRight;
    switch (direction) {
      case 'right':
        this.setState({
          moveRight: currentPos + elWidth,
          containerWidth: elWidth,
          scrollWidth: scrollW,
          sliceEnd: { ...this.state }.sliceEnd + { ...this.state }.rowCount
        });
        break;
      case 'left':
        this.setState({
          moveRight: currentPos - elWidth,
          actorContainerWidth: elWidth,
          scrollWidth: scrollW,
          sliceEnd: { ...this.state }.sliceEnd - { ...this.state }.rowCount
        });
        break;
      default:
        return null;
    }
  };

  resizeHandler = () => {
    const windowW = window.innerWidth;
    const elWidth = this.containerWidthRef.current.clientWidth;
    let move = { ...this.state }.moveRight;
    move = move !== 0 ? elWidth : 0;
    if (windowW <= 500) {
      const count = Math.floor(
        this.containerWidthRef.current.clientWidth / 110
      );
      this.setState({
        sliceEnd:
          { ...this.state }.sliceEnd === 0
            ? count * 2
            : { ...this.state }.sliceEnd,
        rowCount: count,
        moveRight: move
      });
    } else if (windowW <= 768) {
      const count = Math.floor(
        this.containerWidthRef.current.clientWidth / 150
      );
      this.setState({
        sliceEnd:
          { ...this.state }.sliceEnd === 0
            ? count * 2
            : { ...this.state }.sliceEnd,
        rowCount: count,
        moveRight: move
      });
    } else {
      const count = Math.floor(
        this.containerWidthRef.current.clientWidth / 220
      );
      this.setState({
        sliceEnd:
          { ...this.state }.sliceEnd === 0
            ? count * 2
            : { ...this.state }.sliceEnd,
        rowCount: count,
        moveRight: move
      });
    }
    if (this.state.images) {
      this.loadImagesHandler();
    }
  };

  render() {
    return (
      <Aux>
        <div className={classes.List}>
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}
          >
            <div className={classes.Bar} />
            {this.state.moveRight > 0 && !this.state.showAll ? (
              <div
                className={classes.NavLeft}
                onClick={() => this.navHandler('left')}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            ) : null}
            <h2>Desktop</h2>
            {this.state.sliceEnd < this.state.bgCount && !this.state.showAll ? (
              <div
                className={classes.NavRight}
                onClick={() => this.navHandler('right')}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.ImagesContainer}>
          <div
            className={classes.ListItems}
            style={
              this.state.showAll
                ? { flexWrap: 'wrap', right: 0 }
                : this.state.moveRight > 0
                ? // && !this.state.swiping && !this.state.afterSwipe
                  { right: this.state.moveRight + 'px' }
                : // : this.state.swiping
                  // ? {right: this.state.moveRight + 'px', transition:'none'}
                  // : !this.state.swiping && this.state.afterSwipe
                  // ? {right: this.state.moveRight + this.state.afterSwipeLength + 'px', transition: 'right 0.7s ease-out'}
                  null
            }
            ref={this.containerWidthRef}
          >
            {this.state.movieBgs ? this.state.movieBgs : null}
          </div>
        </div>
      </Aux>
    );
  }
}

export default BgImages;
