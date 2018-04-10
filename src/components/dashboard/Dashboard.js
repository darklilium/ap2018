import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header, Dropdown } from 'semantic-ui-react';
import styles from '../../css/myStyles.scss';
import $ from 'jquery';
import env from '../../services/config';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import DashboardBody from './DashboardBody';
import dashStyle from '../../css/component1/dashboard.scss';

class Dashboard extends React.Component {

    handleOnUpdate = (e, { width }) => this.setState({ width })

    componentDidMount(){

      $('#app_wrapper').removeClass("wrapper").addClass("wrapper_dashboard");
      $('#gsContainer').removeClass("gsContainer");
      $('#gsContainer2').removeClass("gsContainer2");
      $('#gsContainer3').removeClass("gsContainer3");
      
      TweenMax.to(".wrapper_dashboard",5,{
        opacity: "1",
        transition: "opacity .5s ease",
        visibility: "visible"
      });
    }


    handleOnUpdate = (e, { width }) => this.setState({ width })

    render() {

          const { width, comunas } = this.props

          const dash =
            <div className="inner_wrapper_dashboard">
              <Responsive as={Container} minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
                <DashboardHeader title='' properties={this.props} />
                <DashboardBody properties={this.props}/>
             </Responsive>

           {/* sobre 768 ancho hasta 2560*/}
             <Responsive as={Container} minWidth={768} maxWidth={2560} onUpdate={this.handleOnUpdate}>
               <DashboardHeader title='AP CHILQUINTA' properties={this.props} />
               <DashboardBody properties={this.props}/>

             </Responsive>
           </div>

            return (
              <div className="wrapper_dashboard">
                  {dash}
               </div>
            );

    }

}
export default connect()(Dashboard);
