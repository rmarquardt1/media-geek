import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Loader from '../../components/UI/Loader/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './FullSizeImage.module.css';

class FullSizeImage extends Component {
  state = {
    loading: true
  };

  imageOnLoadHandler = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <Aux>
        <div className={classes.ImageBarTop}>
          <div
            className={uiClasses.Close + ' ' + classes.ImageClose}
            onClick={this.props.closeClick}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              className={uiClasses.CloseIcon}
            />
          </div>
        </div>
        <div className={classes.ImageBarBottom} />

        <div className={classes.FullSizeImage}>
          <div className={classes.ImageBarLeft}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={classes.ImageNav}
              onClick={() => this.props.navClick('prev')}
            />
          </div>
          {this.state.loading ? (
            <div className={classes.Loading}>
              <Loader />
            </div>
          ) : null}

          {this.props.url ? (
            <img
              className={
                this.props.fadeOut
                  ? classes.FadeOut
                  : this.props.fadeIn
                  ? classes.FadeIn
                  : null
              }
              src={this.props.url}
              alt=""
              onLoad={this.imageOnLoadHandler}
            />
          ) : null}
          <div className={classes.ImageBarRight}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={classes.ImageNav}
              onClick={() => this.props.navClick('next')}
            />
          </div>
        </div>
      </Aux>
    );
  }
}

export default FullSizeImage;
