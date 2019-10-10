import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../Auth/Auth';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Favorites from '../../Favorites/Favorites';
import Watchlist from '../../Watchlist/Watchlist';
import SearchAll from '../../Search/SearchAll/SearchAll';
import mgLogo from '../../../assets/images/mg-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faUserCircle,
  faBars,
  faSearch,
  faFilm,
  faTv,
  faHome,
  faHeart,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './SideBar.module.css';

class SideBar extends Component {
  state = {
    showSignIn: false,
    showSearch: false,
    slideOut: false,
    userFavorites: [],
    showFavorites: false,
    showWatchlist: false,
    watchHideLinks: false,
    favHideLinks: false
  };

  componentDidMount() {
    if (
      this.props.isAuth &&
      localStorage.getItem('userData') &&
      JSON.parse(localStorage.getItem('userData')).favMovies.length > 0
    ) {
      this.getFavoritesHandler();
    }
  }

  menuHandler = event => {
    if (event.target.id === 'signIn') {
      this.setState({ showSignIn: !this.state.showSignIn });
    }
  };

  favoritesMenuHandler = () => {
    this.setState({
      showFavorites: !this.state.showFavorites,
      showWatchlist: false,
      favHideLinks: !this.state.favHideLinks,
      showSearch: false
    });
  };

  watchlistMenuHandler = () => {
    this.setState({
      showWatchlist: !this.state.showWatchlist,
      showFavorites: false,
      watchHideLinks: !this.state.watchHideLinks,
      showSearch: false
    });
  };

  showMenuHandler = () => {
    this.setState({ slideOut: !this.state.slideOut });
  };

  showSearchHandler = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  getFavoritesHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const favs = userData.favMovies;
    favs.map(fav => {
      axios
        .get('https://api.themoviedb.org/3/movie/' + fav, {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US'
          }
        })
        .then(response => {
          this.setState(prevState => ({
            userFavorites: [
              ...prevState.userFavorites,
              {
                title: response.data.title,
                id: response.data.id,
                poster: response.data.poster_path,
                release: response.data.release_date
              }
            ]
          }));
        })
        .catch(error => {
          console.log('error ' + error);
        });
      return null;
    });
  };

  render() {
    const userData = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null;
    const displayName = userData ? userData.displayName : null;
    const sideBarClass = this.state.slideOut
      ? classes.SideBar +
        ' ' +
        uiClasses.BoxShadow +
        ' ' +
        classes.SideBarSlideIn
      : classes.SideBar + ' ' + uiClasses.BoxShadow;
    return (
      <Aux>
        <FontAwesomeIcon
          icon={faBars}
          className={classes.MenuIcon}
          onClick={this.showMenuHandler}
        />
        <div className={sideBarClass}>
          <ul>
            <NavLink to="/">
              <li>
                <div className={classes.LogoContainer}>
                  <img className={classes.Logo} src={mgLogo} alt="" />
                  <div className={classes.LogoText}>
                    <span style={{ fontWeight: '200' }}>media</span>
                    <span style={{ fontWeight: '600' }}>Geek</span>
                  </div>
                </div>
              </li>
            </NavLink>
            {!this.props.isAuth ? (
              <Aux>
                <li onClick={this.menuHandler} className={classes.Hover}>
                  <div id="signIn" className={classes.ItemHeader}>
                    Sign In
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={
                        this.state.showSignIn
                          ? classes.Arrow + ' ' + classes.ArrowDown
                          : classes.Arrow
                      }
                    />
                  </div>
                  <div
                    className={
                      this.state.showSignIn
                        ? classes.SignIn + ' ' + classes.SignInOpen
                        : classes.SignIn
                    }
                  >
                    <Auth />
                  </div>
                </li>
                <NavLink to="/registration">
                  <li className={classes.CreateAccount + ' ' + classes.Hover}>
                    <div>Create Account</div>
                  </li>
                </NavLink>
              </Aux>
            ) : (
              <li className={classes.Account}>
                <div className={classes.FlexCenter}>
                  <div className={classes.ListIcon}>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className={classes.UserIcon}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'block' }}>{displayName}</div>
                    <div className={classes.LogoutLink}>
                      <NavLink to="/logout">logout</NavLink>
                    </div>
                  </div>
                </div>
              </li>
            )}
            <li
              className={
                this.state.watchHideLinks || this.state.favHideLinks
                  ? classes.HideLinks
                  : null
              }
            >
              <div
                className={classes.SearchHeading + ' ' + classes.FlexCenter}
                onClick={this.showSearchHandler}
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={classes.NavIcon}
                  />
                </div>
                Search
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={
                    this.state.showSearch
                      ? classes.SearchChevron +
                        ' ' +
                        classes.Arrow +
                        ' ' +
                        classes.ArrowDown
                      : classes.SearchChevron + ' ' + classes.Arrow
                  }
                />
              </div>
              <div
                className={
                  this.state.showSearch
                    ? classes.Search + ' ' + classes.SearchOpen
                    : classes.Search + ' ' + classes.Hover
                }
              >
                <SearchAll searchType="movies" placeholder="Search All" />
              </div>
            </li>
            <NavLink to="/">
              <li
                className={
                  this.state.watchHideLinks || this.state.favHideLinks
                    ? classes.FlexCenter + ' ' + classes.HideLinks
                    : classes.FlexCenter + ' ' + classes.Hover
                }
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon icon={faHome} className={classes.NavIcon} />
                </div>
                Home
              </li>
            </NavLink>
            <NavLink to="/Movies">
              <li
                className={
                  this.state.watchHideLinks || this.state.favHideLinks
                    ? classes.FlexCenter + ' ' + classes.HideLinks
                    : classes.FlexCenter + ' ' + classes.Hover
                }
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon icon={faFilm} className={classes.NavIcon} />
                </div>
                Movies
              </li>
            </NavLink>
            <NavLink to="/Tv">
              <li
                className={
                  this.state.watchHideLinks || this.state.favHideLinks
                    ? classes.FlexCenter + ' ' + classes.HideLinks
                    : classes.FlexCenter + ' ' + classes.Hover
                }
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon icon={faTv} className={classes.NavIconTv} />
                </div>
                Television
              </li>
            </NavLink>
            {this.props.isAuth && localStorage.getItem('userData') ? (
              <Aux>
                <li
                  className={
                    this.state.showFavorites
                      ? classes.FavWatchlist + ' ' + classes.FavWatchActive
                      : this.state.watchHideLinks
                      ? classes.HideLinks
                      : classes.FavWatchlist + ' ' + classes.Hover
                  }
                >
                  <div
                    className={classes.FavWatchHeading}
                    onClick={this.favoritesMenuHandler}
                  >
                    <div className={classes.ListIcon}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={classes.FavIcon}
                      />
                    </div>
                    <div className={classes.FavWatchInnerHeading}>
                      Favorites
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={
                          this.state.showFavorites
                            ? classes.FavWatchChevron +
                              ' ' +
                              classes.Arrow +
                              ' ' +
                              classes.ArrowDown
                            : classes.FavWatchChevron + ' ' + classes.Arrow
                        }
                      />
                    </div>
                  </div>
                  <ul
                    className={
                      this.state.showFavorites
                        ? classes.FavoritesWatch +
                          ' ' +
                          classes.FavoritesWatchOpen
                        : classes.FavoritesWatch
                    }
                  >
                    <Favorites />
                  </ul>
                </li>
                <li
                  className={
                    this.state.showWatchlist
                      ? classes.FavWatchlist + ' ' + classes.FavWatchActive
                      : this.state.favHideLinks
                      ? classes.HideLinks
                      : classes.FavWatchlist + ' ' + classes.Hover
                  }
                >
                  <div
                    className={classes.FavWatchHeading}
                    onClick={this.watchlistMenuHandler}
                  >
                    <div className={classes.ListIcon}>
                      <FontAwesomeIcon
                        icon={faStar}
                        className={classes.StarIcon}
                      />
                    </div>
                    <div className={classes.FavWatchInnerHeading}>
                      Watchlist
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={
                          this.state.showWatchlist
                            ? classes.FavWatchChevron +
                              ' ' +
                              classes.Arrow +
                              ' ' +
                              classes.ArrowDown
                            : classes.FavWatchChevron + ' ' + classes.Arrow
                        }
                      />
                    </div>
                  </div>
                  <ul
                    className={
                      this.state.showWatchlist
                        ? classes.FavoritesWatch +
                          ' ' +
                          classes.FavoritesWatchOpen
                        : classes.FavoritesWatch
                    }
                  >
                    <Watchlist />
                  </ul>
                </li>
              </Aux>
            ) : null}
          </ul>
        </div>
      </Aux>
    );
  }
}

export default SideBar;
