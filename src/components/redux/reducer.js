import {combineReducers} from 'redux';

//importing reducers from each module
import {itemsHasErrored, itemsIsLoading, items } from './dashboard/dash_reducer';
//import muniReducer from './muni/muni_reducer';


const reducer = combineReducers({
  itemsHasErrored,
  itemsIsLoading,
  items
});

export default reducer;
