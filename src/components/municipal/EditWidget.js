import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';

var options = [
    { value: 'ROTULO', text: 'Rótulo Poste', key: 1 },
    { value: 'IDNODO', text: 'ID Nodo', key: 2 },
    { value: 'NMEDIDOR', text: 'N° Medidor', key: 3},
    { value: 'NCLIENTE', text: 'N° Cliente', key: 4}
];

class EditWidget extends React.Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })
    render() {
        return (
          <Rail className="rail_layermap_wrapper" attached internal position='left'>
            <div className="wrapper_layermap">
              <h3>Editar Luminaria: </h3>
              <Divider inverted />
              <Form className="layermap_form">
               <Form.Field>
                 <h3>ID Luminaria:</h3>
                 <h3>ID Luminaria:</h3>
               </Form.Field>
               <Form.Field>
                 <h3>ID Nodo:</h3>
                 <h3>ID Nodo:</h3>
               </Form.Field>
               <Form.Field>
                 <h3>Tipo Conexión:</h3>
                 <Dropdown className="dropdown_busqueda" placeholder='Seleccione Elemento' fluid selection options={options}/>
               </Form.Field>
              </Form>
            </div>
          </Rail>
        );
    }

}

export default EditWidget
