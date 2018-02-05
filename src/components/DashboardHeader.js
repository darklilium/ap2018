import React, { Component } from 'react'
import { Menu, Button, Icon, Label  } from 'semantic-ui-react'
const style = {background: 'red', color: 'white', margin: '0px'}
import env from '../services/config';

export default class DashboardHeader extends Component {
  constructor(props){
    super(props);
  }

  state = {user: 'Evelyn'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, user } = this.state

    return (
      <Menu fluid style={style}>
        <Menu.Item style={style}>
          <img src={env.CSSDIRECTORY+'/images/logo_ap.png'} />
          <h1 className='dashboard_banner_title'>{this.props.title}</h1>
        </Menu.Item>

        <Menu.Menu position='right'>
          <div className="welcome_title">
            <h2>Bienvenido/a</h2>
            <h4>{user}</h4>
          </div>
          <Button icon>
            <Icon name='power' />
          </Button>
        </Menu.Menu>

      </Menu>
    )
  }
}
