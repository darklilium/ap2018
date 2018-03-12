import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import mupropiedadtyle from '../../css/component1/meters_.scss';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import {connect} from 'react-redux';
import {getDataLuminarias, getLuminariaInfo, findPictures, selectedMenu} from '../redux/actions';


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

class LightsWidget extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selectedMedidor: null,
        selectedLuminaria: null
      }

      this.onClickLuminaria = this.onClickLuminaria.bind(this);

    }
    onClickLuminaria(index, info){
      this.setState({selectedLuminaria: index});
      this.props.getLuminariaInfo(this.props.token, info.idluminaria)
      .then(luminaria=>{

        document.getElementById("editar_btn").addEventListener('click', (e)=>{
          console.log("holi desde boton click editar"); //funciona
          //buscar fotos de esa luminaria
          this.props.getPictures(this.props.token, luminaria[0].attributes.ID_NODO);
          this.props.selectedMenu('editsingle');
        })
      })
      .catch(error=>{
        console.log(error,"adios");
      })

    }

    componentDidMount(){
      this.props.getDataLuminarias(this.props.token, this.props.comuna);
    }

    render() {
        const {dataLuminarias} = this.props;

        return (
         <Rail className="rail_meters_wrapper" attached internal position='left'>
            <div className="wrapper_meters">
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
          </Rail>
        );
    }

}

const mapStateToProps = state => {
  return {
    dataLuminarias: state.luminarias.luminariasComuna,
    comuna: state.selected_comuna[0].queryvalue,
    token: state.credentials.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataLuminarias: (token, comuna) => dispatch(getDataLuminarias(token,comuna)),
    getLuminariaInfo: (token,idluminaria) => dispatch(getLuminariaInfo(token,idluminaria)),
    getPictures: (token,idnodoOID) => dispatch(findPictures(token,idnodoOID)),
    selectedMenu: (selected) => dispatch(selectedMenu(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LightsWidget);
