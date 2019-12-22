import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './SearchAll.module.css';

class SearchAll extends Component {
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
    if (this.state.submitted) {
      this.props.showSearchSidebar();
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

const mapStateToProps = state => {
  return {
    showSearch: state.showSearchSidebar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showSearchSidebar: () => dispatch(actions.showSearchSidebar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAll);
