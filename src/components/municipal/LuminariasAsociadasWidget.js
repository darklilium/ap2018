import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Responsive } from 'semantic-ui-react';
import muniStyle from '../../css/component1/meters_.scss';
import ReactTable from "react-table";
import {changeActiveIndex, getMetersData, getMeterLocation, getDataLuminariasAsociadas, getDataTramosAsociados, getLuminariaInfo, selectedMenu, findPictures, highlightRow, activeLoader} from '../redux/actions';
import matchSorter from 'match-sorter';

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


class LuminariasAsociadasWidget extends React.Component {
  constructor(props){
    super(props);

    this.onClickLuminaria = this.onClickLuminaria.bind(this);
    this.onClickExportar = this.onClickExportar.bind(this);
  }

  onClickLuminaria(index, info){
    this.props.highlightRow(index, "luminariaAsoc");
    //this.setState({selectedLuminaria: index});
    this.props.getLuminariaInfo(this.props.token, info.idluminaria, this.props.comuna)
    .then(luminaria=>{

      
        console.log("holi desde boton click editar luminarias asociadas widget"); //funciona
        //buscar fotos de esa luminaria
        this.props.getPictures(this.props.token, luminaria[0].attributes.ID_NODO);
        //cambiar a index 0 (primer tab)
        this.props.changeTab(0);
        this.props.selectedMenu('editsingle');

    })
    .catch(error=>{
      console.log(error,"adios");
    })

  }

  onClickExportar(e,name){

    const {dataMedidores, dataLuminarias} = this.props;

    switch (name.id) {
      case 'meter_export_btn':
        exportToExcel(dataMedidores, "MedidoresAP_", true)
      break;

      case 'luminariasAsoc_export_btn':
        exportToExcel(dataLuminarias, "LuminariasAP_Asociadas_ID_Equipo_"+ this.state.idequipo , true);

      break;
    }
  }

    render() {
        const {dataMismoCircuito, selectedLuminaria} = this.props;
        return (
          <ReactTable
            data={dataMismoCircuito}
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
                        background: rowInfo.index === selectedLuminaria ? '#980000' : '',
                        color: rowInfo.index === selectedLuminaria ? 'white' : ''
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
        );
    }

}

const mapStateToProps = state =>{
  return {
    dataMismoCircuito: state.luminaria_asociada_info.luminariasMismoCircuito,
    comuna: state.selected_comuna[0].queryvalue,
    token: state.credentials.token,
    selectedLuminaria: state.luminarias_asociadas.luminariaAsociadaSelected
  }
}

const mapDispatchToProps = dispatch => {
    return {
      highlightRow: (index,type, idequipo, nromedidor) => dispatch(highlightRow(index, type, idequipo, nromedidor)),
      getLuminariaInfo: (token,idluminaria, comuna) => dispatch(getLuminariaInfo(token,idluminaria, comuna)),
      selectedMenu: (selected) => dispatch(selectedMenu(selected)),
      getPictures: (token,idnodoOID) => dispatch(findPictures(token,idnodoOID)),
      changeTab: (activeIndex) => dispatch(changeActiveIndex(activeIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LuminariasAsociadasWidget)
