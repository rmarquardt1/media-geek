import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../List/List';
import PickedForYouMovies from './PickedForYouMovies/PickedForYouMovies';
import PickedForYouTv from './PickedForYouTv/PickedForYouTv';
import SideBar from '../UI/SideBar/SideBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Home.module.css';

class Home extends Component {
  state = {
    inTheatres: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    showRegistration: false,
    showNetworks: false,
    showMovieGenres: false,
    showTvGenres: false,
    dataLoaded: false
  };

  registrationHandler = () => {
    this.setState({
      showRegistration: true,
      showNetworks: false,
      showMovieGenres: false,
      showTvGenres: false
    });
  };

  showNetworksHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: true,
      showMovieGenres: false,
      showTvGenres: false
    });
  };

  showMovieGenresHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: false,
      showMovieGenres: true,
      showTvGenres: false
    });
  };

  showTvGenresHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: false,
      showMovieGenres: false,
      showTvGenres: true
    });
  };

  showHomeHandler = () => {
    this.setState({
      showRegistration: false,
      showNetworks: false,
      showMovieGenres: false,
      showTvGenres: false
    });
  };

  render() {
    return (
      <Aux>
        <SideBar
          clickCreate={this.registrationHandler}
          isAuth={this.props.isAuth}
        />
        <div className={classes.Home}>
          <Aux>
            {this.props.isAuth ? (
              <Aux>
                <div
                  style={{ marginBottom: '10px' }}
                  className={uiClasses.SectionHeader}
                >
                  <h2>Just For You</h2>
                </div>
                <PickedForYouMovies />
                <PickedForYouTv />
              </Aux>
            ) : null}
            <div
              className={
                uiClasses.SectionHeader + ' ' + classes.SectionHeaderSearch
              }
            >
              <h2>Movies</h2>
            </div>
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
            <div
              className={
                uiClasses.SectionHeader + ' ' + classes.SectionHeaderSearch
              }
            >
              <h2>Television</h2>
            </div>
            <List
              listType="airingThisWeek"
              mediaType="tv"
              heading="Airing This Week"
            />
            <List
              listType="airingToday"
              mediaType="tv"
              heading="Airing Today"
            />
          </Aux>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    tokenId: state.tokenId
  };
};

export default connect(mapStateToProps)(Home);
