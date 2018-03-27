import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {showModal} from  '../redux/actions';

class ModalExampleShorthand extends React.Component {

    constructor(props){
      super(props);

      this.onClickClose = this.onClickClose.bind(this)
    }
    onClickClose(){
      console.log("onClickClose");
      this.props.onHide("","",false)
    }

    render() {
      const {contenido, header, open} = this.props;

        return (
          <Modal size='small' open={open} onClose={this.close}>
            <Modal.Header>
              {header}
            </Modal.Header>
            <Modal.Content>
              <p>{contenido}</p>
            </Modal.Content>
            <Modal.Actions>

              <Button positive icon='checkmark' labelPosition='right' content='OK' onClick={this.onClickClose}/>
            </Modal.Actions>
          </Modal>
        );
    }

}

const mapStateToProps = state =>{
  return {
    contenido: state.showNotificationDML.contenido,
    header: state.showNotificationDML.header,
    open: state.showNotificationDML.open
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHide: (header, content, open) => dispatch(showModal(header, content, open))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalExampleShorthand)
