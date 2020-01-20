import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronLeft,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Favorites.module.css";

class Favorites extends Component {
  state = {
    userFavorites: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData !== this.props.userData) {
      this.setState({ userFavorites: [] });
      this.getMovieFavoritesHandler();
      this.getTvFavoritesHandler();
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.hideMenuHandler);
  }

  getMovieFavoritesHandler = () => {
    const userData = this.props.userData;
    const favs =
      this.props.type === "favs"
        ? userData.favMovies
        : this.props.type === "watchlist"
        ? userData.movieWatchlist
        : null;
    if (favs) {
      favs.map(fav => {
        axios
          .get("https://api.themoviedb.org/3/movie/" + fav, {
            params: {
              api_key: "4c7294000365c14a8e42109c863ff772",
              language: "en-US"
            }
          })
          .then(response => {
            const relYear = new Date(response.data.release_date).getFullYear();
            this.setState(prevState => ({
              userFavorites: [
                ...prevState.userFavorites,
                {
                  title: response.data.title,
                  id: response.data.id,
                  poster: response.data.poster_path,
                  release: relYear,
                  type: "movie"
                }
              ]
            }));
          })
          .catch(error => {
            console.log("error " + error);
          });
        return null;
      });
    }
  };

  getTvFavoritesHandler = () => {
    const userData = this.props.userData;
    const favs =
      this.props.type === "favs"
        ? userData.favTv
        : this.props.type === "watchlist"
        ? userData.tvWatchlist
        : null;
    if (favs) {
      favs.map(fav => {
        axios
          .get("https://api.themoviedb.org/3/tv/" + fav, {
            params: {
              api_key: "4c7294000365c14a8e42109c863ff772",
              language: "en-US"
            }
          })
          .then(response => {
            const yearStart = new Date(
              response.data.first_air_date
            ).getFullYear();
            const yearEnd = new Date(response.data.last_air_date).getFullYear();
            this.setState(prevState => ({
              userFavorites: [
                ...prevState.userFavorites,
                {
                  title: response.data.name,
                  id: response.data.id,
                  poster: response.data.poster_path,
                  release: yearStart + "-" + yearEnd,
                  type: "tv"
                }
              ]
            }));
          })
          .catch(error => {
            console.log("error " + error);
          });
        return null;
      });
    }
  };

  render() {
    let favorites = null;
    if (this.props.userData) {
      favorites = this.state.userFavorites.map(fav => {
        const favLink =
          fav.type === "tv" ? "/Tv/" + fav.id : "/Movies/" + fav.id;
        return (
          <div
            className={classes.Fav}
            key={fav.id}
            onClick={this.props.hideMenu}
          >
            <NavLink to={favLink} key={fav.id}>
              <img src={"http://image.tmdb.org/t/p/w92" + fav.poster} alt="" />
              <div className={classes.FavInfo}>
                <div className={classes.Title}>{fav.title}</div>
                <span className={classes.FavRelYear}>{fav.release}</span>
              </div>
            </NavLink>
          </div>
        );
      });
    }

    return (
      <Aux>
        <div className={classes.FavHeader}>
          {this.props.type === "favs" ? (
            <div className={classes.Header}>
              <FontAwesomeIcon icon={faHeart} className={classes.FavIcon} />
              <div>Favorites</div>
            </div>
          ) : this.props.type === "watchlist" ? (
            <div className={classes.Header}>
              <FontAwesomeIcon icon={faStar} className={classes.StarIcon} />
              <div>Watchlist</div>
            </div>
          ) : null}
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={classes.ChevronLeft}
            onClick={this.props.click}
          />
        </div>
        <div
          className={
            classes.Favorites +
            " " +
            (this.props.slideIn ? classes.FavSlideIn : "")
          }
        >
          {favorites ? favorites : null}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps)(Favorites);
