import {combineReducers} from 'redux';

//importing reducers from each module
import {comunas, selected_comuna} from './dashboard/dash_reducer';
import {credentials,muniOptions, bottomMessageHandler} from './login/login_reducer';
import {selected_menu, toggle_visibility, toggle_segment, toggle_sidebar_visibility, busqueda, mapa} from './muni/muni_reducer';


const reducer = combineReducers({
comunas, selected_comuna,
credentials, muniOptions, bottomMessageHandler,
selected_menu, toggle_visibility, toggle_segment, toggle_sidebar_visibility, busqueda, mapa,
});

export default reducer;
