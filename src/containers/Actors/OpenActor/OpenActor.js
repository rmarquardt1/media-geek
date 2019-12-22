import React, { Component } from 'react';
import List from '../../List/List';
import { goToAnchor } from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './OpenActor.module.css';
import noImage from '../../../assets/images/no-image-person.png';

configureAnchors({ offset: -60, scrollDuration: 100 });

class OpenActor extends Component {
  state = {
    bioOpen: false,
    bioFull: this.props.actorBio.bio,
    bioSubString: this.props.actorBio.bio.substr(0, 630),
    bioLength: this.props.actorBio.bio.length,
    bioString: this.props.actorBio.bio,
    sliceStart: 0,
    sliceEnd: null,
    pageSize: null
  };

  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.bioLength > 630) {
      this.setState({ bioString: this.state.bioSubString + '...' });
    }
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    const windowW = window.innerWidth;
    if (this.elementRef.current) {
      const elWidth = this.elementRef.current.clientWidth;
      const thumbWidth = windowW < 769 ? 120 : windowW < 1367 ? 170 : 180;
      const elCount = Math.floor(elWidth / thumbWidth);
      if (windowW < 501) {
        this.setState({
          sliceEnd: (this.state.sliceStart + elCount) * 2,
          pageSize: elCount
        });
      } else {
        this.setState({
          sliceEnd: this.state.sliceStart + elCount,
          pageSize: elCount
        });
      }
    }
  };

  onClick = movie => {
    window.scrollTo(0, 0);
    this.props.openMovieClick(movie.id);
    this.props.close();
  };

  readMoreHandler = () => {
    if (!this.state.bioOpen) {
      this.setState({
        bioString: this.state.bioFull,
        bioOpen: !this.state.bioOpen
      });
    } else {
      this.setState({
        bioString: this.state.bioSubString + '...',
        bioOpen: !this.state.bioOpen
      });
      goToAnchor('castSection');
    }
  };

  render() {
    const actorPic = this.props.actorBio.pic
      ? this.props.actorInfo.profilePic
      : noImage;

    return (
      <div style={{ width: '100%' }}>
        <div className={classes.OpenActor}>
          <div
            className={uiClasses.Close}
            style={{ right: '10px', top: '7px' }}
            onClick={this.props.close}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={uiClasses.CloseIcon}
            />
          </div>
          <div className={classes.ProfilePic}>
            <img
              src={actorPic}
              className={uiClasses.BoxShadow}
              style={{ width: '100%', maxWidth: '240px' }}
              alt=""
            />
          </div>
          <div className={classes.ActorInfo}>
            <h2>{this.props.actorInfo.actorName}</h2>
            <div className={classes.CharacterName}>
              ({this.props.character})
            </div>
            <hr className={classes.Divider} />
            <div>
              <p className={classes.ActorBioOpen}>{this.state.bioString}</p>
              {this.state.bioLength > 630 && !this.state.bioOpen ? (
                <p className={classes.ShowHide} onClick={this.readMoreHandler}>
                  Read More...
                </p>
              ) : this.state.bioLength > 630 && this.state.bioOpen ? (
                <p className={classes.ShowHide} onClick={this.readMoreHandler}>
                  Read Less...
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <List
          listType="actorMovies"
          mediaType="movies"
          heading={'Other Movies with ' + this.props.actorInfo.actorName}
          actorId={this.props.actorInfo.actorId}
        />
      </div>
    );
  }
}

export default OpenActor;
