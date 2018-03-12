import {MuniImages} from '../../../services/apmuni_images';
//combineReducers

const comunaDefault = MuniImages.filter(comuna=>{return comuna.value==='lacruz'});

export function comunas(state=MuniImages, action){
 switch (action.type) {
   case 'GET_ALL_COMUNAS':
     return state
   break;

   default:
     return state;
 }
}


export function selected_comuna(state=comunaDefault, action){

  switch (action.type) {
    case 'SELECTED_COMUNA':
      return MuniImages.filter(c=>{return c.value===action.comuna});
    break;

    default:
      return state;
    break;
  }

}
