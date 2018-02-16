import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {hideNotification, setMessage} from  '../redux/actions';


class BottomMessage extends Component {


  render() {
    var {message} = this.props;

    if (message.visible) {
      return (
        <Message
          onDismiss={this.props.handleDismiss}

          content= {message.text}
          color= 'black'
        />
      )
    }
    return null
  }
}


  const mapStateToProps = state => {

    return {
      message: state.bottomMessageHandler
    };
  }

  const mapDispatchToProps = dispatch =>{
    return {
      handleDismiss(visible) {
        dispatch(hideNotification(true)),
        dispatch(setMessage(''))
      }
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(BottomMessage);
