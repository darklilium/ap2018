import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, Segment, Grid, Image,Input, Container, Button, Divider,Header, Dropdown } from 'semantic-ui-react';
import styles from '../css/myStyles.scss';
import $ from 'jquery';
import env from '../services/config';
import {MuniImages} from '../services/apmuni_images';
import {friendOptions} from '../services/apmuni_images';

import { connect } from 'react-redux';
import {itemsFetchData, getComunas} from './redux/actions';

class Dashboard extends React.Component {

    handleOnUpdate = (e, { width }) => this.setState({ width })

    componentDidMount(){
      $('#app_wrapper').removeClass("wrapper").addClass("wrapper_dashboard");
      TweenMax.to(".wrapper_dashboard",5,{
        opacity: "1",
        transition: "opacity .5s ease",
        visibility: "visible"
      });

      //this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
      this.props.fetchComunas(friendOptions);

    }

    onClickLogin(){
        this.props.history.push("/municipalidad");
    }

    onChange(){

    }

    render() {

          const { width, comunas } = this.props

          const login =
            <div><Responsive as={Container} minWidth={320} maxWidth={767} onUpdate={this.handleOnUpdate}>
            <ul>
               {this.props.comunas.map((item) => (
                   <li key={item.key}>
                       {item.value}
                   </li>
               ))}
           </ul>
           </Responsive>

           {/* sobre 768 ancho hasta 960*/}
           <Responsive as={Container} minWidth={768} maxWidth={2560} onUpdate={this.handleOnUpdate}>
           <ul>
               {this.props.comunas.map((item) => (
                   <li key={item.key}>
                       {item.value}
                   </li>
               ))}
          </ul>
           </Responsive>
           </div>

            return (
              <div className="">
                  {login}
               </div>
            );

    }

}

const mapStateToProps = (state) =>{
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    comunas: state.comunas
  };
}

//fetchdata recibe url como parametro y despacha una accion
const mapDispatchToProps = (dispatch) =>{
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    fetchComunas: (comunas) => dispatch(getComunas(comunas))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
