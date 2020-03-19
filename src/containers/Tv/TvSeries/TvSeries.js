import React, { Component } from "react";
import LazyLoad from "react-lazy-load";
import MovieDetails from "../../../components/Details/MovieDetails/MovieDetails";
import Scores from "../../Scores/Scores";
import axios from "axios";

import mgLogo from "../../../assets/images/mg-icon.png";
import ratingsIcon from "../../../assets/images/mobile-ratings-64.png";
import uiClasses from "../../../components/UI/Layout/Layout.module.css";
import classes from "./TvSeries.module.css";

class TvSeries extends Component {
  state = {
    posterHeight: null,
    rating: null,
    networkLogo: null,
    flip: false
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
    this.frontRef = React.createRef();
    this.backRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
    this.getDetailsHandler();
    this.getRatingHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  getRatingHandler = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/" + this.props.id + "/content_ratings",
        {
          params: {
            api_key: "4c7294000365c14a8e42109c863ff772",
            language: "en-US"
          }
        }
      )
      .then(response => {
        if (
          response.data.results.length > 0 &&
          response.data.results.find(rating => rating.iso_3166_1 === "US")
        ) {
          this.setState({
            rating: response.data.results.find(
              rating => rating.iso_3166_1 === "US"
            ).rating
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          const timeOut = parseInt(
            error.response.headers["retry-after"] + "000"
          );
          this.ratingTryAgainHandler(timeOut);
        } else {
          console.log("error: " + error);
        }

        //console.log('error: ' + error);
      });
  };

  ratingTryAgainHandler = timeOut => {
    setTimeout(() => {
      this.getRatingHandler();
    }, timeOut);
  };

  detailsTryAgainHandler = timeOut => {
    setTimeout(() => {
      this.getDetailsHandler();
    }, timeOut);
  };

  getDetailsHandler = () => {
    axios
      .get("https://api.themoviedb.org/3/tv/" + this.props.id, {
        params: {
          api_key: "4c7294000365c14a8e42109c863ff772",
          language: "en-US"
        }
      })
      .then(response => {
        const firstAir = new Date(response.data.first_air_date);
        const lastAir = new Date(response.data.last_air_date);
        const airSpan =
          firstAir.getFullYear() !== lastAir.getFullYear()
            ? firstAir.getFullYear() + "-" + lastAir.getFullYear()
            : firstAir.getFullYear();
        let netLogo = null;
        if (this.props.streaming) {
          for (let i = 0; i < response.data.networks.length; i++) {
            const networkId = response.data.networks[i].id;
            if (
              networkId === 213 ||
              networkId === 1024 ||
              networkId === 453 ||
              networkId === 2739
            ) {
              netLogo =
                "http://image.tmdb.org/t/p/w92" +
                response.data.networks[i].logo_path;
            }
          }
        } else {
          netLogo = response.data.networks[0].logo_path
            ? "http://image.tmdb.org/t/p/w92" +
              response.data.networks[0].logo_path
            : response.data.networks[0].name;
        }
        this.setState({
          airDates: airSpan,
          networkLogo: netLogo,
          seasons: response.data.number_of_seasons
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          const timeOut = parseInt(
            error.response.headers["retry-after"] + "000"
          );
          this.ratingTryAgainHandler(timeOut);
        } else {
          console.log("error: " + error);
        }

        //console.log('error: ' + error);
      });
  };

  resizeHandler = () => {
    if (this.posterRef.current) {
      this.setState({
        posterHeight:
          this.posterRef.current.clientWidth / 2 +
          this.posterRef.current.clientWidth
      });
    }
  };

  scoresClick = event => {
    event.preventDefault();
    this.setState({ flip: !this.state.flip });
    console.dir(this.backRef.current);
  };

  render() {
    return (
      <LazyLoad
        threshold={1400}
        // threshold={this.props.thresh ? this.props.thresh : 1400}
        width={this.props.lazyWidth}
        height={this.props.lazyHeight ? this.props.lazyHeight : null}
      >
        <div
          className={classes.Movie}
          style={{
            width: this.props.dimensions ? this.props.dimensions.width : "",
            height: this.props.dimensions
              ? this.props.dimensions.movieHeight
              : "",
            marginLeft: this.props.marg,
            marginRight: this.props.marg
          }}
        >
          <div
            className={classes.Poster + " " + uiClasses.BoxShadow}
            ref={this.posterRef}
            style={{
              minHeight: this.state.posterHeight,
              width: this.props.dimensions ? this.props.dimensions.width : "",
              height: this.props.dimensions ? this.props.dimensions.height : ""
            }}
          >
            <div
              // className={classes.Back}
              className={
                this.state.flip
                  ? classes.Back + " " + classes.BackFlip
                  : classes.Back
              }
              style={{
                backgroundImage:
                  "url('http://image.tmdb.org/t/p/w342/" +
                  this.props.poster +
                  "')"
              }}
              ref={this.backRef}
            >
              <div className={classes.BackOverlay} />
              <div className={classes.BackInfo}>
                {window.innerWidth <= 500 ? (
                  <Scores
                    scoreType="list"
                    title={this.props.title}
                    //type={props.type}
                    cssOverride={{ marginRight: "0px" }}
                    //imgOverride={{ height: "16px" }}
                    scoresOverride={{
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  />
                ) : null}
              </div>
            </div>

            <img
              src={
                this.props.poster
                  ? "http://image.tmdb.org/t/p/w342/" + this.props.poster
                  : mgLogo
              }
              // src={tempImage}
              style={!this.props.poster ? { width: "40%" } : null}
              // className={classes.Front}

              className={
                this.state.flip
                  ? classes.Front + " " + classes.FrontFlip
                  : classes.Front
              }
              alt=""
              ref={this.frontRef}
            />

            {/* <FontAwesomeIcon
              className={classes.EllipsisIcon}
              icon={faEllipsisH}
            /> */}
            <div
              className={classes.EllipsisIcon}
              onClick={event => this.scoresClick(event)}
              style={{ color: "#ccc" }}
            >
              {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
              {/* <FontAwesomeIcon icon={faBoxes} /> */}
              <img src={ratingsIcon} alt="" />
            </div>

            {/* <img
              src={
                this.props.poster
                  ? "http://image.tmdb.org/t/p/w342/" + this.props.poster
                  : mgLogo
              }
              style={!this.props.poster ? { width: "40%" } : null}
              className={uiClasses.BoxShadow}
              alt=""
            />
            {this.state.networkLogo ? (
              <div
                style={{
                  width: "50%",
                  height: "30px",
                  position: "absolute",
                  right: 0,
                  bottom: 0
                }}
              >
                <img
                  className={classes.Network + " " + uiClasses.BoxShadowReverse}
                  src={this.state.networkLogo}
                  alt=""
                />
              </div>
            ) : null} */}
          </div>
          <MovieDetails
            title={this.props.title}
            type="tv"
            release={this.props.release}
            movieId={this.props.id}
            rating={this.state.rating}
            // type={this.props.type}
            fontSize={
              this.props.dimensions ? this.props.dimensions.fontSize : null
            }
          />
        </div>
      </LazyLoad>
    );
  }
}

export default TvSeries;
