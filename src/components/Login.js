import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header } from 'semantic-ui-react';
import env from '../services/config';
import styles from '../css/myStyles.scss';
import $ from 'jquery';
import {withRouter} from "react-router-dom";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageStatus: 'notloaded',
      width: 0
    }
  }


  handleOnUpdate = (e, { width }) => this.setState({ width })


  componentDidMount(){
    $('#app_wrapper').removeClass("wrapper_dashboard").addClass("wrapper");

    TweenMax.to(".wrapper",5,{
      opacity: "1",
      transition: "opacity .5s ease",
      visibility: "visible"
    });

    /*  let randomPicNumber = Math.floor((Math.random() * 6) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    let randomPicSrc = env.CSSDIRECTORY+ "/images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
    */
  }

  onClickLogin(){
      this.props.history.push("/dashboard");


  }

  render(){
    const { width } = this.state
    const login =
      <div className="inner_wrapper"><Responsive as={Container} minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
        <Container className="container_login">
          <Container className="container_login_image">
            <Header as='h2' icon textAlign='center'>
            <img src={env.CSSDIRECTORY+'/images/logo_ap.png'} />
            <Header.Content className="header_login_text">
              AP Chilquinta
              </Header.Content>
            </Header>
          </Container>

          <Container className="input_login_container">
             <Input className="input_login" icon='user circle' iconPosition='left' placeholder='Usuario' />
             <br />
             <Input  className="input_login" icon='lock' iconPosition='left' placeholder='Contraseña' />
          </Container>

          <Container className="input_login_container">
           <Divider ></Divider>
            <Button className="btn_login">Login</Button>
          </Container>
        </Container>
     </Responsive>

     {/* sobre 768 ancho hasta 960*/}
     <Responsive as={Container} minWidth={768} maxWidth={2560} onUpdate={this.handleOnUpdate}>
       <Container className="container_login">
         <Container className="container_login_image">
           <Header as='h2' icon textAlign='center'>
           <img src={env.CSSDIRECTORY+'/images/logo_ap.png'} />
           <Header.Content className="header_login_text">
             AP Chilquinta
             </Header.Content>
           </Header>
         </Container>

         <Container className="input_login_container">
            <Input className="input_login" icon='user circle' iconPosition='left' placeholder='Usuario' />
            <br />
            <Input  className="input_login" icon='lock' iconPosition='left' placeholder='Contraseña' />
             <Divider ></Divider>
            <Button className="btn_login" onClick = {this.onClickLogin.bind(this)}>Login</Button>
         </Container>


       </Container>
     </Responsive>
     </div>

      return (
        <div className="login-wrapper">
            {login}
         </div>
      );
    }
  }

  export default Login;
