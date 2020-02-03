import * as actionTypes from "./actionTypes";
import * as firebase from "firebase";
import axios from "axios";
import ls from "local-storage";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const clearAuthFail = () => {
  return {
    type: actionTypes.CLEAR_AUTH_FAIL
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userData");
  localStorage.removeItem("profilePic");
  localStorage.removeItem("emailId");
  localStorage.removeItem("displayName");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const storeUserData = uid => {
  return dispatch => {
    axios
      .get("https://mediageek-650c6.firebaseio.com/users/" + uid + "/.json")
      .then(response => {
        ls.set("userData", response.data);
        localStorage.setItem("displayName", response.data.displayName);
        dispatch(setDisplayName(response.data.displayName));
        dispatch(setUserData(response.data));
      })
      .catch(error => {
        console.log("error " + error);
      });
  };
};

export const getProfileImage = profileImgUrl => {
  return dispatch => {
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

    storageRef
      .child(profileImgUrl)
      .getDownloadURL()
      .then(function(url) {
        localStorage.setItem("profilePic", url);
        dispatch(setProfilePic(url));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const setDisplayName = displayName => {
  return {
    type: actionTypes.STORE_DISPLAYNAME,
    displayName: displayName
  };
};

export const setEmailAddress = email => {
  localStorage.setItem('emailId', email);
  return {
    type: actionTypes.STORE_EMAIL,
    email: email
  };
};

export const setProfilePic = profilePicUrl => {
  return {
    type: actionTypes.STORE_PROFILEPIC,
    profilePicUrl: profilePicUrl
  };
};

export const setUserData = userData => {
  return {
    type: actionTypes.STORE_USERDATA,
    userData: userData
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
        authData
      )
      .then(response => {
        dispatch(authSuccess());
        dispatch(checkAuthTimeout(response.data.expiresIn));
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("emailId", response.data.email);
        dispatch(storeUserData(response.data.localId));
        dispatch(setEmailAddress(response.data.email));
        dispatch(getProfileImage(response.data.profilePicture));
      })
      .catch(error => {
        console.log("error " + error);
        dispatch(authFail(error));
      });
  };
};

export const registerUser = (email, password, display) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU",
        authData
      )
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess());
        dispatch(checkAuthTimeout(response.data.expiresIn));
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        dispatch(storeUserData(response.data.localId));
        dispatch(setEmailAddress(response.data.email));
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("emailId", response.data.email);
        const uid = response.data.localId;
        const profile = {
          displayName: display,
          favTv: "",
          favMovies: "",
          favTvGenres: "",
          favMovieGenres: "",
          favNetworks: "",
          movieWatchlist: "",
          tvWatchlist: ""
        };
        axios
          .put(
            "https://mediageek-650c6.firebaseio.com/users/" + uid + ".json",
            profile
          )
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log("error " + error);
          });
      })
      .catch(error => {
        console.log("error " + error);
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );

        dispatch(storeUserData(localStorage.getItem("userId")));
        dispatch(setProfilePic(localStorage.getItem("profilePic")));
        dispatch(setEmailAddress(localStorage.getItem("emailId")));
        // dispatch(setDisplayName(localStorage.getItem("displayName")));
        dispatch(setUserData(localStorage.getItem("userData")));
      }
    }
  };
};

export const showSearchSidebar = show => {
  return {
    type: actionTypes.SHOW_SEARCH_SIDEBAR,
    show: show
  };
};

export const showSidebarHandler = show => {
  return {
    type: actionTypes.SHOW_SIDEBAR,
    show: show
  };
};

export const showExtendedMenu = show => {
  return {
    type: actionTypes.SHOW_EXTENDEDMENU,
    show: show
  };
};
