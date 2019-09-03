import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 
// import axios from 'axios';
import * as actions from '../../store/actions/index';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    userEmail: null,
    userPassword: null,
    submitted: false
  }
  
  inputHandler = (event) => {
    if (event.target.id === 'UserName') {
      this.setState({userName: event.target.value});
    } 
    if (event.target.id === 'UserEmail') {
      this.setState({userEmail: event.target.value});
    }
    if (event.target.id === 'UserPassword') {
      this.setState({userPassword: event.target.value});
    }  
  }

  submitHandler = (event) => {
    console.log('triggered');
    event.preventDefault();

    this.props.onAuth(this.state.userEmail, this.state.userPassword);

    this.setState({submitted: true});

    // const authData = {
    //   email: this.state.userEmail,
    //   password: this.state.userPassword,
    //   returnSecureToken: true
    // }
    // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU', authData)
    // .then(response => {
    //   console.log(response);

    //     const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //     localStorage.setItem('token', response.data.idToken);
    //     localStorage.setItem('expirationDate', expirationDate)

    // }).catch(error => {
    //   console.log('error ' + error);
    // });

  }


  render() {


    console.log(this.props.tokenId);

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler} className={classes.SearchForm}>
          <input className={classes.Input} type="email" id="UserEmail" placeholder="Email" onChange={this.inputHandler} />
          <input className={classes.Input} type="password" id="UserPassword" placeholder="Password" onChange={this.inputHandler} />
          <button className={classes.ButtonBlue}>
            SIGN IN</button>
        </form>
      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    token: state.tokenId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);