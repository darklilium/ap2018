

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
