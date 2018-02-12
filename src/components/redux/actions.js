
import getTokenForDefaultUser from '../../services/login_service';

//LOGIN ACTIONS-----------------------------------------------------------------

export function changeWidth(width){
  return{
    type: 'CHANGE_WIDTH',
    width
  }
}

export function getCredentials(credentials) {
  return dispatch => {
    return getTokenForDefaultUser(credentials)
      .then(token => {

        dispatch({
          type: "GOT_TOKEN",
          credentials: { user: credentials, token }
        });

        return token;
      })
      .catch(error => {

        dispatch({
          type: "ERROR_TOKEN",
          credentials: { user: credentials, error }
        });

        return error;
      });
  };
}

//------------------------------------------------------------------------------
//DASHBOARD ACTIONS
export function getAllComunas(comunas){
  return {
    type: 'GET_ALL_COMUNAS',
    comunas
  }
}

export function selectedComuna(comuna){
  return {
    type: 'SELECTED_COMUNA',
    comuna
  }
}
