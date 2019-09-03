import React, {Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/auth';
import * as actionTypes from '../../store/actions/actionTypes';

import classes from './UserRegistration.module.css';



class UserRegistration extends Component {
  state= {
    userEmail: null,
    userPassword: null,
    userDisplayName: null,
    registered: false
  }

  componentDidUpdate() {
    console.log(this.props.displayName);
  }

  componentDidMount() {

    

    const uid = 'qweHXrCOATMM9T04ua0WXtjRwZ12';

    axios.get('https://mediageek-650c6.firebaseio.com/users.json?orderBy="$key"&equalTo="' + uid + '"')
    .then(response => {

        const objKey = Object.keys(response.data[uid])[0];

        console.log(response.data[uid][objKey])


      }).catch(error => {
        console.log('error ' + error);
      });
  }


onChangeHandler = (event) => {
  if (event.target.id === 'UserEmail') {
    this.setState({userEmail: event.target.value});
  }
  if (event.target.id === 'UserPassword') {
    this.setState({userPassword: event.target.value});
  }  
  if (event.target.id === 'UserDisplayName') {
    this.setState({userDisplayName: event.target.value});
  }  
}

onSubmitHandler = (event) => {
  event.preventDefault();



  this.props.onRegister(this.state.userEmail, this.state.userPassword, this.state.userDisplayName);
  // this.props.storeDisplayName(this.state.userDisplayName);

  this.props.next();











  // this.props.storeUid()
  // this.setState({registered: true})

  // axios.get('https://mediageek-650c6.firebaseio.com/users.json?orderBy="$key"&equalTo="qWtywfgCCifBceyaLWFx9f2AIjm1"')
  // .then(response => {
  //       console.log(response.data);
  //     }).catch(error => {
  //       console.log('error ' + error);
  //     });
}

render() {


  return (
    <div className={classes.UserRegistration}>

    <form className={classes.RegisterForm} onSubmit={this.onSubmitHandler}>
    {/* <form className={classes.RegisterForm} 
      // onSubmit={this.props.next}
      onSubmit={() => {this.onSubmitHandler(); this.props.next()}}
    > */}
      <input className={classes.Input} type="email" id="UserEmail" placeholder="Email Address" onChange={this.onChangeHandler} />
      <input className={classes.Input} type="password" id="UserPassword" placeholder="Password" onChange={this.onChangeHandler} />
      <input className={classes.Input} type="text" id="UserDisplayName" placeholder="Display Name" onChange={this.onChangeHandler} />

      



      <input className={classes.ButtonBlue} type="submit" value="Submit" />





    </form>

    </div>



  );




}

}


const mapStateToProps = state => {
  return {
    displayName: state.displayName
  };
}



const mapDispatchToProps = dispatch => {
  return {
    storeDisplayName: (displayName) => dispatch({type: actionTypes.STORE_DISPLAYNAME, display: displayName}),
    onRegister: (email, password, display) => dispatch(actions.registerUser(email, password, display))
  }
}



// const mapDispatchToProps = dispatch => {
//   return {
//     createAccount: (user) => dispatch({type: actionTypes.STORE_USERID, userId: user})
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);

// export default UserRegistration;