import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Responsive } from 'semantic-ui-react';
import muniStyle from '../../css/component1/meters_.scss';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {getMetersData, getMeterLocation, getDataLuminariasAsociadas, getDataTramosAsociados, getLuminariaInfo, selectedMenu} from '../redux/actions';
import {gLayerMedidor} from '../../services/medidores_service';
import graphicsUtils from 'esri/graphicsUtils';
import mapa from '../../services/map_service';

const columns = [{
    Header: 'OBJECTID',
    accessor: 'oid',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["oid"] }),
    filterAll: true,
    show: false
  }, {
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

  const columnsLum = [{
      Header: 'OBJECTID',
      accessor: 'oid',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["oid"] }),
      filterAll: true,
      show: false
    }, {
      Header: 'ID Luminaria',
      accessor: 'idluminaria',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["idluminaria"] }),
      filterAll: true
    }, {
      Header: 'Tipo Conexión',
      accessor: 'tipo_conexion',
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["tipo_conexion"] }),
      filterAll: true
    }, {
      Header: 'Propiedad',
      accessor: 'propiedad', // Custom value accessors!
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["propiedad"] }),
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
    constructor(props){
      super(props);
      this.state = {
        idequipo: '',
        nromedidor: '',
        width: 0,
        selectedMedidor: null,
        selectedLuminaria: null,
        cantidad_luminarias: 0,
        cantidad_tramos: 0
      }


      this.onClickMedidor = this.onClickMedidor.bind(this);
      this.onClickLuminaria = this.onClickLuminaria.bind(this);

    }

    handleOnUpdate = (e, { width }) => {};

    handleChange = (e, { value }) => this.setState({ value })

    onClickMedidor(index, info){
      this.setState({selectedMedidor: index});
      var map = mapa.getMap();

      (info.nro_medidor==" ") ? this.setState({idequipo: info.idequipo, nromedidor: 'No especificado'}) : this.setState({idequipo: info.idequipo, nromedidor: info.nro_medidor});

      //obtener luminarias asociadas a medidor:
      this.props.getDataLuminariasAsociadas(this.props.token, this.props.comuna, info.idequipo);

      //obtener tramos asociados a medidor
      this.props.getDataTramosAsociados(this.props.token, this.props.comuna, info.idequipo)
        .then(tramos=>{
          //Obtener ubicacion del medidor
          this.props.onClickUbicarMedidor(this.props.token, info.idequipo)
            .then(medidores=>{

              if(!tramos.length){
                console.log("tramos", tramos.length);
                var mql = window.matchMedia("(max-width: 767px)");
                var myExtend = graphicsUtils.graphicsExtent(medidores);
                (mql.matches) ? map.setExtent(myExtend.offset(0,7),true) :  map.setExtent(myExtend.offset(-6,-3), true);
              }else{
                var mql = window.matchMedia("(max-width: 767px)");
                var myExtend = graphicsUtils.graphicsExtent(tramos);
                (mql.matches) ? map.setExtent(myExtend.offset(0,7),true) :  map.setExtent(myExtend.offset(-50,-3), true);
              }
            });
        })
        .catch(error=>{
          this.setState({cantidad_tramos: 0})
        })
    }

    onClickLuminaria(index, info){
      this.setState({selectedLuminaria: index});
      this.props.getLuminariaInfo(this.props.token, info.idluminaria)
      .then(luminaria=>{
        console.log(luminaria,"holi");
        document.getElementById("editar_btn").addEventListener('click', (e)=>{
          console.log("holi desde boton click editar"); //funciona
          this.props.selectedMenu('edit');
        })
      })
      .catch(error=>{
        console.log(error,"adios");
      })

    }

    componentDidMount(){
      this.props.getDataMedidores(this.props.token,this.props.comuna)
      .then(data=>{

      })
      .catch(error=>{

      })
    }

    render() {
        const {width} = this.state;
        const {dataMedidores, dataLuminarias} = this.props;

        return (

         <Rail className="rail_meters_wrapper" attached internal position='left'>
           <Responsive as={Container}  minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
            <div className="wrapper_meters">
              <div className="wrapper_divider_export">
                <Divider className="meters_horizontal_divider" horizontal inverted>Medidores:</Divider>
                  <Button color="red" circular className="meter_export_btn" onClick={this.onClick} >Exportar</Button>
              </div>

             <ReactTable
                data={dataMedidores}
                filterable
                columns={columns}
                defaultPageSize={3}
                className="-striped -highlight"
                showPageSizeOptions={false}
                getTdProps={(state,rowInfo,column,instance)=>{
                  if(typeof rowInfo !== 'undefined'){
                    return {
                        onClick: (e) => {
                            this.onClickMedidor(rowInfo.index, rowInfo.row)
                        },
                        style: {
                            background: rowInfo.index === this.state.selectedMedidor ? '#980000' : '',
                            color: rowInfo.index === this.state.selectedMedidor ? 'white' : ''
                        }
                    }
                  }else{
                    return {
                        onClick: (e) => {
                            this.onClickMedidor(rowInfo.index, rowInfo.row)
                        }
                  }}
                }}

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
              data={dataLuminarias}
              filterable
              columns={columnsLum}
              defaultPageSize={3}
              showPageSizeOptions={false}
              className="-striped -highlight"
              getTdProps={(state,rowInfo,column,instance)=>{
                if(typeof rowInfo !== 'undefined'){
                  return {
                      onClick: (e) => {
                          this.onClickLuminaria(rowInfo.index, rowInfo.row)
                      },
                      style: {
                          background: rowInfo.index === this.state.selectedLuminaria ? '#980000' : '',
                          color: rowInfo.index === this.state.selectedLuminaria ? 'white' : ''
                      }
                  }
                }else{
                  return {
                      onClick: (e) => {
                          this.onClickLuminaria(rowInfo.index, rowInfo.row)
                      }
                }}
              }}
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
                 data={dataMedidores}
                 filterable
                 columns={columns}
                 defaultPageSize={3}
                   showPageSizeOptions={false}
                 className="-striped -highlight"
                 getTdProps={(state,rowInfo,column,instance)=>{
                   if(typeof rowInfo !== 'undefined'){
                     return {
                         onClick: (e) => {
                             this.onClickMedidor(rowInfo.index, rowInfo.row)
                         },
                         style: {
                             background: rowInfo.index === this.state.selectedMedidor ? '#980000' : '',
                             color: rowInfo.index === this.state.selectedMedidor ? 'white' : ''
                         }
                     }
                   }else{
                     return {
                         onClick: (e) => {
                             this.onClickMedidor(rowInfo.index, rowInfo.row)
                         }
                   }}
                 }}
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
                data={dataLuminarias}
                filterable
                columns={columnsLum}
                defaultPageSize={3}
                showPageSizeOptions={false}
                className="-striped -highlight"
                getTdProps={(state,rowInfo,column,instance)=>{
                  if(typeof rowInfo !== 'undefined'){
                    return {
                        onClick: (e) => {
                            this.onClickLuminaria(rowInfo.index, rowInfo.row)
                        },
                        style: {
                            background: rowInfo.index === this.state.selectedLuminaria ? '#980000' : '',
                            color: rowInfo.index === this.state.selectedLuminaria ? 'white' : ''
                        }
                    }
                  }else{
                    return {
                        onClick: (e) => {
                            this.onClickLuminaria(rowInfo.index, rowInfo.row)
                        }
                  }}
                }}
              />
            </div>


           </div>
         </Responsive>
        </Rail>



        );
    }

}

const mapStateToProps = (state) =>{
  return {
    dataMedidores: state.medidores_data.dataMedidores,
    dataLuminarias: state.luminarias_asociadas.luminariasAsociadas,
    dataTramos: state.tramos_asociados.tramosAsociados,
    comuna: state.selected_comuna[0].value,
    token: state.credentials.token,
    luminariaSelected: state.luminaria_asociada_info.luminariaSelected
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getDataMedidores: (token,comuna) => dispatch(getMetersData(token,comuna)),
    onClickUbicarMedidor: (token, idequipo) => dispatch(getMeterLocation(token, idequipo)),
    getDataLuminariasAsociadas: (token, comuna, idequipo) => dispatch(getDataLuminariasAsociadas(token,comuna,idequipo)),
    getDataTramosAsociados:  (token, comuna, idequipo) => dispatch(getDataTramosAsociados(token,comuna,idequipo)),
    getLuminariaInfo: (token,idluminaria) => dispatch(getLuminariaInfo(token,idluminaria)),
    selectedMenu: (selected) => dispatch(selectedMenu(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetersWidget)
