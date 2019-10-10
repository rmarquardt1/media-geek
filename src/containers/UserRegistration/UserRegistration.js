import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SideBar from '../UI/SideBar/SideBar';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ChooseNetworks from './ChooseNetworks/ChooseNetworks';
import ChooseMovieGenres from './ChooseGenres/ChooseMovieGenres/ChooseMovieGenres';
import ChooseTvGenres from './ChooseGenres/ChooseTvGenres/ChooseTvGenres';
import * as actions from '../../store/actions/auth';
import * as actionTypes from '../../store/actions/actionTypes';

import classes from './UserRegistration.module.css';

class UserRegistration extends Component {
  state = {
    userEmail: null,
    userPassword: null,
    userDisplayName: null,
    registered: false,
    showRegistration: true,
    showNetworks: false,
    showMovieGenres: false,
    showTvGenres: false
  };

  componentDidMount() {
    const uid = 'w1GhXH2ZvFgZcXovI3pj5hwxDBN2';
    axios
      .get(
        'https://mediageek-650c6.firebaseio.com/users.json?orderBy="$key"&equalTo="' +
          uid +
          '"'
      )
      .then(response => {
        const objKey = Object.keys(response.data[uid])[0];
      })
      .catch(error => {
        console.log('error ' + error);
      });
  }

  onChangeHandler = event => {
    if (event.target.id === 'UserEmail') {
      this.setState({ userEmail: event.target.value });
    }
    if (event.target.id === 'UserPassword') {
      this.setState({ userPassword: event.target.value });
    }
    if (event.target.id === 'UserDisplayName') {
      this.setState({ userDisplayName: event.target.value });
    }
  };

  registrationOnSubmitHandler = event => {
    event.preventDefault();
    this.props.onRegister(
      this.state.userEmail,
      this.state.userPassword,
      this.state.userDisplayName
    );
    this.setState({ showRegistration: false, showNetworks: true });
  };

  chooseNetworkHandler = networks => {
    const uid = localStorage.userId;
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/favNetworks.json',
        networks
      )
      .then(response => {
        console.log(response);
        this.setState({ showNetworks: false, showMovieGenres: true });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  chooseMovieGenresHandler = genres => {
    const uid = localStorage.userId;
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/favMovieGenres.json',
        genres
      )
      .then(response => {
        console.log(response);
        this.setState({ showTvGenres: true, showMovieGenres: false });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  chooseTvGenresHandler = genres => {
    const uid = localStorage.userId;
    axios
      .put(
        'https://mediageek-650c6.firebaseio.com/users/' +
          uid +
          '/favTvGenres.json',
        genres
      )
      .then(response => {
        axios
          .get(
            'https://mediageek-650c6.firebaseio.com/users.json?orderBy="$key"&equalTo="' +
              uid +
              '"'
          )
          .then(response => {
            localStorage.setItem(
              'userData',
              JSON.stringify(response.data[uid])
            );
            window.location.href = '/';
          })
          .catch(error => {
            console.log('error ' + error);
          });
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  render() {
    return (
      <Aux>
        <SideBar isAuth={this.props.isAuth} />
        {this.state.showRegistration ? (
          <div className={classes.UserRegistration}>
            <form
              className={classes.RegisterForm}
              onSubmit={this.registrationOnSubmitHandler}
            >
              <input
                className={classes.Input}
                type="email"
                id="UserEmail"
                placeholder="Email Address"
                onChange={this.onChangeHandler}
              />
              <input
                className={classes.Input}
                type="password"
                id="UserPassword"
                placeholder="Password"
                onChange={this.onChangeHandler}
              />
              <input
                className={classes.Input}
                type="text"
                id="UserDisplayName"
                placeholder="Display Name"
                onChange={this.onChangeHandler}
              />

              <input className={classes.ButtonRed} type="submit" value="Next" />
            </form>
          </div>
        ) : this.state.showNetworks ? (
          <ChooseNetworks clickNext={this.chooseNetworkHandler} />
        ) : this.state.showMovieGenres ? (
          <ChooseMovieGenres clickNext={this.chooseMovieGenresHandler} />
        ) : this.state.showTvGenres ? (
          <ChooseTvGenres clickNext={this.chooseTvGenresHandler} />
        ) : null}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayName: state.displayName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeDisplayName: displayName =>
      dispatch({ type: actionTypes.STORE_DISPLAYNAME, display: displayName }),
    onRegister: (email, password, display) =>
      dispatch(actions.registerUser(email, password, display)),
    onSuccess: uid => dispatch(actions.storeUserData(uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRegistration);
