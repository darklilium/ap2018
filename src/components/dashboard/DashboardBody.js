import React from 'react';
import env from '../../services/config';
import { Dropdown, Menu, Button, Divider } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import $ from 'jquery';
import {store} from '../redux/store';
import {getAllComunas, selectedComuna} from '../redux/actions';


class DashboardBody extends React.Component {
    onClick =  () => {
      const {selected_comuna} = this.props;
    
      this.props.properties.history.push("/municipalidad");
    }
    onChange = (e,{value}) =>{
      $(".dashboard_body_wrapper").css("background-image", "url("+env.CSSDIRECTORY+"/images/dashboard_images/bg/"+value+".png)");
      this.props.selectedComuna(value);

    }
    componentDidMount(){
      this.props.selectedComuna('valparaiso');
    }

    render() {
      const {comunas, selected_comuna} = this.props;
        return (
            <div className="dashboard_body_wrapper">
              <div className="dashboard_component_wrapper">
              {/*  <img src={env.CSSDIRECTORY+"/images/dashboard_images/logos/"+selected_comuna[0].value+".png"}></img>*/}
                <img src={selected_comuna[0].dashboard_logo}></img>
                <Divider horizontal inverted>Seleccione comuna</Divider>
                <Dropdown upward placeholder='Select Comuna' fluid selection options={comunas} value={selected_comuna[0].value} onChange={this.onChange}/>
                <Button className="btn_dashboard" onClick={this.onClick}>Ingresar</Button>
              </div>
            </div>
        );
    }

}


const mapStateToProps = (state) =>{
  console.log(state,"CURRENT STATE");
  return {
    comunas: state.comunas,
    selected_comuna: state.selected_comuna
  };
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getComunas: (comunas) => dispatch(getAllComunas(comunas)),
    selectedComuna: (selected) => dispatch(selectedComuna(selected))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardBody)
