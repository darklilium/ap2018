import {changeBasemap} from '../../../services/map_service';
import {changeLayerVisibility} from '../../../services/layers_service';
import {getSelectedMeterLocation} from '../../../services/medidores_service';

//------------------------------
import getFotografias from '../../../services/luminarias_service'
//(O) cambia la visibilidad del loader
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

//(O) Maneja la visibilidad de los menú de la aplicación:

export function menu_handler(state = {
  selectedMenu: '',
  visibleMenu: false
 }, action){

  switch (action.type) {
    case 'SELECTED_MENU':
      return Object.assign({},state,{selectedMenu: action.menu});
    break;

    case 'TOGGLE_VISIBILITY_HIDE':
        return Object.assign({}, state,{visibleMenu: false});
    break;

    case 'TOGGLE_VISIBILITY_SHOW':
        return Object.assign({}, state,{visibleMenu: true});
    break;


    default:
      return state;
    break;
  }

}

/*
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
*/

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



//(O)
export function searchWidgetManager(state={
  searchType: "ROTULO",
  found: [],
  value: '',
}, action){

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

export function onclick_editwidget(state={
  resultQueryAction: []
}, action){

  switch (action.type) {
    case 'ON_UPDATE':
      return {...state, resultQueryAction: action.done};
    break;

    case 'ON_DELETE':
        return {...state, resultQueryAction: action.done};
    break;

    case 'ON_CREATE':
        return {...state, resultQueryAction: action.done};
    break;

    default:
      return state;
    break;
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
export function editWidgetManager(state={
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
  fotografias: [],
  tabActiveIndex: 0,
  modsInPoint: [],
  showCurrentMod: {
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
  }
 },action){

  switch (action.type) {
    case 'GOT_ONCLICK_RESULTS':
      let lums = action.results.filter(r=>{
        return r.layerName=="Luminarias"
      });

      let lu = lums.map(l=>{return l.features});      
      let mo = [];

      let mods = action.results.filter(r=>{
        return r.layerName=="Modificaciones"
      });

      if(mods.length){
        mo = mods.map(l=>{return l.features});  
      }
         
     
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
        },
        modsInPoint: (mo.length)? mo : []
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
        });
      
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

    case "CHANGED_TAB_INDEX":
      return Object.assign({},state,{tabActiveIndex: action.index})
    break;

    case "SEARCH_MODIFICACIONES":
        let lumToShow = state.modsInPoint.filter(function(lum){
         
          return lum.attributes.id_luminaria == action.idLuminaria
        });
        let mody = {};
        if(lumToShow.length){
          mody =  {
            objectid: lumToShow[0].attributes.OBJECTID,
            tipoconexion: lumToShow[0].attributes.tipo_cnx,
            tipo: lumToShow[0].attributes.tipo,
            potencia: lumToShow[0].attributes.potencia,
            propiedad: lumToShow[0].attributes.propiedad,
            rotulo: lumToShow[0].attributes.rotulo,
            observacion: lumToShow[0].attributes.obs,
            idluminaria: lumToShow[0].attributes.id_luminaria,
            idnodo: lumToShow[0].attributes.id_nodo,
            geometry: lumToShow[0].geometry
          }
        }
        
        return {...state, showCurrentMod: mody}
    break;
    
    default:
      return state;
    break;
  }
}

//Reducer que maneja los estados del widget para medidores:
export function metersWidgetManager(state= {
  dataMedidores: [],
  medidorSelected: {
    highlightMedidorSelected: null,
    idequipo: '',
    nromedidor:'',
    meterLocation: []
  },
  luminariaSelected: {
    highlightLuminariaSelected: null,
    luminariaLocation: []
  },
  luminariasAsociadasMedidor: [],
  tramosAsociados: []
  },
  action){

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

    case 'SELECTED_MEDIDOR':
        return {...state,
          medidorSelected: {
            ...state.medidorSelected,
            highlightMedidorSelected: action.index,
            idequipo: action.idequipo,
            nromedidor: action.nromedidor
          }
        }
    break;

    case 'LUMINARIAS_ASOCIADAS_FOUND':

    let dataLumsAsoc = action.luminarias.map((l, index)=>{
      return {
        oid: l.attributes.OBJECTID,
        idluminaria: l.attributes.ID_LUMINARIA,
        tipo_conexion: l.attributes.TIPO_CONEXION,
        propiedad: l.attributes.PROPIEDAD,
        tipo: l.attributes.TIPO,
        rotulo: l.attributes.ROTULO
      }

    });
        return Object.assign({},state,{luminariasAsociadasMedidor: dataLumsAsoc});
    break;

    case 'LUMINARIAS_ASOCIADAS_NOT_FOUND':
        return Object.assign({},state, {luminariasAsociadasMedidor: []});
    break;

    case 'LUMINARIAS_ASOCIADAS_ERROR':
        return Object.assign({},state,{luminariasAsociadasMedidor: []});
    break;

    case "SELECTED_LUMINARIA_ASOCIADA":
        return {...state,
          luminariaSelected: {
            ...state.luminariaSelected,
            highlightLuminariaSelected: action.index
          }
        }
    break;

    case 'MEDIDOR_LOCATION_FOUND':
      return {...state,
        medidorSelected: {
          ...state.medidorSelected,
          meterLocation: action.location
        }
      }
    break;

    case 'MEDIDOR_LOCATION_NOT_FOUND':
      return {...state,
        medidorSelected: {
          ...state.medidorSelected,
          meterLocation: action.error
        }
      }
    break;

    case "MEDIDOR_IS_ZERO":
    return {...state,
      medidorSelected: {
        ...state.medidorSelected,
        meterLocation: []
      }
    }
    break;

    case 'LUMINARIA_LOCATION':
        return {
          ...state,
          luminariaSelected: {
            ...state.luminariaSelected,
            luminariaLocation: action.luminaria
          }
        }
    break;

    case 'LUMINARIA_LOCATION_NOT_FOUND':
        return {
          ...state,
          luminariaSelected: {
            ...state.luminariaSelected,
            luminariaLocation: action.luminaria
          }
        }
    break;

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

//Reducer que maneja los estados para el widget de luminarias:
export function luminariasWidgetManager(state={
  luminariasComuna: [],
  luminariaLocation: []
  },action){

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

    case 'LUMINARIA_LOCATION_L':
        return {
          ...state,
          luminariaLocation: action.luminaria
        }
    break;

    case 'LUMINARIA_LOCATION_NOT_FOUND_L':
        return {
          ...state,
          luminariaLocation: []
        }
    break;

    default:
      return state;
  }
}
