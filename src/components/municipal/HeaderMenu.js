
import React from 'react';
import env from '../../services/config';
import { Image, Header, Button, Icon, Responsive, Container} from 'semantic-ui-react';
import {connect} from 'react-redux';
import store from '../../index';
import $ from 'jquery';
import {selectedMenu, showSegment, toggleVisibility, toggleSidebarVisibility} from '../redux/actions';

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

    }

    toggleVisible() {
      //this.setState({ visible: !this.state.visible, showSegment: !this.state.visible});
      var {visible, nameClicked} = this.props;

      this.props.toggleVisibility(!visible);


      if(!visible){
        console.log("enabled");


      }else{
        console.log("disabled");
        this.props.selectedMenu('');
          this.props.toggleSidebarVisibility(!visible);
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
                <div className="muni_header_button"><Button onClick={this.toggleVisible}><Icon name='content' /></Button></div>
              </Responsive>

              <Responsive className="muni_header_wrapper" minWidth={768} maxWidth={2560}>
                <LogoXL />
                <HeaderTitles muniName={this.props.comuna[0].text} background={this.props.comuna[0].value}/>
                <div className="muni_header_button"><Button onClick={this.toggleVisible}><Icon name='content' /></Button></div>
              </Responsive>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
  return {
    visible: state.toggle_visibility.visibleMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: (visible) => dispatch(toggleVisibility(visible)),
    selectedMenu: (selected) => dispatch(selectedMenu(selected)),
    toggleSidebarVisibility: (visible) => dispatch(toggleSidebarVisibility(visible))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderMenu);
