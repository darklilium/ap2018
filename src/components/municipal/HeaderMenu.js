
import React from 'react';
import env from '../../services/config';
import { Image, Header, Button, Icon, Responsive, Container} from 'semantic-ui-react';
import {connect} from 'react-redux';
import store from '../../index';
import $ from 'jquery';
import {logout, selectedMenu, showSegment, toggleVisibility} from '../redux/actions';

const Logo = () =>{
  return (
    <Responsive minWidth={320} maxWidth={767}>
      <Image src={env.CSSDIRECTORY+'/images/logo_ap.png'} avatar className="logo_img" />
    </Responsive>);
}

const LogoXL = () =>{
  return (
    <Responsive minWidth={768} maxWidth={2560}>
      <div className="logoxl_wrapper"><Image src={env.CSSDIRECTORY+'/images/logo_ap.png'} size='mini' className="logo_img" />
      <h3>AP CHILQUINTA</h3></div>
    </Responsive>);
}

export class HeaderTitles extends React.Component {
  componentDidMount(){
    $(".muni_header_titles_wrapper").css("background-image", "url("+env.CSSDIRECTORY+"/images/dashboard_images/bg/"+this.props.background+".png)");

  }

  render(){
    return (
      <div className="muni_header_titles">
        <Responsive className="muni_header_titles_wrapper" minWidth={320} maxWidth={767}>
          <Header className="header_title main_title" size='small'>Ilustre Municipalidad de</Header>
          <Header className="header_title secondary_title" size='tiny'>{this.props.muniName}</Header>
        </Responsive>

        <Responsive className="muni_header_titles_wrapper" minWidth={768} maxWidth={2560}>
          <Header className="header_title main_title" size='large'>Ilustre Municipalidad de</Header>
          <Header className="header_title secondary_title" size='medium'>{this.props.muniName}</Header>
        </Responsive>

      </div>
    );
  }
}

class HeaderMenu extends React.Component {
    constructor(props){
      super(props);
      this.toggleVisible = this.toggleVisible.bind(this);
      this.onClickLogOff = this.onClickLogOff.bind(this);

    }
    onClickLogOff() {
      //this.props.properties.history.push("/");
      this.props.logout(true);
      window.location = env.INDEX;
    }

    toggleVisible() {

      var {visible, nameClicked} = this.props;

      this.props.toggleVisibility(!visible);

      if(!visible){
        console.log("enabled");

      }else{
        console.log("disabled");
        this.props.selectedMenu('');

        //this.setState({nameClicked: ''});


      }
    }

    render() {
      const {comuna} = this.props;
        return (
            <div className="muni_header">

              <Responsive className="muni_header_wrapper" minWidth={320} maxWidth={767}>
                <Logo />
                <HeaderTitles muniName={this.props.comuna[0].text} background={this.props.comuna[0].value}/>
                <div className="muni_header_button">
                  <Button className="btn_header_menu" onClick={this.toggleVisible}><Icon name='content' /></Button>
                  <Button className="btn_header_menu" onClick={this.onClickLogOff}><Icon name='power' /></Button>
                </div>
              </Responsive>

              <Responsive className="muni_header_wrapper" minWidth={768} maxWidth={2560}>
                <LogoXL />
                <HeaderTitles muniName={this.props.comuna[0].text} background={this.props.comuna[0].value}/>
                <div className="muni_header_button">
                  <Button className="btn_header_menu" onClick={this.toggleVisible}><Icon name='content' /></Button>
                  <Button className="btn_header_menu" onClick={this.onClickLogOff}><Icon name='power' /></Button>
                </div>
              </Responsive>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
  return {
    visible: state.menu_handler.visibleMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: (visible) => dispatch(toggleVisibility(visible)),
    selectedMenu: (selected) => dispatch(selectedMenu(selected)),
    logout: (log) => dispatch(logout(log))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderMenu);
