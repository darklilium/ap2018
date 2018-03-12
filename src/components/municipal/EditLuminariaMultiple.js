import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';
import muniStyle2 from '../../css/component1/busqueda_.scss';
import muniStyle3 from '../../css/component1/edit_.scss'
import { connect } from 'react-redux';


class EditElement extends React.Component {

    render(){
      const {luminaria, opcionesPotencia, opcionesTipoConexion, opcionesTipo, opcionesPropiedad,
        onChangeEdit} = this.props;

      return (
      <Form className="layermap_form">
       <Form.Field>
         <h4>ID Luminaria: {luminaria[0].ID_LUMINARIA}</h4>
       </Form.Field>
       <Form.Field>
         <h4>ID Nodo: {luminaria[0].ID_NODO}</h4>
       </Form.Field>
       <Form.Field>
         <h4>Tipo Conexión: </h4>
           <Dropdown onChange={onChangeEdit} defaultValue={luminaria[0].tipo_conexion} className="dropdown_busqueda" placeholder='Seleccione Conexión' fluid selection options={opcionesTipoConexion}/>
       </Form.Field>
       <Form.Field>
         <h4>Tipo: </h4>
          <Dropdown  onChange={onChangeEdit} placeholder='Seleccione Tipo'  defaultValue={luminaria[0].tipo} selection options={opcionesTipo}/>
       </Form.Field>
       <Form.Field>
         <h4>Potencia:</h4>
          <Dropdown  onChange={onChangeEdit} placeholder='Seleccione Potencia' defaultValue={luminaria[0].potencia} selection options={opcionesPotencia}/>
       </Form.Field>
       <Form.Field>
         <h4>Propiedad: </h4>
          <Dropdown onChange={onChangeEdit} placeholder='Seleccione Propiedad' defaultValue={luminaria[0].propiedad} selection options={opcionesPropiedad}/>
       </Form.Field>
       <Form.Field>
         <h4>Rótulo</h4>
         <Input key="text" placeholder='Rótulo' text={luminaria[0].ROTULO}/>
       </Form.Field>
       <Form.Field>
         <h4>Observación: </h4>
         <Input key="text"  placeholder='Observación'  />
       </Form.Field>
       <Form.Field>
          <Divider inverted />
       </Form.Field>
       <Form.Field>
       <Button.Group className="btn_actions_wrapper" basic size="tiny">
         <Button className="btn_editwidget_actions">Actualizar</Button>
         <Button className="btn_editwidget_actions">Eliminar</Button>
         <Button className="btn_editwidget_actions">Nuevo</Button>
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
    opcionesPropiedad: state.combos_luminarias.propiedad
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onChangeEdit: (e,valor) => dispatch(onChangeonChangeEditing(e, valor.value))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditElement)
