import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
  ));
}
/*
export default function configureStore (initialState) {
  return createStore(reducer, initialState, applyMiddleware(thunk));
}
*/
