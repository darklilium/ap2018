import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import muniStyle from '../../css/component1/layermap_.scss';
import {connect} from 'react-redux';
import {map_selected, layer_selected} from '../redux/actions';

class LayerMapWidget extends React.Component {

    render() {
        const {handleChangeMap, mapSelected, handleChangeLayer, layerChecked} = this.props;
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
                   onChange={handleChangeMap}
                   checked={mapSelected=='topo'}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Híbrido'
                   name='radioGroup'
                   value='hybrid'
                   onChange={handleChangeMap}
                    checked={mapSelected=='hybrid'}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Aéreo'
                   name='radioGroup'
                   value='aerial'
                   onChange={handleChangeMap}
                    checked={mapSelected=='aerial'}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Aéreo con Etiquetas'
                   name='radioGroup'
                   value='aerialWithLabels'
                   checked={mapSelected=='aerialWithLabels'}
                   onChange={handleChangeMap}
                 />
               </Form.Field>
               <Form.Field>
                 <Radio
                   label='Caminos'
                   name='radioGroup'
                   value='roads'
                   checked={mapSelected=='roads'}
                   onChange={handleChangeMap}
                 />
               </Form.Field>
               <h3>Seleccione uno o más capas para visualizar:</h3>
               <Divider inverted />
                <Form.Field>
                  <Checkbox label='Luminarias' value="luminarias" checked={layerChecked.luminarias} onChange={handleChangeLayer}/>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Tramos AP' value="tramosap" checked={layerChecked.tramosap} onChange={handleChangeLayer}/>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Modificaciones' value="modificaciones" checked={layerChecked.modificaciones} onChange={handleChangeLayer}/>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Límite Comunal'  value="limitecomunal" checked={layerChecked.limitecomunal} onChange={handleChangeLayer}/>
                </Form.Field>
             </Form>
            </div>
          </Rail>
        );
    }

}

const mapStateToProps = (state) => {
  return {
    mapSelected: state.map_selector.value,
    layerChecked: state.layer_selector
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    handleChangeMap: (e,{value}) => dispatch(map_selected(value)),
    handleChangeLayer: (e,{value}) => dispatch(layer_selected(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerMapWidget)
