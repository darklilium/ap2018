import React from 'react';
import ReactDOM from 'react-dom';
import env from '../../services/config';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import muniStyle from '../../css/component1/municipal.scss';
import $ from 'jquery';
import SidebarTopPush from '../others/DoubleMenuBarMap';
import HeaderMenu from './HeaderMenu';
import store from '../../index';

class Municipalidad extends React.Component {
 render(){
   const {comuna} = this.props;
   return (
       <div className="muni-wrapper">
        <HeaderMenu comuna={comuna}/>


       </div>
   )
  }

  componentDidMount(){

    $('#app_wrapper').removeClass("wrapper").addClass("wrapper_municipal");
    TweenMax.to(".wrapper_municipal",5,{
      opacity: "1",
      transition: "opacity .5s ease",
      visibility: "visible"
    });
  }
}

const mapStateToProps = state =>{
  console.log(state, "municipalidad state");
  return {
    comuna: state.selected_comuna
  }
}

const mapDispatchToProps = dispatch =>{
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Municipalidad);
