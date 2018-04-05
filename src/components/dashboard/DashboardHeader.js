import React, { Component } from 'react'
import { Menu, Button, Icon, Label  } from 'semantic-ui-react'
const style = {background: '#313336', color: 'white', margin: '0px'}
import env from '../../services/config';
import style2 from '../../css/component1/dashboard.scss';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {logout} from '../redux/actions';

class DashboardHeader extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);

  }

  onClick(){
    this.props.logout(true);
    this.props.properties.history.push("/");

  }

  render() {
    const {credentials} = this.props;

    return (
      <Menu fluid style={style}>
        <Menu.Item style={style}>
          <img src={env.CSSDIRECTORY+'/images/logo_ap.png'} />
          <h1 className='dashboard_banner_title'>{this.props.title}</h1>
        </Menu.Item>

        <Menu.Menu position='right'>
          <div className="welcome_title">
            <h2>Bienvenido/a</h2>
            <h4>{credentials}</h4>
          </div>
          <Button className="btn_dashboard_logoff" icon onClick={this.onClick}>
            <Icon name='power' />
          </Button>
        </Menu.Menu>

      </Menu>
    )
  }
}

const mapStateToProps = state =>{
  return {
      credentials: state.credentials.user.user
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    logout: (log) => dispatch(logout(log))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DashboardHeader)
