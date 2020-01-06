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
import FullSizeImage from '../../../components/FullSizeImage/FullSizeImage';

import Images from '../../Images/Images';

// import TvSeasons from '../TvSeasons/TvSeasons';
import Scores from '../../Scores/Scores';
import TvStats from '../../../components/Tv/TvStats/TvStats';
import Loader from '../../../components/UI/Loader/Loader';
import { configureAnchors } from 'react-scrollable-anchor';
import NavSearch from '../../Search/NavSearch/NavSearch';
import AddEvent from '../../Calendar/AddEvent/AddEvent';
import EventDetails from '../../../components/Calendar/EventDetails/EventDetails';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faStar,
  faSearch,
  faCalendarPlus,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
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
    fullSizeImgUrl: null,
    fullSizeImgArr: null,
    fullSizeImgId: null,
    fullSizeFadeOut: false,
    fullSizeFadeIn: false,
    loading: false,
    imdbScore: null,
    rtScore: null,
    mcScore: null,
    tvInfo: null,
    tvId: null,
    showAddEvent: false,
    showEventDetails: false,
    eventDetails: null,
    onCalendar: false
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
    this.checkEventsHandler();
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
          append_to_response:
            'credits,videos,reviews,release_dates,external_ids'
        }
      })
      .then(response => {
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

  // showSearchHandler = () => {
  //   this.setState({ showSearch: !this.state.showSearch });
  // };

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

  addEventClickHandler = () => {
    this.setState({ showAddEvent: !this.state.showAddEvent });
  };

  showEventDetailsHandler = () => {
    this.setState({ showEventDetails: true });
  };

  closeEventDetailsHandler = () => {
    setTimeout(() => {
      this.setState({ showEventDetails: false });
    }, 300);
  };

  checkEventsHandler = () => {
    axios
      .get(
        'https://mediageek-650c6.firebaseio.com/users/' +
          localStorage.getItem('userId') +
          '/events.json'
      )
      .then(response => {
        Object.keys(response.data).map(key => {
          if (response.data[key].mediaId === this.props.match.params.id) {
            const evDetails = {
              id: key,
              title: response.data[key].title,
              desc: response.data[key].desc,
              start: new Date(response.data[key].start),
              end: new Date(response.data[key].end),
              mediaId: response.data[key].mediaId,
              poster: response.data[key].poster
            };
            this.setState({ eventDetails: evDetails, onCalendar: true });
          } else {
            this.setState({
              eventDetails: null,
              onCalendar: false,
              showEventDetails: false
            });
          }
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
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
        {this.state.fullSizeImgUrl ? (
          <FullSizeImage
            url={this.state.fullSizeImgUrl}
            navClick={this.imageNavHandler}
            closeClick={this.imageCloseHandler}
            fadeOut={this.state.fullSizeFadeOut}
            fadeIn={this.state.fullSizeFadeIn}
          />
        ) : null}
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
                  {this.state.showEventDetails ? (
                    <EventDetails
                      title={this.state.eventDetails.title}
                      description={this.state.eventDetails.desc}
                      startDate={this.state.eventDetails.start}
                      close={this.closeEventDetailsHandler}
                      poster={this.state.eventDetails.poster}
                      id={this.state.eventDetails.id}
                      reloadCalendar={this.checkEventsHandler}
                      mediaId={this.state.eventDetails.mediaId}
                    />
                  ) : null}

                  {this.state.showAddEvent ? (
                    <AddEvent
                      close={this.addEventClickHandler}
                      title={this.state.tvInfo.name}
                      description={this.state.tvInfo.overview}
                      mediaId={this.props.match.params.id}
                      poster={
                        'http://image.tmdb.org/t/p/w500/' +
                        this.state.tvInfo.poster_path
                      }
                      reloadCalendar={this.checkEventsHandler}
                    />
                  ) : null}

                  <div
                    // className={
                    //   this.state.showSearch
                    //     ? classes.OpenTvInfo + ' ' + classes.ShowSearch
                    //     : classes.OpenTvInfo
                    // }
                    className={classes.OpenTvInfo}
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
                              icon={
                                this.state.onCalendar
                                  ? faCalendarAlt
                                  : faCalendarPlus
                              }
                              className={
                                this.state.onCalendar
                                  ? classes.CalendarSelectedIcon
                                  : classes.CalendarIcon
                              }
                              onClick={
                                this.state.onCalendar
                                  ? this.showEventDetailsHandler
                                  : this.addEventClickHandler
                              }
                            />
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
                        {/* <FontAwesomeIcon
                          icon={faSearch}
                          className={
                            this.state.showSearch
                              ? classes.SearchIconSelected
                              : classes.SearchIcon
                          }
                          style={!this.props.isAuth ? { right: '30px' } : null}
                          onClick={this.showSearchHandler}
                        /> */}

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
                    <Images
                      tvdbId={this.state.tvInfo.external_ids.tvdb_id}
                      imgClick={this.imageClickHandler}
                    />
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
