
import getTokenForDefaultUser from '../../services/login_service';
import {loginMuniOptions} from '../../services/login_service';
import {searchElement} from '../../services/busqueda_service';

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

export function getMuniOptions(user, token){
  return dispatch => {
    return loginMuniOptions(user, token)
      .then(options =>{
        dispatch({
          type: 'GET_OPTIONS_USER_MUNICIPAL',
          options
        });
        return options;
      })
      .catch(error => {
        dispatch({
            type: 'ERROR_USER_MUNICIPAL',
            error
        });
        return error;
      })
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

//------------------------------------------------------------------------------
//MUNICIPALIDAD ACTIONS

//Menu actions
export function selectedMenu(menu){
  return {
    type: 'SELECTED_MENU',
    menu
  }
}

export function toggleSegment(visible){
  if(visible){
    return {
      type: 'SHOW_SEGMENT',
      show
    }
  }else{
    return {
      type: 'HIDE_SEGMENT',
      show
    }
  }
}

export function toggleVisibility(visible){
  console.log("estoy en toggleVisibility", visible);
  if(visible){

    return {
      type: 'TOGGLE_VISIBILITY_SHOW',
      visible
    }
  }else{

    return {
      type: 'TOGGLE_VISIBILITY_HIDE',
      visible
    }
  }

}

export function toggleSidebarVisibility(visible){
  if (visible) {
    return {
      type: 'TOGGLE_SIDEBAR_VISIBILITY_SHOW',
      visible
    }
  }else{
    return {
      type: 'TOGGLE_SIDEBAR_VISIBILITY_HIDE',
      visible
    }
  }

}

export function toggleMenuVisibility(menu){
  return {
    type: 'TOGGLE_MENU_VISIBILITY',
    menu
  }
}

//SearchWidget actions
export function onChangeBusqueda(searchType){
  return {
    type: "CHANGE_BUSQUEDA_TYPE",
    searchType
  }

}

export function onClickBusquedaWidget(searchType, value, token, mapa, comuna){
  console.log(comuna);
  return dispatch =>{
      return searchElement(searchType, value, token, mapa, comuna)
      .then(found =>{
        console.log(found.length,"length");
        if(found.length){
          dispatch({
            type: "SEARCH_IS_DONE",
            found,
            value
          })

        }else{
          dispatch({
            type: "SEARCH_IS_ZERO",
            found,
            value
          })
        }
        return found;
      })
      .catch(error =>{
        dispatch({
          type: "SEARCH_WITH_ERRORS",
          error
        })
        return error;
      })
  }

}

//LayerMapWidget actions
export function map_selected(value){

  return {
    type: 'CHANGE_MAP',
    value
  }
}




//------------------------------------------------------------------------------
//OTHERS COMPONENTS actions

//BOTTOM MESSAGE:

export const showNotification = (visible) =>{

  return {
    type: "SHOW_NOTIFICATION",
    visible

  }
}

export const hideNotification = (visible) =>{

  return {
    type: "HIDE_NOTIFICATION",
    visible

  }
}

export const setMessage = (message) => {

  return {
    type: "SET_MESSAGE",
    message
  }
}

export const saveMap = (mapa) =>{

  return {
    type: "SAVE_MAP",
    mapa
  }
}
