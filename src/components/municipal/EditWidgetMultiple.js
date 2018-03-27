import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/edit_.scss';
import { connect } from 'react-redux';
import EditLuminariaMultiple from './EditLuminariaMultiple';
import PictureSlider from './PictureSlider';
import LuminariasAsociadasWidget from './LuminariasAsociadasWidget';
import {findPictures, showElement, changeIndex, changeActiveIndex} from '../redux/actions';
import BottomMessage from '../others/BottomMessage';

class EditWidgetMultiple extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        activeIndex: 0
      }
      this.handleTabChange = this.handleTabChange.bind(this)
    }

    onClickNext(){
      const{ currentIndex, luminariasInPoint } = this.props;
      if(currentIndex + 1 == luminariasInPoint.length){
        console.log("no avanzar más");
      }else{
        //cambia el indice del elemento a mostrar.
        this.props.changeIndex(currentIndex+1);
        //muestra el elemento de la lista encontrado en el indice que se le indica.
        this.props.showElement(currentIndex+1);
      }
    }

    onClickPrevious(){
      const{ currentIndex, luminariasInPoint } = this.props;
      if(currentIndex == 0){
        console.log("no avanzar más");
      }else{
        //cambia el indice del elemento a mostrar.
        this.props.changeIndex(currentIndex-1);
        //muestra el elemento de la lista encontrado en el indice que se le indica.
        this.props.showElement(currentIndex-1);
      }
    }

    handleTabChange (e, { activeIndex }) {
      this.setState({ activeIndex })
      console.log(activeIndex);
      const {token, idnodo} = this.props;

      if (activeIndex==1) {
          this.props.findPictures(token,idnodo);
      }

    }
    render() {
        const {handleTabChange, activeIndex, luminariasInPoint, currentIndex} = this.props;
        const panes = [
          { menuItem: 'Editar', render: () => <Tab.Pane className="tab1_" attached={false}><EditLuminariaMultiple /></Tab.Pane> },
          { menuItem: 'Fotos', render: () => <Tab.Pane className="tab2_" attached={false}><PictureSlider /></Tab.Pane> }
          //, { menuItem: 'Lum. Asoc.', render: () => <Tab.Pane className="tab3_" attached={false}><LuminariasAsociadasWidget /></Tab.Pane> },
        ]
        return (
          <Rail className="rail_layermap_wrapper" attached internal position='left'>
            <div className="wrapper_layermap">

              <div className="wrapper_titles_edit">
                <div className="wrapper_titles_edit_h3"><h3>Editar Luminaria: </h3></div>
                <div className="wrapper_buttons_edit">
                  <Button className="btn_chevron" icon><Icon name='left chevron' onClick={this.onClickPrevious.bind(this)} /></Button>
                  <h5>{currentIndex+1}/{luminariasInPoint.length}</h5>
                  <Button className="btn_chevron" icon><Icon name='right chevron'  onClick={this.onClickNext.bind(this)} /></Button>
                </div>
              </div>


              <Divider className="divider_edit" inverted />
              <Tab className="tab_menu" panes={panes} onTabChange={this.handleTabChange} activeIndex={this.state.activeIndex}/>
            </div>
              <BottomMessage />
          </Rail>
        );
    }

}

const mapStateToProps = state => {
  return {
    activeIndex: state.luminaria_asociada_info.tabActiveIndex,
    luminariasInPoint: state.clickedResulset.lumsFoundInPoint,
    currentIndex: state.clickedResulset.currentIndex,
    idnodo: state.clickedResulset.showCurrent.idnodo,
    token: state.credentials.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleTabChange: (e, { activeIndex }) => dispatch(changeActiveIndex(activeIndex)),
    changeIndex: (index) => dispatch(changeIndex(index)),
    showElement: (index) => dispatch(showElement(index)),
    findPictures: (token,idnodo) => dispatch(findPictures(token,idnodo))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditWidgetMultiple)
