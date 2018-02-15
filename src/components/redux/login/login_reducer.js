

export function credentials(state=[], action){
  switch (action.type) {

    case 'GOT_TOKEN':
      return Object.assign({},action.credentials, {login: true});
    break;

    case 'ERROR_TOKEN':
      return Object.assign({}, action.credentials,{login: false});;
    break;

    default:
      return state;
    break;
  }
}

export function user(state=[], action){
  switch (action.type) {
    case 'GET_USER':
      return action.user;
    break;

    default:
      return state;
    break;
  }
}

export function password(state=[], action){
  switch (action.type) {
    case 'GET_PASSWORD':
      return action.password;
    break;

    default:
      return state;
    break;
  }
}

export function width(state=[], action){
  switch (action.type) {
    case 'CHANGE_WIDTH':
      return action.width;
    break;

    default:
      return state;
    break;
  }
}

export function message(state={message: ''}, action){
  console.log(state,action,"hola from message");
  switch (action.type) {
    case "SET_MESSAGE":
      return Object.assign({}, state, {message: action.message});
      break;
    default:
      return state;
  }


}

export function visibleMessage(state={visible: false}, action){

  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return Object.assign({}, state, {visible: true});
    break;

    case "HIDE_NOTIFICATION":
      return  Object.assign({}, state, {visible: false});
    default:
      return state;
  }

}
