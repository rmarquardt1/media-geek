import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import Images from '../../Images/Images';
import Actors from '../../Actors/Actors';
import Videos from '../../Videos/Videos';
import Review from '../../Review/Review';
import VideoModal from '../../../components/UI/VideoModal/VideoModal';
import MovieScores from '../../Scores/Scores';
import MovieCollection from '../MovieCollection/MovieCollection';
import MovieStats from '../../../components/Movie/MovieStats/MovieStats';
import FullSizeImage from '../../../components/FullSizeImage/FullSizeImage';
import Loader from '../../../components/UI/Loader/Loader';
import NavBar from '../../UI/NavBar/NavBar';
import SideBar from '../../../containers/UI/SideBar/SideBar';
import NavSearch from '../../Search/NavSearch/NavSearch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './OpenMovie.module.css';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';

class OpenMovie extends Component {
  state = {
    actorResults: null,
    videoResults: null,
    reviewResults: null,
    genres: null,
    rating: null,
    playVideo: false,
    playVideoUrl: null,
    favorite: false,
    watchlist: false,
    showSearch: false,
    imdbId: null,
    fullSizeImgUrl: null,
    fullSizeImgArr: null,
    fullSizeImgId: null,
    fullSizeFadeOut: false,
    fullSizeFadeIn: false,
    loading: false,
    movieInfo: null,
    movieId: null,
    movieCollection: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movieId !== this.props.match.params.id) {
      this.getMovieHandler();
      this.setState({ movieId: this.props.match.params.id });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getMovieHandler();
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const favorited = userData.favMovies
        ? userData.favMovies.includes(this.props.match.params.id)
        : false;
      const watch = userData.movieWatchlist
        ? userData.movieWatchlist.includes(this.props.match.params.id)
        : false;
      if (favorited) {
        this.setState({ favorite: true });
      }
      if (watch) {
        this.setState({ watchlist: true });
      }
    }
  }

  getMovieHandler = movieId => {
    this.setState({ loading: true });
    const url = movieId
      ? 'https://api.themoviedb.org/3/movie/' + movieId
      : 'https://api.themoviedb.org/3/movie/' + this.props.match.params.id;
    axios
      .get(url, {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          append_to_response: 'credits,videos,reviews,release_dates,collection'
        }
      })
      .then(response => {
        const movieRating = response.data.release_dates.results.find(
          rating => rating.iso_3166_1 === 'US'
        )
          ? response.data.release_dates.results.find(
              rating => rating.iso_3166_1 === 'US'
            ).release_dates[0].certification
          : null;
        this.setState({
          movieInfo: response.data,
          rating: movieRating,
          actorResults: response.data.credits.cast,
          videoResults: response.data.videos.results,
          reviewResults: response.data.reviews.results,
          videoCount: response.data.videos.results.length,
          actorCount: response.data.credits.cast.length,
          imdbId: response.data.imdb_id,
          loading: false
        });
        const gen = response.data.genres
          .map(genre => {
            return genre.name;
          })
          .join('\xa0/\xa0');
        this.setState({ genres: gen });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  videoPlayHandler = url => {
    this.setState({ playVideo: true, playVideoUrl: url });
  };

  videoCloseHandler = () => {
    this.setState({ playVideo: false, playVideoUrl: null });
  };

  favoriteClickHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const uid = localStorage.getItem('userId');
    let favs = null;
    if (!this.state.favorite) {
      favs = userData.favMovies
        ? [...userData.favMovies, this.state.movieId]
        : [this.state.movieId];
    } else {
      favs = userData.favMovies.filter(fav => {
        return fav !== this.state.movieId;
      });
    }
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/favMovies.json',
        favs
      )
      .then(response => {
        this.setState({ favorite: true });
        this.props.updateStorage(uid);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  watchlistClickHandler = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const uid = localStorage.getItem('userId');
    let watch = null;
    if (!this.state.watchlist) {
      watch = userData.movieWatchlist
        ? [...userData.movieWatchlist, this.state.movieId]
        : [this.state.movieId];
    } else {
      watch = userData.movieWatchlist.filter(w => {
        return w !== this.state.movieId;
      });
    }
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/movieWatchlist.json',
        watch
      )
      .then(response => {
        this.setState({ watchlist: true });
        this.props.updateStorage(uid);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  showSearchHandler = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  imageClickHandler = (url, imgArr, imgId) => {
    this.setState({
      fullSizeImgUrl: url,
      fullSizeImgArr: imgArr,
      fullSizeImgId: imgId
    });
  };

  imageNavHandler = direction => {
    this.setState({ fullSizeFadeOut: true });
    setTimeout(() => {
      this.setState({ fullSizeImgUrl: null });
      const imgArr = this.state.fullSizeImgArr;
      let x = null;
      switch (direction) {
        case 'next':
          x = 1;
          break;
        case 'prev':
          x = -1;
          break;
        default:
          x = null;
          break;
      }
      let newPos =
        imgArr.findIndex(el => {
          return el.id === this.state.fullSizeImgId;
        }) + x;
      newPos =
        newPos < 0
          ? imgArr.length - 1
          : newPos > imgArr.length - 1
          ? 0
          : newPos;
      const newUrl = imgArr[newPos].url;
      const newId = imgArr[newPos].id;
      this.setState({
        fullSizeImgUrl: newUrl,
        fullSizeImgId: newId,
        fullSizeFadeIn: true,
        fullSizeFadeOut: false
      });
    }, 300);
  };

  imageCloseHandler = () => {
    this.setState({ fullSizeImgUrl: null, fullSizeImgId: null });
  };

  render() {
    let reviews = null;
    let collection = null;
    let collectionPageCount = null;
    if (this.state.reviewResults) {
      reviews = this.state.reviewResults.slice(0, 4).map(review => {
        return (
          <Review
            key={review.id}
            reviewAuthor={review.author}
            reviewSummary={review.content}
          />
        );
      });
    }
    if (this.state.movieCollection) {
      collection = this.state.movieCollection
        .slice(this.state.collectionSliceStart, this.state.collectionSliceEnd)
        .map(movie => {
          return (
            <MovieCollection
              key={movie.id}
              id={movie.id}
              poster={'http://image.tmdb.org/t/p/w185' + movie.poster_path}
              title={movie.title}
            />
          );
        });
      collectionPageCount = collection.length;
      if (collectionPageCount < this.state.collectionPageSize) {
        const diff = this.state.collectionPageSize - collectionPageCount;
        for (let step = 0; step < diff; step++) {
          collection.push(
            <div
              key={step}
              style={{
                content: '""',
                flex: 'auto',
                width: '170px',
                maxWidth: '170px'
              }}
            ></div>
          );
        }
      }
    }

    let relYear = null;
    if (this.state.movieInfo) {
      const relDate = new Date(this.state.movieInfo.release_date);
      relYear = relDate.getFullYear();
    }

    return (
      <Aux>
        <NavBar searchType="movies" />
        {this.state.fullSizeImgUrl ? (
          <FullSizeImage
            url={this.state.fullSizeImgUrl}
            navClick={this.imageNavHandler}
            closeClick={this.imageCloseHandler}
            fadeOut={this.state.fullSizeFadeOut}
            fadeIn={this.state.fullSizeFadeIn}
          />
        ) : null}
        {this.state.movieInfo ? (
          <Aux>
            {this.state.playVideo ? (
              <VideoModal
                videoUrl={this.state.playVideoUrl}
                close={this.videoCloseHandler}
              />
            ) : null}
            {this.state.loading ? (
              <Loader />
            ) : (
              <Aux>
                <SideBar isAuth={this.props.isAuth} />
                <div
                  className={classes.OpenMovieBackdrop}
                  style={{
                    backgroundImage:
                      'url(http://image.tmdb.org/t/p/original/' +
                      (this.state.movieInfo.backdrop_path
                        ? this.state.movieInfo.backdrop_path
                        : this.state.movieInfo.poster_path) +
                      ')'
                  }}
                />
                <div className={classes.OpenMovieOverlay} />
                <div className={classes.OpenMovieContent}>
                  <div
                    className={
                      this.state.showSearch
                        ? classes.OpenMovieInfo + ' ' + classes.ShowSearch
                        : classes.OpenMovieInfo
                    }
                  >
                    <div
                      className={
                        this.state.showSearch
                          ? uiClasses.SearchResultsSearch +
                            ' ' +
                            classes.ShowSearch
                          : uiClasses.SearchResultsSearch
                      }
                    >
                      <NavSearch
                        searchType="movies"
                        placeholder="Search Movies"
                      />
                    </div>
                    <div className={classes.MobileDescription}>
                      <div className={classes.OpenMoviePoster}>
                        <img
                          className={
                            classes.PosterImage + ' ' + uiClasses.BoxShadow
                          }
                          src={
                            'http://image.tmdb.org/t/p/w500/' +
                            this.state.movieInfo.poster_path
                          }
                          alt=""
                        />
                      </div>
                      <div className={classes.OpenMovieDesc}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={
                            this.state.favorite
                              ? classes.FavoritedIcon
                              : classes.FavoriteIcon
                          }
                          onClick={this.favoriteClickHandler}
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className={
                            this.state.watchlist
                              ? classes.WatchlistSelectedIcon
                              : classes.WatchlistIcon
                          }
                          onClick={this.watchlistClickHandler}
                        />
                        <FontAwesomeIcon
                          icon={faSearch}
                          className={
                            this.state.showSearch
                              ? classes.SearchIconSelected
                              : classes.SearchIcon
                          }
                          onClick={this.showSearchHandler}
                        />
                        <div className={classes.OpenMovieMobile}>
                          <div className={classes.OpenMoviePosterMobile}>
                            <img
                              src={
                                'http://image.tmdb.org/t/p/w500/' +
                                this.state.movieInfo.poster_path
                              }
                              alt=""
                            />
                          </div>
                          <div className={classes.OpenMovieHeader}>
                            <h1>{this.state.movieInfo.title}</h1>
                            <div
                              className={
                                classes.OpenMovieGenRel +
                                ' ' +
                                classes.GenRelMobile
                              }
                            >
                              <div className={classes.OpenMovieGenres}>
                                {this.state.genres}
                              </div>
                              <div className={classes.RelRating}>
                                {relYear}
                                {this.state.rating !== null
                                  ? '(' + this.state.rating + ')'
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            classes.OpenMovieGenRel + ' ' + classes.GenRelShow
                          }
                        >
                          <div className={classes.OpenMovieGenres}>
                            {this.state.genres}
                          </div>
                        </div>
                        <div
                          className={
                            classes.RelRating + ' ' + classes.RelRatingShow
                          }
                        >
                          {relYear}{' '}
                          {this.state.rating !== null
                            ? '(' + this.state.rating + ')'
                            : null}
                        </div>
                        <MovieScores
                          title={this.state.movieInfo.title}
                          type="movie"
                        />
                        <p className={classes.OpenMovieOverview}>
                          {this.state.movieInfo.overview}
                        </p>
                      </div>
                    </div>
                    <div className={uiClasses.SectionHeader}>
                      <h2>Info</h2>
                    </div>
                    <div className={classes.OpenMovieStats}>
                      <MovieStats
                        info={this.state.movieInfo}
                        genres={this.state.genres}
                      />
                    </div>
                    {this.state.actorResults.length > 0 ? (
                      <Actors
                        actors={this.state.actorResults}
                        openMovie={this.getMovieHandler}
                      />
                    ) : null}
                    {this.state.videoResults.length > 0 ? (
                      <Videos
                        vids={this.state.videoResults}
                        play={this.videoPlayHandler}
                        close={this.videoCloseHandler}
                      />
                    ) : null}
                    <Images
                      imdbId={this.state.imdbId}
                      imgClick={this.imageClickHandler}
                    />
                    {this.state.reviewResults.length > 0 ? (
                      <Aux>
                        <div className={uiClasses.SectionHeader}>
                          <h2>Reviews</h2>
                        </div>
                        <div className={classes.OpenMovieReviews}>
                          {reviews}
                        </div>
                      </Aux>
                    ) : null}
                  </div>
                </div>
              </Aux>
            )}
          </Aux>
        ) : null}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateStorage: uid => dispatch(actions.storeUserData(uid))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OpenMovie);
