import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//services
import env from './services/config';

//components
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Municipalidad from './components/municipal/Municipalidad';
import App from './components/App';

import { Route, Switch, BrowserRouter } from 'react-router-dom';



const Routering = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/municipalidad" component={Municipalidad} />
   </Switch>
  </App>
);
export default Routering;
