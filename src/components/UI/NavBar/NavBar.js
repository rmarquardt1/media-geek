import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import NavSearch from '../../Search/NavSearch/NavSearch';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';

import classes from './NavBar.module.css';

class NavBar extends Component {
  state = {
    menuOpen: false
  }

  menuClickHandler = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  render() {
    return (
      <Aux>
      <div className={classes.NavBar}>
        <div className={classes.NavBarLeft}>
            <FontAwesomeIcon 
              className={this.props.itemOpen ? classes.BackIcon : classes.BackIconHide}
              // className={classes.BackIcon}
              icon={faArrowAltCircleLeft}  
              onClick={this.props.back}></FontAwesomeIcon>

              {this.props.location.pathname === '/Music' ? null
              : this.props.location.pathname === '/Movies' ? null
              : <NavSearch searchType={this.props.searchType} />
            }


              

        </div>
        <div className={classes.Logo}>
        <h2><span style={{fontWeight:'200'}}>media</span><span style={{fontWeight:'600'}}>Geek</span></h2>
        </div>
        {/* <div className={classes.Menu}>
        <FontAwesomeIcon 
          className={classes.MenuIcon}
          onClick={this.menuClickHandler}
          icon={faBars}  />
        </div> */}
      </div>

      {/* <div 
      className={this.state.menuOpen ? classes.MenuDropdown + ' ' + classes.MenuDropdownActive : classes.MenuDropdown}
      >

        <ul>
          <li><NavLink to="/" className={classes.NavItem}>Home</NavLink></li>
          <li><NavLink to="/Movies" className={classes.NavItem}>Movies</NavLink></li>
          <li><NavLink to="/Music" className={classes.NavItem}>Music</NavLink></li>
          <li><NavLink to="/Tv" className={classes.NavItem}>Television</NavLink></li>
        </ul> 
      </div> */}



    </Aux>


    );


  }

}

export default withRouter(NavBar);