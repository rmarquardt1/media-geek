import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/auth';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import List from '../../../List/List';
import uiClasses from '../../../../components/UI/Layout/Layout.module.css';
import classes from './SearchAllResults.module.css';

class SearchAllResults extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      window.location.href = '/SearchResults/' + this.props.match.params.search;
    }
  }

  componentDidMount() {
    this.props.showSidebarHandler(false);
  }

  render() {
    return (
      <Aux>
        <div className={classes.SearchResultsContainer}>
          <div
            className={uiClasses.SectionHeader + ' ' + uiClasses.PageHeader}
            style={{ justifyContent: 'center' }}
          >
            <div className={uiClasses.PageTitle} style={{ marginLeft: '30px' }}>
              Search Results for "
              <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                {this.props.match.params.search}
              </span>
              "
            </div>
          </div>
          <List
            listType="searchMovies"
            mediaType="movies"
            heading="Movies"
            query={this.props.match.params.search}
          />
          <List
            listType="searchTv"
            mediaType="tv"
            heading="Television"
            query={this.props.match.params.search}
          />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.error,
    showSearch: state.showSearchSidebar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearAuthError: () => dispatch(actions.clearAuthFail()),
    showSearchSidebar: () => dispatch(actions.showSearchSidebar()),
    showSidebarHandler: show => dispatch(actions.showSidebarHandler(show))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAllResults);
