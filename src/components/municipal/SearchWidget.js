import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider, Rail  } from 'semantic-ui-react';
import muniStyle from '../../css/component1/busqueda_.scss';

var options = [
    { value: 'ROTULO', text: 'Rótulo Poste', key: 1 },
    { value: 'IDNODO', text: 'ID Nodo', key: 2 },
    { value: 'NMEDIDOR', text: 'N° Medidor', key: 3},
    { value: 'NCLIENTE', text: 'N° Cliente', key: 4}
];

class SearchWidget extends React.Component {


    render() {
        return (
           <Rail className="rail_busqueda_wrapper" attached internal position='left'>
            <div className="wrapper_busqueda">
              <h3>Seleccione elemento técnico - comercial:</h3>
              <Divider inverted />
              <Dropdown className="dropdown_busqueda" placeholder='Seleccione Elemento' fluid selection options={options} value={options[1].value} onChange={this.onChange}/>
              <Divider inverted />
              <Button className="btn_busqueda" onClick={this.onClick}>Buscar</Button>
            </div>
          </Rail>
        );
    }

}

export default SearchWidget
