import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';
import {connect} from 'react-redux';
import {map_selected} from '../redux/actions';

class LayerMapWidget extends React.Component {

    render() {
        const {handleChange, value} = this.props;
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
                   onChange={handleChange}
                   checked={value=='topo'}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Híbrido'
                   name='radioGroup'
                   value='hybrid'
                   onChange={handleChange}
                    checked={value=='hybrid'}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Aéreo'
                   name='radioGroup'
                   value='aerial'
                   onChange={handleChange}
                    checked={value=='aerial'}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Aéreo con Etiquetas'
                   name='radioGroup'
                   value='aerialWithLabels'
                   checked={value=='aerialWithLabels'}
                   onChange={handleChange}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Caminos'
                   name='radioGroup'
                   value='roads'
                   checked={value=='roads'}
                   onChange={handleChange}
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

const mapStateToProps = (state) => {
  return {
    value: state.map_selector.value
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    handleChange: (e,{value}) => dispatch(map_selected(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerMapWidget)
