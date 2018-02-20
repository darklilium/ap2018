import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';

var options = [
    { value: 'ROTULO', text: 'Rótulo Poste', key: 1 },
    { value: 'IDNODO', text: 'ID Nodo', key: 2 },
    { value: 'NMEDIDOR', text: 'N° Medidor', key: 3},
    { value: 'NCLIENTE', text: 'N° Cliente', key: 4}
];

class LayerMapWidget extends React.Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })
    render() {
        return (
          <Rail className="rail_layermap_wrapper" attached internal position='left'>
            <div className="wrapper_layermap">
              <h3>Seleccione un mapa:</h3>
              <Divider inverted />
              <Form className="layermap_form">
               <Form.Field>
                 <Radio
                   label='Topográfico'
                   name='radioGroup'
                   value='topo'
                   checked={this.state.value==='topo'}
                   onChange={this.handleChange}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Híbrido'
                   name='radioGroup'
                   value='hybrid'
                   checked={this.state.value==='hybrid'}
                   onChange={this.handleChange}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Aéreo'
                   name='radioGroup'
                   value='aerial'
                   checked={this.state.value==='aerial'}
                   onChange={this.handleChange}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Aéreo con Etiquetas'
                   name='radioGroup'
                   value='aerialWithLabels'
                   checked={this.state.value==='aerialWithLabels'}
                   onChange={this.handleChange}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Caminos'
                   name='radioGroup'
                   value='roads'
                   checked={this.state.value==='roads'}
                   onChange={this.handleChange}
                 />
               </Form.Field>
               <h3>Seleccione uno o más capas para visualizar:</h3>
               <Divider inverted />

                <Form.Field>
                  <Checkbox label='Luminarias' defaultChecked />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Tramos AP' defaultChecked />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Modificaciones' defaultChecked />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Límite Comunal' defaultChecked />
                </Form.Field>
             </Form>
            </div>
          </Rail>
        );
    }

}

export default LayerMapWidget
