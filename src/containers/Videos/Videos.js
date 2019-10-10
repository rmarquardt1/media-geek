import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import VideoThumb from '../../components/VideoThumb/VideoThumb';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Videos.module.css';

class Videos extends Component {
  state = {
    videos: null,
    videoResults: null,
    videoCount: null,
    videoSliceStart: 0,
    videoSliceEnd: null,
    videoPageSize: null,
    videoCurrentPage: 1,
    videoShowAll: false,
    headerMoveLeft: false
  };

  constructor(props) {
    super(props);
    this.vidElementRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.videosResizeHandler.bind(this));
    this.loadVideosHandler();
    this.videosResizeHandler();
  }

  videosResizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.vidElementRef.current && !this.state.videoShowAll) {
      const vidElWidth = this.vidElementRef.current.clientWidth;
      const vidThumbWidth = 240;
      const vidElCount = Math.floor(vidElWidth / vidThumbWidth);
      const vidSliceEnd =
        windowW > 768
          ? this.state.videoSliceStart + vidElCount * 2
          : windowW < 501
          ? this.state.videoSliceStart + 6
          : this.state.videoSliceStart + 4;
      const vidPageSize =
        windowW > 768 ? vidElCount * 2 : windowW < 501 ? 6 : 4;

      this.setState({
        videoSliceEnd: vidSliceEnd,
        videoPageSize: vidPageSize
      });
      this.loadVideosHandler(
        this.state.videoSliceStart,
        vidSliceEnd,
        vidPageSize
      );
    }
  };

  loadVideosHandler = (start, end, pageSize) => {
    const videos = this.props.vids.slice(start, end).map(video => {
      return (
        <VideoThumb
          videoName={video.name}
          key={video.key}
          videoUrl={'https://www.youtube.com/embed/' + video.key}
          thumbnail={
            'https://img.youtube.com/vi/' + video.key + '/mqdefault.jpg'
          }
          click={this.props.play}
        />
      );
    });
    const vidPageCount = videos.length;
    if (vidPageCount < pageSize) {
      const windowW = window.innerWidth;
      const diff = pageSize - vidPageCount;
      for (let step = 0; step < diff; step++) {
        if (windowW <= 830) {
          videos.push(
            <div
              key={step}
              style={{
                content: '""',
                flex: 'auto',
                width: '45%',
                maxWidth: '45%'
              }}
            ></div>
          );
        } else {
          videos.push(
            <div
              key={step}
              style={{
                content: '""',
                flex: 'auto',
                width: '240px',
                maxWidth: '240px'
              }}
            ></div>
          );
        }
      }
    }
    this.setState({
      videos: videos,
      videoCount: this.props.vids.length
    });
  };

  videosNextHandler = () => {
    this.setState(prevState => ({
      videoSliceStart: prevState.videoSliceStart + this.state.videoPageSize,
      videoSliceEnd: prevState.videoSliceEnd + this.state.videoPageSize,
      videoCurrentPage: prevState.videoCurrentPage + 1
    }));
    const start = this.state.videoSliceStart + this.state.videoPageSize;
    const end = this.state.videoSliceEnd + this.state.videoPageSize;
    this.loadVideosHandler(start, end);
  };

  videosBackHandler = () => {
    this.setState(prevState => ({
      videoSliceStart: prevState.videoSliceStart - this.state.videoPageSize,
      videoSliceEnd: prevState.videoSliceEnd - this.state.videoPageSize,
      videoCurrentPage: prevState.videoCurrentPage - 1
    }));
    const start = this.state.videoSliceStart - this.state.videoPageSize;
    const end = this.state.videoSliceEnd - this.state.videoPageSize;
    this.loadVideosHandler(start, end);
  };

  videoViewAllHandler = () => {
    if (!this.state.videoShowAll) {
      this.loadVideosHandler(0, 1000);
      this.setState({ videoShowAll: true });
    } else {
      this.loadVideosHandler(
        this.state.videoSliceStart,
        this.state.videoSliceEnd
      );
      this.setState({ videoShowAll: false });
    }
  };

  render() {
    return (
      <Aux>
        <div className={uiClasses.SectionHeader}>
          {this.state.videoCurrentPage !== 1 && !this.state.videoShowAll ? (
            <FontAwesomeIcon
              className={uiClasses.PrevIcon}
              onClick={this.videosBackHandler}
              icon={faChevronLeft}
            />
          ) : null}
          <h2
            className={
              this.state.videoCurrentPage !== 1 && !this.state.videoShowAll
                ? uiClasses.SectionHeaderMoveLeft
                : null
            }
          >
            Videos
          </h2>
          <div className={classes.NavRight}>
            {this.state.videoPageSize < this.state.videoCount ? (
              <div
                className={
                  this.state.videoShowAll
                    ? classes.MoreLess + ' ' + classes.More
                    : classes.MoreLess
                }
                onClick={this.videoViewAllHandler}
              >
                <FontAwesomeIcon
                  icon={this.state.videoShowAll ? faChevronUp : faChevronDown}
                  style={{ marginRight: '10px' }}
                />
                {this.state.videoShowAll ? 'Show Less' : 'Show All'}
              </div>
            ) : null}
            {this.state.videoCurrentPage <
              this.state.videoCount /
                (this.state.videoSliceEnd - this.state.videoSliceStart) &&
            !this.state.videoShowAll ? (
              <FontAwesomeIcon
                className={uiClasses.NextIcon}
                onClick={this.videosNextHandler}
                icon={faChevronRight}
              />
            ) : null}
          </div>
        </div>
        <div className={classes.Videos} ref={this.vidElementRef}>
          {this.state.videos ? this.state.videos : null}
        </div>
      </Aux>
    );
  }
}

export default Videos;
