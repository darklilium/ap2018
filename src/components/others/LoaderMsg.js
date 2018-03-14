import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


class LoaderMsg extends Component {


  render() {
    const {loaderActive} = this.props;
    return (

       <Dimmer active={loaderActive}>
         <Loader>Loading</Loader>
       </Dimmer>

   );

  }
}
  const mapStateToProps = state => {
    return {
     loaderActive: state.toggle_loader_visibility.active
    }
  }

export default connect(mapStateToProps)(LoaderMsg);
