import React, {Component} from 'react';
import TvSeries from '../../Tv/TvSeries/TvSeries';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classes from './PickedForYouTv.module.css'

class PickedForYouTv extends Component {
  state = {
    pickedMovies: null,
    sliceStart: 0,
    sliceEnd: null,
    mobileDisplay: false,
    rowCount: null
  }

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.containerWidthRef = React.createRef();
  }

  componentWillUpdate(prevProp, prevState) {
    if (prevState.sliceEnd !== this.state.sliceEnd) {
      this.getTvHandler(JSON.parse(localStorage.getItem('userData')));
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userData')) {
      this.getTvHandler(JSON.parse(localStorage.getItem('userData')));
    }
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
  }

  getTvHandler = (uData) => {
    const favs = JSON.parse(uData).favTvGenres.join('|');
    const networks = JSON.parse(uData).favNetworks.join('|');
    console.log(favs);
    axios.get('https://api.themoviedb.org/3/discover/tv?',
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US',
        region: 'US',
        sort_by: 'vote_count.desc',
        include_adult: 'false',
        include_video: 'false',
        with_genres: favs,
        with_networks: networks
      }}
      ).then(response => {
        const movieDimensions = this.state.mobileDisplay ?
          {
            width: '100px',
            height: '150px',
            movieHeight: '330px',
            fontSize:'14px'
          }
          : {
            width: '170px',
            height: '255px',
            movieHeight: '330px',
            fontSize:'14px'
          };
        const releases =  response.data.results.slice(this.state.sliceStart, this.state.sliceEnd).map(result => {
          return (
            <NavLink style={{color:'#fff', textDecoration: 'none'}} to={'/Tv/' + result.id} key={result.id}>
            <TvSeries
              ref={this.elementRef}
              id={result.id}
              poster={result.poster_path}
              title={result.title}
              release={result.release_date}
              dimensions={movieDimensions}
            />
            </NavLink>
          )});
        this.setState({pickedMovies: releases});
      }).catch(error => {
        console.log('error ' + error);
      });
  }

  resizeHandler = () => {
    const windowW = window.innerWidth;
    if (windowW <= 500) {
      const count = Math.floor(this.containerWidthRef.current.clientWidth / 90);
      this.setState({mobileDisplay: true, 
        sliceEnd: this.state.sliceStart + count,
        rowCount: count
      });
    } else {
      const count = Math.floor(this.containerWidthRef.current.clientWidth / 210);
      this.setState({mobileDisplay:false, 
        sliceEnd: this.state.sliceStart + count,
        rowCount: count
      })
    }
  }

  nextHandler = () => {
    const childCount = this.containerWidthRef.current.childElementCount;
    if (childCount === this.state.rowCount && this.state.sliceEnd < 21) {
      this.setState({
        sliceStart: this.state.sliceStart + this.state.rowCount,
        sliceEnd: this.state.sliceEnd + this.state.rowCount
      });
    }  
  }

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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    return (
      <div className={classes.PickedMovies}>
        <div style={{display:'flex', alignItems:'center', marginLeft:'5px'}}>
        <div className={classes.Bar}/>
        {this.state.sliceStart !== 0 ? 
        <div className={classes.NavLeft} onClick={this.backHandler}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        : null}
        <h2>Television</h2>
        {this.state.sliceEnd < 20 ? 
        <div className={classes.NavRight} onClick={this.nextHandler}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div> : null}
        </div>
        <hr />
        <div className={classes.PickedMoviesMovies} ref={this.containerWidthRef}>
          {this.state.pickedMovies ? this.state.pickedMovies : null}
        </div>
      </div>
    );
  }
}

export default PickedForYouTv;