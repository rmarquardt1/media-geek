import React, { Component } from "react";
import VideoThumb from "../../../components/VideoThumb/VideoThumb";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";

import uiClasses from "../../../components/UI/Layout/Layout.module.css";
import classes from "../List.module.css";

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
    noResults: false
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

  loadListHandler = (marg, navLeftClicked, scrollW, scrollLeft) => {
    const windowW = window.innerWidth;
    const videoDimensions =
      windowW <= 500
        ? {
            width: "120px",
            lazyW: 120,
            fontSize: "12px"
          }
        : {
            width: "278px",
            lazyW: 278,
            fontSize: "14px"
          };
    const releases = this.props.actors
      ? this.props.actors.map(result => {
          let videoName = result.name;
          const charMax = windowW > 500 ? 50 : 30;
          if (videoName.length > charMax) {
            videoName = videoName.substring(0, charMax) + "...";
          }

          return (
            <VideoThumb
              marg={marg + "px"}
              lazyWidth={marg * 2 + videoDimensions.lazyW}
              id={result.id}
              key={result.id}
              poster={
                "https://img.youtube.com/vi/" + result.key + "/mqdefault.jpg"
              }
              videoUrl={"https://www.youtube.com/embed/" + result.key}
              name={videoName}
              dimensions={videoDimensions}
              click={this.props.play}
            />
          );
        })
      : null;
    this.setState({
      list: releases,
      listLoaded: true
    });
    this.showNavRightHandler(navLeftClicked, scrollLeft);
  };

  showNavRightHandler = (navLeftClicked, scrollLeft) => {
    this.showNavRightTimeout = setTimeout(() => {
      if (this.containerWidthRef.current) {
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
      }
    }, 700);
  };

  resizeHandler = (elPos, navLeftClicked, scrollWidth) => {
    const windowW = window.innerWidth;
    if (this.containerWidthRef.current) {
      const containerW = this.containerWidthRef.current.clientWidth;
      const scrollW = this.containerWidthRef.current.scrollWidth;

      const scrollL = this.containerWidthRef.current.scrollLeft;

      const thumbW = windowW <= 500 ? 120 : 278;
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
      this.loadListHandler(marg, navLeftClicked, scrollWidth, scrollL);
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
    const thumbW = windowW <= 500 ? 120 : 278;
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
      showAll: !this.state.showAll,
      currentElPosition: 0
    });
    const el = this.containerWidthRef.current;
    const initMax = el.querySelector(".is-visible").clientHeight + "px";
    el.style.maxHeight = initMax;
    if (!this.state.showAll) {
      el.scrollTo({
        left: el.scrollWidth - el.clientWidth
      });
      el.style.flexWrap = "wrap";
      el.style.maxHeight = "1500px";
      setTimeout(() => {
        el.style.maxHeight = "initial";
      }, 500);
    } else {
      el.style.maxHeight = "1500px";
      setTimeout(() => {
        el.style.maxHeight = initMax;
      }, 10);
      setTimeout(() => {
        el.style.flexWrap = "nowrap";
      }, 500);
      this.setState({ showNavRight: true });
      this.setState({ showAll: false });
      this.navHandler();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={uiClasses.SectionHeader + " " + classes.CastHeader}>
          {this.state.currentElPosition > 0 && !this.state.openActor ? (
            <div className={uiClasses.NavLeft}>
              <div
                className={uiClasses.PrevIcon}
                onClick={() => this.navHandler("left")}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </div>
          ) : null}
          <h2
            className={
              this.state.currentElPosition > 0 && !this.state.openActor
                ? uiClasses.SectionHeaderMoveLeft
                : null
            }
          >
            Videos
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
              <div
                className={uiClasses.NextIcon}
                onClick={() => this.navHandler("right")}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.List}>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
          />
          <div className={classes.ListContainer}>
            <div className={classes.ListItems} ref={this.containerWidthRef}>
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
        </div>
      </React.Fragment>
    );
  }
}

export default VideoList;
