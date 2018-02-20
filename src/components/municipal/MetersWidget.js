import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Responsive } from 'semantic-ui-react';
import muniStyle from '../../css/component1/meters_.scss';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';

var data = [{
    idequipo: "5441126718",
    nro_medidor: "239445_LIN_DDS71NE",
    nis:"723644",
    cant_luminarias: "19",
    cant_tramos: "23",
    tipo: "Equipo Medida AP + Equipo Control AP",
    rotulo: "999999"
  },{
    idequipo: "341126718222",
    nro_medidor: "56165156_LIN_DDS71NE",
    nis:"9999",
    cant_luminarias: "9",
    cant_tramos: "3",
    tipo: "Equipo Control AP",
    rotulo: "999999"
  },{
    idequipo: "341126718222",
    nro_medidor: "56165156_LIN_DDS71NE",
    nis:"9999",
    cant_luminarias: "19",
    cant_tramos: "3",
    tipo: "Equipo Control AP",
    rotulo: "999999"
  },{
    idequipo: "341126718222",
    nro_medidor: "56165156_LIN_DDS71NE",
    nis:"9999",
    cant_luminarias: "29",
    cant_tramos: "3",
    tipo: "Equipo Control AP",
    rotulo: "999999"
  },{
    idequipo: "341126718222",
    nro_medidor: "56165156_LIN_DDS71NE",
    nis:"9999",
    cant_luminarias: "39",
    cant_tramos: "3",
    tipo: "Equipo Control AP",
    rotulo: "999999"
}];

const columns = [{
  Header: 'Name',

    Header: 'ID Equipo',
    accessor: 'idequipo',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["idequipo"] }),
    filterAll: true
  }, {
    Header: 'Nro. Medidor',
    accessor: 'nro_medidor',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["nro_medidor"] }),
    filterAll: true
  }, {
    id: 'nis', // Required because our accessor is not a string
    Header: 'NIS',
    accessor: 'nis', // Custom value accessors!
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["nis"] }),
    filterAll: true
  }, {
    Header: 'Cant. Luminarias', // Custom header components!
    accessor: 'cant_luminarias',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["cant_luminarias"] }),
    filterAll: true
  }, {
    Header: 'Cant. Tramos', // Custom header components!
    accessor: 'cant_tramos',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["cant_tramos"] }),
    filterAll: true
  }, {
    Header: 'Tipo', // Custom header components!
    accessor: 'tipo',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["tipo"] }),
    filterAll: true
  }, {
    Header: 'Rótulo', // Custom header components!
    accessor: 'rotulo',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["rotulo"] }),
    filterAll: true
  }]

class MetersWidget extends React.Component {
    state = {
      idequipo: '5615616',
      nromedidor: '9845891',
      width: 0
    }

    handleOnUpdate = (e, { width }) => {};

    handleChange = (e, { value }) => this.setState({ value })
    render() {
        const {width} = this.state;
        return (

         <Rail className="rail_meters_wrapper" attached internal position='left'>
           <Responsive as={Container}  minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
            <div className="wrapper_meters">
              <div className="wrapper_divider_export">
                <Divider className="meters_horizontal_divider" horizontal inverted>Medidores:</Divider>
                  <Button color="red" circular className="meter_export_btn" onClick={this.onClick} >Exportar</Button>
              </div>
              <ReactTable
                data={data}
                filterable
                columns={columns}
                defaultPageSize={3}
                className="-striped -highlight"
              />
              <div className="wrapper_divider_export wrapper_divider_export_padding">
                  <Divider className="meters_horizontal_divider" horizontal inverted>Luminarias Asociadas: </Divider>
                  <Button color="red" circular className="meter_export_btn" onClick={this.onClick} >Exportar</Button>
              </div>

              <div className="wrapper_meters_titles">
                <h3>Luminarias de ID Equipo: {this.state.idequipo}</h3>
                <h3>N° Medidor: {this.state.nromedidor}</h3>
              </div>
            <ReactTable
              data={data}
              filterable
              columns={columns}
              defaultPageSize={3}
              className="-striped -highlight"
            />
            </div>
          </Responsive>

          <Responsive as={Container} minWidth={768} maxWidth={2560} onUpdate={this.handleOnUpdate}>
           <div className="wrapper_meters_768">
            <div className="wrapper_meters_left">
              <div className="wrapper_divider_export">
                <Divider className="meters_horizontal_divider" horizontal inverted>Medidores:</Divider>
                <Button color="red" circular className="meter_export_btn" onClick={this.onClick} >Exportar</Button>
              </div>
              <ReactTable
                 data={data}
                 filterable
                 columns={columns}
                 defaultPageSize={3}
                 className="-striped -highlight"
              />
            </div>
            <div className="wrapper_meters_right">
              <div className="wrapper_divider_export">
                  <Divider className="meters_horizontal_divider" horizontal inverted>Luminarias Asociadas: </Divider>
                  <Button color="red" circular className="meter_export_btn" onClick={this.onClick} >Exportar</Button>
              </div>
              <div className="wrapper_meters_titles">
                  <h3>Luminarias de ID Equipo: {this.state.idequipo}</h3>
                  <h3>N° Medidor: {this.state.nromedidor}</h3>
              </div>
              <ReactTable
                data={data}
                filterable
                columns={columns}
                defaultPageSize={3}
                className="-striped -highlight"
              />
            </div>


           </div>
         </Responsive>
        </Rail>



        );
    }

}

export default MetersWidget
