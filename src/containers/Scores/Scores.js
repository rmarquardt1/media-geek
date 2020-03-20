import React, { Component } from "react";
import axios from "axios";

import imdbIcon from "../../assets/images/imdb-icon.png";
import rtIconFresh from "../../assets/images/rt-icon-fresh.png";
import rtIconSplat from "../../assets/images/rt-icon-splat.png";
import mcIcon from "../../assets/images/mc-icon.png";
import classes from "./Scores.module.css";

class Scores extends Component {
  axiosCancel = axios.CancelToken.source();

  state = {
    imdbScore: null,
    rtScore: null,
    mcScore: null,
    score: false
  };

  componentDidMount() {
    this.getRatingsHandler();
  }

  componentWillUnmount() {
    this.axiosCancel.cancel("axios scores request cancelled");
  }

  getRatingsHandler = () => {
    if (this.props.scoreType === "slideScore") {
      console.log("slider");
      console.log("title: " + this.props.title);
    }
    axios
      .get("https://www.omdbapi.com/", {
        cancelToken: this.axiosCancel.token,
        params: {
          apikey: "fb18a0b4",
          t: this.props.title,
          type: this.props.type
        }
      })
      .then(response => {
        response.data.Ratings.map(rating => {
          if (rating.Source === "Internet Movie Database") {
            this.setState({ imdbScore: rating.Value, score: true });
          }
          if (rating.Source === "Rotten Tomatoes") {
            this.setState({ rtScore: rating.Value, score: true });
          }
          if (rating.Source === "Metacritic") {
            const mc = rating.Value.substr(0, rating.Value.length - 4) + "%";
            this.setState({ mcScore: mc, score: true });
          }
          return null;
        });
      })
      .catch(error => {
        console.log("error " + error);
      });
  };

  render() {
    let rtNumber = null;
    if (this.state.rtScore) {
      const rt = this.state.rtScore;
      rtNumber = rt.replace("%", "");
    }
    return (
      <div className={classes.Scores} style={this.props.scoresOverride}>
        {!this.state.imdbScore &&
        !this.state.rtScore &&
        !this.state.mcScore &&
        this.props.scoreType === "list" ? (
          "No Scores Found"
        ) : (
          <React.Fragment>
            {this.state.imdbScore ? (
              <div className={classes.Score} style={this.props.cssOverride}>
                <div className={classes.ImageContainer}>
                  <img
                    src={imdbIcon}
                    className={classes.ImdbIcon}
                    style={this.props.imgOverride}
                    alt=""
                  />{" "}
                </div>
                <span style={this.props.cssOverride}>
                  {this.state.imdbScore}
                </span>
              </div>
            ) : null}
            {this.state.rtScore ? (
              <div className={classes.Score} style={this.props.cssOverride}>
                <div className={classes.ImageContainer}>
                  <img
                    src={rtNumber < 60 ? rtIconSplat : rtIconFresh}
                    className={classes.RtIcon}
                    style={this.props.imgOverride}
                    alt=""
                  />
                </div>
                <span style={this.props.cssOverride}>{this.state.rtScore}</span>
              </div>
            ) : null}
            {this.state.mcScore ? (
              <div style={{ marginRight: 0 }} className={classes.Score}>
                <div className={classes.ImageContainer}>
                  <img
                    src={mcIcon}
                    className={classes.McIcon}
                    style={this.props.imgOverride}
                    alt=""
                  />
                </div>
                <span style={this.props.cssOverride}>{this.state.mcScore}</span>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Scores;
