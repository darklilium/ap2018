import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {hideNotification, setMessage} from  '../redux/actions';


class BottomMessage extends Component {


  render() {
    var {visible, message} = this.props;
    console.log(message, visible, "tengo en msg");
    if (visible) {
      return (
        <Message
          onDismiss={this.props.handleDismiss}

          content= {message}
          color= 'black'
        />
      )
    }
    return null
  }
}


  const mapStateToProps = state => {
    return {
      message: state.message.message,
      visible: state.visibleMessage.visible
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
