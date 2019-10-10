import React, { Component } from 'react';

import uiClasses from '../../../../components/UI/Layout/Layout.module.css';
import classes from './Network.module.css';

class Network extends Component {
  state = {
    bgColor: '#dfe5ec'
  };

  clickHandler = () => {
    if (this.state.bgColor === '#dfe5ec') {
      this.setState({ bgColor: '#ffccdd' });
    }
    if (this.state.bgColor === '#ffccdd') {
      this.setState({ bgColor: '#dfe5ec' });
    }
  };

  otherClickHandler = () => {
    alert('clicked');
  };

  render() {
    return (
      <div
        className={classes.Network + ' ' + uiClasses.BoxShadow}
        style={{
          backgroundImage: 'url(' + this.props.image + ')',
          backgroundColor: this.state.bgColor
        }}
        onClick={() => {
          this.clickHandler();
          this.props.click(this.props.id);
        }}
      ></div>
    );
  }
}

export default Network;
