
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
