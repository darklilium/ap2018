import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import env from './services/config';
import $ from 'jquery';
//components
import Dashboard from './components/Dashboard';
import Other from './components/Other';
import App from './components/App';

import { Route, Switch } from 'react-router-dom';



const Routering = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/other" component={Other} />
   </Switch>
  </App>
);
export default Routering;
