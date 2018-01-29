import {combineReducers} from 'redux';

//importing reducers from each module
import {itemsHasErrored, itemsIsLoading, items, comunas } from './dashboard/dash_reducer';
//import muniReducer from './muni/muni_reducer';


const reducer = combineReducers({
  itemsHasErrored,
  itemsIsLoading,
  items,
  comunas 
});

export default reducer;
