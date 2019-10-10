import React, { Component } from 'react';
import TvSeason from '../../../components/Tv/TvSeason/TvSeason';
import OpenSeason from '../OpenSeason/OpenSeason';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './TvSeasons.module.css';

class TvSeasons extends Component {
  state = {
    seasons: null,
    seasonRowCount: null,
    seasonCount: null,
    seasonSliceStart: 0,
    seasonSliceEnd: null,
    seasonPageSize: null,
    seasonCurrentPage: 1,
    fadeOut: false,
    fadeIn: false,
    seasonShowAll: false,
    openSeasonNumber: null
  };

  constructor(props) {
    super(props);
    this.seasonElementRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.seasonsResizeHandler.bind(this));
    this.loadSeasonsHandler();
    this.seasonsResizeHandler();
  }

  loadSeasonsHandler = (start, end, pageSize) => {
    const tvSeasons = this.props.seasons
      .filter(ep => {
        return ep.season_number !== 0;
      })
      .slice(start, end)
      .map(season => {
        return (
          <TvSeason
            key={season.id}
            seasonInfo={season}
            tvId={this.props.tvId}
            click={() => this.seasonClickHandler(season.season_number)}
          />
        );
      });
    const seasPageCount = tvSeasons.length;
    if (seasPageCount < pageSize) {
      const windowW = window.innerWidth;
      const diff = pageSize - seasPageCount;
      for (let step = 0; step < diff; step++) {
        if (windowW <= 830) {
          tvSeasons.push(
            <div
              key={step}
              style={{
                content: '""',
                flex: 'auto',
                width: '47%',
                maxWidth: '47%'
              }}
            ></div>
          );
        } else {
          tvSeasons.push(
            <div
              key={step}
              style={{
                content: '""',
                flex: 'auto',
                width: '350px',
                maxWidth: '350px'
              }}
            ></div>
          );
        }
      }
    }
    this.setState({
      seasons: tvSeasons,
      seasonCount: this.props.seasons.length
    });
  };

  seasonsResizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.seasonElementRef.current && !this.state.seasonShowAll) {
      const seasElWidth = this.seasonElementRef.current.clientWidth;
      const seasThumbWidth = windowW < 1367 ? seasElWidth * 0.47 : 350;
      const seasElCount = Math.floor(seasElWidth / seasThumbWidth);
      const seasSliceEnd =
        windowW > 768
          ? this.state.seasonSliceStart + seasElCount * 2
          : this.state.seasonSliceStart + 4;
      const seasPageSize = windowW > 768 ? seasElCount * 2 : 4;
      this.setState({
        seasonSliceEnd: seasSliceEnd,
        seasonPageSize: seasPageSize,
        seasonRowCount: seasElCount
      });
      this.loadSeasonsHandler(
        this.state.seasonSliceStart,
        seasSliceEnd,
        seasPageSize
      );
    }
  };

  seasonsNextHandler = () => {
    this.setState({ fadeOut: !this.state.fadeOut });
    this.setState(prevState => ({
      seasonSliceStart: prevState.seasonSliceStart + this.state.seasonPageSize,
      seasonSliceEnd: prevState.seasonSliceEnd + this.state.seasonPageSize,
      seasonCurrentPage: prevState.seasonCurrentPage + 1,
      fadeOut: !this.state.fadeOut,
      fadeIn: !this.state.fadeIn
    }));
    const start = this.state.seasonSliceStart + this.state.seasonPageSize;
    const end = start + this.state.seasonPageSize;
    setTimeout(() => {
      this.loadSeasonsHandler(start, end);
      this.setState({
        fadeOut: !this.state.fadeOut,
        fadeIn: !this.state.fadeIn
      });
    }, 500);
  };

  seasonsBackHandler = () => {
    this.setState({ fadeOut: !this.state.fadeOut });
    this.setState(prevState => ({
      seasonSliceStart:
        prevState.seasonSliceStart - this.state.seasonPageSize < 0
          ? 0
          : prevState.seasonSliceStart - this.state.seasonPageSize,
      seasonSliceEnd: prevState.seasonSliceEnd - this.state.seasonPageSize,
      seasonCurrentPage: prevState.seasonCurrentPage - 1,
      fadeOut: !this.state.fadeOut,
      fadeIn: !this.state.fadeIn
    }));
    let start = this.state.seasonSliceStart - this.state.seasonPageSize;
    start = start < 0 ? 0 : start;
    const end = start + this.state.seasonPageSize;
    setTimeout(() => {
      this.loadSeasonsHandler(start, end);
      this.setState({
        fadeOut: !this.state.fadeOut,
        fadeIn: !this.state.fadeIn
      });
    }, 500);
  };

  seasonViewAllHandler = () => {
    const seasonCount = this.props.seasons.filter(ep => {
      return ep.season_number !== 0;
    }).length;
    const rows = Math.ceil(seasonCount / this.state.seasonRowCount);
    const pageSize = this.state.seasonRowCount * rows;
    if (!this.state.seasonShowAll) {
      this.loadSeasonsHandler(0, 1000, pageSize);
      this.setState({ seasonShowAll: true });
    } else {
      this.loadSeasonsHandler(0, this.state.seasonPageSize);
      this.setState({ seasonShowAll: false });
    }
  };

  seasonClickHandler = seasonNumber => {
    this.setState({ openSeasonNumber: seasonNumber });
  };

  closeEpisodesHandler = () => {
    this.setState({ openSeasonNumber: null });
  };

  render() {
    return (
      <Aux>
        <div className={uiClasses.SectionHeader}>
          {this.state.seasonSliceStart > 0 &&
          !this.state.openSeasonNumber &&
          !this.state.seasonShowAll ? (
            <FontAwesomeIcon
              className={uiClasses.PrevIcon}
              onClick={this.seasonsBackHandler}
              icon={faChevronLeft}
            />
          ) : null}
          <h2>Seasons</h2>
          <div className={classes.NavRight}>
            {this.state.seasonPageSize < this.state.seasonCount &&
            !this.state.openSeasonNumber ? (
              <div
                className={
                  this.state.seasonShowAll
                    ? classes.MoreLess + ' ' + classes.More
                    : classes.MoreLess
                }
                onClick={this.seasonViewAllHandler}
              >
                <FontAwesomeIcon
                  icon={this.state.seasonShowAll ? faChevronUp : faChevronDown}
                  style={{ marginRight: '10px' }}
                />
                {this.state.seasonShowAll ? 'Show Less' : 'Show All'}
              </div>
            ) : null}
            {this.state.seasonCurrentPage <
              this.state.seasonCount /
                (this.state.seasonSliceEnd - this.state.seasonSliceStart) &&
            !this.state.openSeasonNumber &&
            !this.state.seasonShowAll ? (
              <FontAwesomeIcon
                className={uiClasses.NextIcon}
                onClick={this.seasonsNextHandler}
                icon={faChevronRight}
              />
            ) : null}
          </div>
        </div>
        <div
          className={
            this.state.fadeOut
              ? classes.FadeOut + ' ' + classes.Seasons
              : this.state.fadeIn
              ? classes.FadeIn + ' ' + classes.Seasons
              : classes.Seasons
          }
          ref={this.seasonElementRef}
        >
          {this.state.openSeasonNumber ? (
            <OpenSeason
              seasonNumber={this.state.openSeasonNumber}
              tvId={this.props.tvId}
              click={this.closeEpisodesHandler}
            />
          ) : this.state.seasons ? (
            this.state.seasons
          ) : null}
        </div>
      </Aux>
    );
  }
}

export default TvSeasons;
