import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import uiClasses from "../../../components/UI/Layout/Layout.module.css";
import classes from "./PosterImages.module.css";

class List extends Component {
  state = {
    listData: null,
    list: null,
    // mobileDisplay: false,
    containerWidth: 0,
    currentElPosition: 0,
    listLoaded: false,
    scrollWidth: 0,
    moveRight: 0,
    headerMoveLeft: false,
    showNav: false,
    requestAttempt: 0
  };

  constructor(props) {
    super(props);
    this.containerWidthRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    this.getImagesHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  getImagesHandler = async () => {
    let listDataResponse = null;
    let url = null;
    if (this.props.tvdbId) {
      url = "https://webservice.fanart.tv/v3/tv/" + this.props.tvdbId;
    } else {
      url = "https://webservice.fanart.tv/v3/movies/" + this.props.imdbId;
    }
    await axios
      .get(url, {
        params: {
          api_key: "c3f4fba1e26da407177b194566ca2d3f"
        }
      })
      .then(response => {
        listDataResponse = this.props.tvdbId
          ? response.data.tvposter
          : response.data.movieposter;
      })
      .catch(error => {
        console.log("error " + error);
        if (this.state.requestAttempt < 4) {
          this.getImagesHandler();
          this.setState({ requestAttempt: this.state.requestAttempt + 1 });
        }
      });
    this.setState({ listData: listDataResponse });
    this.resizeHandler();
  };

  loadListHandler = marg => {
    const releases = this.state.listData
      ? this.state.listData.map(result => {
          const url = result.url.replace("/fanart/", "/preview/");
          return (
            <div
              style={{ marginLeft: marg, marginRight: marg }}
              className={classes.ImageThumb}
              key={Math.random()}
            >
              <img
                className={uiClasses.BoxShadow}
                src={url}
                alt=""
                onClick={() =>
                  this.props.imgClick(
                    result.url,
                    this.state.listData,
                    result.id
                  )
                }
              />
            </div>
          );
        })
      : null;
    this.setState({
      list: releases,
      listLoaded: true
    });
  };

  resizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.containerWidthRef.current) {
      const containerW = this.containerWidthRef.current.clientWidth;
      const scrollW = this.containerWidthRef.current.scrollWidth;
      const thumbW = windowW <= 500 ? 120 : windowW <= 768 ? 150 : 220;
      const elCount = Math.floor(containerW / thumbW);
      const marg = (containerW / elCount - thumbW) / 2 + 10;
      const move = this.state.currentElPosition * (thumbW - 20 + marg * 2);
      this.setState({
        moveRight: move,
        containerWidth: containerW,
        scrollWidth: scrollW
      });
      if (!this.state.listLoaded && this.state.listData) {
        this.loadListHandler(marg);
        if (elCount < this.state.list.length) {
          this.setState({ showNav: true });
        }
      } else {
        const thumbs = this.containerWidthRef.current.childNodes;
        thumbs.forEach(item => {
          item.style.marginLeft = marg + "px";
          item.style.marginRight = marg + "px";
        });
      }
    }
  };

  navHandler = direction => {
    const windowW = window.innerWidth;
    const containerW = this.containerWidthRef.current.clientWidth;
    const scrollW = this.containerWidthRef.current.scrollWidth;
    const thumbW = windowW <= 500 ? 110 : windowW <= 768 ? 150 : 220;
    const actElCount = Math.floor(containerW / thumbW);
    const currentElPos = { ...this.state }.currentElPosition;
    const currentPos = { ...this.state }.moveRight;
    switch (direction) {
      case "right":
        this.setState({
          moveRight: currentPos + containerW,
          containerWidth: containerW,
          scrollWidth: scrollW,
          headerMoveLeft: true,
          currentElPosition: currentElPos + actElCount
        });
        break;
      case "left":
        this.setState({
          moveRight: currentPos - containerW,
          actorContainerWidth: containerW,
          scrollWidth: scrollW,
          currentElPosition: currentElPos - actElCount
        });
        break;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className={classes.List}>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
        >
          <div className={classes.Bar} />
          {this.state.moveRight > 0 ? (
            <div
              className={classes.NavLeft}
              onClick={() => this.navHandler("left")}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          ) : null}
          <h2>{this.props.heading}</h2>

          {this.state.moveRight + this.state.containerWidth <=
            this.state.scrollWidth && this.state.showNav ? (
            <div
              className={classes.NavRight}
              onClick={() => this.navHandler("right")}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          ) : null}
        </div>
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            className={classes.ListItems}
            style={
              this.state.moveRight > 0
                ? { right: this.state.moveRight + "px" }
                : this.state.openActorMovies
                ? { left: "0px" }
                : null
            }
            ref={this.containerWidthRef}
          >
            {this.state.list ? (
              this.state.list
            ) : (
              <h2 className={uiClasses.NoResults}>No Results Found</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
