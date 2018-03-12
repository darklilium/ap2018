
import getTokenForDefaultUser from '../../services/login_service';
import {loginMuniOptions} from '../../services/login_service';
import {searchElement} from '../../services/busqueda_service';
import {getSelectedMeterLocation, getDataMedidores} from '../../services/medidores_service';
import {getLuminariasAsociadas, getLuminariaLocation, getFotografias, getDataLuminariasComuna} from '../../services/luminarias_service';
import {getTramosMedidor} from '../../services/tramos_service';
import {getPotenciaLuminaria, getTipoConexiones, getTipoLuminarias, getPropiedadesLuminarias} from '../../services/combo_service';
import {edit_query} from '../../services/edit_service';

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

export function highlightRow(index, type, idequipo, nromedidor){
  console.log(index,"highlight");
  switch (type) {
    case 'medidor':
      return {
        type: "SELECTED_MEDIDOR",
        index, idequipo, nromedidor
      }
    break;

    case 'luminariaAsoc':
      return {
        type: "SELECTED_LUMINARIA_ASOCIADA",
        index
      }
    break;

    case 'luminaria':
      return {
        type: "SELECTED_LUMINARIA",
        index
      }
    break;

  }
  return {

  }
}

export function highlightMedidor(index){

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

export function getLuminariaInfo2(luminaria){
  if(luminaria.length>0){
    return {
      type: 'LUMINARIA_ASOCIADA_INFO_FOUND',
      luminaria
    }
  }else{
    return {
      type: 'LUMINARIA_ASOCIADA_INFO_NOT_FOUND',
      luminaria
    }
  }
}
//EditWidget ACTIONS

//EditLuminaria:
export function getPotencias(token) {
  return dispatch =>{
    return getPotenciaLuminaria(token)
    .then(potencias=>{
      if (potencias.length>0) {
        dispatch({
          type: 'POTENCIAS_OBTAINED',
          potencias
        })
      }
    })
    .catch(error=>{
      dispatch({
        type: 'ERROR_GETTING_POTENCIAS',
        error
      })
    })
  }
}

export function getTipoConexion(token) {
  return dispatch =>{
    return getTipoConexiones(token)
    .then(tipoconexion=>{
      dispatch({
        type: 'TIPO_CONEXION_OBTAINED',
        tipoconexion
      })
    })
    .catch(error=>{
      dispatch({
        type: 'ERROR_GETTING_TIPO_CONEXION',
        error
      })
    })
  }
}


export function getTipoLuminaria(token) {
  return dispatch =>{
    return getTipoLuminarias(token)
    .then(tipoLuminaria=>{
      dispatch({
        type: 'TIPO_LUMINARIA_OBTAINED',
        tipoLuminaria
      })
    })
    .catch(error=>{
      dispatch({
        type: 'ERROR_GETTING_TIPO_LUMINARIA',
        error
      })
    })
  }
}
export function getPropiedades(token) {
  return dispatch => {
    return getPropiedadesLuminarias(token)
    .then(propiedades=>{
      dispatch({
        type: 'PROPIEDAD_OBTAINED',
        propiedades
      })
    })
    .catch(error=>{
      dispatch({
        type: 'ERROR_GETTING_PROPIEDADES',
        error
      })
    })
  }
}

export function onChangeEdition(name, value) {

  return {
    type: 'ONCHANGE_COMBO_EDITION',
    name,
    value
  }
}

export function onChangeEditionObject(attrName, value) {
  console.log(attrName, value);
  return {
    type: 'ONCHANGE_OBJECT_EDITION',
    attrName,
    value
  }
}

export function onClickEditWidget(name, values, geometry, token){
  return dispatch =>{
    switch (name) {
      case 'btnActualizar':
        return edit_query(values, geometry, token)
        .then(done=>{
          dispatch({
            type: 'DONE_UPDATE',
            done
          })
          return done;
        })
        .catch(error=>{
          dispatch({
            type: 'ERROR_UPDATE',
            done
          })
            return error;
        })

      break;

      case 'btnEliminar':
        return edit_query(values, geometry, token)
        .then(done=>{
          dispatch({
            type: 'ON_DELETE',
            done
          })
            return done;
        })
        .catch(error=>{
          dispatch({
            type: 'ERROR_DELETE',
            name,values
          })
            return error;
        })
      break;

      case 'btnNuevo':

        return edit_query(values, geometry, token)
        .then(done=>{
          dispatch({
            type: 'ON_CREATE',
            name,values
          })
        })
        .catch(error=>{
          dispatch({
            type: 'ERROR_CREATE',
            name,values
          })
        })
      break;

      default:
        dispatch({
          type: 'ON_ERROR',
          name,values
        })
      break;
    }
  }


}

export function findPictures(token, idnodo){
  return dispatch =>{
    return getFotografias(token,idnodo)
    .then(fotos=>{
      console.log(fotos,"fotos recibidas");
      dispatch({
        type: 'PICTURED_FOUND',
        fotos
      })

      return fotos;
    })
    .catch(error=>{
      console.log(error,"fotografias no recibidas");
      dispatch({
        type: 'PICTURED_NOT_FOUND',
        error
      })

      return error;
    })
  }
}

export function getDataLuminarias (token,comuna){
  return dispatch => {
    return getDataLuminariasComuna(token,comuna)
    .then(luminarias=>{
      dispatch({
        type: 'LUMINARIAS_FOUND',
        luminarias
      });

    })
    .catch(error=>{
      dispatch({
        type: 'LUMINARIAS_NOT_FOUND',
        error
      })
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
