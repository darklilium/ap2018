import React from 'react';
import ReactDOM from 'react-dom';
import Routering from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

import {Provider} from 'react-redux';
import configureStore from './components/redux/store';

const store = configureStore();

const rootEl = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routering />
    </Router>
  </Provider>, rootEl
);


export default store;
