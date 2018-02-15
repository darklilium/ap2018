import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header, Form, Checkbox } from 'semantic-ui-react';
import $ from 'jquery';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";


import {changeWidth, getCredentials, getUser, getPassword, showNotification, setMessage} from '../redux/actions';

import env from '../../services/config';

import styles from '../../css/myStyles.scss';

import BottomMessage from '../others/BottomMessage';

class Login extends React.Component {



  handleOnUpdate = (e, { width }) => {};


  componentDidMount(){
    $('#app_wrapper').removeClass("wrapper_dashboard").addClass("wrapper");

    TweenMax.to(".wrapper",5,{
      opacity: "1",
      transition: "opacity .5s ease",
      visibility: "visible"
    });
  }

  onClickLogin(){
    let credentials = {
      user: document.getElementById('usuario').value,
      password: document.getElementById('password').value,
      vialactea: document.getElementById('usuario').value.includes('vialactea\\'),
      municipal: (document.getElementById('usuario').value.substring(0,4)=='muni')
    }


    this.props
       .getCredentials(credentials)
       .then(() => {
         (credentials.municipal) ? this.props.history.push("/municipalidad") : this.props.history.push("/dashboard")
       })
       .catch(()=> {
        console.log("error");
        this.props.handleDismiss("Error al iniciar sesión", true);
       });
  }

  render(){
    const {width, message, visibleMsg} = this.props;

    const login =
      <div className="inner_wrapper">
        <Responsive as={Container}  minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
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
            <Form>
             <Form.Field>
              <Input id="usuario" className="input_login" required autoComplete="username" icon='user circle' iconPosition='left' placeholder='Usuario'  />
             </Form.Field>
             <Form.Field>
               <Input id="password" type="password" required autoComplete="current-password" className="input_login" icon='lock' iconPosition='left' placeholder='Contraseña' />
             </Form.Field>

             <Container className="input_login_container">
              <Divider ></Divider>
               <Button className="btn_login"  onClick={this.onClickLogin.bind(this)}>Login</Button>
             </Container>
           </Form>
               <br />

            </Container>
            <BottomMessage />

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
         <Form>
          <Form.Field>
            <Input id="usuario" className="input_login" required autoComplete="username" icon='user circle' iconPosition='left' placeholder='Usuario' />
            <br />
          </Form.Field>
          <Form.Field>
            <Input id="password" type="password" required autoComplete="current-password" className="input_login" icon='lock' iconPosition='left' placeholder='Contraseña' />
          </Form.Field>
             <Divider ></Divider>
            <Button className="btn_login" onClick={this.onClickLogin.bind(this)}>Login</Button>
          </Form>
         </Container>
          <BottomMessage />

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

const mapStateToProps = (state) =>{
  return {
    credentials: state.credentials
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCredentials: (credentials) => dispatch(getCredentials(credentials)),
    handleDismiss(notification,visibility) {
      dispatch(showNotification(visibility)),
      dispatch(setMessage(notification))
    }
  }
}

  export default connect(mapStateToProps,mapDispatchToProps)(Login);
