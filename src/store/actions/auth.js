import * as actionTypes from './actionTypes';
import axios from 'axios';
import ls from 'local-storage';

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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('userData');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const storeUserData = uid => {
  axios
    .get('https://mediageek-650c6.firebaseio.com/users/' + uid + '/.json')
    .then(response => {
      ls.set('userData', response.data);
      window.location.reload();
    })
    .catch(error => {
      console.log('error ' + error);
    });
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU',
        authData
      )
      .then(response => {
        dispatch(authSuccess());
        dispatch(checkAuthTimeout(response.data.expiresIn));
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(storeUserData(response.data.localId));
      })
      .catch(error => {
        console.log('error ' + error);
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrTy3utVnOygLS3WIu3YJnG6MjcJuaFOU',
        authData
      )
      .then(response => {
        dispatch(authSuccess());
        dispatch(checkAuthTimeout(response.data.expiresIn));
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        const uid = response.data.localId;
        const profile = {
          displayName: display,
          favTv: '',
          favMovies: '',
          favTvGenres: '',
          favMovieGenres: '',
          favNetworks: '',
          movieWatchlist: '',
          tvWatchlist: ''
        };
        axios
          .put(
            'https://mediageek-650c6.firebaseio.com/users/' + uid + '.json',
            profile
          )
          .then(response => {
            // console.log(response);
          })
          .catch(error => {
            console.log('error ' + error);
          });
      })
      .catch(error => {
        console.log('error ' + error);
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
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
