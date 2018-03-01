import {changeBasemap} from '../../../services/map_service';
import {changeLayerVisibility} from '../../../services/layers_service';

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
