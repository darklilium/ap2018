import React, { Component } from 'react';
import PropTypes from 'prop-types';
import env from '../services/config';
import $ from 'jquery';

var timeline;

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  componentDidMount(){

      /*
      var tl1 = new TimelineMax({repeat: -1});
      tl1.from('#lights',2, {css: {backgroundImage: 'url("./images/login_images/lighton.png")'}});
      tl1.to('#lights', 2,{ css: {backgroundImage: 'url("./images/login_images/lightoff.png")'}});
      tl1.play();
      */
      //what do u want to animate, how long, what do u want to animate.
      //to: del estado inicial al estado que quieres llegar.
      //from: del estado final declarado al estado normal del elemento.

      //scale: escala la imagen desde un % al final o al reves, depende del from y to.
    /*  TweenMax.from("#light", 3 , {opacity: 0});
      TweenMax.to(".gsContainer", 3, {background: 'lightblue'})
      TweenMax.to("#light", 3, {backgroundImage: "url("+ env.CSSDIRECTORY+ "/images/login_images/lighton_.png)", easeout: 0.3});
      TweenMax.to(".gsContainer", 3, {background: 'gray'})
  */

      //el orden importa. Linea de tiempo de animaciones:
      /*
      ease in: lento en el comienzo, rapido en el final
      ease out: rapido en el comienzo, lento final.

      */


      /*
      var timeline = new TimelineMax({repeat: -1});
      timeline.to(".gsContainer", 3, {background: 'lightblue', ease: Power0.easeNone})
      timeline.to(".gsContainer3", 1, {zIndex: 14,  ease: Power0.easeNone});
      timeline.to(".gsContainer", 1, {background: 'gray', ease: Power0.easeNone})
      timeline.to(".gsContainer3", 1, {zIndex: 15,  ease: Power0.easeNone});
      timeline.to("#light2", 3, {opacity: 1,  ease: Power0.easeNone});
      */

      TweenMax.to(".wrapper",5,{
          opacity: "1",
          transition: "opacity .5s ease",
          visibility: "visible"
      });


    var element = document.getElementById("gsContainer");
    var color2 = {h: 191, s:62, l: 70}
    
    timeline = new TimelineMax({repeat: -1})
    timeline.to(color2, 5, {l:40, onUpdate:applyColor, ease:Linear.easeNone})
    timeline.to(".gsContainer3", 1, {zIndex: 15,  ease: Power0.easeNone});
    timeline.to(color2, 5, {l:15, onUpdate:applyColor, ease:Linear.easeNone})
    timeline.to(color2, 5, {l:40, onUpdate:applyColor, ease:Linear.easeNone})
    timeline.to(".gsContainer3", 1, {zIndex: 14,  ease: Power0.easeNone})
    timeline.to(color2, 5, {l:70, onUpdate:applyColor, ease:Linear.easeNone})

    function applyColor(e) {
      element.style.backgroundColor = "hsl(" + color2.h + "," + color2.s + "%," + color2.l + "%)";
    }

  }

  render() {
    const { children } = this.props;

    return (
      <div className="wrapper" id="app_wrapper">
        <div id="gsContainer" className="gsContainer">
          <div className="ground"></div>
        </div>
        <div id="gsContainer2" className="gsContainer2">
          <div id="light"></div>

        </div>
        <div  id="gsContainer3" className="gsContainer3">
          <div id="light2"></div>
        </div>
        {children}

    </div>
    );
  }
}

export default App;
export {timeline};