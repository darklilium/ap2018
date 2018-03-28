import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider, Rail,Input  } from 'semantic-ui-react';
import muniStyle from '../../css/component1/busqueda_.scss';
import {onChangeBusqueda, onClickBusquedaWidget, showNotification, setMessage, selectedMenu, findPictures} from '../redux/actions';
import { connect } from 'react-redux';
import mapa from '../../services/map_service';
import BottomMessage from '../others/BottomMessage';


var options = [
    { value: 'ROTULO', text: 'Rótulo Poste', key: 1 },
    { value: 'IDNODO', text: 'ID Nodo', key: 2 },
    { value: 'NMEDIDOR', text: 'N° Medidor', key: 3},
    { value: 'NCLIENTE', text: 'N° Cliente', key: 4}
];

class SearchWidget extends React.Component {
    constructor(props){
      super(props);
      this.onClick = this.onClick.bind(this);
    }


    onClick(){

      let inputValue = document.getElementById('inputBusqueda').value;
      this.props
        .onClickBusqueda(this.props.busquedaType,inputValue, this.props.token, this.props.mapa, this.props.comuna[0].queryvalue)
        .then(done=>{
          console.log(done,"hecho");
          if(done.length){
            this.props.handleDismiss("Resultado encontrado", true)

          }else{
            this.props.handleDismiss("Resultado no encontrado", true);
          }
        })
        .catch(error=>{
          console.log(error,"error");
          this.props.handleDismiss("Error al realizar la búsqueda", true);
        })

    }

    render() {
        const { busquedaType, busquedaTypeDefault, onChangeBusqueda, onClickBusqueda, found } = this.props;

        return (
           <Rail className="rail_busqueda_wrapper" attached internal position='left'>
            <div className="wrapper_busqueda">
              <h3>Seleccione elemento técnico - comercial:</h3>
              <Divider inverted />
              <Dropdown className="dropdown_busqueda" placeholder='Seleccione Elemento' fluid selection options={options}
              defaultValue={busquedaTypeDefault} onChange={onChangeBusqueda}/>
              <Input type="text" id="inputBusqueda" className="input_busqueda" placeholder='Valor' text={found.value} />
              <Divider inverted />
              <Button className="btn_busqueda" onClick={this.onClick}>Buscar</Button>
              <BottomMessage />
            </div>
          </Rail>
        );
    }

}

const mapStateToProps = (state) =>{

  return {
    busquedaType: state.searchWidgetManager.searchType,
    busquedaTypeDefault: state.searchWidgetManager.searchType,
    token: state.credentials.token,
    mapa: mapa.getMap(),
    found: state.searchWidgetManager,
    comuna: state.selected_comuna
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeBusqueda: (e,searchType) => dispatch(onChangeBusqueda(searchType.value)),
    onClickBusqueda: (searchType, value, token, mapa, comuna) => dispatch(onClickBusquedaWidget(searchType, value, token, mapa, comuna)),
    handleDismiss(notification,visibility) {
      dispatch(showNotification(visibility)),
      dispatch(setMessage(notification))
    },
    selectedMenu: (selected) => dispatch(selectedMenu(selected)),

    getPictures: (token,idnodoOID) => dispatch(findPictures(token,idnodoOID))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchWidget);
