import React from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Dropdown,  Divider , Rail, Form, Radio,Checkbox, Input, Tab } from 'semantic-ui-react';
import muniStyle from '../../css/component1/edit_.scss';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import env from '../../services/config';


class PictureSlider extends React.Component {
    constructor(props){
      super(props);
      this.afterChange = this.afterChange.bind(this);

    }
    afterChange(e){

      let c = "foto"+e;
        console.log(c,"traigo esto after change");
      //this.setState({currentPic: c})
    }


    render() {
        const {luminaria, fotografias} = this.props;
        const images = fotografias.map(f=>{
          return {
            original: f.url,

          }
        })

        return (
          <div className="wrapper_pictureSlider">
            <h3>Fotografías Luminaria: {luminaria}</h3>
            <ImageGallery
              items={images}
              showIndex={true}
              showPlayButton={false}
              showThumbnails={false}
              defaultImage={env.CSSDIRECTORY+'images/nofoto.png'}
              showFullscreenButton={true}/>
            <Divider className="divider_edit" inverted />
            <Button className="btn_busqueda" >Ver en visor de fotos </Button>
            </div>


        );
    }

}

const mapStateToProps = state => {
  return {
    luminaria: state.luminaria_asociada_info.luminariaSelected[0].idluminaria,
    fotografias: state.luminaria_asociada_info.fotografias
  }
}
const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PictureSlider)
