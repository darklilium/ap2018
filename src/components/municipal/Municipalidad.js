import React from 'react';
import ReactDOM from 'react-dom';
import env from '../../services/config';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import muniStyle from '../../css/component1/municipal.scss';
import $ from 'jquery';
import SidebarTopPush from '../others/DoubleMenuBarMap';
import HeaderMenu from './HeaderMenu';
import {selectedMenu} from '../redux/actions';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container } from 'semantic-ui-react';
import Map from 'esri/map';

var myItem = null;

class Municipalidad extends React.Component {

  constructor(props)  {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick = (e,{name}) => {

    this.props.selectedMenu(name);
    //this.setState({menuClicked: name});
  }

  render(){
     const {comuna, menuClicked, visible, showSegment} = this.props;

     if(showSegment){

       switch(menuClicked) {
         case 'search':
         myItem =  <div>
                 <Header as='h3'>search</Header>
                 <div>search</div>
               </div>
         break;

         case 'map':
         myItem =   <div>
                 <Header as='h3'>map</Header>
                 <div>map</div>
               </div>
         break;

         case 'meter':
         myItem =  <div>
                 <Header as='h3'>meter</Header>
                 <div>meter</div>
               </div>
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
            </Sidebar.Pusher>
            <Sidebar.Pusher>
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

  }
}

const mapStateToProps = state =>{
  console.log(state, "municipalidad state");
  return {
    comuna: state.selected_comuna,
    showSegment: state.toggle_segment,
    visible: state.toggle_visibility.visibleMenu,
    menuClicked: state.selected_menu.selectedMenu

  }
}

const mapDispatchToProps = dispatch =>{
  return {
    selectedMenu: (selected) => dispatch(selectedMenu(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Municipalidad);
