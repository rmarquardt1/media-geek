import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './NavBar.module.css';

class NavBar extends Component {
  state = {
    menuOpen: false
  };

  menuClickHandler = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    return (
      <Aux>
        <div className={classes.NavBar}>
          <div className={classes.NavBarLeft}>
            <FontAwesomeIcon
              className={
                this.props.itemOpen ? classes.BackIcon : classes.BackIconHide
              }
              icon={faArrowAltCircleLeft}
              onClick={this.props.back}
            />
          </div>
          <div className={classes.Logo}>
            <h2>
              <span style={{ fontWeight: '200' }}>media</span>
              <span style={{ fontWeight: '600' }}>Geek</span>
            </h2>
          </div>
        </div>
      </Aux>
    );
  }
}

export default withRouter(NavBar);
