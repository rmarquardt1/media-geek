import React, { Component } from "react";
import TvSeason from "../../../components/Tv/TvSeason/TvSeason";
import OpenSeason from "../../Tv/OpenSeason/OpenSeason";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";

import uiClasses from "../../../components/UI/Layout/Layout.module.css";
import classes from "./SeasonList.module.css";

class VideoList extends Component {
  state = {
    list: [],
    containerWidth: 0,
    currentElPosition: 0,
    listLoaded: false,
    scrollWidth: 0,
    moveRight: 0,
    headerMoveLeft: false,
    showNavRight: true,
    scrollMax: 0,
    showAll: false,
    noResults: false,
    openSeasonNumber: null,
    openSeasonInfo: null
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
    this.showNavRightTimeout = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.containerWidthRef.current &&
      this.containerWidthRef.current.scrollWidth > prevState.scrollWidth
    ) {
      this.resizeHandler(
        null,
        null,
        this.containerWidthRef.current.scrollWidth
      );
    }
    if (
      prevState.listLoaded !== this.state.listLoaded &&
      this.state.scrollWidth !== this.containerWidthRef.current.scrollWidth
    ) {
      this.setState({
        scrollWidth: this.containerWidthRef.current.scrollWidth
      });
    }
  }

  componentDidMount() {
    this.setState({
      containerWidth: this.containerWidthRef.current.clientWidth
    });
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
    clearTimeout(this.showNavRightTimeout);
  }

  loadListHandler = (marg, navLeftClicked) => {
    const windowW = window.innerWidth;
    const videoDimensions =
      windowW <= 500
        ? {
            width: "90px",
            lazyW: 90,
            fontSize: "12px"
          }
        : {
            width: "330px",
            lazyW: 330,
            fontSize: "14px"
          };
    const tvSeasons = this.props.seasons
      ? this.props.seasons
          .filter(ep => {
            return ep.season_number !== 0;
          })
          .map(season => {
            return (
              <TvSeason
                marg={marg + "px"}
                lazyWidth={marg * 2 + videoDimensions.lazyW}
                key={season.id}
                seasonInfo={season}
                tvId={this.props.tvId}
                tvPoster={this.props.tvPoster}
                dimensions={videoDimensions}
                click={() =>
                  this.seasonClickHandler(season.season_number, season)
                }
              />
            );
          })
      : null;
    this.setState({
      list: tvSeasons,
      listLoaded: true
    });
    this.showNavRightHandler(navLeftClicked);
  };

  showNavRightHandler = navLeftClicked => {
    this.showNavRightTimeout = setTimeout(() => {
      const scrollPosition = this.containerWidthRef.current.scrollLeft;
      const scrollMax =
        this.containerWidthRef.current.scrollWidth -
        this.containerWidthRef.current.clientWidth;
      this.setState({
        showNavRight:
          scrollPosition <= scrollMax - 50
            ? true
            : navLeftClicked
            ? true
            : false,
        scrollPos: scrollPosition
      });
    }, 700);
  };

  resizeHandler = (elPos, navLeftClicked) => {
    const windowW = window.innerWidth;
    if (this.containerWidthRef.current) {
      const containerW = this.containerWidthRef.current.clientWidth;
      const scrollW = this.containerWidthRef.current.scrollWidth;
      const scrollL = this.containerWidthRef.current.scrollLeft;
      const thumbW = windowW <= 500 ? 90 : 330;
      const elCount = Math.floor(containerW / thumbW);
      const marg = (containerW / elCount - thumbW) / 2;
      const move =
        typeof elPos === "number"
          ? elPos * (thumbW + marg * 2)
          : this.state.currentElPosition * (thumbW + marg * 2);
      this.setState({
        containerWidth: containerW,
        scrollWidth: scrollW
      });
      this.loadListHandler(marg, navLeftClicked);
      this.containerWidthRef.current.scrollTo({
        left: move,
        top: 0,
        behavior: "smooth"
      });
    }
  };

  navHandler = direction => {
    const windowW = window.innerWidth;
    const containerW = this.containerWidthRef.current.clientWidth;
    const scrollW = this.containerWidthRef.current.scrollWidth;
    const thumbW = windowW <= 500 ? 90 : 330;
    const actElCount = Math.floor(containerW / thumbW);
    const currentElPos = { ...this.state }.currentElPosition;
    switch (direction) {
      case "right":
        this.setState({
          moveRight: containerW + { ...this.state }.containerWidth,
          containerWidth: containerW + { ...this.state }.containerWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition: currentElPos + actElCount
        });
        this.resizeHandler(currentElPos + actElCount, false);
        break;
      case "left":
        this.setState({
          moveRight: containerW - { ...this.state }.containerWidth,
          containerWidth: containerW - { ...this.state }.containerWidth,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition:
            currentElPos - actElCount >= 0 ? currentElPos - actElCount : 0,
          showNavRight: true
        });
        this.resizeHandler(currentElPos - actElCount, true);
        break;
      default:
        this.setState({
          moveRight: 0,
          containerWidth: 0,
          scrollWidth: 0,
          headerMoveLeft: false,
          currentElPosition: 0
        });
    }
  };

  showAllHandler = () => {
    this.setState({
      showAll: !this.state.showAll
    });
    this.navHandler();
  };

  seasonClickHandler = (seasonNumber, seasonInfo) => {
    this.setState({
      openSeasonNumber: seasonNumber,
      openSeasonInfo: seasonInfo,
      moveRight: 0
    });
  };

  closeEpisodesHandler = () => {
    this.setState({ openSeasonNumber: null, openSeasonInfo: null });
  };

  render() {
    return (
      <React.Fragment>
        <div className={uiClasses.SectionHeader + " " + classes.CastHeader}>
          {this.state.currentElPosition > 0 && !this.state.openActor ? (
            <div className={uiClasses.NavLeft}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={classes.ChevronArrowRight + " " + uiClasses.PrevIcon}
                onClick={() => this.navHandler("left")}
              />
            </div>
          ) : null}
          <h2
            className={
              this.state.currentElPosition > 0 && !this.state.openActor
                ? uiClasses.SectionHeaderMoveLeft
                : null
            }
          >
            Seasons
          </h2>
          <div className={uiClasses.NavRight}>
            {this.state.list === null ? null : this.state.list.length > 0 &&
              !this.state.openActor ? (
              <div className={classes.ShowAll} onClick={this.showAllHandler}>
                <FontAwesomeIcon
                  icon={this.state.showAll ? faChevronUp : faChevronDown}
                  className={classes.ShowChevronDown}
                />
                {this.state.showAll ? "Show Less" : "Show All"}
              </div>
            ) : null}
            {this.state.showNavRight && !this.state.showAll ? (
              <FontAwesomeIcon
                icon={faChevronRight}
                className={classes.ChevronArrowRight + " " + uiClasses.NextIcon}
                onClick={() => this.navHandler("right")}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.List}>
          {this.state.openSeasonInfo ? (
            <OpenSeason
              tvId={this.props.tvId}
              click={this.closeEpisodesHandler}
              seasonInfo={this.state.openSeasonInfo}
              tvPoster={this.props.tvPoster}
              tvBackdrop={this.props.tvBackdrop}
            />
          ) : (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px"
                }}
              />
              <div className={classes.ListContainer}>
                <div
                  className={
                    this.state.showAll
                      ? classes.ListItemsShowAll
                      : classes.ListItems
                  }
                  ref={this.containerWidthRef}
                >
                  {this.state.list !== null
                    ? this.state.list.length > 0
                      ? this.state.list
                      : null
                    : null}
                  {this.state.noResults ? (
                    <h2 className={uiClasses.NoResults}>No Results Found</h2>
                  ) : null}
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default VideoList;
