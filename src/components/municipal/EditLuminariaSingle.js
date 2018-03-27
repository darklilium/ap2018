import React from 'react'
import {Modal, Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';
import muniStyle2 from '../../css/component1/busqueda_.scss';
import muniStyle3 from '../../css/component1/edit_.scss'
import { connect } from 'react-redux';
import {showModal, onChangeEdition, onChangeEditionObject, onClickEditWidget} from '../redux/actions';

class EditLuminariaSingle extends React.Component {

    constructor(props){
      super(props);
      this.onClick = this.onClick.bind(this);
    }

    onClick(e, name){


      let {valoresEditados, luminaria, onChangeEditionObject, onClickManager, comuna, token} = this.props;

      Object.keys(valoresEditados).map(key => {

        if(valoresEditados[key] == ''){
          onChangeEditionObject(key, luminaria[0][key])
          valoresEditados[key] = luminaria[0][key]
        }

      });


      var accion = "nuevo";

      if(name.id=="btnActualizar"){
        accion="modificar";
      }
      if(name.id=="btnEliminar"){
        accion="eliminar";
      }

      let nuevosAttr = {
        rotulo: document.getElementById('txtRotulo').value,
        Comuna: comuna,
        corregido: "Revisar",
        tipo_cnx: valoresEditados.tipo_conexion,
        tipo:  valoresEditados.tipo,
        potencia:  valoresEditados.potencia,
        propiedad: valoresEditados.propiedad,
        eliminar: accion,
        obs: document.getElementById('txtObservacion').value,
        id_luminaria: luminaria[0].idluminaria,
        id_nodo: luminaria[0].idnodo
      }

      console.log("Datos:", name.id, nuevosAttr, luminaria[0].geometry, token);


      onClickManager(name.id, nuevosAttr, luminaria[0].geometry, token)
      .then(done=>{
        this.props.showModal("Edición de Luminaria", "Operación " + accion + " realizada", true )
      })
      .catch(error=>{

      })
    }

    render(){
      const {luminaria, opcionesPotencia, opcionesTipoConexion, opcionesTipo, opcionesPropiedad,
        onChangeEdit} = this.props;

      return (
      <Form className="layermap_form">
       <Form.Field>
         <h4>ID Luminaria: {luminaria[0].idluminaria}</h4>
       </Form.Field>
       <Form.Field>
         <h4>ID Nodo: {luminaria[0].idnodo}</h4>
       </Form.Field>
       <Form.Field>
         <h4>Tipo Conexión: </h4>
           <Dropdown id="ddlTipoConexion" name="ddlTipoConexion" onChange={onChangeEdit} defaultValue={luminaria[0].tipo_conexion} className="dropdown_busqueda" placeholder='Seleccione Conexión' fluid selection options={opcionesTipoConexion}/>
       </Form.Field>
       <Form.Field>
         <h4>Tipo: </h4>
          <Dropdown id="ddlTipo" name="ddlTipo" onChange={onChangeEdit} placeholder='Seleccione Tipo'  defaultValue={luminaria[0].tipo} selection options={opcionesTipo}/>
       </Form.Field>
       <Form.Field>
         <h4>Potencia:</h4>
          <Dropdown id="ddlPotencia" name="ddlPotencia" onChange={onChangeEdit} placeholder='Seleccione Potencia' defaultValue={luminaria[0].potencia} selection options={opcionesPotencia}/>
       </Form.Field>
       <Form.Field>
         <h4>Propiedad: </h4>
          <Dropdown id="ddlPropiedad" name="ddlPropiedad" onChange={onChangeEdit} placeholder='Seleccione Propiedad' defaultValue={luminaria[0].propiedad} selection options={opcionesPropiedad}/>
       </Form.Field>
       <Form.Field>
         <h4>Rótulo</h4>
         <Input id="txtRotulo" name="txtRotulo" type="text" placeholder='Rótulo' defaultValue={luminaria[0].rotulo}/>
       </Form.Field>
       <Form.Field>
         <h4>Observación: </h4>
         <Input id="txtObservacion" name="txtObservacion" type="text"  placeholder='Observación' defaultValue={luminaria[0].observacion} />
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
  }
}

const mapStateToProps = state => {
  return {
    luminaria: state.luminaria_asociada_info.luminariaSelected,
    token: state.credentials.token,
    opcionesTipoConexion: state.combos_luminarias.tipo_conexion,
    opcionesTipo: state.combos_luminarias.tipo,
    opcionesPotencia: state.combos_luminarias.potencias,
    opcionesPropiedad: state.combos_luminarias.propiedad,
    valoresEditados: state.change_combos_edition,
    comuna: state.selected_comuna[0].queryvalue
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeEdit: (e,{name,value}) => dispatch(onChangeEdition(name, value)),
    onChangeEditionObject: (attrName, value) => dispatch(onChangeEditionObject(attrName, value)),
    onClickManager: (name, values, geometry, token) => dispatch(onClickEditWidget(name, values, geometry, token)),
    showModal: (header, content, open) => dispatch(showModal(header, content, open))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditLuminariaSingle)
