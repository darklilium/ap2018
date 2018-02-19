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
import {selectedMenu, toggleSidebarVisibility} from '../redux/actions';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container , Modal, Rail } from 'semantic-ui-react';
import Map from 'esri/map';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import layers from '../../services/layers_service';


var myItem = null;

class Municipalidad extends React.Component {

  constructor(props)  {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      menuDirection: 'bottom'
    }
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
         myItem =  <div>
                 <Header as='h3'>light</Header>
                 <div>light</div>
               </div>
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


    var map = new Map("map", {
      center: this.props.comuna[0].extent,
      zoom: 13,
      basemap: "topo"
    });


    var layerDefinitions = [];
    layerDefinitions[0] = "COMUNA = '"+ this.props.comuna[0].queryvalue+"'";
    layerDefinitions[1] = "COMUNA = '"+ this.props.comuna[0].queryvalue+"'";
    layerDefinitions[2] = "COMUNA = '"+ this.props.comuna[0].queryvalue+"'";
    layerDefinitions[4] = "nombre = '"+ this.props.comuna[0].queryvalue+"'";

    var modificacionesLayer = new ArcGISDynamicMapServiceLayer(layers.read_dynamic_ap(this.props.token),{});
    modificacionesLayer.setImageFormat("png32");
    modificacionesLayer.setVisibleLayers([0]);
    modificacionesLayer.setLayerDefinitions(layerDefinitions);

    var luminariasLayer = new ArcGISDynamicMapServiceLayer(layers.read_dynamic_ap(this.props.token),{ minScale: 6000});
    luminariasLayer.setImageFormat("png32");
    luminariasLayer.setVisibleLayers([1]);
    luminariasLayer.setLayerDefinitions(layerDefinitions);

    var tramosLayer = new ArcGISDynamicMapServiceLayer(layers.read_dynamic_ap(this.props.token),{minScale: 6000});
    tramosLayer.setImageFormat("png32");
    tramosLayer.setVisibleLayers([2]);
    tramosLayer.setLayerDefinitions(layerDefinitions);

    var limiteComunalLayer = new FeatureLayer(layers.read_limiteComunal(this.props.token),{id:"ap_limiteComunal", mode: esri.layers.FeatureLayer.MODE_ONDEMAND});
    limiteComunalLayer.setDefinitionExpression("nombre   = '"+ this.props.comuna[0].queryvalue+"'" );

    map.addLayers([limiteComunalLayer, tramosLayer,luminariasLayer, modificacionesLayer]);


    map.on('dbl-click', (event)=>{
      console.log("doble click");
    });
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
    toggleSidebarVisibility: (visible) => dispatch(toggleSidebarVisibility(visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Municipalidad);
