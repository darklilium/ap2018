import {combineReducers} from 'redux';

//importing reducers from each module
import {comunas, selected_comuna} from './dashboard/dash_reducer';
//import muniReducer from './muni/muni_reducer';


const reducer = combineReducers({
comunas,
selected_comuna
});

export default reducer;
