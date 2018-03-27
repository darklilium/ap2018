import {changeBasemap} from '../../../services/map_service';
import {changeLayerVisibility} from '../../../services/layers_service';
import {getSelectedMeterLocation} from '../../../services/medidores_service';

//------------------------------
import getFotografias from '../../../services/luminarias_service'

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
        nis: d.attributes.nis,
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

    case "MEDIDOR_IS_ZERO":
        return Object.assign({},state, {meterLocation: []})
    break;

    default:
        return state;
  }
}

export function luminarias_asociadas(state= {
  luminariasAsociadas: [],
  luminariaAsociadaSelected: null
 }, action){

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

//??
export function luminaria_asociada_info(state={
  luminariaSelected: [],
  searchType: "ROTULO",
  found: [],
  value: '',
  fotografias: [],
  luminariasMismoCircuito: [],
  tabActiveIndex: 0,

}, action){

  switch (action.type) {
    case 'LUMINARIA_ASOCIADA_INFO_FOUND':

        let lum = action.luminaria.map(l=>{
          console.log(l,"hola44");
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



    case "CHANGED_TAB_INDEX":
      return Object.assign({},state,{tabActiveIndex: action.index})
    break;

    case "LUMINARIA_ASOCIADA_INFO_FOUND_WIDGET":
      let lumi = action.luminarias.map(l=>{

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
        return Object.assign({},state,{luminariasMismoCircuito: lumi});
    break;
    case 'LUMINARIA_ASOCIADA_INFO_NOT_FOUND_WIDGET':
        return Object.assign({},state, {luminariasMismoCircuito: []});
    break;

    case 'LUMINARIA_ASOCIADA_INFO_ERROR_WIDGET':
        return Object.assign({},state,{luminariasMismoCircuito: []});
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

export function combos_luminarias(state= {
  potencia: [],
  tipo: [],
  tipo_conexion: [],
  propiedad: []}, action){

  switch (action.type) {

    case 'POTENCIAS_OBTAINED':
      let pot = action.potencias.map(p=>{
        return {
          key: p.attributes.potencia.toString(),
          text: p.attributes.potencia.toString(),
          value: p.attributes.potencia.toString(),
          type: 'potencias'
        }
      })
      return Object.assign({},state,{potencia: pot})
    break;

    case 'TIPO_CONEXION_OBTAINED':
    let cnx = action.tipoconexion.map(p=>{
      return {
        key: p.attributes.tipo_cnx_ap ,
        text: p.attributes.tipo_cnx_ap ,
        value: p.attributes.tipo_cnx_ap,
        type: 'tipoconexion'
      }
    })
      return Object.assign({},state,{tipo_conexion: cnx})
    break;

    case 'TIPO_LUMINARIA_OBTAINED':
    let tl = action.tipoLuminaria.map(p=>{
      return {
        key: p.attributes.tipo_luminaria  ,
        text: p.attributes.tipo_luminaria  ,
        value: p.attributes.tipo_luminaria,
        type: 'tipoluminaria'
      }
    })
      return Object.assign({},state,{tipo: tl})
    break;

    case 'PROPIEDAD_OBTAINED':
      let pp = action.propiedades.map(p=>{
        return {
          key: p.attributes.propiedad,
          text: p.attributes.propiedad,
          value: p.attributes.propiedad,
          type: 'propiedad'
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
    TIPO: "",
    TIPO_CONEXION: "",
    POTENCIA: "",
    PROPIEDAD: "",
  },action){

  switch (action.type) {


    case 'ONCHANGE_OBJECT_EDITION':
        switch (action.attrName) {
          case 'tipo':
              return Object.assign({}, state, {TIPO: action.value})
          break;
          case 'tipo_conexion':
              return Object.assign({}, state, {TIPO_CONEXION: action.value})
          break;
          case 'potencia':
              return Object.assign({}, state, {POTENCIA: action.value})
          break;
          case 'propiedad':
              return Object.assign({}, state, {PROPIEDAD: action.value})
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

export function toggle_loader_visibility(state= {active: true, type: ''}, action){
  switch (action.type) {
    case 'ACTIVE_LOADER_LIGHTS_ON':
      return Object.assign({}, state, {active: true, type: 'LIGHTS'});
    break;

    case 'ACTIVE_LOADER_LIGHTS_OFF':
      return Object.assign({}, state, {active: false, type: 'LIGHTS'});
    break;

    case 'ACTIVE_LOADER_METERS_ON':
      return Object.assign({}, state, {active: true, type: 'METERS'});
    break;

    case 'ACTIVE_LOADER_METERS_OFF':
      return Object.assign({}, state, {active: false, type: 'METERS'});
    break;

    default:
        return state;
  }
}
//show modal related
export function showNotificationDML(state = {
  header: '',
  contenido: '',
  open: false

}, action){
  switch (action.type) {
    case 'SHOW_MODAL':
        return Object.assign({}, state,
          {
            header: action.header,
            contenido: action.contenido,
            open: true
          })
    break;

    case 'HIDE_MODAL':
        return Object.assign({}, state,
           {
            header: action.header,
            contenido: action.contenido,
            open: false
          })
    break;

    default:
      return state;
  }

}


//------------------------------------------------------------------------------------------------
//Reducer para editar luminaria multiple. (SE USA)
export function clickedResulset(state={
  lumsFoundInPoint: [],
  showCurrent: {
    objectid: '',
    tipoconexion: '',
    tipo: '',
    potencia: '' ,
    propiedad: '',
    rotulo: '',
    observacion: '',
    idluminaria: '',
    idnodo: '',
    geometry: ''
  },
  lumsAsociadasCircuito: [],
  currentIndex: 0,
  fotografias: []
},action){
  switch (action.type) {
    case 'GOT_ONCLICK_RESULTS':
      let lums = action.results.filter(r=>{
        return r.layerName=="Luminarias"
      });

      let lu = lums.map(l=>{return l.features});

      return Object.assign({}, state, {
        lumsFoundInPoint: lu,
        showCurrent: {
          objectid: lu[state.currentIndex].attributes.OBJECTID,
          tipoconexion: lu[state.currentIndex].attributes.TIPO_CONEXION,
          tipo: lu[state.currentIndex].attributes.TIPO,
          potencia: lu[state.currentIndex].attributes.POTENCIA,
          rotulo: lu[state.currentIndex].attributes.ROTULO,
          observacion: lu[state.currentIndex].attributes.OBSERVACION,
          idluminaria: lu[state.currentIndex].attributes.ID_LUMINARIA,
          idnodo: lu[state.currentIndex].attributes.ID_NODO,
          propiedad:  lu[state.currentIndex].attributes.PROPIEDAD,
          geometry: lu[state.currentIndex].geometry
        }
      });
    break;

    case 'GOT_NONE_ONCLICK_RESULTS':
      return Object.assign({}, state, {lumsFoundInPoint: []})
    break;

    case "LUMS_ASOC_CIRCUITO":
        return Object.assign({}, state, {lumsAsociadasCircuito: luminarias})
    break;

    case "LUMS_ASOC_CIRCUITO_ERROR":
      return Object.assign({}, state, {lumsAsociadasCircuito: []})
    break;

    case 'CHANGE_ELEMENT_INDEX':
      console.log(state.lumsFoundInPoint);
      return Object.assign({}, state, {
        showCurrent: {
          objectid: state.lumsFoundInPoint[action.index].attributes.OBJECTID,
          tipoconexion: state.lumsFoundInPoint[action.index].attributes.TIPO_CONEXION,
          tipo: state.lumsFoundInPoint[action.index].attributes.TIPO,
          potencia: state.lumsFoundInPoint[action.index].attributes.POTENCIA,
          rotulo: state.lumsFoundInPoint[action.index].attributes.ROTULO,
          observacion: state.lumsFoundInPoint[action.index].attributes.OBSERVACION,
          idluminaria: state.lumsFoundInPoint[action.index].attributes.ID_LUMINARIA,
          idnodo: state.lumsFoundInPoint[action.index].attributes.ID_NODO,
          propiedad:  state.lumsFoundInPoint[action.index].attributes.PROPIEDAD,
          geometry: state.lumsFoundInPoint[action.index].geometry
        }
      })
    break;

    case 'CHANGED_CURRENT_INDEX':
      return Object.assign({}, state, {
        currentIndex: action.index,
    });
    break;

    case 'ONCHANGE_COMBO_EDITION':

        switch (action.name) {
          case 'ddlTipoConexion':
            return {...state,
              showCurrent: {
                ...state.showCurrent,
                tipoconexion: action.value.toString(),
              }
            };
          break;

          case 'ddlTipo':
            return {...state,
              showCurrent: {
                ...state.showCurrent,
                tipo: action.value.toString(),
              }
            };
          break;

          case 'ddlPotencia':
            return {
              ...state,
              showCurrent: {
                ...state.showCurrent,
                potencia: action.value.toString(),
              }
            };
          break;

          case 'ddlPropiedad':
            return {
              ...state,
              showCurrent: {
                ...state.showCurrent,
                propiedad:  action.value.toString(),
              }
            };
          break;

          case 'txtRotulo':
            return {
              ...state,
              showCurrent: {
                ...state.showCurrent,
                rotulo:  action.value.toString(),
              }
            };
          break;

          case 'txtObservacion':
            return {
              ...state,
              showCurrent: {
                ...state.showCurrent,
                observacion:  action.value.toString(),
              }
            };
          break;

          default:
            return state;
          break;
        }

    break;

    case 'PICTURED_FOUND':
      return {...state, fotografias: action.fotos}
    break;

    case "PICTURED_NOT_FOUND":
      return Object.assign({},state, {fotografias: action.fotos})
    break;

    default:
      return state;
    break;
  }
}
