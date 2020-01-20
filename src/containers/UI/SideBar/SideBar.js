import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/auth";
import axios from "axios";
import Auth from "../../Auth/Auth";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Favorites from "../../Favorites/Favorites";
import SearchAll from "../../Search/SearchAll/SearchAll";
import mgLogo from "../../../assets/images/mg-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUserCircle,
  faBars,
  faSearch,
  faFilm,
  faTv,
  faHome,
  faHeart,
  faStar,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import faMixcloud from "../../../assets/images/mixcloud-brands.svg";
import uiClasses from "../../../components/UI/Layout/Layout.module.css";
import classes from "./SideBar.module.css";

class SideBar extends Component {
  state = {
    showSignIn: false,
    userFavorites: [],
    showFavorites: false,
    showWatchlist: false,
    watchShowLinks: false,
    favShowLinks: false,
    profilePic: null
  };

  // componentDidUpdate() {
  //   console.log(this.props);
  // }

  componentDidMount() {
    document.addEventListener("click", this.hideMenuHandler);
    // if (
    //   this.props.isAuth &&
    //   localStorage.getItem("userData") &&
    //   JSON.parse(localStorage.getItem("userData")).favMovies.length > 0
    // ) {
    //   this.getFavoritesHandler();
    // }
    if (this.props.authError) {
      this.props.clearAuthError();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.hideMenuHandler);
  }

  menuHandler = event => {
    if (this.props.authError) {
      this.props.clearAuthError();
    }
    if (event.target.id === "signIn") {
      this.setState({ showSignIn: !this.state.showSignIn });
    }
  };

  hideMenuHandler = event => {
    if (!this.node.contains(event.target)) {
      this.setState({ favShowLinks: false });
      this.setState({ watchShowLinks: false });
      this.props.showSidebarHandler(false);
    }
  };

  hideFavsHandler = () => {
    this.setState({ favShowLinks: false });
    this.setState({ watchShowLinks: false });
  };

  favoritesMenuHandler = () => {
    const windowW = window.innerWidth;
    if (windowW <= 1090) {
      this.showMenuHandler();
    }
    this.setState({
      showFavorites: !this.state.showFavorites,
      showWatchlist: false,
      favShowLinks: !this.state.favShowLinks,
      watchShowLinks: false
    });
    this.props.showSearchSidebar(false);
  };

  watchlistMenuHandler = () => {
    const windowW = window.innerWidth;
    if (windowW <= 1090) {
      this.showMenuHandler();
    }
    this.setState({
      showWatchlist: !this.state.showWatchlist,
      showFavorites: false,
      watchShowLinks: !this.state.watchShowLinks,
      favShowLinks: false,
      showSearch: false
    });
    this.props.showSearchSidebar(false);
  };

  showMenuHandler = () => {
    this.props.showSidebarHandler(!this.props.showSidebar);
  };

  showSearchHandler = () => {
    this.props.showSearchSidebar(!this.props.showSearch);
  };

  // getFavoritesHandler = () => {
  //   // const userData = JSON.parse(localStorage.getItem("userData"));

  //   // const favs = userData.favMovies;

  //   const favs = this.props.userData.favMovies;
  //   console.log(favs);
  //   favs.map(fav => {
  //     axios
  //       .get("https://api.themoviedb.org/3/movie/" + fav, {
  //         params: {
  //           api_key: "4c7294000365c14a8e42109c863ff772",
  //           language: "en-US"
  //         }
  //       })
  //       .then(response => {
  //         this.setState(prevState => ({
  //           userFavorites: [
  //             ...prevState.userFavorites,
  //             {
  //               title: response.data.title,
  //               id: response.data.id,
  //               poster: response.data.poster_path,
  //               release: response.data.release_date
  //             }
  //           ]
  //         }));
  //       })
  //       .catch(error => {
  //         console.log("error " + error);
  //       });
  //     return null;
  //   });
  // };

  render() {
    // const userData = localStorage.getItem("userData")
    //   ? JSON.parse(localStorage.getItem("userData"))
    //   : null;
    // const displayName = userData ? userData.displayName : null;
    // const displayName = this.props.displayName;
    const sideBarClass = this.props.showSidebar
      ? classes.SideBar +
        " " +
        uiClasses.BoxShadow +
        " " +
        classes.SideBarSlideIn
      : classes.SideBar + " " + uiClasses.BoxShadow;
    return (
      <div ref={node => (this.node = node)}>
        <FontAwesomeIcon
          icon={faBars}
          className={classes.MenuIcon}
          onClick={this.showMenuHandler}
        />
        <div className={sideBarClass}>
          <ul>
            <NavLink to="/">
              <li onClick={this.showMenuHandler} className={classes.ListLogo}>
                <div className={classes.LogoContainer}>
                  {/* <img className={classes.Logo} src={mgLogo} alt="" /> */}
                  <img
                    className={classes.Logo}
                    src="https://github.com/rmarquardt1/media-geek/blob/master/src/assets/images/mg-icon.png?raw=true"
                    alt=""
                  />
                  <div>
                    <div className={classes.LogoText}>
                      <span style={{ fontWeight: "200" }}>media</span>
                      <span style={{ fontWeight: "600" }}>Geek</span>
                    </div>
                    {this.props.isAuth ? (
                      <div className={classes.LogoutLink}>
                        <NavLink to="/logout">logout</NavLink>
                      </div>
                    ) : null}
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
                          ? classes.Arrow + " " + classes.ArrowDown
                          : classes.Arrow
                      }
                    />
                  </div>
                  <div
                    className={
                      this.state.showSignIn
                        ? classes.SignIn + " " + classes.SignInOpen
                        : classes.SignIn
                    }
                    style={this.props.authError ? { height: "175px" } : null}
                  >
                    <Auth />
                  </div>
                </li>
                <NavLink to="/registration">
                  <li className={classes.CreateAccount + " " + classes.Hover}>
                    <div>Create Account</div>
                  </li>
                </NavLink>
              </Aux>
            ) : (
              <NavLink to="/Account">
                <li
                  className={
                    // localStorage.getItem("profilePic")
                    this.props.profilePic ? classes.AccountProfileImage : null
                  }
                >
                  <div
                    className={classes.FlexCenter}
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center"
                    }}
                  >
                    {this.props.profilePic ? (
                      <div
                        className={classes.ProfilePic}
                        style={{
                          backgroundImage: "url(" + this.props.profilePic + ")"
                        }}
                      />
                    ) : (
                      <div className={classes.ListIcon}>
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          className={classes.UserIcon}
                        />
                      </div>
                    )}

                    <div
                      className={classes.DisplayName}
                      style={
                        this.props.profilePic
                          ? {
                              backgroundImage:
                                "url(" + this.props.profilePic + ")"
                            }
                          : null
                      }
                    >
                      <div>
                      {this.props.profilePic ? (
                        <div className={classes.DisplayNameOverlay} />
                      ) : null}
                        <span className={classes.DisplayNameText}>
                          {/* {displayName} */}
                          {this.props.displayName}
                        </span>
                      </div>
                      {/* <div className={classes.LogoutLink}>
                      <NavLink to="/logout">logout</NavLink>
                    </div> */}
                    </div>
                  </div>
                </li>
              </NavLink>
            )}
            <li>
              <div
                className={classes.SearchHeading + " " + classes.FlexCenter}
                onClick={this.showSearchHandler}
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={classes.NavIcon}
                  />
                </div>
                Search All
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={
                    this.props.showSearch
                      ? classes.SearchChevron +
                        " " +
                        classes.Arrow +
                        " " +
                        classes.ArrowDown
                      : classes.SearchChevron + " " + classes.Arrow
                  }
                />
              </div>
              <div
                className={
                  this.props.showSearch
                    ? classes.Search + " " + classes.SearchOpen
                    : classes.Search + " " + classes.Hover
                }
              >
                {this.props.showSearch ? (
                  <SearchAll searchType="movies" placeholder="Search All" />
                ) : null}
              </div>
            </li>
            <NavLink to="/">
              <li
                className={classes.FlexCenter + " " + classes.Hover}
                onClick={this.showMenuHandler}
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon icon={faHome} className={classes.NavIcon} />
                </div>
                Home
              </li>
            </NavLink>
            <NavLink to="/Movies">
              <li
                className={classes.FlexCenter + " " + classes.Hover}
                onClick={this.showMenuHandler}
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon icon={faFilm} className={classes.NavIcon} />
                </div>
                Movies
              </li>
            </NavLink>
            <NavLink to="/Tv">
              <li
                className={classes.FlexCenter + " " + classes.Hover}
                onClick={this.showMenuHandler}
              >
                <div className={classes.ListIcon}>
                  <FontAwesomeIcon icon={faTv} className={classes.NavIconTv} />
                </div>
                Television
              </li>
            </NavLink>
            <NavLink to="/Streaming">
              <li
                className={classes.FlexCenter + " " + classes.Hover}
                onClick={this.showMenuHandler}
              >
                <div className={classes.ListIcon}>
                  <img src={faMixcloud} className={classes.StreamingIcon} />
                </div>
                Streaming TV
              </li>
            </NavLink>

            {/* {this.props.isAuth && localStorage.getItem("userData") ? ( */}
            {this.props.isAuth ? (
              <Aux>
                <NavLink to="/Calendar">
                  <li
                    className={classes.FlexCenter + " " + classes.Hover}
                    onClick={this.showMenuHandler}
                  >
                    <div className={classes.ListIcon}>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className={classes.CalendarIcon}
                      />
                    </div>
                    Calendar
                  </li>
                </NavLink>

                <li
                  className={
                    this.state.favShowLinks
                      ? classes.FavWatchlist + " " + classes.Selected
                      : classes.FavWatchlist + " " + classes.Hover
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
                              " " +
                              classes.Arrow +
                              " " +
                              classes.ArrowRight
                            : classes.FavWatchChevron + " " + classes.Arrow
                        }
                      />
                    </div>
                  </div>
                </li>

                <li
                  // className={classes.FavWatchlist + " " + classes.Hover}

                  className={
                    this.state.watchShowLinks
                      ? classes.FavWatchlist + " " + classes.Selected
                      : classes.FavWatchlist + " " + classes.Hover
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
                              " " +
                              classes.Arrow +
                              " " +
                              classes.ArrowRight
                            : classes.FavWatchChevron + " " + classes.Arrow
                        }
                      />
                    </div>
                  </div>
                </li>
              </Aux>
            ) : null}
          </ul>
        </div>
        {/* {this.props.isAuth && localStorage.getItem("userData") ? ( */}
        {this.props.isAuth ? (
          <Aux>
            <div
              className={
                !this.state.watchShowLinks
                  ? classes.Favs
                  : classes.Favs +
                    " " +
                    uiClasses.BoxShadow +
                    " " +
                    classes.FavsShow
              }
            >
              <Favorites
                click={this.watchlistMenuHandler}
                type="watchlist"
                hideMenu={this.hideFavsHandler}
              />
            </div>
            <div
              className={
                !this.state.favShowLinks
                  ? classes.Favs
                  : classes.Favs +
                    " " +
                    uiClasses.BoxShadow +
                    " " +
                    classes.FavsShow
              }
            >
              <Favorites
                click={this.favoritesMenuHandler}
                type="favs"
                hideMenu={this.hideFavsHandler}
              />
            </div>
          </Aux>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.error,
    showSearch: state.showSearchSidebar,
    showSidebar: state.showSidebar,
    profilePic: state.profilePic,
    displayName: state.displayName
    // userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearAuthError: () => dispatch(actions.clearAuthFail()),
    showSearchSidebar: show => dispatch(actions.showSearchSidebar(show)),
    showSidebarHandler: show => dispatch(actions.showSidebarHandler(show))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
