import React, { Component } from 'react';
import BgImages from './BgImages/BgImages';
import PosterImages from './PosterImages/PosterImages';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import uiClasses from '../../components/UI/Layout/Layout.module.css';
import classes from './Images.module.css';

class Images extends Component {
  state = {
    fullSizeUrl: null
  };

  imageClickHandler = url => {
    this.setState({ fullSizeUrl: url });
  };

  render() {
    return (
      <Aux>
        <div className={uiClasses.SectionHeader}>
          <h2>Wallpapers</h2>
        </div>
        <div className={classes.Images}>
          <BgImages
            imdbId={this.props.imdbId}
            tvdbId={this.props.tvdbId}
            imgClick={this.props.imgClick}
            heading="Desktop"
          />
          <PosterImages
            imdbId={this.props.imdbId}
            tvdbId={this.props.tvdbId}
            imgClick={this.props.imgClick}
            heading="Phone / Tablet"
          />
        </div>
      </Aux>
    );
  }
}

export default Images;
