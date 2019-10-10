import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Movie from '../Movie/Movie';
import SideBar from '../../UI/SideBar/SideBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './MovieCollection.module.css';

class MovieCollection extends Component {
  state = {
    collectionResults: null,
    mobileDisplay: false,
    movieRowCount: null,
    collectionName: null,
    backdrop: null
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
  }

  componentWillUpdate(prevProp, prevState) {
    if (prevState.mobileDisplay !== this.state.mobileDisplay) {
      this.getCollectionHandler();
    }
  }

  componentDidMount() {
    this.getCollectionHandler();
    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.resizeHandler();
  }

  resizeHandler = () => {
    if (this.containerWidthRef.current) {
      const w = window.innerWidth;
      const elWidth = w < 500 ? 100 : 220;
      const rowCount = Math.floor(
        this.containerWidthRef.current.clientWidth / elWidth
      );
      if (window.innerWidth <= 500) {
        this.setState({
          mobileDisplay: true,
          movieRowCount: rowCount
        });
      } else {
        this.setState({
          mobileDisplay: false,
          movieRowCount: rowCount
        });
      }
    }
  };

  getCollectionHandler() {
    axios
      .get(
        'https://api.themoviedb.org/3/collection/' + this.props.match.params.id,
        {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US',
            sort_by: 'release_date.desc'
          }
        }
      )
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
        const movieTotal = response.data.parts.filter(f => {
          return f.poster_path !== null;
        }).length;
        const movieResults = response.data.parts
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
        const flexAdd =
          this.state.movieRowCount - (movieTotal % this.state.movieRowCount);
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
          collectionName: response.data.name,
          collectionResults: movieResults,
          backdrop: response.data.backdrop_path
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }

  render() {
    return (
      <Aux>
        <div
          className={classes.Background}
          style={{
            backgroundImage:
              'url("http://image.tmdb.org/t/p/original/' +
              this.state.backdrop +
              '")'
          }}
        ></div>
        <div className={classes.Overlay}></div>
        <SideBar isAuth={this.props.isAuth} />
        <div className={classes.SearchResultsContainer}>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon className={classes.MoviesIcon} icon={faFilm} />
              <h2>{this.state.collectionName}</h2>
            </div>
          </div>
          <div className={classes.SearchResults} ref={this.containerWidthRef}>
            {this.state.collectionResults}
          </div>
        </div>
      </Aux>
    );
  }
}

export default MovieCollection;
