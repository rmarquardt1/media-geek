import React, { Component } from 'react';

import uiClasses from '../../../../components/UI/Layout/Layout.module.css';
import classes from './Genre.module.css';

class Genre extends Component {
  state = {
    bgColor: 'rgba(0,0,0,0)'
  };

  clickHandler = () => {
    if (this.state.bgColor === 'rgba(0,0,0,0)') {
      this.setState({ bgColor: '#1a8cff' });
    }
    if (this.state.bgColor === '#1a8cff') {
      this.setState({ bgColor: 'rgba(0,0,0,0)' });
    }
  };

  render() {
    return (
      <div
        className={classes.Genre + ' ' + uiClasses.BoxShadow}
        style={{ backgroundColor: this.state.bgColor }}
        onClick={() => {
          this.clickHandler();
          this.props.click(this.props.id);
        }}
      >
        {this.props.name}
      </div>
    );
  }
}

export default Genre;
