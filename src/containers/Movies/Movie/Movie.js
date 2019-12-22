import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import MovieDetails from '../../../components/Details/MovieDetails/MovieDetails';
import axios from 'axios';

import mgLogo from '../../../assets/images/mg-icon.png';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './Movie.module.css';

class Movie extends Component {
  state = {
    posterHeight: null,
    rating: null
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('orientationchange', this.resizeHandler);
    this.resizeHandler();
    this.getRatingHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getRatingHandler = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/' +
          this.props.id +
          '/release_dates',
        {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772'
          }
        }
      )
      .then(response => {
        const rated = response.data.results.find(
          rating => rating.iso_3166_1 === 'US'
        ).release_dates[0].certification;
        this.setState({ rating: rated });
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          const timeOut = parseInt(
            error.response.headers['retry-after'] + '000'
          );
          setTimeout(() => {
            this.getRatingHandler();
          }, timeOut);
        } else {
          console.log('error: ' + error);
        }
      });
  };

  resizeHandler = () => {
    if (this.posterRef.current) {
      this.setState({
        posterHeight:
          this.posterRef.current.clientWidth / 2 +
          this.posterRef.current.clientWidth
      });
    }
  };

  render() {
    return (
      <LazyLoad threshold={1400} width={this.props.lazyWidth}>
        <div
          className={classes.Movie}
          onClick={this.props.clicked}
          style={{
            width: this.props.dimensions ? this.props.dimensions.width : '',
            height: this.props.dimensions
              ? this.props.dimensions.movieHeight
              : '',
            marginLeft: this.props.marg,
            marginRight: this.props.marg,
            marginBottom: this.props.margB ? this.props.margB : null
          }}
        >
          <div
            className={classes.Poster + ' ' + uiClasses.BoxShadow}
            ref={this.posterRef}
            style={{
              minHeight: this.props.dimensions
                ? this.props.dimensions.posterHeight
                  ? this.props.dimensions.posterHeight
                  : null
                : '',
              width: this.props.dimensions ? this.props.dimensions.width : '',
              height: this.props.dimensions ? this.props.dimensions.height : ''
            }}
          >


            <img
              src={
                this.props.poster
                ? 'http://image.tmdb.org/t/p/w342/' + this.props.poster
                : mgLogo
              }
              style={
                !this.props.poster
                ? {width: '40%'}
                : null
              }
              // className={uiClasses.BoxShadow}
              alt=""
            />
          </div>
          <MovieDetails
            title={this.props.title}
            type="movie"
            release={this.props.release}
            movieId={this.props.id}
            rating={this.state.rating}
            type={this.props.type}
            fontSize={
              this.props.dimensions ? this.props.dimensions.fontSize : null
            }
          />
        </div>
      </LazyLoad>
    );
  }
}

export default Movie;
