import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox } from 'semantic-ui-react';
import mupropiedadtyle from '../../css/component1/meters_.scss';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import {connect} from 'react-redux';
import LoaderMsg from '../others/LoaderMsg';
import {getLuminariaInfo3, showNotification, setMessage, tLuminariaInfo3, getDataLuminarias, changeActiveIndex , getMetersData, getMeterLocation, getDataLuminariasAsociadas, getDataTramosAsociados, getLuminariaInfo, selectedMenu, findPictures, highlightRow, activeLoader} from '../redux/actions';
import {gLayerMedidor} from '../../services/medidores_service';
import graphicsUtils from 'esri/graphicsUtils';
import mapa from '../../services/map_service';

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
      var map = mapa.getMap();
      this.setState({selectedLuminaria: index});
      this.props.getLuminariaInfo(this.props.token, info.idluminaria, this.props.comuna)
      .then(luminaria=>{


          console.log("holi desde clicking in grid on lights widget y tengo estas lumis", luminaria); //funciona

          this.props.getPictures(this.props.token, luminaria[0].attributes.ID_NODO);
          this.props.changeTab(0);
          this.props.selectedMenu('editsingle');

          //obtener luminarias asociadas a medidor con id diferente a 0:
          if(luminaria[0].attributes.ID_EQUIPO_AP!=0){
            this.props.getDataLuminariasAsociadasWidget(this.props.token, this.props.comuna, luminaria[0].attributes.ID_EQUIPO_AP)


            //obtener tramos asociados a medidor
            this.props.getDataTramosAsociados(this.props.token, this.props.comuna, luminaria[0].attributes.ID_EQUIPO_AP)
              .then(tramos=>{
                //Obtener ubicacion del medidor
                this.props.onClickUbicarMedidor(this.props.token, luminaria[0].attributes.ID_EQUIPO_AP)
                  .then(medidores=>{

                    if(!tramos.length){

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
          }else{
              this.props.handleDismiss("Resultado no encontrado", true);
          }



      })
      .catch(error=>{
        console.log(error,"adios");
      })

    }

    componentDidMount(){
      this.props.activeLoader(true,'LIGHTS');
      this.props.getDataLuminarias(this.props.token, this.props.comuna)
      .then(luminarias=>{
        console.log(luminarias,"luminarias");
        this.props.activeLoader(false,'LIGHTS');
      })
      .catch(error=>{
        console.log(error);
          this.props.activeLoader(false,'LIGHTS');
      })
    }

    render() {
        const {dataLuminarias} = this.props;

        return (
         <Rail className="rail_meters_wrapper" attached internal position='left'>

            <div className="wrapper_meters">
            <LoaderMsg />
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
    getLuminariaInfo: (token,idluminaria, comuna) => dispatch(getLuminariaInfo(token,idluminaria, comuna)),
    getPictures: (token,idnodoOID) => dispatch(findPictures(token,idnodoOID)),
    selectedMenu: (selected) => dispatch(selectedMenu(selected)),
    activeLoader: (activeStatus, type) => dispatch(activeLoader(activeStatus,type)),
    changeTab: (activeIndex) => dispatch(changeActiveIndex(activeIndex)),
    getDataLuminariasAsociadasWidget: (token, comuna, idequipo) => dispatch(getLuminariaInfo3(token,comuna,idequipo)),
    getDataTramosAsociados:  (token, comuna, idequipo) => dispatch(getDataTramosAsociados(token,comuna,idequipo)),
    onClickUbicarMedidor: (token, idequipo) => dispatch(getMeterLocation(token, idequipo)),
    handleDismiss(notification,visibility) {
      dispatch(showNotification(visibility)),
      dispatch(setMessage(notification))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LightsWidget);
