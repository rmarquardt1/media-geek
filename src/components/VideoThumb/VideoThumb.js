import React, { Component } from "react";
import LazyLoad from "react-lazy-load";

import uiClasses from "../../components/UI/Layout/Layout.module.css";
import classes from "./VideoThumb.module.css";

class VideoThumb extends Component {
  state = {
    posterHeight: null,
    rating: null
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("orientationchange", this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  resizeHandler = () => {
    if (this.posterRef.current) {
      this.setState({
        posterHeight:
          this.posterRef.current.clientWidth / 2 +
          this.posterRef.current.clientWidth
      });
    }
  };

  render() {
    return (
      <LazyLoad threshold={1400} width={this.props.lazyWidth}>
        <div
          className={classes.VideoThumb}
          style={{
            width: this.props.dimensions ? this.props.dimensions.width : "",
            marginLeft: this.props.marg,
            marginRight: this.props.marg
          }}
        >
          <div
            className={classes.Poster + " " + uiClasses.BoxShadow}
            ref={this.posterRef}
            onClick={this.props.click.bind(this, this.props.videoUrl)}
            style={{
              // minHeight: this.props.dimensions
              //   ? this.props.dimensions.posterHeight
              //     ? this.props.dimensions.posterHeight
              //     : null
              //   : "",
              width: this.props.dimensions ? this.props.dimensions.width : "",
              height: "200px",
              border: "1px solid #ff0000"
            }}
          >
            <img src={this.props.poster} alt="" />
          </div>
          <div className={classes.NameChar}>
            <span>{this.props.name}</span>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default VideoThumb;
