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

export function medidor_location(state= {
  meterLocation: [],
  nromedidor: '' ,
  idequipo: '',
  selectedMedidor: null
  }, action){

  switch (action.type) {
    case 'MEDIDOR_LOCATION_FOUND':
      return Object.assign({},state, {meterLocation: action.location})
    break;

    case 'MEDIDOR_LOCATION_NOT_FOUND':
        return Object.assign({},state, {meterLocation: action.error})
    break;

    case 'SELECTED_MEDIDOR':
        return Object.assign({},state, {
          selectedMedidor: action.index,
          idequipo: action.idequipo,
          nromedidor: action.nromedidor
        })
    break;

    default:
        return state;
  }
}

export function luminarias_asociadas(state= {
  luminariasAsociadas: [],
  luminariaAsociadaSelected: null
 }, action){
   console.log(action,"highlight?");
  switch (action.type) {
    case 'LUMINARIAS_ASOCIADAS_FOUND':

    let data = action.luminarias.map((l, index)=>{
      return {
        oid: l.attributes.OBJECTID,
        idluminaria: l.attributes.ID_LUMINARIA,
        tipo_conexion: l.attributes.TIPO_CONEXION,
        propiedad: l.attributes.PROPIEDAD,
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

    case "SELECTED_LUMINARIA_ASOCIADA":
        return Object.assign({},state,{luminariaAsociadaSelected: action.index});
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

export function luminaria_asociada_info(state={
  luminariaSelected: [],
  searchType: "ROTULO",
  found: [],
  value: '',
  fotografias: []}, action){

  switch (action.type) {
    case 'LUMINARIA_ASOCIADA_INFO_FOUND':

        let lum = action.luminaria.map(l=>{
          console.log(l,"hola");
          return {
            idnodo: l.attributes.ID_NODO,
            idluminaria: l.attributes.ID_LUMINARIA,
            tipo: l.attributes.TIPO,
            tipo_conexion: l.attributes.TIPO_CONEXION,
            potencia: l.attributes.POTENCIA,
            propiedad: l.attributes.PROPIEDAD,
            rotulo: l.attributes.ROTULO,
            observacion: l.attributes.OBSERVACION,
            geometry: l.geometry
          }
        })

        return Object.assign({},state,{luminariaSelected: lum});
    break;

    case 'LUMINARIA_ASOCIADA_INFO_NOT_FOUND':
        return Object.assign({},state, {luminariaSelected: []});
    break;

    case 'LUMINARIA_ASOCIADA_INFO_ERROR':
        return Object.assign({},state,{luminariaSelected: []});
    break;

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

    case "PICTURED_FOUND":
      return Object.assign({},state, {fotografias: action.fotos})
    break;

    case "PICTURED_NOT_FOUND":
      return Object.assign({},state, {fotografias: action.fotos})
    break;

    default:
        return state;
  }
}

export function luminarias(state={luminariasComuna: []},action){

  switch (action.type) {
    case 'LUMINARIAS_FOUND':
    let data = action.luminarias.map(d=>{
      return {
        oid: d.attributes.OBJECTID,
        idluminaria: d.attributes.ID_LUMINARIA,
        tipo_conexion: d.attributes.TIPO_CONEXION,
        propiedad: d.attributes.PROPIEDAD,
        tipo_conexion: d.attributes.TIPO_CONEXION,
        rotulo: d.attributes.ROTULO,
        tipo: d.attributes.TIPO,
        rotulo: d.attributes.ROTULO
      }
    })
      return Object.assign({}, state, {luminariasComuna: data})
    break;

    case 'LUMINARIAS_NOT_FOUND':
      return Object.assign({},state,{luminariasComuna: []});
    break;
    default:
      return state;
  }
}

export function combos_luminarias(state= {potencias: [], tipo: [], tipo_conexion: [], propiedad: []}, action){

  switch (action.type) {

    case 'POTENCIAS_OBTAINED':
      let pot = action.potencias.map(p=>{
        return {
          key: p.attributes.potencia,
          text: p.attributes.potencia,
          value: p.attributes.potencia
        }
      })
      return Object.assign({},state,{potencias: pot})
    break;

    case 'TIPO_CONEXION_OBTAINED':
    let cnx = action.tipoconexion.map(p=>{
      return {
        key: p.attributes.tipo_cnx_ap ,
        text: p.attributes.tipo_cnx_ap ,
        value: p.attributes.tipo_cnx_ap
      }
    })
      return Object.assign({},state,{tipo_conexion: cnx})
    break;

    case 'TIPO_LUMINARIA_OBTAINED':
    let tl = action.tipoLuminaria.map(p=>{
      return {
        key: p.attributes.tipo_luminaria  ,
        text: p.attributes.tipo_luminaria  ,
        value: p.attributes.tipo_luminaria
      }
    })
      return Object.assign({},state,{tipo: tl})
    break;

    case 'PROPIEDAD_OBTAINED':
      let pp = action.propiedades.map(p=>{
        return {
          key: p.attributes.propiedad,
          text: p.attributes.propiedad,
          value: p.attributes.propiedad
        }
      })
      return Object.assign({},state,{propiedad: pp})
    break;

    case 'ERROR_GETTING_POTENCIAS':
      return Object.assign({},state,{potencias: []})
    break;

    case 'ERROR_GETTING_TIPO_CONEXION':
      return Object.assign({},state,{tipo_conexion: []})
    break;

    case 'ERROR_GETTING_TIPO_LUMINARIA':
      return Object.assign({},state,{tipo: []})
    break;

    case 'ERROR_GETTING_PROPIEDADES':
      return Object.assign({},state,{propiedad: []})
    break;

    default:
        return state;
  }
}

export function change_combos_edition(state= {
    tipo: "",
    tipo_conexion: "",
    potencia: "",
    propiedad: "",
  },action){

  switch (action.type) {
    case 'ONCHANGE_COMBO_EDITION':
        switch (action.name) {
          case 'ddlTipoConexion':
            return Object.assign({}, state, {tipo_conexion: action.value})
          break;

          case 'ddlTipo':
            return Object.assign({}, state, {tipo: action.value})
          break;

          case 'ddlPotencia':
            return Object.assign({}, state, {potencia: action.value})
          break;

          case 'ddlPropiedad':
            return Object.assign({}, state, {propiedad: action.value})
          break;

          default:
          return state;
        }
    break;

    case 'ONCHANGE_OBJECT_EDITION':
        switch (action.attrName) {
          case 'tipo':
              return Object.assign({}, state, {tipo: action.value})
          break;
          case 'tipo_conexion':
              return Object.assign({}, state, {tipo_conexion: action.value})
          break;
          case 'potencia':
              return Object.assign({}, state, {potencia: action.value})
          break;
          case 'propiedad':
              return Object.assign({}, state, {propiedad: action.value})
          break;

          default:
            return state;
        }
    break;

    default:
      return state;
  }
}

export function onclick_editwidget(state={resultQueryAction: []}, action){
  console.log(action,"EditWidget");
  switch (action.type) {
    case 'ON_UPDATE':
      return Object.assign({},state, resultQueryAction: action.done)
    break;

    case 'ON_DELETE':
        return Object.assign({},state, resultQueryAction: action.done)
    break;

    case 'ON_CREATE':
        return Object.assign({},state, resultQueryAction: action.done)
    break;

    default:
      return state;
    break;
  }
}
