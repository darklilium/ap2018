import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/edit_.scss';
import { connect } from 'react-redux';
import EditLuminariaMultiple from './EditLuminariaMultiple';
import PictureSlider from './PictureSlider';
import LuminariasAsociadasWidget from './LuminariasAsociadasWidget';
import {findPictures, showElement, changeIndex, changeActiveIndex, searchMod} from '../redux/actions';
import BottomMessage from '../others/BottomMessage';

class EditWidgetMultiple extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        activeIndex: 0
      }
      this.handleTabChange = this.handleTabChange.bind(this)
      this.onClickPrevious = this.onClickPrevious.bind(this);
      this.onClickNext = this.onClickNext.bind(this);
    }

    

    onClickNext(){
      console.log("next clicked");
      const{ currentIndex, luminariasInPoint, currentLuminaria, searchMod } = this.props;
      if(currentIndex + 1 == luminariasInPoint.length){
        console.log("no avanzar más");
      }else{
        //cambia el indice del elemento a mostrar.
       
        this.props.changeIndex(currentIndex+1);
        console.log("más", currentIndex+1);
        //muestra el elemento de la lista encontrado en el indice que se le indica.
        this.props.showElement(currentIndex+1);
       
         //si el index del tab es 1, muestra la foto que corresponde a la luminaria. 
        if (this.state.activeIndex==1) {
          const {token, idnodo} = this.props;
          this.props.findPictures(token,idnodo);
        }
      }
    }

    onClickPrevious(){
      const{ currentIndex, currentLuminaria, searchMod } = this.props;
      if(currentIndex == 0){
        console.log("no avanzar más");
      }else{
       
        //cambia el indice del elemento a mostrar.
        this.props.changeIndex(currentIndex-1);
        //muestra el elemento de la lista encontrado en el indice que se le indica.
        console.log("más", currentIndex-1);
        this.props.showElement(currentIndex-1);
      
      

          //si el index del tab es 0, muestra la foto que corresponde a la luminaria. 
          if (this.state.activeIndex==1) {
            const {token, idnodo} = this.props;
            this.props.findPictures(token,idnodo);
          }

      }
    }

    componentDidUpdate(){
      const{ currentLuminaria, searchMod } = this.props;
      searchMod(currentLuminaria.idluminaria);
    } 

    handleTabChange (e, { activeIndex }) {
      this.setState({ activeIndex })
    
      const {token, idnodo} = this.props;

      if (activeIndex==1) {
          this.props.findPictures(token,idnodo);
      }

    }

    componentDidMount(){
      const {currentLuminaria, searchMod} = this.props;
      searchMod(currentLuminaria.idluminaria)

    }
    
    render() {
        const {handleTabChange, activeIndex, luminariasInPoint, currentIndex} = this.props;
        const panes = [
          { menuItem: 'Editar', render: () => <Tab.Pane className="tab1_" attached={false}><EditLuminariaMultiple /></Tab.Pane> },
          { menuItem: 'Fotos', render: () => <Tab.Pane className="tab2_" attached={false}><PictureSlider /></Tab.Pane> }
        ]
        return (
          <Rail className="rail_layermap_wrapper" attached internal position='left'>
            <div className="wrapper_layermap">

              <div className="wrapper_titles_edit">
                <div className="wrapper_titles_edit_h3"><h3>Editar Luminaria: </h3></div>
                <div className="wrapper_buttons_edit">
                  {/*<Button className="btn_chevron" ><Icon name='left chevron' onClick={this.onClickPrevious} /></Button>*/}
                  <Button className="btn_chevron"  onClick={this.onClickPrevious}><Icon name='left chevron'/></Button>
                  <h5>{currentIndex+1}/{luminariasInPoint.length}</h5>
                  {/* <Button className="btn_chevron" ><Icon name='right chevron'  onClick={this.onClickNext} /></Button>*/}
                  <Button className="btn_chevron"  onClick={this.onClickNext}><Icon name='right chevron'/></Button>
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
    activeIndex: state.editWidgetManager.tabActiveIndex,
    luminariasInPoint: state.editWidgetManager.lumsFoundInPoint,
    currentIndex: state.editWidgetManager.currentIndex,
    idnodo: state.editWidgetManager.showCurrent.idnodo,
    token: state.credentials.token,
    currentLuminaria: state.editWidgetManager.showCurrent
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleTabChange: (e, { activeIndex }) => dispatch(changeActiveIndex(activeIndex)),
    changeIndex: (index) => dispatch(changeIndex(index)),
    showElement: (index) => dispatch(showElement(index)),
    findPictures: (token,idnodo) => dispatch(findPictures(token,idnodo)),
    searchMod: (idLuminaria) => dispatch(searchMod(idLuminaria))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditWidgetMultiple)
