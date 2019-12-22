import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../UI/NavBar/NavBar';
import NavSearch from '../Search/NavSearch/NavSearch';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import SideBar from '../UI/SideBar/SideBar';
import List from '../List/List';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Tv.module.css';

class Tv extends Component {
  state = {
    searchQuery: 'Stranger',
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
        <SideBar isAuth={this.props.isAuth} />
        <NavBar />
        <div className={classes.Tv}>
          <div className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}>
            <div className={uiClasses.PageTitle}>
              <FontAwesomeIcon className={classes.TvIcon} icon={faTv} />
              <h2 style={{left: '46px'}}>Television</h2>
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
            <NavSearch searchType="tv" placeholder="Search Television" />
          </div>
          <List listType="popularTv" mediaType="tv" heading="Popular Shows" />
          <List
            listType="topRatedTv"
            mediaType="tv"
            heading="Top Rated Shows"
          />
          <List
            listType="airingThisWeek"
            mediaType="tv"
            heading="Airing This Week"
          />
          <List listType="airingToday" mediaType="tv" heading="Airing Today" />
        </div>
      </Aux>
    );
  }
}

export default Tv;
