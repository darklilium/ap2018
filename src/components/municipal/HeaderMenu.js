
import React from 'react';
import env from '../../services/config';
import { Image, Header, Button, Icon, Responsive, Container} from 'semantic-ui-react';
import {connect} from 'react-redux';
import store from '../../index';
import $ from 'jquery';

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
      this.toggleVisibility = this.toggleVisibility.bind(this);

    }

    toggleVisibility(e, name) {
      console.log(e,name,"clicked");
    }

    render() {
      const {comuna} = this.props;
        return (
            <div className="muni_header">

              <Responsive className="muni_header_wrapper" minWidth={320} maxWidth={767}>
                <Logo />
                <HeaderTitles muniName={this.props.comuna[0].text} background={this.props.comuna[0].value}/>
                <div className="muni_header_button"><Button onClick={this.toggleVisibility}><Icon name='content' /></Button></div>
              </Responsive>

              <Responsive className="muni_header_wrapper" minWidth={768} maxWidth={2560}>
                <LogoXL />
                <HeaderTitles muniName={this.props.comuna[0].text} background={this.props.comuna[0].value}/>
                <div className="muni_header_button"><Button onClick={this.toggleVisibility}><Icon name='content' /></Button></div>
              </Responsive>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderMenu);
