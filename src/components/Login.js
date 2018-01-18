import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header } from 'semantic-ui-react';
import env from '../services/config';
import styles from '../css/myStyles.scss';
import $ from 'jquery';
import BgSwitcher from '../vendor/jquery.bgswitcher';

class Login extends React.Component {
  state = {}

  componentDidMount() {
    //change the loginwall dinamically
    let randomPicNumber = Math.floor((Math.random() * 6) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    let randomPicSrc = env.CSSDIRECTORY+ "/images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
    let pics = [env.CSSDIRECTORY+"/images/login_images/loginwall1.jpg", env.CSSDIRECTORY+"/images/login_images/loginwall2.jpg"]
    $("#app").BgSwitcher({
      images: pics

    });

    //$('#app').css("background-image", "url("+randomPicSrc+")").css('background-size','100% 100%').css('object-fit',"cover").css('transition',"transition: background-image 1s ease-in-out");


  }



  handleOnUpdate = (e, { width }) => this.setState({ width })

  render(){
    const { width } = this.state

      return (
      <div className="wrapper">
        <Responsive as={Container} minWidth={320} maxWidth={425} onUpdate={this.handleOnUpdate}>
          <Container className="container_login">
            <Container className="container_login_image">
              <Header as='h2' icon textAlign='center'>
              <Image circular src={env.CSSDIRECTORY+'/images/logo_ap.png'} />
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

       <Responsive as={Container} minWidth={426} maxWidth={768} onUpdate={this.handleOnUpdate}>
         <Container className="container_login">
           <Container className="container_login_image">
             <Header as='h2' icon textAlign='center'>
             <Image circular src={env.CSSDIRECTORY+'/images/logo_ap.png'} />
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
      );
    }
  }

  export default Login;
