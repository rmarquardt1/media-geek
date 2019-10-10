import React, { Component } from 'react';
import MusicComp from '../MusicComp/MusicComp';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import classes from './TopAlbums.module.css';

class TopAlbums extends Component {
  state = {
    sectionResults: null,
    sliceStart: 0,
    sliceEnd: null,
    mobileDisplay: false,
    rowCount: null
  };

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.containerWidthRef = React.createRef();
  }

  componentWillUpdate(prevProp, prevState) {
    if (prevState.sliceEnd !== this.state.sliceEnd) {
      this.getResultsHandler();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
    this.getResultsHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  nextHandler = () => {
    const childCount = this.containerWidthRef.current.childElementCount;
    if (childCount === this.state.rowCount && this.state.sliceEnd < 21) {
      this.setState({
        sliceStart: this.state.sliceStart + this.state.rowCount,
        sliceEnd: this.state.sliceEnd + this.state.rowCount
      });
    }
  };

  backHandler = () => {
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
  };

  getResultsHandler = () => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums',
        {
          params: {
            limit: '100'
          }
        }
      )
      .then(response => {
        const musicDimensions = this.state.mobileDisplay
          ? {
              width: '75px',
              height: '75px',
              fontSize: '12px'
            }
          : {
              width: '170px',
              height: '170px',
              fontSize: '14px'
            };
        const res = response.data.data
          .slice(this.state.sliceStart, this.state.sliceEnd)
          .map(result => {
            return (
              <MusicComp
                ref={this.elementRef}
                key={result.id}
                id={result.id}
                title={result.title}
                summary={result.overview}
                poster={result.cover_big}
                clicked={this.removeResizeHandler}
                dimensions={musicDimensions}
                artist={result.artist.name}
                mobile={this.state.mobileDisplay}
              />
            );
          });
        this.setState({ sectionResults: res });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  resizeHandler = () => {
    const windowW = window.innerWidth;
    if (windowW <= 500) {
      const count = Math.floor(this.containerWidthRef.current.clientWidth / 90);
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

  render() {
    return (
      <div className={classes.PageSection}>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}
        >
          <div className={classes.Bar} />
          {this.state.sliceStart !== 0 ? (
            <div className={classes.NavLeft} onClick={this.backHandler}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          ) : null}
          <h2>Top Albums</h2>
          {this.state.sliceEnd < 20 ? (
            <div className={classes.NavRight} onClick={this.nextHandler}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          ) : null}
        </div>
        <div className={classes.PageSectionResult} ref={this.containerWidthRef}>
          {this.state.sectionResults ? this.state.sectionResults : null}
        </div>
      </div>
    );
  }
}

export default TopAlbums;
