import React, { Component } from "react";
import GameDetails from "../../../components/Games/GameDetails/GameDetails";
import Loader from "../../../components/UI/Loader/Loader";

import classes from "./Game.module.css";

class Game extends Component {
  state = {
    imgLoaded: false
  };

  render() {
    const posterImg = "url(" + this.props.poster + ")";

    return (
      <div className={classes.Movie} onClick={this.props.clicked}>
        <div
          style={{
            background: posterImg + "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "rgba(0,0,0,0.3)",
            backgroundPosition: "center",
            position: "relative"
          }}
          className={classes.Poster}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              position: "absolute",
              height: "100%",
              width: "100%"
            }}
          />
          {this.state.imgLoaded ? null : (
            <Loader addStyle={{ margin: "auto" }} />
          )}
          <img
            alt=""
            style={this.state.imgLoaded ? {} : { display: "none" }}
            src={this.props.poster}
            onLoad={() => this.setState({ imgLoaded: true })}
            onError={() => this.setState({ imgLoaded: true })}
          />
        </div>
        <GameDetails
          title={this.props.title}
          release={this.props.release}
          movieId={this.props.id}
          deck={this.props.deck}
        />
      </div>
    );
  }
}

export default Game;
