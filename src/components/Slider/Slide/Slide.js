import React, { Component } from "react";

import classes from "./Slide.module.css";

import testSlide from "../../../assets/images/thor-ragnarok.jpg";
import testSlide2 from "../../../assets/images/thor-ragnarok-2.jpg";
import testSlide3 from "../../../assets/images/thor-ragnarok-3.jpg";

// import testLogo from "../../../assets/images/indiana-jones-hdclearlogo.png";

class Slide extends Component {
  state = {
    showTitle: false,
    logoUrl: null,
    mobile: false
  };

  componentDidMount() {
    if (window.innerWidth <= 500) {
      this.setState({ mobile: true });
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        this.setState({ mobile: true });
      } else {
        this.setState({ mobile: false });
      }
    });
  }

  render() {
    return (
      <div className={classes.SlideContainer}>
        <div className={classes.SlideInfo}>
          {this.props.logoUrl ? (
            <div className={classes.LogoImg}>
              <img src={this.props.logoUrl} alt="" />
            </div>
          ) : (
            <div className={classes.Title}>
              <h1>{this.props.title}</h1>
            </div>
          )}
          {this.props.caption ? (
            <div className={classes.CaptionContainer}>
              <h2 className={classes.Caption}>{this.props.caption}</h2>
            </div>
          ) : (
            <div className={classes.CaptionContainer} />
          )}

          {this.props.overview ? (
            <div className={classes.Overview}>{this.props.overview}</div>
          ) : null}
        </div>
        <img
          alt=""
          className={classes.SliderImage}
          //src={"http://image.tmdb.org/t/p/w780/" + this.props.bgImage}
          src={testSlide2}
        />
      </div>
    );
  }
}

export default Slide;
