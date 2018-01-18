import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header } from 'semantic-ui-react';
import env from '../services/config';
import styles from '../css/myStyles.scss';
import $ from 'jquery';


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

    TweenMax.to("body",5,{
      opacity: "1",
      transition: "opacity .5s ease",
      visibility: "visible"
    });


  }
  render(){
    const { width } = this.state
    const login =
      <div><Responsive as={Container} minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
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
            <Divider />
            <Button className="btn_login">Login</Button>
          </Container>
        </Container>
     </Responsive>

     <Responsive as={Container} minWidth={768} maxWidth={960} onUpdate={this.handleOnUpdate}>
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
           <Divider />
           <Button className="btn_login">Login</Button>
         </Container>
       </Container>
     </Responsive>
     </div>

      return (
        <div className="wrapper">
            {login}
         </div>
      );
    }
  }

  export default Login;
