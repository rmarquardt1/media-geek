import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import VideoList from '../../List/VideoList/VideoList';
import ActorList from '../../List/ActorList/ActorList';

import SeasonList from '../../List/SeasonList/SeasonList';


import Review from '../../Review/Review';
import VideoModal from '../../../components/UI/VideoModal/VideoModal';
import TvSeasons from '../TvSeasons/TvSeasons';
import Scores from '../../Scores/Scores';
import TvStats from '../../../components/Tv/TvStats/TvStats';
import Loader from '../../../components/UI/Loader/Loader';
import { configureAnchors } from 'react-scrollable-anchor';
import NavSearch from '../../Search/NavSearch/NavSearch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './OpenTv.module.css';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';

configureAnchors({ offset: -60 });

class OpenTv extends Component {
  state = {
    actorResults: null,
    videoResults: null,
    seasonResults: null,
    reviewResults: null,
    genres: null,
    rating: null,
    playVideo: false,
    playVideoUrl: null,
    favorite: false,
    watchlist: false,
    showSearch: false,
    imdbId: null,
    loading: false,
    imdbScore: null,
    rtScore: null,
    mcScore: null,
    tvInfo: null,
    tvId: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tvId !== this.props.match.params.id) {
      this.getTvHandler();
      this.setState({ tvId: this.props.match.params.id });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getTvHandler();
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const favorited = userData.favTv
        ? userData.favTv.includes(this.props.match.params.id)
        : false;
      const watch = userData.tvWatchlist
        ? userData.tvWatchlist.includes(this.props.match.params.id)
        : false;
      if (favorited) {
        this.setState({ favorite: true });
      }
      if (watch) {
        this.setState({ watchlist: true });
      }
    }
  }

  getTvHandler = tvId => {
    this.setState({ loading: true });
    const url = tvId
      ? 'https://api.themoviedb.org/3/tv/' + tvId
      : 'https://api.themoviedb.org/3/tv/' + this.props.match.params.id;
    axios
      .get(url, {
        params: {
          api_key: '4c7294000365c14a8e42109c863ff772',
          append_to_response: 'credits,videos,reviews,release_dates'
        }
      })
      .then(response => {
        console.log(response.data);
        const firstAir = new Date(response.data.first_air_date);
        const lastAir = new Date(response.data.last_air_date);
        const airSpan =
          firstAir.getFullYear() !== lastAir.getFullYear()
            ? firstAir.getFullYear() + '-' + lastAir.getFullYear()
            : firstAir.getFullYear();
        this.setState({
          tvInfo: response.data,
          actorResults: response.data.credits.cast,
          videoResults: response.data.videos.results,
          reviewResults: response.data.reviews.results,
          videoCount: response.data.videos.results.length,
          seasonResults: response.data.seasons,
          seasonCount: response.data.seasons.length,
          actorCount: response.data.credits.cast.length,
          loading: false,
          airDate: airSpan
        });
        const gen = response.data.genres
          .map(genre => {
            return genre.name;
          })
          .join('\xa0/\xa0');
        this.setState({ genres: gen });
        this.getImdbIdHandler();
        this.getRatingsHandler();
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          const timeOut = parseInt(
            error.response.headers['retry-after'] + '000'
          );
          this.getTvTryAgainHandler(timeOut);
        } else {
          console.log('error: ' + error);
        }
      });
  };

  getTvTryAgainHandler = timeOut => {
    setTimeout(() => {
      this.getTvHandler();
    }, timeOut);
  };

  getRatingsHandler = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/tv/' +
          this.state.tvId +
          '/content_ratings',
        {
          params: {
            api_key: '4c7294000365c14a8e42109c863ff772',
            language: 'en-US'
          }
        }
      )
      .then(response => {
        this.setState({
          rating: response.data.results.find(
            rating => rating.iso_3166_1 === 'US'
          ).rating
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  getImdbIdHandler = () => {
    axios
      .get('https://www.omdbapi.com/', {
        params: {
          apikey: 'ec2bd2c4',
          t: this.state.tvInfo.name,
          type: 'series'
        }
      })
      .then(response => {
        this.setState({ imdbId: response.data.imdbID });
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
      favs = userData.favTv
        ? [...userData.favTv, this.state.tvId]
        : [this.state.tvId];
    } else {
      favs = userData.favTv.filter(fav => {
        return fav !== this.state.tvId;
      });
    }
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' + uid + '/favTv.json',
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
      watch = userData.tvWatchlist
        ? [...userData.tvWatchlist, this.state.tvId]
        : [this.state.tvId];
    } else {
      watch = userData.tvWatchlist.filter(w => {
        return w !== this.state.tvId;
      });
    }
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/tvWatchlist.json',
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

  render() {
    let reviews = null;
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
    } else {
      reviews = <p>No Reviews</p>;
    }
    return (
      <Aux>
        {this.state.tvInfo ? (
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
                <div
                  className={classes.OpenTvBackdrop}
                  style={{
                    backgroundImage:
                      'url(http://image.tmdb.org/t/p/original/' +
                      this.state.tvInfo.backdrop_path +
                      ')'
                  }}
                />
                <div className={classes.OpenTvOverlay} />
                <div className={classes.OpenTvContent}>
                  <div
                    className={
                      this.state.showSearch
                        ? classes.OpenTvInfo + ' ' + classes.ShowSearch
                        : classes.OpenTvInfo
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
                        searchType="tv"
                        placeholder="Search Television"
                      />
                    </div>
                    <div className={classes.MobileDescription}>
                      {this.state.tvInfo.poster_path ? (
                        <div className={classes.OpenTvPoster}>
                          <img
                            className={
                              classes.PosterImage + ' ' + uiClasses.BoxShadow
                            }
                            src={
                              'http://image.tmdb.org/t/p/w500/' +
                              this.state.tvInfo.poster_path
                            }
                            alt=""
                          />
                        </div>
                      ) : null}

                      <div className={classes.OpenTvDesc}>
                        {this.props.isAuth ? (
                          <Aux>
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
                          </Aux>
                        ) : null}
                        <FontAwesomeIcon
                          icon={faSearch}
                          className={
                            this.state.showSearch
                              ? classes.SearchIconSelected
                              : classes.SearchIcon
                          }
                          style={!this.props.isAuth ? { right: '30px' } : null}
                          onClick={this.showSearchHandler}
                        />

                        <div className={classes.OpenTvMobile}>
                          {this.state.tvInfo.poster_path ? (
                            <div className={classes.OpenTvPosterMobile}>
                              <img
                                src={
                                  'http://image.tmdb.org/t/p/w500/' +
                                  this.state.tvInfo.poster_path
                                }
                                alt=""
                              />
                            </div>
                          ) : null}
                          <div className={classes.OpenMovieHeader}>
                            <h1>{this.state.tvInfo.name}</h1>
                            <div
                              className={
                                classes.OpenTvGenRel +
                                ' ' +
                                classes.GenRelMobile
                              }
                            >
                              <div className={classes.OpenTvGenres}>
                                {this.state.genres}
                              </div>
                              <div className={classes.RelRating}>
                                {this.state.airDate}
                                {this.state.rating
                                  ? ' (' + this.state.rating + ')'
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            classes.OpenTvGenRel + ' ' + classes.GenRelShow
                          }
                        >
                          <div className={classes.OpenTvGenres}>
                            {this.state.genres}
                          </div>
                        </div>
                        <div
                          className={
                            classes.RelRating + ' ' + classes.RelRatingShow
                          }
                        >
                          {this.state.airDate}
                          {this.state.rating
                            ? ' (' + this.state.rating + ')'
                            : null}
                        </div>
                        <Scores title={this.state.tvInfo.name} type="series" />
                        <p className={classes.OpenTvOverview}>
                          {this.state.tvInfo.overview}
                        </p>
                      </div>
                    </div>
                    <div className={uiClasses.SectionHeader}>
                      <h2>Info</h2>
                    </div>
                    <div className={classes.OpenMovieStats}>
                      <TvStats
                        info={this.state.tvInfo}
                        genres={this.state.genres}
                      />
                    </div>

                    {this.state.actorResults.length > 0 ? (
                      <ActorList
                        movieId={this.state.movieId}
                        heading="Cast"
                        actors={this.state.actorResults}
                        openMovie={this.getMovieHandler}
                      />
                    ) : null}
                    {this.state.actorResults.length > 0 ? (
                      <VideoList
                        heading="Videos"
                        actors={this.state.videoResults}
                        play={this.videoPlayHandler}
                      />
                    ) : null}



                    {this.state.seasonResults.length > 0 ? (
                      <SeasonList
                        seasons={this.state.seasonResults}
                        tvId={this.state.tvId}
                        tvPoster={this.state.tvInfo.poster_path}
                        tvBackdrop={this.state.tvInfo.backdrop_path}
                      />
                    ) : null}



                    {/* {this.state.seasonResults.length > 0 ? (
                      <TvSeasons
                        seasons={this.state.seasonResults}
                        tvId={this.state.tvId}
                        tvPoster={this.state.tvInfo.poster_path}
                      />
                    ) : null} */}





                    {this.state.reviewResults.length > 0 ? (
                      <Aux>
                        <div className={uiClasses.SectionHeader}>
                          <h2>Reviews</h2>
                        </div>
                        <div className={classes.OpenTvReviews}>{reviews}</div>
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

export default connect(null, mapDispatchToProps)(OpenTv);
