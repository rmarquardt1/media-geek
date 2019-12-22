import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './NavSearch.module.css';

class NavSearch extends Component {
  state = {
    query: null,
    submitted: false
  };

  searchHandler = event => {
    event.preventDefault();
    this.setState({ submitted: true });
  };

  inputHandler = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    if (this.state.submitted && this.props.searchType === 'music') {
      this.setState({ submitted: false });
      return <Redirect to={'/Music/SearchResults/' + this.state.query} />;
    }
    if (this.state.submitted && this.props.searchType === 'tv') {
      this.setState({ submitted: false });
      return <Redirect to={'/Tv/SearchResults/' + this.state.query} />;
    }
    if (this.state.submitted && this.props.searchType === 'movies') {
      this.setState({ submitted: false });
      return <Redirect to={'/Movies/SearchResults/' + this.state.query} />;
    }
    if (this.state.submitted && this.props.searchType === 'all') {
      this.setState({ submitted: false });
      return <Redirect to={'/SearchResults/' + this.state.query} />;
    }
    return (
      <form className={classes.SearchForm} onSubmit={this.searchHandler}>
        <input
          className={classes.Input}
          type="text"
          onChange={this.inputHandler}
          placeholder={this.props.placeholder}
        />
        <FontAwesomeIcon
          className={classes.SearchIcon}
          icon={faSearch}
          onClick={this.searchHandler}
        />
      </form>
    );
  }
}

export default NavSearch;
