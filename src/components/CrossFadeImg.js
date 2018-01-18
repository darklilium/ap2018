import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import env from '../services/config';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header } from 'semantic-ui-react';

export default class CrossFadeImg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      randomPicSrc: env.CSSDIRECTORY+ "/images/login_images/loginwall1.jpg"
    }
  }

  componentWillMount(){
    setInterval(()=>{
      let randomPicNumber = Math.floor((Math.random() * 6) + 1);
      //********Cambiar randomPicSrc para test/prod*******
      let randomPicSrc = env.CSSDIRECTORY+ "/images/login_images/loginwall"+ randomPicNumber+ ".jpg";//desarrollo
      this.setState({randomPicSrc: randomPicSrc})
    },5000);


  }
  render() {
    var {randomPicSrc} = this.state;

     return (

        <ReactCSSTransitionGroup
        transitionName="imageCrossFade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        <img src={randomPicSrc} key={1} />

        </ReactCSSTransitionGroup>
    
    );
  }

}
