import React, { Component } from 'react';
import MovieDetails from '../../../components/Details/MovieDetails/MovieDetails';
import axios from 'axios';

import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './TvSeries.module.css';

class Movie extends Component {
  state = {
    posterHeight: null,
    rating: null,
    imdbScore: null,
    rtScore: null,
    mcScore: null,
    airDates: null,
    networkLogo: null
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
    this.getDetailsHandler();
    this.getRatingsHandler();
    axios
      .get(
        'https://api.themoviedb.org/3/tv/' + this.props.id + '/content_ratings',
        {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US'
          }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({
          rating: response.data.results.find(
            rating => rating.iso_3166_1 === 'US'
          ).rating
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  getDetailsHandler = () => {
    axios
      .get('https://api.themoviedb.org/3/tv/' + this.props.id, {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          language: 'en-US'
        }
      })
      .then(response => {
        const firstAir = new Date(response.data.first_air_date);
        const lastAir = new Date(response.data.last_air_date);
        const airSpan =
          firstAir.getFullYear() !== lastAir.getFullYear()
            ? firstAir.getFullYear() + '-' + lastAir.getFullYear()
            : firstAir.getFullYear();
        this.setState({
          airDates: airSpan,
          networkLogo: response.data.networks[0].logo_path
            ? 'http://image.tmdb.org/t/p/w92' +
              response.data.networks[0].logo_path
            : response.data.networks[0].name,
          seasons: response.data.number_of_seasons
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  getRatingsHandler = () => {
    axios
      .get('https://www.omdbapi.com/', {
        params: {
          apikey: 'ec2bd2c4',
          t: this.props.title,
          type: 'series'
        }
      })
      .then(response => {
        response.data.Ratings.map(rating => {
          if (rating.Source === 'Internet Movie Database') {
            this.setState({ imdbScore: rating.Value });
          }
          if (rating.Source === 'Rotten Tomatoes') {
            this.setState({ rtScore: rating.Value });
          }
          if (rating.Source === 'Metacritic') {
            this.setState({ mcScore: rating.Value });
          }
          return null;
        });
      })
      .catch(error => {
        console.log('error ' + error);
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
      <div
        className={classes.Movie}
        style={{
          width: this.props.dimensions ? this.props.dimensions.width : '',
          height: this.props.dimensions ? this.props.dimensions.tvHeight : ''
        }}
      >
        <div
          className={classes.Poster}
          ref={this.posterRef}
          style={{
            minHeight: this.state.posterHeight,
            width: this.props.dimensions ? this.props.dimensions.width : '',
            height: this.props.dimensions ? this.props.dimensions.height : ''
          }}
        >
          <img
            src={'http://image.tmdb.org/t/p/w342/' + this.props.poster}
            className={uiClasses.BoxShadow}
            alt=""
          />
          {this.state.networkLogo ? (
            <img
              className={classes.Network + ' ' + uiClasses.BoxShadowReverse}
              src={this.state.networkLogo}
              alt=""
            />
          ) : null}
        </div>
        <MovieDetails
          title={this.props.title}
          type="tv"
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
