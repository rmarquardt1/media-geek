import React, { Component } from "react";
import { connect } from "react-redux";
import EditActions from "../../../components/Account/EditActions/EditActions";
// import * as firebase from "firebase";
// import axios from "axios";

import uiClasses from "../../../components/UI/Layout/Layout.module.css";
import classes from "./AccountInfo.module.css";

class AccountInfo extends Component {
  state = {
    showChangePw: false
  };

  changePasswordHandler = () => {
    this.setState({ showChangePw: !this.state.showChangePw });
  };

  render() {
    return (
      <React.Fragment>
        <div className={classes.AccountInfo}>
          <div className={classes.row}>
            <label>Display Name</label>
            <EditActions
              onInputChange={event => this.props.inputChange(event)}
              type="displayName"
              initialVal={this.props.displayName}
            />
          </div>

          <div className={classes.row}>
            <label>Email Address</label>
            <EditActions
              onInputChange={event => this.props.inputChange(event)}
              type="email"
              initialVal={this.props.email}
            />
          </div>

          <div className={classes.row}>
            <div
              className={classes.ChangePasswordButton}
              onClick={this.changePasswordHandler}
            >
              Change Password
            </div>
          </div>

          <div
            className={
              this.state.showChangePw
                ? classes.row +
                  " " +
                  classes.ChangePassword +
                  " " +
                  classes.ChangePasswordShow
                : classes.row + " " + classes.ChangePassword
            }
          >
            <label>New Password</label>
            <input
              type="password"
              id="newPw"
              className={classes.NewPassword + " " + uiClasses.Input}
              val=""
              onChange={event => this.props.inputChange(event)}
            />

            <label style={{ width: "100%" }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPw"
              className={uiClasses.Input}
              val=""
              // disabled={true}
              onChange={event => this.props.inputChange(event)}
            />

            <button onClick={this.props.changePassword}>Update Password</button>

            {/* <button className={uiClasses.ButtonBlue}>Change Password</button> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// export default AccountInfo;

const mapStateToProps = state => {
  return {
    displayName: state.displayName,
    email: state.email
  };
};

export default connect(mapStateToProps)(AccountInfo);
