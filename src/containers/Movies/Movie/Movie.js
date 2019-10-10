import React, { Component } from 'react';
import MovieDetails from '../../../components/Details/MovieDetails/MovieDetails';
import axios from 'axios';

import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './Movie.module.css';

class Movie extends Component {
  state = {
    posterHeight: null
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('orientationchange', this.resizeHandler);
    this.resizeHandler();
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
        this.getRatingsHandler();
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

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
      <div
        className={classes.Movie}
        onClick={this.props.clicked}
        style={{
          width: this.props.dimensions ? this.props.dimensions.width : '',
          height: this.props.dimensions ? this.props.dimensions.movieHeight : ''
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
            src={'http://image.tmdb.org/t/p/w342/' + this.props.poster}
            style={
              this.props.dimensions
                ? this.props.dimensions.imgMax
                  ? { maxHeight: this.props.dimensions.imgMax }
                  : null
                : null
            }
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
    );
  }
}

export default Movie;
