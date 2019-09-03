import * as actionTypes from '../store/actions/actionTypes';
import { updateObject } from '../store/utility';

const initialState = {
  token: null,
  userId: null,
  displayName: null,
  error: null,
  loading: false,
  createAccount: false,
  userData: false
};

const authStart = ( state, action ) => {
  return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
  return updateObject( state, { 
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false
   } );
};

const authFail = (state, action) => {
  return updateObject( state, {
      error: action.error,
      loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.AUTH_START: return authStart(state, action);
      case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
      case actionTypes.AUTH_FAIL: return authFail(state, action);
      case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
      case actionTypes.STORE_DISPLAYNAME: 
      return {
          ...state,
          displayName: action.display
        };


      case actionTypes.STORE_TOKEN:
        return {
          ...state,
          token: action.tokenId
        };
      case actionTypes.STORE_USERID:
        return {
          ...state,
          userId: action.userId
      };


      case actionTypes.STORE_USERDATA:
        console.log('triggered');

        return updateObject( state, {
            userData: action.loaded
        });

        return {
          ...state,
          userData: action.loaded

        }






      default:
          return state;
  }
};

// const reducer = (state = initialState, action) => {
//   switch(action.type) {
    
//     default:
//       return state;
//   }
// };




export default reducer;