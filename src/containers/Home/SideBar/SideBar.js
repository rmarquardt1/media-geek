import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Auth from '../../Auth/Auth';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUserCircle, faBars, faSearch, faFilm, faHeadphones, faTv, faHome  } from '@fortawesome/free-solid-svg-icons';
import uiClasses from '../../../components/UI/Layout/Layout.module.css';
import classes from './SideBar.module.css';


class SideBar extends Component {
  state = {
    showSignIn: false,
    slideOut: false
  }

  menuHandler = (event) => {
    if (event.target.id === 'signIn') {
      this.setState({showSignIn: !this.state.showSignIn});
    }
  }

  showMenuHandler = () => {
    this.setState({slideOut: !this.state.slideOut});
  }

  render() {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
    const displayName = userData ? JSON.parse(userData).displayName : null;

    const sideBarClass = this.state.slideOut ? classes.SideBar + ' ' + uiClasses.BoxShadow + ' ' + classes.SideBarSlideIn 
    : classes.SideBar + ' ' + uiClasses.BoxShadow;

    return (

      <Aux>
      <FontAwesomeIcon icon={faBars} className={classes.MenuIcon} onClick={this.showMenuHandler} />
      <div className={sideBarClass}>
        <ul>
        {/* {!this.props.isAuth ? 
        <Aux>
          <li onClick={this.menuHandler}>
            <div id="signIn" className={classes.ItemHeader} >
              <div>Sign In</div>
              <FontAwesomeIcon 
                  icon={faChevronDown}  
                  className={this.state.showSignIn ? classes.Arrow + ' ' + classes.ArrowDown : classes.Arrow}
                  />
            </div>
            {this.state.showSignIn ? <Auth /> : null}
          </li>
          <li className={classes.CreateAccount} onClick={this.props.clickCreate}>
            <div >
            Create Account
            </div>
          </li>
          </Aux>
          : 
          
          <li className={classes.Account}>
            <div className={classes.LogoutLink}>
            <NavLink to="/logout">logout</NavLink>
            </div>
            <div className={classes.FlexCenter}>
            <FontAwesomeIcon 
              icon={faUserCircle}  
              className={classes.UserIcon}
            />
            {displayName}
            </div>
          </li>
        } */}
        <NavLink to="/">
          <li className={classes.FlexCenter}>
            <div className={classes.ListIcon}>
            <FontAwesomeIcon icon={faHome} className={classes.NavIcon} />
            </div>
            Home
          </li>
        </NavLink>
        <NavLink to="/Movies">
          <li className={classes.FlexCenter}>
            <div className={classes.ListIcon}>
            <FontAwesomeIcon icon={faFilm} className={classes.NavIcon} />
            </div>
            Movies
          </li>
        </NavLink>
        <NavLink to="/Tv">
          <li className={classes.FlexCenter}>
          <div className={classes.ListIcon}>
          <FontAwesomeIcon icon={faTv} className={classes.NavIconTv} />
          </div>
          Television
          </li>
        </NavLink>
        {/* <NavLink to="/Music">
          <li className={classes.FlexCenter}>
          <div className={classes.ListIcon}>
          <FontAwesomeIcon icon={faHeadphones} className={classes.NavIcon} />
          </div>
            Music
          </li>
        </NavLink> */}



        </ul>
      </div>
      </Aux>

    );

  }

}

export default SideBar;