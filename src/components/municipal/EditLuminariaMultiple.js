import React from 'react'
import {Modal, Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Divider , Rail, Form, Radio,Checkbox, Input, Tab, Dropdown} from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';
import muniStyle2 from '../../css/component1/busqueda_.scss';
import muniStyle3 from '../../css/component1/edit_.scss'
import { connect } from 'react-redux';
import {showModal, onChangeEdition,  onClickEditWidget} from '../redux/actions';
import deepEquals from 'deep-equal';


class EditLuminariaMultiple extends React.Component {

    constructor(props){
      super(props);
      this.onClick = this.onClick.bind(this);
      this.onChangeEdit = this.onChangeEdit.bind(this);

    }

    onClick(e, name){

      const {luminaria, comuna, token, onClickManager} = this.props;

      var accion = "nuevo";

      if(name.id=="btnActualizar"){
        accion="modificar";
      }
      if(name.id=="btnEliminar"){
        accion="eliminar";
      }

      console.log(luminaria);


      let nuevosAttr = {
        rotulo: luminaria.rotulo,
        Comuna: comuna,
        corregido: "Revisar",
        tipo_cnx: luminaria.tipoconexion,
        tipo:  luminaria.tipo,
        potencia:  luminaria.potencia,
        propiedad: luminaria.propiedad,
        eliminar: accion,
        obs: luminaria.observacion,
        id_luminaria: luminaria.idluminaria,
        id_nodo: luminaria.idnodo
      }

      console.log("Datos:", name.id, nuevosAttr, luminaria.geometry, token);


      onClickManager(name.id, nuevosAttr, luminaria.geometry, token)
      .then(done=>{
        this.props.showModal("Edición de Luminaria", "Operación " + accion + " realizada", true )
      })
      .catch(error=>{
        this.props.showModal("Edición de Luminaria", "Operación " + accion + " no ha sido realizada. Favor contacte al admnistrador de la plataforma", true )
      })

    }

    onChangeEdit(e,{name,value}){
      console.log(e, name, value);
      this.props.onChangeCombo(name,value);
    }


    render(){
      const {luminaria,countLuminarias,opcionesPotencia, opcionesTipoConexion, opcionesTipo, opcionesPropiedad,
         currentIndex} = this.props;


    if(countLuminarias>0){
      return (
      <Form className="layermap_form">
       <Form.Field>
         <h4>ID Luminaria: {luminaria.idluminaria}</h4>
       </Form.Field>
       <Form.Field>
         <h4>ID Nodo: {luminaria.idnodo}</h4>
       </Form.Field>
       <Form.Field>
         <h4>Tipo Conexión: </h4>
           <Dropdown id="ddlTipoConexion" name="ddlTipoConexion" onChange={this.onChangeEdit} value={luminaria.tipoconexion} className="dropdown_busqueda" placeholder='Seleccione Conexión' selection options={opcionesTipoConexion}/>
       </Form.Field>
       <Form.Field>
         <h4>Tipo: </h4>
          <Dropdown id="ddlTipo" name="ddlTipo" onChange={this.onChangeEdit} placeholder='Seleccione Tipo'  value={luminaria.tipo} selection options={opcionesTipo}/>
       </Form.Field>
       <Form.Field>
         <h4>Potencia:</h4>
          <Dropdown id="ddlPotencia" name="ddlPotencia" onChange={this.onChangeEdit} placeholder='Seleccione Potencia' value={luminaria.potencia} selection options={opcionesPotencia}/>
       </Form.Field>
       <Form.Field>
         <h4>Propiedad: </h4>
          <Dropdown id="ddlPropiedad" name="ddlPropiedad" onChange={this.onChangeEdit} placeholder='Seleccione Propiedad' value={luminaria.propiedad} selection options={opcionesPropiedad}/>
       </Form.Field>
       <Form.Field>
         <h4>Rótulo</h4>
         <Input id="txtRotulo" onChange={this.onChangeEdit} name="txtRotulo" type="text" placeholder='Rótulo' value={luminaria.rotulo}/>
       </Form.Field>
       <Form.Field>
         <h4>Observación: </h4>
         <Input id="txtObservacion" onChange={this.onChangeEdit} name="txtObservacion" type="text"  placeholder='Observación' value={luminaria.observacion} />
       </Form.Field>
       <Form.Field>
          <Divider inverted />
       </Form.Field>
       <Form.Field>
       <Button.Group className="btn_actions_wrapper" basic size="tiny">
         <Button className="btn_editwidget_actions" id="btnActualizar" onClick={this.onClick}>Actualizar</Button>
         <Button className="btn_editwidget_actions" id="btnEliminar" onClick={this.onClick}>Eliminar</Button>
         <Button className="btn_editwidget_actions" id="btnNuevo" onClick={this.onClick}>Nuevo</Button>
       </Button.Group>
       </Form.Field>
      </Form>
    );
  }else{
    return null;
  }
  }
}

const mapStateToProps = state => {

  return {
    luminaria: state.editWidgetManager.showCurrent,
    countLuminarias: state.editWidgetManager.lumsFoundInPoint.length,
    token: state.credentials.token,
    opcionesTipoConexion: state.combos_luminarias.tipo_conexion,
    opcionesTipo: state.combos_luminarias.tipo,
    opcionesPotencia: state.combos_luminarias.potencia,
    opcionesPropiedad: state.combos_luminarias.propiedad,
    valoresEditados: state.change_combos_edition,
    comuna: state.selected_comuna[0].queryvalue,
    currentIndex: state.editWidgetManager.currentIndex
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeCombo: (name,value) => dispatch(onChangeEdition(name, value)),

    onClickManager: (name, values, geometry, token) => dispatch(onClickEditWidget(name, values, geometry, token)),
    showModal: (header, content, open) => dispatch(showModal(header, content, open))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditLuminariaMultiple)
