import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import TopFiveTracks from '../../../components/Music/TopFiveTracks/TopFiveTracks';
import MusicPlayer from '../../../components/Music/MusicPlayer/MusicPlayer';
import AlbumThumb from '../../../components/Music/MusicAlbum/AlbumThumb/AlbumThumb';
import AlbumOpen from '../../../components/Music/MusicAlbum/AlbumOpen/AlbumOpen';
import MusicEvents from '../../../components/Music/MusicEvents/MusicEvents';
import RelatedArtist from '../../../components/Music/RelatedArtist/RelatedArtist';
import NavBar from '../../UI/NavBar/NavBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import classes from './OpenMusic.module.css';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';

class OpenMusic extends Component {
  state = {
    topFiveResults: null,
    playTrack: false,
    trackInfo: null,
    albumsLoaded: false,
    albumsFadeOut: false,
    albumsFadeIn: false,
    albumResults: null,
    albumsNext: null,
    albumsPrev: false,
    albumSliceStart: 0,
    albumSliceEnd: null,
    albumPageSize: null,
    albumsContainerHeight: null,
    albumsTotal: null,
    selectedAlbumId: null,
    selectedAlbumDetails: null,
    selectedAlbumTracks: null,
    eventResults: null,
    eventPageSize: 8,
    eventPageNumber: 0,
    eventTotalPages: 1,
    eventsFadeIn: false,
    eventsFadeOut: false,
    relatedArtists: null,
    relatedSliceStart: 0,
    relatedSliceEnd: null,
    loadEvents: false,
    loadRelated: false,
    loadTopTracks: false,
    artistInfo: null
  };

  constructor(props) {
    super(props);
    this.albumElementRef = React.createRef();
    this.relElementRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ albumsLoaded: false });
      this.loadArtistHandler();
    }
    if (!this.state.albumsLoaded) {
      this.getAlbumsHandler();
    }
    if (this.state.loadEvents) {
      this.getEventsHandler(
        this.state.eventPageSize,
        this.state.eventPageNumber
      );
    }
    if (this.state.loadRelated) {
      this.getRelatedHandler();
    }
    if (this.state.loadTopTracks) {
      this.getTopTracksHandler();
    }
    if (this.state.selectedAlbumId) {
      this.state.albumResults.data.map(album => {
        if (album.id === this.state.selectedAlbumId) {
          this.setState({ selectedAlbumDetails: album, selectedAlbumId: null });
          axios
            .get('https://cors-anywhere.herokuapp.com/' + album.tracklist)
            .then(response => {
              this.setState({ selectedAlbumTracks: response.data });
            })
            .catch(error => {
              console.log('error: ' + error);
            });
        }
        return album;
      });
    }
    if (
      prevState.eventPageNumber !== this.state.eventPageNumber &&
      this.state.eventPageNumber < this.state.eventTotalPages &&
      this.state.eventPageNumber >= 0
    ) {
      this.getEventsHandler(
        this.state.eventPageSize,
        this.state.eventPageNumber
      );
    }
  }

  componentDidMount() {
    this.loadArtistHandler();
    window.addEventListener('resize', this.resizeHandler.bind(this));
  }

  scrollTopHandler = () => {
    window.scrollTo(0, 0);
  };

  resizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.albumElementRef.current) {
      const albElWidth = this.albumElementRef.current.clientWidth;
      const albThumbWidth = windowW < 560 ? 95 : 220;
      const albElCount = Math.floor(albElWidth / albThumbWidth);
      const albSliceEnd =
        windowW > 768
          ? this.state.albumSliceStart + albElCount * 2
          : windowW < 501
          ? this.state.albumSliceStart + 6
          : this.state.albumSliceStart + 4;
      const albPageSize = albElCount * 2;
      this.setState({
        albumSliceEnd: this.state.albumSliceStart + albPageSize,
        albumPageSize: albPageSize
      });
    }

    if (this.relElementRef.current) {
      const relElWidth = this.relElementRef.current.clientWidth;
      const relThumbWidth = windowW < 1367 ? 170 : 220;
      const relElCount = Math.floor(relElWidth / relThumbWidth);
      const relSliceEnd =
        windowW > 768
          ? this.state.relatedSliceStart + relElCount * 2
          : windowW < 501
          ? this.state.relatedSliceStart + 6
          : this.state.relatedSliceStart + 4;
      const relPageSize =
        windowW > 768 ? relElCount * 2 : windowW < 501 ? 6 : 4;
      this.setState({
        relatedSliceEnd: relSliceEnd,
        relatedPageSize: relPageSize
      });
    }
  };

  loadArtistHandler = () => {
    this.setState({ loading: true });
    this.setState({ submitted: true });
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          artistInfo: response.data,
          showResults: false,
          loading: false,
          loadEvents: true,
          loadRelated: true,
          loadTopTracks: true
        });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  getAlbumsHandler = () => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' +
          this.props.match.params.id +
          '/albums',
        {
          params: {
            limit: 100
          }
        }
      )
      .then(response => {
        this.setState({
          albumResults: response.data,
          albumsLoaded: true,
          albumsTotal: response.data.total
        });
        this.resizeHandler();
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  getTopTracksHandler = () => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/' +
          this.state.artistInfo.tracklist,
        {
          params: {
            limit: 5
          }
        }
      )
      .then(response => {
        this.setState({ topFiveResults: response.data, loadTopTracks: false });
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  getRelatedHandler = () => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' +
          this.state.artistInfo.id +
          '/related',
        {
          params: {
            limit: 10
          }
        }
      )
      .then(response => {
        let relArtist = [];
        response.data.data.map(artist => {
          relArtist.push({
            id: artist.id,
            name: artist.name,
            pic: artist.picture_medium
          });
          return relArtist;
        });
        this.setState({ relatedArtists: relArtist, loadRelated: false });
        this.resizeHandler();
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  eventClickHandler = venueId => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/venues/ZFr9jZdavd?',
        {
          params: {
            apikey: 'cVDxtZtz4UAR1m5ISMZ2mZRZSr9W3okH'
          }
        }
      )
      .then(response => {
        // console.log(response);
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  getEventsHandler = (size, page) => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?',
        {
          params: {
            apikey: 'cVDxtZtz4UAR1m5ISMZ2mZRZSr9W3okH',
            keyword: this.state.artistInfo.name,
            sort: 'date,asc',
            size: size,
            page: page
          }
        }
      )
      .then(response => {
        let results = [];
        response.data._embedded.events.map(event => {
          let eventInfo = {};
          eventInfo.name = event.name;
          eventInfo.id = event.id;
          eventInfo.eventDate = event.dates.start.localDate;
          eventInfo.eventTime = event.dates.start.localTime;
          eventInfo.images = event.images;
          if (event._embedded) {
            eventInfo.venueName = event._embedded.venues[0].name
              ? event._embedded.venues[0].name
              : null;
            eventInfo.venueAddr = event._embedded.venues[0].address
              ? event._embedded.venues[0].address.line1
              : null;
            eventInfo.venueCity = event._embedded.venues[0].city
              ? event._embedded.venues[0].city.name
              : null;
            eventInfo.venueCountry = event._embedded.venues[0].country
              ? event._embedded.venues[0].country.name
              : null;
            eventInfo.venueCountryCode = event._embedded.venues[0].country
              ? event._embedded.venues[0].country.countryCode
              : null;
            eventInfo.venueState = event._embedded.venues[0].state
              ? event._embedded.venues[0].state.stateCode
              : null;
            eventInfo.venuePostal = event._embedded.venues[0].postalCode
              ? event._embedded.venues[0].postalCode
              : null;
            eventInfo.venueId = event._embedded.venues[0].id
              ? event._embedded.venues[0].id
              : null;
          }
          results.push(eventInfo);
          return results;
        });
        this.setState({
          eventResults: results,
          eventTotalPages: response.data.page.totalPages,
          loadEvents: false
        });
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

  musicPlayerHandler = track => {
    this.setState({ playTrack: true, trackInfo: track });
  };

  albumsNextHandler = () => {
    this.setState({ albumsFadeOut: true });
    setTimeout(() => {
      this.setState({
        albumsFadeIn: true,
        albumsFadeOut: false,
        albumSliceStart: this.state.albumSliceStart + this.state.albumPageSize,
        albumSliceEnd: this.state.albumSliceEnd + this.state.albumPageSize
      });
    }, 300);
  };

  albumsPrevHandler = () => {
    this.setState({ albumsFadeOut: true });
    const sliceMinusPage =
      this.state.albumSliceStart - this.state.albumPageSize;
    const albSliceStart = sliceMinusPage > 0 ? sliceMinusPage : 0;
    setTimeout(() => {
      this.setState({
        albumsFadeIn: true,
        albumsFadeOut: false,
        albumSliceStart: albSliceStart,
        albumSliceEnd: albSliceStart + this.state.albumPageSize
      });
    }, 300);
  };

  albumOpenHandler = albumProps => {
    this.setState({ selectedAlbumId: albumProps.id });
  };

  albumCloseHandler = () => {
    this.setState({
      selectedAlbumId: null,
      selectedAlbumDetails: null,
      SelectedAlbumTracks: null
    });
  };

  eventNextHandler = () => {
    this.setState({ eventsFadeOut: true });
    setTimeout(() => {
      const nextPage = this.state.eventPageNumber + 1;
      this.setState({ eventPageNumber: nextPage });
    }, 300);
    setTimeout(() => {
      this.setState({ eventsFadeIn: true, eventsFadeOut: false });
    }, 400);
  };

  eventPrevHandler = () => {
    this.setState({ eventsFadeOut: true });
    setTimeout(() => {
      const prevPage = this.state.eventPageNumber - 1;
      this.setState({ eventPageNumber: prevPage });
    }, 300);
    setTimeout(() => {
      this.setState({ eventsFadeIn: true, eventsFadeOut: false });
    }, 400);
  };

  render() {
    const backdrop = this.state.artistInfo
      ? 'url(' + this.state.artistInfo.picture_xl + ')'
      : null;
    let albums = null;
    let related = null;
    if (this.state.albumResults) {
      albums = this.state.albumResults.data
        .slice(this.state.albumSliceStart, this.state.albumSliceEnd)
        .map(album => {
          return (
            <AlbumThumb
              id={album.id}
              key={album.id}
              title={album.title}
              thumb={album.cover_medium}
              releaseDate={album.release_date}
              click={this.albumOpenHandler}
              fadeIn={this.state.albumsFadeIn}
              fadeOut={this.state.albumsFadeOut}
            />
          );
        });
    }
    if (this.state.relatedArtists) {
      related = this.state.relatedArtists
        .slice(this.state.relatedSliceStart, this.state.relatedSliceEnd)
        .map(artist => {
          return (
            <NavLink
              style={{ color: '#fff', textDecoration: 'none' }}
              to={'/Music/Artist/' + artist.id}
              key={artist.id}
            >
              <RelatedArtist
                name={artist.name}
                pic={artist.pic}
                key={artist.id}
                id={artist.id}
                click={this.scrollTopHandler}
              />
            </NavLink>
          );
        });
    }

    return (
      <Aux>
        <NavBar searchType="music" />
        {this.state.artistInfo ? (
          <Aux>
            <div
              className={classes.OpenMusicBackdrop}
              style={{ backgroundImage: backdrop }}
            />
            <div className={classes.OpenMusicBackdrop} />
            <div className={classes.OpenMusicOverlay} />
            <div className={classes.OpenMusicContent}>
              <div className={classes.LeftSide}>
                <div className={classes.OpenMusicPoster}>
                  {this.state.artistInfo ? (
                    <img src={this.state.artistInfo.picture_big} alt="" />
                  ) : null}
                </div>
                {this.state.topFiveResults ? (
                  <TopFiveTracks
                    tracks={this.state.topFiveResults}
                    clickPlay={this.musicPlayerHandler}
                  />
                ) : null}
              </div>
              <div className={classes.OpenMusicInfo}>
                <div className={classes.OpenMusicDesc}>
                  <div className={classes.OpenMusicPosterMobile}>
                    <img src={this.state.artistInfo.picture_big} alt="" />
                  </div>
                  <h1>{this.state.artistInfo.name}</h1>
                </div>
                <div className={classes.TopTracks}>
                  <div className={uiClasses.SectionHeader}>
                    <h2>Top Tracks</h2>
                  </div>
                  {this.state.topFiveResults ? (
                    <TopFiveTracks
                      tracks={this.state.topFiveResults}
                      clickPlay={this.musicPlayerHandler}
                    />
                  ) : null}
                </div>
                <div className={uiClasses.SectionHeader}>
                  {this.state.albumSliceStart > 0 ? (
                    <FontAwesomeIcon
                      className={uiClasses.PrevIcon}
                      onClick={this.albumsPrevHandler}
                      icon={faChevronLeft}
                    />
                  ) : null}
                  <h2>Albums</h2>
                  {this.state.albumsLoaded &&
                  this.state.albumSliceEnd < this.state.albumsTotal ? (
                    <FontAwesomeIcon
                      className={uiClasses.NextIcon}
                      onClick={this.albumsNextHandler}
                      icon={faChevronRight}
                    />
                  ) : null}
                </div>
                <div
                  className={
                    !this.state.albumsFadeOut && !this.state.albumsFadeIn
                      ? classes.AlbumsContainer
                      : !this.state.albumsFadeOut && this.state.albumsFadeIn
                      ? classes.AlbumsFadeIn
                      : classes.AlbumsFadeOut
                  }
                  ref={this.albumElementRef}
                >
                  {this.state.selectedAlbumDetails ? (
                    <AlbumOpen
                      cover={this.state.selectedAlbumDetails.cover_big}
                      releaseDate={this.state.selectedAlbumDetails.release_date}
                      title={this.state.selectedAlbumDetails.title}
                      tracks={this.state.selectedAlbumTracks}
                      close={this.albumCloseHandler}
                      clickPlay={this.musicPlayerHandler}
                    />
                  ) : (
                    albums
                  )}
                </div>
                <div className={uiClasses.SectionHeader}>
                  <h2>Related Artists</h2>
                </div>
                <div className={classes.RelatedArtist} ref={this.relElementRef}>
                  {related}
                </div>
                <div className={uiClasses.SectionHeader}>
                  {this.state.eventPageNumber > 0 ? (
                    <FontAwesomeIcon
                      className={uiClasses.PrevIcon}
                      onClick={this.eventPrevHandler}
                      icon={faChevronLeft}
                    />
                  ) : null}
                  <h2>Upcoming Events</h2>
                  {this.state.eventPageNumber <
                  this.state.eventTotalPages - 1 ? (
                    <FontAwesomeIcon
                      className={uiClasses.NextIcon}
                      onClick={this.eventNextHandler}
                      icon={faChevronRight}
                    />
                  ) : null}
                </div>
                {this.state.eventResults ? (
                  <div
                    className={
                      !this.state.eventsFadeOut && !this.state.eventsFadeIn
                        ? classes.MusicEventsContainer
                        : !this.state.eventsFadeOut && this.state.eventsFadeIn
                        ? classes.MusicEventsFadeIn
                        : classes.MusicEventsFadeOut
                    }
                  >
                    <MusicEvents
                      eventResults={this.state.eventResults}
                      click={this.eventClickHandler}
                    />
                  </div>
                ) : (
                  <h2>No Events</h2>
                )}
              </div>
              {this.state.playTrack ? (
                <MusicPlayer track={this.state.trackInfo} />
              ) : null}
            </div>
          </Aux>
        ) : null}
      </Aux>
    );
  }
}

export default OpenMusic;
