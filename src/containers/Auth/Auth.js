import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    userEmail: null,
    userPassword: null,
    submitted: false
  };

  inputHandler = event => {
    if (event.target.id === 'UserName') {
      this.setState({ userName: event.target.value });
    }
    if (event.target.id === 'UserEmail') {
      this.setState({ userEmail: event.target.value });
    }
    if (event.target.id === 'UserPassword') {
      this.setState({ userPassword: event.target.value });
    }
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.userEmail, this.state.userPassword);
    this.setState({ submitted: true });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler} className={classes.SearchForm}>
          <input
            className={classes.Input}
            type="email"
            id="UserEmail"
            placeholder="Email"
            onChange={this.inputHandler}
          />
          <input
            className={classes.Input}
            type="password"
            id="UserPassword"
            placeholder="Password"
            onChange={this.inputHandler}
          />
          {this.props.authError
          ? <div className={classes.AuthError}>Invalid Credentials</div>
          : null}
          
          <button className={classes.ButtonBlue}>SIGN IN</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.tokenId,
    authError: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    clearAuthError: () => dispatch(actions.clearAuthFail())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
