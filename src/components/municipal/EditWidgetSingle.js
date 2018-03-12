import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/edit_.scss';
import { connect } from 'react-redux';
import EditLuminariaSingle from './EditLuminariaSingle';
import PictureSlider from './PictureSlider';
class EditWidget extends React.Component {
    state = {}
    handleChange = (e, { value }) => {
      this.setState({ value })
      console.log(value, e, "hola");
    }
    render() {
        const panes = [
          { menuItem: 'Editar', render: () => <Tab.Pane className="tab1_" attached={false}><EditLuminariaSingle /></Tab.Pane> },
          { menuItem: 'Fotos', render: () => <Tab.Pane className="tab2_" attached={false}><PictureSlider /></Tab.Pane> },
          { menuItem: 'Lum. Asoc.', render: () => <Tab.Pane className="tab3_" attached={false}>Tab 3 Content</Tab.Pane> },
        ]
        return (
          <Rail className="rail_layermap_wrapper" attached internal position='left'>
            <div className="wrapper_layermap">
              <h3>Editar Luminaria: </h3>
              <Divider className="divider_edit" inverted />
              <Tab className="tab_menu" panes={panes} />
            </div>
          </Rail>
        );
    }

}

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditWidget)
