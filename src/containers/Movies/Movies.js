import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import NavSearch from '../Search/NavSearch/NavSearch';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import List from '../List/List';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSearch } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Movies.module.css';

ReactGA.initialize('UA-147154395-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Movies extends Component {
  state = {
    searchQuery: null,
    showSearch: false
  };

  inputHandler = event => {
    this.setState({ searchQuery: event.target.value });
  };

  showSearchHandler = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  render() {
    return (
      <Aux>
        <div className={classes.Movies}>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon className={classes.MoviesIcon} icon={faFilm} />
              <h2 style={{left: '46px'}}>Movies</h2>
            </div>
            <FontAwesomeIcon
              className={uiClasses.HeaderSearchIcon}
              icon={faSearch}
              onClick={this.showSearchHandler}
            />
          </div>
          <div
            className={
              this.state.showSearch
                ? classes.SearchSectionShow + ' ' + classes.SearchSection
                : classes.SearchSection
            }
          >
            <NavSearch searchType="movies" placeholder="Search Movies" />
          </div>
          <List
            listType="popularMovies"
            mediaType="movies"
            heading="Popular Movies"
          />
          <List
            listType="topRatedMovies"
            mediaType="movies"
            heading="Top Rated Movies"
          />
          <List
            listType="inTheatres"
            mediaType="movies"
            heading="In Theatres"
          />
          <List
            listType="upcomingReleases"
            mediaType="movies"
            heading="Upcoming Releases"
          />
        </div>
      </Aux>
    );
  }
}

export default Movies;
