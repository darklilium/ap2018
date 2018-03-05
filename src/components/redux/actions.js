
import getTokenForDefaultUser from '../../services/login_service';
import {loginMuniOptions} from '../../services/login_service';
import {searchElement} from '../../services/busqueda_service';
import {getSelectedMeterLocation, getDataMedidores} from '../../services/medidores_service';
import {getLuminariasAsociadas, getLuminariaLocation} from '../../services/luminarias_service';
import {getTramosMedidor} from '../../services/tramos_service';
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

  return dispatch =>{
      return searchElement(searchType, value, token, mapa, comuna)
      .then(found =>{

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

export function layer_selected(layer){

  return {
    type: 'LAYER_VISIBILITY_CHANGED',
    layer
  }
}

//MetersWidget actions

export function getMetersData(token,comuna){
  return dispatch =>{
    return getDataMedidores(token,comuna)
    .then(data=>{
      dispatch({
        type: 'GOT_METERS_DATA',
        data
      })

      return data;
    })
    .catch(error=>{
      dispatch({
        type: 'ERROR_GETTING_METERS_DATA',
        error
      })


      return error;
    })

  }
}

export function getMeterLocation(token,idequipo){
  return dispatch =>{
    return getSelectedMeterLocation(token,idequipo)
    .then(location=>{
      dispatch({
        type: 'MEDIDOR_LOCATION_FOUND',
        location
      })
      return location;
    }).catch(error=>{
      dispatch({
        type: 'MEDIDOR_LOCATION_NOT_FOUND',
        error
      })
      return error;
    })
  }

}

export function getDataLuminariasAsociadas(token,comuna,idequipo){
  return dispatch =>{
    return getLuminariasAsociadas(token,comuna,idequipo)
    .then(luminarias=>{

      if(luminarias.length>0){

        dispatch({
          type: 'LUMINARIAS_ASOCIADAS_FOUND',
          luminarias
        })

      }else{
        dispatch({
          type: 'LUMINARIAS_ASOCIADAS_NOT_FOUND',
          luminarias
        })
      }

      return luminarias;
    })
    .catch(error=>{
      dispatch({
        type: 'LUMINARIAS_ASOCIADAS_ERROR',
        error
      })
      return error;
    })
  }
}

export function getDataTramosAsociados(token,comuna,idequipo){
  return dispatch => {
    return getTramosMedidor(token,comuna,idequipo)
    .then(tramos=>{
      if(tramos.length>0){
        dispatch({
          type: "TRAMOS_ASOCIADOS_FOUND",
          tramos
        })
        return tramos;
      }else{
        dispatch({
          type: "TRAMOS_ASOCIADOS_NOT_FOUND",
          tramos
        })
        return tramos;
      }
    })
    .catch(error=>{
        dispatch({
          type: 'TRAMOS_ASOCIADOS_ERROR',
          error
        })
        return error;
    })
  }
}

export function getLuminariaInfo(token,idluminaria){
  return dispatch => {
    return getLuminariaLocation(token,idluminaria)
    .then(luminaria =>{
      console.log(luminaria.length,"ola", token);
      if(luminaria.length>0){
        dispatch({
          type: 'LUMINARIA_ASOCIADA_INFO_FOUND',
          luminaria
        })
        return luminaria;
      }else{
        dispatch({
          type: 'LUMINARIA_ASOCIADA_INFO_NOT_FOUND',
          luminaria
        })
        return luminaria;
      }
    })
    .catch(error=>{
        dispatch({
          type: 'LUMINARIA_ASOCIADA_INFO_ERROR',
          error
        })
        return error;
    })
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
