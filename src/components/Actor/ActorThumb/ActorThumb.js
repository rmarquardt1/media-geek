import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import noActorPic from '../../../assets/images/no-image-person.png';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './ActorThumb.module.css';

class Movie extends Component {
  state = {
    posterHeight: null,
    rating: null
  };

  constructor(props) {
    super(props);
    this.posterRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('orientationchange', this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
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
          className={classes.ActorThumb}
          onClick={this.props.openActor}
          style={{
            width: this.props.dimensions ? this.props.dimensions.width : '',
            height: this.props.dimensions
              ? this.props.dimensions.movieHeight
              : '',
            marginLeft: this.props.marg,
            marginRight: this.props.marg,
            marginBottom: this.props.margB ? this.props.margB : null
          }}
        >
          <div
            className={classes.Poster + ' ' + uiClasses.BoxShadow}
            ref={this.posterRef}
            style={{
              minHeight: this.props.dimensions
                ? this.props.dimensions.posterHeight
                  ? this.props.dimensions.posterHeight
                  : null
                : '',
              width: this.props.dimensions ? this.props.dimensions.width : '',
              height: this.props.dimensions ? this.props.dimensions.height : ''
            }}
          >
            {this.props.profilePath ? (
              <img
                src={this.props.profilePath ? this.props.poster : noActorPic}
                style={!this.props.profilePath ? { height: '100%' } : null}
                alt=""
              />
            ) : (
              <div
                style={{
                  backgroundImage: 'url("' + noActorPic + '")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
                  width: '100%'
                }}
              />
            )}
          </div>
          <div className={classes.NameChar}>
            <span className={classes.ActorName}>{this.props.name}</span>
            <span className={classes.CharName}>{this.props.character}</span>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default Movie;
