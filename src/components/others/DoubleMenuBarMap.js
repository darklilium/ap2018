import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container } from 'semantic-ui-react'

var styled = {
  Visibility: 'visible'
}

var myItem = null;

class SidebarTopPush extends Component {
  state = { visible: false, nameClicked: '', showSegment: false, nameClicked: '' }

  toggleVisibility = (e, name) => {

    this.setState({ visible: !this.state.visible, showSegment: !this.state.visible});

    if(!this.state.visible){
      console.log("enabled");

    }else{
      console.log("disabled");
      this.setState({nameClicked: ''})
    }
  }

  onClick = (e,{name}) => {this.setState({nameClicked: name});}

  render() {

    var { visible, nameClicked, showSegment } = this.state

    if(showSegment){
      switch(nameClicked) {
        case 'home':
        myItem =  <Segment basic>
                <Header as='h3'>home</Header>
                <div>hola</div>
              </Segment>
        break;

        case 'gamepad':
        myItem =  <Segment basic>
                <Header as='h3'>gamepad</Header>
                  <div>hola</div>
              </Segment>
        break;

        case 'camera':
        myItem =  <Segment basic>
                <Header as='h3'>camera</Header>
                <div>hola</div>
              </Segment>
        break;
        default:
         myItem = null
        break;
      }
    }else{
       myItem = null
    }


    return (
      <div>
        
        {/* Burger Button Menu*/}
        <Button onClick={this.toggleVisibility}><Icon name='content' /></Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' direction='top' visible={visible} inverted>
            <Menu.Item name='home' onClick={this.onClick}>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' onClick={this.onClick}>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera' onClick={this.onClick}>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
             {myItem}
          </Sidebar.Pusher>
            <Sidebar.Pusher>
             <Segment basic>
              <Header as='h3'>Application Content</Header>

            </Segment>
          </Sidebar.Pusher>

        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarTopPush
