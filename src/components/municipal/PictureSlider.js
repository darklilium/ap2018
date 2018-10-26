import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/edit_.scss';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import env from '../../services/config';


class PictureSlider extends React.Component {
    constructor(props){
      super(props);


    }
    render() {
        const {idnodo, fotografias} = this.props;
        let images = [{}];

        if(!fotografias.length){
          images = [{
            original: env.CSSDIRECTORY+'/images/nofoto.png'
          }]
        }else{
          images = fotografias.map(f=>{
            return {
              original: f.url,
            }
          })
        }


        return (
          <div className="wrapper_pictureSlider">
            <h3>Fotografías ID NODO: {idnodo}</h3>
            <ImageGallery
              items={images}
              showIndex={true}
              showPlayButton={false}
              showThumbnails={false}
              defaultImage={env.CSSDIRECTORY+'/images/nofoto.png'}
              showFullscreenButton={true}/>
            <Divider className="divider_edit" inverted />
            <Button className="btn_busqueda" >Ver en visor de fotos </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    idnodo: state.editWidgetManager.showCurrent.idnodo,
    fotografias: state.editWidgetManager.fotografias
  }
}

export default connect(mapStateToProps)(PictureSlider)
