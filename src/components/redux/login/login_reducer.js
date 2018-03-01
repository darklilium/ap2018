import {MuniImages} from '../../../services/apmuni_images';

export function credentials(state={
  login: true,
  token: "Wjp0Xbf6kSk-7iScEQ_mXK5JJhuRzYlzIEvXiLeEo8nPsPemFIzZtvVspQcb-3enpWjXmlfU51BkmaD0xja-Sw..",
  user: {
    municipal: false,
    password: "Chilquinta12",
    user: "vialactea\\ehernanr",
    vialactea: true,
  }
}, action){
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

export function muniOptions(state=[], action){
  switch (action.type) {


    case 'GET_OPTIONS_USER_MUNICIPAL':

      var filtered = MuniImages.filter(comuna=>{
         return comuna.text.toUpperCase()===action.options.comuna;
      });

      return Object.assign({}, state, {comunaValue: filtered});
    break;

    case 'ERROR_USER_MUNICIPAL':
      return Object.assign({}, state,{comunaValue: []});;
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

export function bottomMessageHandler(state = {
  text:'',
  visible: false
}, action){

  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return Object.assign({}, state, {visible: true });
    break;

    case "HIDE_NOTIFICATION":
      return  Object.assign({}, state, {visible: false});

    case "SET_MESSAGE":
      return Object.assign({}, state, {text: action.message});
    break;

    default:
      return state;
  }
}
