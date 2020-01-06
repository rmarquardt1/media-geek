import React from 'react';
import * as firebase from "firebase";

import classes from './Account.module.css';

const Account = props => {


  var firebaseConfig = {
    apiKey: "AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
    authDomain: "mediageek-650c6.firebaseapp.com",
    databaseURL: "https://mediageek-650c6.firebaseio.com",
    projectId: "mediageek-650c6",
    storageBucket: "mediageek-650c6.appspot.com",
    messagingSenderId: "548953081758",
    appId: "1:548953081758:web:8e26481dc1166c7347f88f",
    measurementId: "G-DKX199E2VN"
  };
  // firebase.initializeApp(firebaseConfig);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }




    return (

      <div className={classes.Account}>

        <div>hello</div>


      </div>

      




    );




}

export default Account;
