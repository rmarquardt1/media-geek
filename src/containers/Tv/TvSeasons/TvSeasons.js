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
    seasonContainerWidth: null,
    fadeOut: false,
    fadeIn: false,
    seasonShowAll: false,
    openSeasonNumber: null,
    openSeasonInfo: null,
    scrollWidth: 0,
    sectionW: null,
    seasonMargin: null,
    moveRight: 0,
    headerMoveLeft: false
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

  loadSeasonsHandler = (start, end, pageSize, marg) => {
    const tvSeasons = this.props.seasons
      .filter(ep => {
        return ep.season_number !== 0;
      })
      .map(season => {
        return (
          <TvSeason
            marg={marg + 'px'}
            key={season.id}
            seasonInfo={season}
            tvId={this.props.tvId}
            tvPoster={this.props.tvPoster}
            click={() => this.seasonClickHandler(season.season_number, season)}
          />
        );
      });
    this.setState({
      seasons: tvSeasons,
      seasonCount: this.props.seasons.length
    });
  };

  seasonsResizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.seasonElementRef.current && !this.state.actorShowAll) {
      const actElWidth = this.seasonElementRef.current.clientWidth;
      const actThumbWidth =
        windowW <= 500
          ? 90
          : windowW <= 768
          ? 140
          : windowW <= 1366
          ? 230
          : 330;
      const actElCount = Math.floor(actElWidth / actThumbWidth);
      const sliceEnd = this.state.actorSliceStart + actElCount;
      const marg = (actElWidth / actElCount - actThumbWidth) / 2;
      let move = { ...this.state }.moveRight;
      move = move !== 0 ? actElWidth : 0;
      this.setState({
        seasonSliceEnd: sliceEnd,
        seasonPageSize: actElCount,
        sectionW: actElWidth,
        seasonMargin: marg,
        moveRight: move
      });
      this.loadSeasonsHandler(
        this.state.seasonSliceStart,
        sliceEnd,
        actElCount,
        marg
      );
    }
  };

  navHandler = direction => {
    const actElWidth = this.seasonElementRef.current.clientWidth;
    const scrollW = this.seasonElementRef.current.scrollWidth;
    const currentPos = { ...this.state }.moveRight;
    switch (direction) {
      case 'right':
        this.setState({
          moveRight: currentPos + actElWidth,
          seasonContainerWidth: actElWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true
        });
        break;
      case 'left':
        this.setState({
          moveRight: currentPos - actElWidth,
          seasonContainerWidth: actElWidth,
          scrollWidth: scrollW
        });
        break;
      default:
        return null;
    }
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

  seasonClickHandler = (seasonNumber, seasonInfo) => {
    this.setState({ openSeasonNumber: seasonNumber, openSeasonInfo: seasonInfo,  moveRight: 0 });
  };

  closeEpisodesHandler = () => {
    this.setState({ openSeasonNumber: null, openSeasonInfo: null });
  };

  render() {
    return (
      <Aux>
        <div className={uiClasses.SectionHeader}>
          {this.state.moveRight > 0 && !this.state.seasonShowAll ? (
            <FontAwesomeIcon
              className={uiClasses.PrevIcon}
              onClick={() => this.navHandler('left')}
              icon={faChevronLeft}
            />
          ) : null}
          <h2
            className={
              this.state.headerMoveLeft &&
              this.state.moveRight > 0 &&
              !this.state.seasonShowAll
                ? uiClasses.SectionHeaderMoveLeft
                : null
            }
          >
            Seasons
          </h2>
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
            {this.state.moveRight + this.state.seasonContainerWidth <=
              this.state.scrollWidth && !this.state.seasonShowAll ? (
              <FontAwesomeIcon
                className={uiClasses.NextIcon}
                onClick={() => this.navHandler('right')}
                icon={faChevronRight}
              />
            ) : null}
          </div>
        </div>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            className={classes.Seasons}
            style={
              this.state.seasonShowAll
                ? { flexWrap: 'wrap' }
                : this.state.moveRight > 0
                ? { right: this.state.moveRight + 'px' }
                : null
            }
            ref={this.seasonElementRef}
          >
            {this.state.openSeasonInfo ? (
              <OpenSeason
                tvId={this.props.tvId}
                click={this.closeEpisodesHandler}
                seasonInfo={this.state.openSeasonInfo}
                tvPoster={this.props.tvPoster}
              />
            ) : this.state.seasons ? (
              this.state.seasons
            ) : null}
          </div>
        </div>
      </Aux>
    );
  }
}

export default TvSeasons;
