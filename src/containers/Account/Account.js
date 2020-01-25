import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import * as firebase from "firebase";
import axios from "axios";
import ProfileImage from "./ProfileImage/ProfileImage";
import AccountInfo from "./AccountInfo/AccountInfo";
import AccountFavList from "./AccountFavList/AccountFavList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import uiClasses from "../../components/UI/Layout/Layout.module.css";
import classes from "./Account.module.css";

// axios
//   .post(
//     "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU&idToken=" +
//       localStorage.getItem("token")
//   )
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log("error " + error);
//   });

// const userData = JSON.parse(localStorage.getItem("userData"));
const userData = JSON.parse(localStorage.getItem("userData"));
const emailId = localStorage.getItem("emailId");

const firebaseConfig = {
  apiKey: "AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
  authDomain: "mediageek-650c6.firebaseapp.com",
  databaseURL: "https://mediageek-650c6.firebaseio.com",
  projectId: "mediageek-650c6",
  storageBucket: "mediageek-650c6.appspot.com",
  messagingSenderId: "548953081758",
  appId: "1:548953081758:web:8e26481dc1166c7347f88f",
  measurementId: "G-DKX199E2VN"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Account extends Component {
  state = {
    profileImg: null,
    newProfileImg: false,
    imageFileName: null,
    newPassword: null,
    confirmPassword: null,
    displayName: null,
    newEmail: false,
    newDisplayName: false,
    // reloadPage: false,
    imageUploaded: false
  };

  componentDidUpdate() {
    // console.log(
    //   "newPassword: " +
    //     this.state.newPassword +
    //     " confirmPassword: " +
    //     this.state.confirmPassword
    // );
    // if (this.state.reloadPage && this.state.imageUploaded) {
    //   window.location.reload();
    // }
  }

  // componentDidMount() {
  //   console.log("email: " + this.props.email);
  // }

  changePasswordHandler = () => {
    if (
      this.state.newPassword &&
      this.state.newPassword === this.state.confirmPassword
    ) {
      if (this.state.newPassword.length > 5) {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
            {
              idToken: localStorage.getItem("token"),
              password: this.state.newPassword,
              returnSecureToken: true
            }
          )
          .then(response => {
            localStorage.setItem("token", response.data.idToken);
            alert("Your password has been updated");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Password must be at least 6 characters long");
      }
    } else {
      alert("Passwords do not match");
    }

    // const authData = {
    //   email: "rmarquardt.1@gmail.com",
    //   password: "Snowdog@3239",
    //   returnSecureToken: true
    // };
    // axios
    //   .post(
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
    //     authData
    //   )
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log("error " + error);
    //   });
  };

  imageFileHandler = event => {
    this.setState({ newProfileImg: true });
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        document
          .getElementById("imagePreview")
          .setAttribute("style", "background-image:url(" + reader.result + ")");

        document.getElementById("profileIcon").style.display = "none";
      },
      false
    );

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        profileImg: event.target.files[0],
        imageFileName: event.target.files[0].name
      });
    }
  };

  // inputHandler = event => {
  //   switch (event.target.id) {
  //     case "newPw":
  //       this.setState({ newPassword: event.target.value });
  //       break;
  //     case "confirmPw":
  //       this.setState({ confirmPassword: event.target.value });
  //       break;
  //     default:
  //       return null;
  //   }
  // };

  inputChangeHandler = event => {
    switch (event.target.id) {
      case "displayName":
        this.setState({
          displayName: event.target.value,
          newDisplayName: true
        });
        event.target.style.width =
          (event.target.value.length + 1) * 12.5 + "px";
        break;
      case "email":
        this.setState({ email: event.target.value, newEmail: true });
        event.target.style.width =
          (event.target.value.length + 1) * 12.5 + "px";
        break;
      case "newPw":
        this.setState({ newPassword: event.target.value });
        break;
      case "confirmPw":
        this.setState({ confirmPassword: event.target.value });
        break;
      default:
        return null;
    }
  };

  cancelChangeHandler = event => {
    switch (event.target.id) {
      case "displayName":
        this.setState({
          displayName: this.props.displayName,
          newDisplayName: false
        });
        event.target.style.width =
          (event.target.value.length + 1) * 12.5 + "px";
        break;
      case "email":
        this.setState({ email: this.props.email, newEmail: false });
        break;
      case "newPw":
        this.setState({ newPassword: event.target.value });
        break;
      case "confirmPw":
        this.setState({ confirmPassword: event.target.value });
        break;
      default:
        return null;
    }
  };

  saveChangesHandler = () => {
    if (this.state.newProfileImg) {
      this.uploadImageHandler();
    }
    if (this.state.newEmail) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU&idToken=" +
            localStorage.getItem("token") +
            "&email=" +
            this.state.email
          // this.props.email
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    if (this.state.newDisplayName) {
      axios
        .put(
          "https://mediageek-650c6.firebaseio.com/users/" +
            localStorage.getItem("userId") +
            "/displayName.json",
          {
            displayName: this.state.displayName
          }
        )
        .then(response => {
          // this.setState({ favorite: !this.state.favorite });
          // this.props.updateStorage(uid);
        })
        .catch(error => {
          console.log("error " + error);
        });
    }

    // this.setState({ reloadPage: true });
  };

  uploadImageHandler = async () => {
    const firebaseConfig = {
      apiKey: "AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
      authDomain: "mediageek-650c6.firebaseapp.com",
      databaseURL: "https://mediageek-650c6.firebaseio.com",
      projectId: "mediageek-650c6",
      storageBucket: "mediageek-650c6.appspot.com",
      messagingSenderId: "548953081758",
      appId: "1:548953081758:web:8e26481dc1166c7347f88f",
      measurementId: "G-DKX199E2VN"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const storage = firebase.storage();
    const storageRef = storage.ref();

    const uid = localStorage.getItem("userId");
    const imageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/svg+xml"
    ];
    let fileExt = null;
    for (let i = 0; i < imageTypes.length; i++) {
      fileExt =
        this.state.profileImg.type === "image/gif"
          ? "gif"
          : this.state.profileImg.type === "image/jpeg"
          ? "jpg"
          : this.state.profileImg.type === "image/png"
          ? "png"
          : this.state.profileImg.type === "image/svg+xml"
          ? "svg"
          : "";
    }
    const imgUrl =
      "images/" + uid + "/profile_pic_" + Date.now() + "." + fileExt;
    const imageRef = storageRef.child(imgUrl);

    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU&idToken=" +
          localStorage.getItem("token") +
          "&photoUrl=" +
          imgUrl
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("error " + error);
      });

    imageRef.put(this.state.profileImg).then(snapshot => {
      this.props.updateProfileImage(imgUrl);
      this.setState({ imageUploaded: true });
    });
  };

  render() {
    // const userData = JSON.parse(localStorage.getItem("userData"));
    // const userData = this.props.userData;

    return (
      <div className={classes.Account}>
        {/* {this.props.isAuth && userData ? ( */}
        {this.props.isAuth ? (
          <React.Fragment>
            <div
              className={uiClasses.SectionHeader + " " + uiClasses.PageHeader}
            >
              <div className={uiClasses.PageTitle}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={classes.AccountIcon}
                />

                <h2 style={{ left: "46px" }}>My Account</h2>
              </div>
            </div>
            <div className={classes.Title}>
              <h1>{this.props.displayName}</h1>
              <button
                onClick={this.saveChangesHandler}
                className={uiClasses.ButtonBlue}
              >
                Save Changes
              </button>
            </div>

            <hr />

            <div className={classes.AccountContainer}>
              <ProfileImage
                selectImage={this.imageFileHandler}
                profileImg={this.state.profileImg}
              />
              <div className={uiClasses.Spacer} />
              <AccountInfo
                inputChange={this.inputChangeHandler}
                changePassword={this.changePasswordHandler}
                // email={this.props.email}
                // displayName={userData.displayName}
              />
              <AccountFavList />
            </div>
          </React.Fragment>
        ) : (
          <p>Please Login</p>
        )}
      </div>
    );
  }
}

// export default Account;

const mapStateToProps = state => {
  return {
    displayName: state.displayName,
    email: state.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfileImage: url => dispatch(actions.getProfileImage(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
