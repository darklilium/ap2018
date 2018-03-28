import {combineReducers} from 'redux';

//importing reducers from each module
import {comunas, selected_comuna} from './dashboard/dash_reducer';
import {credentials,muniOptions, bottomMessageHandler} from './login/login_reducer';
import {toggle_segment,
  map_selector, layer_selector , combos_luminarias, onclick_editwidget,
   toggle_loader_visibility, showNotificationDML,
editWidgetManager,
searchWidgetManager,
metersWidgetManager,
luminariasWidgetManager,
menu_handler} from './muni/muni_reducer';


const reducer = combineReducers({
comunas, selected_comuna,
credentials, muniOptions, bottomMessageHandler, toggle_segment,
  map_selector, layer_selector, combos_luminarias,
  onclick_editwidget,  toggle_loader_visibility, showNotificationDML,
  editWidgetManager,
  searchWidgetManager,
  metersWidgetManager,
  luminariasWidgetManager,
  menu_handler

});

export default reducer;
