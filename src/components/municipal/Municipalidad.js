import React from 'react';
import ReactDOM from 'react-dom';
import env from '../../services/config';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import muniStyle from '../../css/component1/municipal.scss';
import $ from 'jquery';
import SidebarTopPush from '../others/DoubleMenuBarMap';
import HeaderMenu from './HeaderMenu';
import SearchWidget from './SearchWidget';
import LayerMapWidget from './LayerMapWidget';
import MetersWidget from './MetersWidget';
import LightsWidget from './LightsWidget';
import EditWidgetSingle from './EditWidgetSingle';
import EditWidgetMultiple from './EditWidgetMultiple';

import {selectedMenu, toggleSidebarVisibility, saveMap} from '../redux/actions';
import {getPotencias, getTipoConexion, getTipoLuminaria, getPropiedades} from '../redux/actions';

import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container , Modal, Rail } from 'semantic-ui-react';
import mapa from '../../services/map_service';

import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import domConstruct from "dojo/dom-construct";
import Popup from "esri/dijit/Popup";
import Color from "esri/Color";
import FeatureLayer from 'esri/layers/FeatureLayer';
import layers from '../../services/layers_service';
import makeSymbol from '../../services/makeSymbol';
import IdentifyTask from "esri/tasks/IdentifyTask";
import IdentifyParameters from "esri/tasks/IdentifyParameters";
import arrayUtils from "dojo/_base/array";
import InfoTemplate from "esri/InfoTemplate";
import Graphic from 'esri/graphic';
import {ap_infoWindow_luminaria} from '../../services/makeInfowindow';

var myItem = null;

class Municipalidad extends React.Component {

  constructor(props)  {
    super(props);
    this.onClick = this.onClick.bind(this);

  }

  onClick = (e,{name}) => {

    this.props.selectedMenu(name);
    if (this.props.visible) {
      this.props.toggleSidebarVisibility(this.props.visible)
    }else{
      this.props.toggleSidebarVisibility(!this.props.visible)
    }

  }

  render(){
     const {comuna, menuClicked, visible, showSegment, sidebar} = this.props;

     if(showSegment){

       switch(menuClicked) {
         case 'search':
         myItem = <SearchWidget />

         break;

         case 'map':
         myItem =  <LayerMapWidget />

         break;

         case 'meter':
         myItem =  <MetersWidget />

         break;
         case 'light':
         myItem =  <LightsWidget />
         break;

         case 'editsingle':
         myItem = <EditWidgetSingle />
         break;

         case 'editmultiple':
         myItem = <EditWidgetMultiple />
         break;

         default:
          myItem = null
         break;
       }
     }else{
       console.log("no hay segmento...");
        myItem = null
     }

     return (
         <div className="muni-wrapper">

          <HeaderMenu comuna={comuna}/>
              {/*Push al mapa solamente*/}
              <Sidebar.Pushable as={Segment} className="pushable_menu_wrapper">
                <Sidebar as={Menu} animation='push' direction='top' visible={visible} inverted className="pushable_menu_">

                  <Menu.Item name='search' onClick={this.onClick}>
                    <Icon name='search' />
                  </Menu.Item>
                  <Menu.Item name='map' onClick={this.onClick}>
                    <Icon name='clone' />
                  </Menu.Item>
                  <Menu.Item name='meter' onClick={this.onClick}>
                    <Icon name='dashboard' />
                  </Menu.Item>
                  <Menu.Item name='light' onClick={this.onClick}>
                    <Icon name='lightbulb' />
                  </Menu.Item>

                </Sidebar>

                <Sidebar.Pusher>
                  {myItem}
                  <div id="map" className="map_wrapper"></div>
                </Sidebar.Pusher>
              </Sidebar.Pushable>

         </div>
     )
  }

  componentDidMount(){

    $('#app_wrapper').removeClass("wrapper").addClass("wrapper_municipal");
    TweenMax.to(".wrapper_municipal",5,{
      opacity: "1",
      transition: "opacity .5s ease",
      visibility: "visible"
    });


    /*var mapa = new Map("map", {
      center: this.props.comuna[0].extent,
      zoom: 13,
      basemap: "topo"
    });
    */
    var popup = new Popup({
         fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
           new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
       }, domConstruct.create("div"));
    dojo.addClass(popup.domNode, "modernGrey");
    var mapp = mapa.createMap("map","topo",this.props.comuna[0].extent,13, popup);

    //this.props.saveMap(mapa);

    var layerDefinitions = [];
    layerDefinitions[0] = "COMUNA = '"+ this.props.comuna[0].queryvalue+"'";
    layerDefinitions[1] = "COMUNA = '"+ this.props.comuna[0].queryvalue+"'";
    layerDefinitions[2] = "COMUNA = '"+ this.props.comuna[0].queryvalue+"'";
    layerDefinitions[4] = "nombre = '"+ this.props.comuna[0].queryvalue+"'";

    var modificacionesLayer = new ArcGISDynamicMapServiceLayer(layers.read_dynamic_ap(this.props.token),{id:"ap_modificaciones"});
    modificacionesLayer.setImageFormat("png32");
    modificacionesLayer.setVisibleLayers([0]);
    modificacionesLayer.setLayerDefinitions(layerDefinitions);

    var luminariasLayer = new ArcGISDynamicMapServiceLayer(layers.read_dynamic_ap(this.props.token),{id:"ap_luminarias", minScale: 6000});
    luminariasLayer.setImageFormat("png32");
    luminariasLayer.setVisibleLayers([1]);
    luminariasLayer.setLayerDefinitions(layerDefinitions);

    var tramosLayer = new ArcGISDynamicMapServiceLayer(layers.read_dynamic_ap(this.props.token),{id:"ap_tramos", minScale: 6000});
    tramosLayer.setImageFormat("png32");
    tramosLayer.setVisibleLayers([2]);
    tramosLayer.setLayerDefinitions(layerDefinitions);

    var limiteComunalLayer = new FeatureLayer(layers.read_limiteComunal(this.props.token),{id:"ap_limiteComunal", mode: esri.layers.FeatureLayer.MODE_ONDEMAND});
    limiteComunalLayer.setDefinitionExpression("nombre   = '"+ this.props.comuna[0].queryvalue+"'" );

    mapp.addLayers([limiteComunalLayer, tramosLayer,luminariasLayer, modificacionesLayer]);


    mapp.on('dbl-click', (event)=>{
        var identifyTask, identifyParams;
        identifyTask = new IdentifyTask(layers.read_dynamic_ap(this.props.token));
        identifyParams = new IdentifyParameters();
        identifyParams.tolerance = 10;
        identifyParams.returnGeometry = true;
        identifyParams.layerIds = [0, 1];
        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
        identifyParams.width = mapp.width;
        identifyParams.height = mapp.height;
        identifyParams.geometry = event.mapPoint;
        identifyParams.mapExtent = mapp.extent;
        var onlyLum = [];


      var deferred = identifyTask.execute(identifyParams, (callback)=>{
        if(!callback.length){
          console.log("no hay length", callback);
        }else{
          let arrResults = callback.map(result => {
            let r = {
              features: result.feature,
              layerName: result.layerName
            }
            return r;
          });
          mapp.centerAndZoom(arrResults[0].features.geometry,20);
          onlyLum = arrResults.filter(element =>{ return element.layerName=='Luminarias' });
          return onlyLum;
        }

        },(errback)=>{
          console.log("ee",errback);
      });

     deferred.then(encontrados=>{
       console.log(encontrados,"encontrados");
       ap_infoWindow_luminaria(
         encontrados.feature.attributes.ID_LUMINARIA,
         encontrados.feature.attributes.ROTULO,
         encontrados.feature.attributes.TIPO_CONEXION,
         encontrados.feature.attributes.TIPO,
         encontrados.feature.attributes.PROPIEDAD,
         encontrados.feature.attributes.MEDIDO_TERRENO,
         encontrados.feature.geometry
       );

     })

  });



    //cargar combos de edit EditWidget que se usan:
    this.props.getPotencias(this.props.token);
    this.props.getTipoConexion(this.props.token);
    this.props.getTipo(this.props.token);
    this.props.getPropiedad(this.props.token);

  }
}

const mapStateToProps = state =>{

  return {
    comuna: state.selected_comuna,
    showSegment: state.toggle_segment,
    visible: state.toggle_visibility.visibleMenu,
    menuClicked: state.selected_menu.selectedMenu,
    token: state.credentials.token,
    sidebar: state.toggle_sidebar_visibility.visible
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    selectedMenu: (selected) => dispatch(selectedMenu(selected)),
    toggleSidebarVisibility: (visible) => dispatch(toggleSidebarVisibility(visible)),
    saveMap: (mapa) => dispatch(saveMap(mapa)),
    getPotencias: (token) => dispatch(getPotencias(token)),
    getTipoConexion: (token) => dispatch(getTipoConexion(token)),
    getTipo: (token) => dispatch(getTipoLuminaria(token)),
    getPropiedad: (token) => dispatch(getPropiedades(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Municipalidad);
