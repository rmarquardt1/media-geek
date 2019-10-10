import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../UI/NavBar/NavBar';
import NavSearch from '../Search/NavSearch/NavSearch';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import SideBar from '../UI/SideBar/SideBar';
import TopAlbums from './TopAlbums/TopAlbums';
import TopArtists from './TopArtists/TopArtist';
import TopTracks from './TopTracks/TopTracks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faSearch } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Music.module.css';

class Music extends Component {
  state = {
    searchQuery: 'Rush',
    searchResults: false,
    showSearch: false
  };

  inputHandler = event => {
    this.setState({ searchQuery: event.target.value });
  };

  searchHandler = event => {
    event.preventDefault();
    this.setState({ searchResults: true });
  };

  showSearchHandler = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  render() {
    if (this.state.searchResults) {
      this.setState({ searchResults: false });
      return <Redirect to={'/Music/SearchResults/' + this.state.searchQuery} />;
    }
    return (
      <Aux>
        <NavBar searchType="music" />
        <SideBar />
        <div className={classes.Music}>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={classes.PageTitle}>
              <FontAwesomeIcon
                className={classes.MusicIcon}
                icon={faHeadphones}
              />
              <h2>Music</h2>
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
            <NavSearch searchType="music" placeholder="Search Music" />
          </div>

          <TopArtists />
          <TopAlbums />
          <TopTracks />
        </div>
      </Aux>
    );
  }
}

export default Music;
