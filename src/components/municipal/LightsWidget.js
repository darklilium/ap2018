import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import mupropiedadtyle from '../../css/component1/meters_.scss';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';

var data = [{
    idluminaria: "5441126718",
    tipo_conexion: "239445_LIN_DDS71NE",
    propiedad:"723644",
    medido: "19",
    tipo: "23",
    potencia: "Equipo Medida AP + Equipo Control AP",
    rotulo: "999999"
},{
    idluminaria: "341126718222",
    tipo_conexion: "56165156_LIN_DDS71NE",
    propiedad:"9999",
    medido: "9",
    tipo: "3",
    potencia: "Equipo Control AP",
    rotulo: "999999"
},{
    idluminaria: "341126718222",
    tipo_conexion: "56165156_LIN_DDS71NE",
    propiedad:"9999",
    medido: "19",
    tipo: "3",
    potencia: "Equipo Control AP",
    rotulo: "999999"
},{
    idluminaria: "341126718222",
    tipo_conexion: "56165156_LIN_DDS71NE",
    propiedad:"9999",
    medido: "29",
    tipo: "3",
    potencia: "Equipo Control AP",
    rotulo: "999999"
},{
    idluminaria: "341126718222",
    tipo_conexion: "56165156_LIN_DDS71NE",
    propiedad:"9999",
    medido: "39",
    tipo: "3",
    potencia: "Equipo Control AP",
    rotulo: "999999"
}];

const columns = [{
    Header: 'ID Equipo',
    accessor: 'idluminaria',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["idluminaria"] }),
    filterAll: true
  }, {
    Header: 'Nro. Medidor',
    accessor: 'tipo_conexion',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["tipo_conexion"] }),
    filterAll: true
  }, {
    id: 'propiedad', // Required because our accessor is not a string
    Header: 'propiedad',
    accessor: 'propiedad', // Custom value accessors!
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["propiedad"] }),
    filterAll: true
  }, {
    Header: 'Cant. Luminarias', // Custom header components!
    accessor: 'medido',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["medido"] }),
    filterAll: true
  }, {
    Header: 'Cant. Tramos', // Custom header components!
    accessor: 'tipo',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["tipo"] }),
    filterAll: true
  }, {
    Header: 'Tipo', // Custom header components!
    accessor: 'tipo',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["potencia"] }),
    filterAll: true
  }, {
    Header: 'Rótulo', // Custom header components!
    accessor: 'rotulo',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["rotulo"] }),
    filterAll: true
  }]

class LightsWidget extends React.Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })
    render() {
        return (
         <Rail className="rail_meters_wrapper" attached internal position='left'>
            <div className="wrapper_meters">
            <ReactTable
              data={data}
              filterable
              columns={columns}
              defaultPageSize={3}
              className="-striped -highlight"
            />

            </div>
          </Rail>
        );
    }

}

export default LightsWidget
