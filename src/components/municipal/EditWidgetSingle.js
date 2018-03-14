import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/edit_.scss';
import { connect } from 'react-redux';
import EditLuminariaSingle from './EditLuminariaSingle';
import PictureSlider from './PictureSlider';
import LuminariasAsociadasWidget from './LuminariasAsociadasWidget';
import {changeActiveIndex} from '../redux/actions';
import BottomMessage from '../others/BottomMessage';

class EditWidget extends React.Component {
    constructor(props){
      super(props);
    }
    //handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
    render() {
        const {handleTabChange, activeIndex} = this.props;
        const panes = [
          { menuItem: 'Editar', render: () => <Tab.Pane className="tab1_" attached={false}><EditLuminariaSingle /></Tab.Pane> },
          { menuItem: 'Fotos', render: () => <Tab.Pane className="tab2_" attached={false}><PictureSlider /></Tab.Pane> },
          { menuItem: 'Lum. Asoc.', render: () => <Tab.Pane className="tab3_" attached={false}><LuminariasAsociadasWidget /></Tab.Pane> },
        ]
        return (
          <Rail className="rail_layermap_wrapper" attached internal position='left'>
            <div className="wrapper_layermap">
              <h3>Editar Luminaria: </h3>
              <Divider className="divider_edit" inverted />
              <Tab className="tab_menu" panes={panes} onTabChange={handleTabChange} activeIndex={activeIndex}/>
            </div>
              <BottomMessage />
          </Rail>
        );
    }

}

const mapStateToProps = state => {
  return {
    activeIndex: state.luminaria_asociada_info.tabActiveIndex
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleTabChange: (e, { activeIndex }) => dispatch(changeActiveIndex(activeIndex))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditWidget)
