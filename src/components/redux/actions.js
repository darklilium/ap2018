
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

// (O) Permite manejar la barra de menus que se seleccionan (edicion, luminarias, medidores, busqueda, etc)
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

//Permite cambiar la visibilidad de los menu al seleccionarlos.
export function toggleMenuVisibility(menu){
  return {
    type: 'TOGGLE_MENU_VISIBILITY',
    menu
  }
}

//SearchWidget actions ------------------------------------------------------------------------
//Permite cambiar el parámetro de tipo de búsqueda
export function onChangeBusqueda(searchType){
  return {
    type: "CHANGE_BUSQUEDA_TYPE",
    searchType
  }

}
//Permite buscar de acuerdo al elemento (rotulo, id nodo, nromedidor, etc)
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

//LayerMapWidget actions --------------------------------------------------------------------
//Permite seleccionar el mapa deseado
export function map_selected(value){

  return {
    type: 'CHANGE_MAP',
    value
  }
}
//Permite cambiar la visibilidad del layer deseado
export function layer_selected(layer){

  return {
    type: 'LAYER_VISIBILITY_CHANGED',
    layer
  }
}

//MetersWidget actions ----------------------------------------------------------------------------------
//obtiene todos los medidores de acuerdo a la comuna
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

export function medidor_is_zero(idequipoap){
  return {
    type: "MEDIDOR_IS_ZERO",
    idequipoap
  }
}

//(O) Busca la localización de un medidor en el mapa y la dibuja.
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
// (O) busca las luminarias asociadas a un id equipo.
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
//(O) hace highlight a las filas de las grid de medidores, luminarias y luminarias asociadas.
export function highlightRow(index, type, idequipo, nromedidor){
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
// (O) busca los tramos asociados a un id equipo que forman parte de un circuito
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
// (O) Busca luminarias asociadas de acuerdo a un idluminaria seleccionado en la grid de luminarias asociadas.
export function getLuminariaInfo(token,idluminaria, comuna, type){
  return dispatch =>{
    return getLuminariaLocation(token,idluminaria, comuna)
    .then(luminaria =>{

      if(type=="meters"){
        if(luminaria.length>0){
          dispatch({
            type: 'LUMINARIA_LOCATION',
            luminaria
          })
        }else{
          dispatch({
            type: 'LUMINARIA_LOCATION_NOT_FOUND',
            luminaria: []
          })
        }
      }

      if(type=="lights"){
        if(luminaria.length>0){
          dispatch({
            type: 'LUMINARIA_LOCATION_L',
            luminaria
          })
        }else{
          dispatch({
            type: 'LUMINARIA_LOCATION_NOT_FOUND_L',
            luminaria: []
          })
        }
      }

      return luminaria;
    })
    .catch(error=>{

      if(type=="meters"){
        dispatch({
          type: 'LUMINARIA_LOCATION_NOT_FOUND',
          luminaria: []
        })
      }

      if(type=="lights"){
        dispatch({
          type: 'LUMINARIA_LOCATION_NOT_FOUND_L',
          luminaria: []
        })
      }
      return error;
    })
  }
}



export function getLuminariasInfo(token, id_nodo, comuna){
  return dispatch =>{
    return getLuminariasInThisPoint(token, id_nodo, comuna)
    .then(luminarias =>{
      if(luminarias.length>0){
        dispatch({
          type: "LUMINARIA_ASOCIADA_INFO_FOUND_2",
          luminarias
        })
        return luminarias;

      }else{
        dispatch({
          type: 'LUMINARIA_ASOCIADA_INFO_ERROR_2',
          luminarias
        })
      }

    })
    .catch(error=>{
      dispatch({
        type: 'LUMINARIA_ASOCIADA_INFO_ERROR_2',
        error
      })
      return error;
    })
  }
}


//solo asociadas :

//EditWidget ACTIONS -----------------------------------------------------------------------------
  //EditLuminaria:
//obtiene las potencias para el widget editar
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
//obtiene el tipo de conexion para el widget editar
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
//obtiene el tipo de luminaria para el widget editar
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
//obtiene las propiedades para el widget editar
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
// cambia el valor de los combos del edit widget
export function onChangeEdition(name, value) {
  console.log(name,value, "log");
  return {
    type: 'ONCHANGE_COMBO_EDITION',
    name,
    value
  }
}

// realiza las acciones de editar, actualizar o crear del edit widget
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

// (O) obtiene todas las luminarias de la comuna
export function getDataLuminarias (token,comuna){
  return dispatch => {
    return getDataLuminariasComuna(token,comuna)
    .then(luminarias=>{
      dispatch({
        type: 'LUMINARIAS_FOUND',
        luminarias
      });
      return luminarias;
    })
    .catch(error=>{
      dispatch({
        type: 'LUMINARIAS_NOT_FOUND',
        error
      })

      return error;
    })
  }
}
//cambia el tab index del menuItem
export function changeActiveIndex(index){

  return {
    type: "CHANGED_TAB_INDEX",
    index
  }
}

export function onclick_luminaria(luminarias){
  return {
    type: 'CLICKED_LUMINARIA_ON_MAP',
    luminarias
  }
}

//(O) cambia el index del tab en el menu edición de luminarias.
export function changeIndex(index){
  return {
    type: 'CHANGED_CURRENT_INDEX',
    index
  }
}

//(O) Guarda los resultados obtenidos desde el click para ser usados en el edit widget
export function onclickresults(results){
  if(results.length){
    return {
      type: 'GOT_ONCLICK_RESULTS',
      results
    }
  }else{
    return {
      type: 'GOT_NONE_ONCLICK_RESULTS',
      results
    }
  }

}

//(O) Almacena las luminarias asociadas al circuito.
export function onclicklumscircuito(token, comuna, idequipo){
  return dispatch => {
    return getLuminariasAsociadas(token, comuna, idequipo)
    .then(luminarias=> {

      dispatch({
        type: "LUMS_ASOC_CIRCUITO",
        luminarias
      })
    })
    .catch(error => {
      dispatch({
        type: "LUMS_ASOC_CIRCUITO_ERROR",
        error
      })
    })
  }
}

export function showElement(index){
  return {
    type: "CHANGE_ELEMENT_INDEX",
    index
  }
}

// (O) busca las fotos relacionadas a una luminaria
export function findPictures(token, idnodo){
  return dispatch =>{
    return getFotografias(token,idnodo)
    .then(fotos=>{
      dispatch({
        type: 'PICTURED_FOUND',
        fotos
      })

      return fotos;
    })
    .catch(error=>{

      dispatch({
        type: 'PICTURED_NOT_FOUND',
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




//(O) Muestra ventana emergente
export function showModal(header, contenido, open){

    if(open){
      return {
            type: 'SHOW_MODAL',
            header,
            contenido,
            open
      }
    }else{
      return {
            type: 'HIDE_MODAL',
            header,
            contenido,
            open
      }
    }
}

//(O) ACTIVA / DESACTIVA LOADER PARA MODULOS
export function activeLoader(activeStatus, type){
  switch (type) {
    case 'LIGHTS':
      if(activeStatus){
        return {
          type: 'ACTIVE_LOADER_LIGHTS_ON',
          activeStatus
        }
      }else{
        return {
          type: 'ACTIVE_LOADER_LIGHTS_OFF',
          activeStatus
        }
      }

    break;

    case 'METERS':
      if (activeStatus) {
        return {
          type: 'ACTIVE_LOADER_METERS_ON',
          activeStatus
        }
      }else{
        return {
          type: 'ACTIVE_LOADER_METERS_OFF',
          activeStatus
        }
      }

    break;
  }
}
