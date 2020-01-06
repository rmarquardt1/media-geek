import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Movies from './containers/Movies/Movies';
import Calendar from "./containers/Calendar/Calendar";
import Streaming from './containers/Streaming/Streaming';
// import Games from "./containers/Games/Games";
import SideBar from './containers/UI/SideBar/SideBar';
import Music from './containers/Music/Music';
import Tv from './containers/Tv/Tv';
import Aux from './hoc/Auxiliary/Auxiliary';
import NavBar from './containers/UI/NavBar/NavBar';
import OpenMovie from './containers/Movies/OpenMovie/OpenMovie';
import OpenMusic from './containers/Music/OpenMusic/OpenMusic';
import OpenTv from './containers/Tv/OpenTv/OpenTv';
import MovieSearchResults from './containers/Movies/SearchResults/SearchResults';
import MusicSearchResults from './containers/Music/SearchResults/SearchResults';
import TvSearchResults from './containers/Tv/SearchResults/SearchResults';
import SearchAllResults from './containers/Search/SearchAll/SearchAllResults/SearchAllResults';
import MovieCollection from './containers/Movies/MovieCollection/MovieCollection';
import Home from './components/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/auth';
import UserRegistration from './containers/UserRegistration/UserRegistration';
import Account from './containers/Account/Account';

ReactGA.initialize('UA-147154395-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Aux>
        <NavBar />
        <SideBar isAuth={this.props.isAuthenticated} />
        <Route
          path="/"
          exact
          render={props => (
            <Home {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Movies"
          exact
          render={props => (
            <Movies {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Streaming"
          exact
          render={props => (
            <Streaming {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Tv"
          exact
          render={props => (
            <Tv {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Calendar"
          exact
          render={props => (
            <Calendar {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Home"
          render={props => (
            <Home {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Movies/SearchResults/:search"
          render={props => (
            <MovieSearchResults
              {...props}
              isAuth={this.props.isAuthenticated}
            />
          )}
        />
        <Route
          path="/Movies/:id"
          render={props => (
            <OpenMovie {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Music/SearchResults/:search"
          render={props => (
            <MusicSearchResults
              {...props}
              isAuth={this.props.isAuthenticated}
            />
          )}
        />
        <Route
          path="/Music/Artist/:id"
          exact
          render={props => (
            <OpenMusic {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Tv/SearchResults/:search"
          render={props => (
            <TvSearchResults {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/SearchResults/:search"
          render={props => (
            <SearchAllResults {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Collection/:id"
          render={props => (
            <MovieCollection {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Tv/:id"
          exact
          render={props => (
            <OpenTv {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/registration"
          exact
          render={props => (
            <UserRegistration {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route
          path="/Account"
          exact
          render={props => (
            <Account {...props} isAuth={this.props.isAuthenticated} />
          )}
        />
        <Route path="/logout" exact component={Logout} />
        <Route path="/Music" exact component={Music} />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
