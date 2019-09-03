import React, {Component} from 'react';
import Movie from '../../../components/Movie/Movie';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classes from './PopularMovies.module.css'



class PopularMovies extends Component {

  state = {
    popularMovies: null,
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
      this.getMoviesHandler();
    }
  }

  getMoviesHandler = () => {
    axios.get('https://api.themoviedb.org/3/movie/popular?',
      {params: {
        api_key: '4c7294000365c14a8e42109c863ff772',
        language: 'en-US',
        region: 'US'
      }}
      ).then(response => {
        const movieDimensions = this.state.mobileDisplay ?
          {
            width: '80px',
            height: '120px',
            movieHeight: '330px',
            fontSize:'12px'
          }
          : {
            width: '170px',
            height: '255px',
            movieHeight: '330px',
            fontSize:'14px'
          };
        const releases =  response.data.results.slice(this.state.sliceStart, this.state.sliceEnd).map(result => {
          return (
            <NavLink style={{color:'#fff', textDecoration: 'none'}} to={'/Movies/' + result.id} key={result.id}>
            <Movie
              ref={this.elementRef}
              id={result.id}
              poster={result.poster_path}
              title={result.title}
              release={result.release_date}
              dimensions={movieDimensions}
            />
            </NavLink>
          )});
        this.setState({popularMovies: releases});
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
      <div className={classes.PopularMovies}>
        <div style={{display:'flex', alignItems:'center', marginLeft:'5px'}}>
        <div className={classes.Bar}/>
        {this.state.sliceStart !== 0 ? 
        <div className={classes.NavLeft} onClick={this.backHandler}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        : null}
        <h2>Popular Movies</h2>
        {this.state.sliceEnd < 20 ? 
        <div className={classes.NavRight} onClick={this.nextHandler}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div> : null}
        </div>
        <hr />
        <div className={classes.PopularMoviesMovies} ref={this.containerWidthRef}>
          {this.state.popularMovies ? this.state.popularMovies : null}
        </div>
        <hr/>
      </div>
      
      



    );

  }






}

export default PopularMovies;