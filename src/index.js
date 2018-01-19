import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import env from './services/config';
import $ from 'jquery';


/*
  let randomPicNumber = Math.floor((Math.random() * 6) + 1);
  //********Cambiar randomPicSrc para test/prod*******
  let randomPicSrc = env.CSSDIRECTORY+ "/images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
*/



  const rootEl = document.getElementById('app');


  ReactDOM.render(<Login />, rootEl);
