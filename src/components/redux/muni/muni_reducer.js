import {changeBasemap} from '../../../services/map_service';
import {changeLayerVisibility} from '../../../services/layers_service';
import {getSelectedMeterLocation} from '../../../services/medidores_service';


export function selected_menu(state={selectedMenu: ''}, action){

  switch (action.type) {
    case 'SELECTED_MENU':
      return Object.assign({},state,{selectedMenu: action.menu});
    break;

    default:
      return state;
    break;
  }

}

export function toggle_visibility(state={visibleMenu:false}, action){
  switch (action.type) {
    case 'TOGGLE_VISIBILITY_HIDE':
        return Object.assign({}, state,{visibleMenu: false});
    break;

    case 'TOGGLE_VISIBILITY_SHOW':
        return Object.assign({}, state,{visibleMenu: true});
    break;

    default:
      return state;

  }
}

export function toggle_sidebar_visibility(state={visible:false}, action){


  switch (action.type) {
    case 'TOGGLE_SIDEBAR_VISIBILITY_HIDE':
        return Object.assign({}, state,{visible: false});
    break;

    case 'TOGGLE_SIDEBAR_VISIBILITY_SHOW':
        return Object.assign({}, state,{visible: true});
    break;

    default:
      return state;

  }
}

export function toggle_segment(state={showSegment:false}, action){

  switch (action.type) {
    case 'SHOW_SEGMENT':
      return Object.assign({},state, {showSegment: true})
    break;

    case 'HIDE_SEGMENT':
      return Object.assign({},state, {showSegment: false})
    break;

    default:
      return state;
  }
}

export function busqueda(state={searchType: "ROTULO", found: [], value: ''}, action){

  switch (action.type) {
    case "CHANGE_BUSQUEDA_TYPE":
        return Object.assign({}, state, {searchType: action.searchType})
    break;
    case "SEARCH_IS_DONE":
       return Object.assign({},state, {found: action.found, value: action.value})
    break;

    case "SEARCH_IS_ZERO":
       return Object.assign({},state, {found: [], value: action.value})
    break;

    case "SEARCH_WITH_ERRORS":
      return Object.assign({},state, {found: action.error, value: action.value})
    break;
    default:
      return state;

  }
}

export function mapa(state={mapa: {}}, action){

  switch (action.type) {
    case 'SAVE_MAP':
      return Object.assign({},state,{mapa: action.mapa});
    break;
    default:
      return state;
  }
}

export function map_selector(state={value:'topo'}, action){
  switch (action.type) {
    case 'CHANGE_MAP':
        changeBasemap(action.value)
        return Object.assign({},state,{value: action.value});
    break;
    default:
      return state;
  }
}

export function layer_selector(state={
  luminarias: true,
  tramosap: true,
  modificaciones: true,
  limitecomunal: true
  }, action){
  switch (action.type) {
    case 'LAYER_VISIBILITY_CHANGED':
          switch (action.layer) {
            case 'luminarias':
                changeLayerVisibility(action.layer, !state.luminarias);
                return Object.assign({},state,{luminarias: !state.luminarias})
            break;
            case 'tramosap':
                changeLayerVisibility(action.layer, !state.tramosap);
                return Object.assign({},state,{tramosap: !state.tramosap})
            break;
            case 'modificaciones':
                changeLayerVisibility(action.layer, !state.modificaciones);
                return Object.assign({},state,{modificaciones: !state.modificaciones})
            break;
            case 'limitecomunal':
                changeLayerVisibility(action.layer, !state.limitecomunal);
                return Object.assign({},state,{limitecomunal: !state.limitecomunal})
            break;
            default:
              return state;
          }
      break;
    default:
      return state;
  }

}

export function medidores_data(state={dataMedidores: []}, action){

  switch (action.type) {
    case 'GOT_METERS_DATA':
    let data = action.data.map(d=>{
      return {
        oid: d.attributes.OBJECTID,
        idequipo: d.attributes.id_medidor,
        nro_medidor: d.attributes.numero_medidor,
        nis: d.attributes.numero_medidor,
        cant_luminarias: d.attributes.luminarias,
        cant_tramos: d.attributes.tramos_ap,
        tipo: d.attributes.tipo_equipo,
        rotulo: d.attributes.rotulo
      }
    })
      return Object.assign({}, state, {dataMedidores: data})
    break;

    case 'ERROR_GETTING_METERS_DATA':
      return state;
    break;
    default:
        return state;
  }
}

export function medidor_location(state= {meterLocation: []}, action){

  switch (action.type) {
    case 'MEDIDOR_LOCATION_FOUND':
      return Object.assign({},state, meterLocation: action.location)
    break;

    case 'MEDIDOR_LOCATION_NOT_FOUND':
        return Object.assign({},state, meterLocation: action.error)
    break;
    default:
        return state;
  }
}

export function luminarias_asociadas(state={luminariasAsociadas: []}, action){

  switch (action.type) {
    case 'LUMINARIAS_ASOCIADAS_FOUND':

    let data = action.luminarias.map((l, index)=>{
      return {
        oid: l.attributes.OBJECTID,
        idluminaria: l.attributes.ID_LUMINARIA,
        tipo_conexion: l.attributes.ID_LUMINARIA,
        propiedad: l.attributes.TIPO_CONEXION,
        tipo: l.attributes.TIPO,
        rotulo: l.attributes.ROTULO
      }

    });
        return Object.assign({},state,{luminariasAsociadas: data});
    break;

    case 'LUMINARIAS_ASOCIADAS_NOT_FOUND':
        return Object.assign({},state, {luminariasAsociadas: []});
    break;

    case 'LUMINARIAS_ASOCIADAS_ERROR':
        return Object.assign({},state,{luminariasAsociadas: []});
    break;

    default:
        return state;
  }
}

export function tramos_asociados(state={tramosAsociados: []}, action){

  switch (action.type) {
    case 'TRAMOS_ASOCIADOS_FOUND':
        return Object.assign({},state,{tramosAsociados: action.tramos});
    break;

    case 'TRAMOS_ASOCIADOS_NOT_FOUND':
        return Object.assign({},state, {tramosAsociados: []});
    break;

    case 'TRAMOS_ASOCIADOS_ERROR':
        return Object.assign({},state,{tramosAsociados: []});
    break;

    default:
        return state;
  }
}

export function luminaria_asociada_info(state={luminariaSelected: []}, action){
  console.log(action,"holall");
  switch (action.type) {
    case 'LUMINARIA_ASOCIADA_INFO_FOUND':
        return Object.assign({},state,{luminariaSelected: action.luminaria});
    break;

    case 'LUMINARIA_ASOCIADA_INFO_NOT_FOUND':
        return Object.assign({},state, {luminariaSelected: []});
    break;

    case 'LUMINARIA_ASOCIADA_INFO_ERROR':
        return Object.assign({},state,{luminariaSelected: []});
    break;

    default:
        return state;
  }
}
