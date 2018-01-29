

//combineReducers

export function itemsHasErrored(state = false, action){
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored
      break;

    default:
      return state;
  }
}


export function itemsIsLoading(state = false, action){
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading
      break;

    default:
      return state;

  }
}


export function items (state = [], action){
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items
      break;

    default:
      return state
  }
}

export function comunas(state = [] , action){
  console.log(state,action, "hola");
  switch (action.type) {
    case 'GET_COMUNAS':
      return action.comunas
      break;
    default:
      return state
  }
}
