import env from '../services/config';
import mapa from '../services/map_service';

function layers(){

  var serviceMain;
  var serviceURL;

  if(env.BUILDFOR=="INTERNA"){
    serviceMain = 'https://gisredint.chilquinta.cl/arcgis/';
  }else{
    serviceMain = 'https://gisred.chilquinta.cl:6443/arcgis/';

  }
   serviceURL = serviceMain + 'rest/services/';

  //check 8 and last one
  return {
    read_generateTokenURL(){
      return serviceMain + "tokens/generateToken";
    },

    read_logAccess(token){  /*using*/
      return serviceURL + "Admin/LogAccesos/FeatureServer/2?f=json&token=" + token;
    },
    read_dynamic_ap(token){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer?f=json&token=" + token;
    },
    read_limiteComunal(token){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/4?f=json&token=" + token;
    },
    read_luminarias(token){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/1?f=json&token=" + token;
    },
    read_equipos(token){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/3?f=json&token=" + token;
    }


  };
}

export function changeLayerVisibility(layer, visible){
    var mapp = mapa.getMap();
  switch (layer) {
    case 'luminarias':
          if(visible){
            var luminariasLayer = mapp.getLayer("ap_luminarias");
            luminariasLayer.show();
          }else{
            var luminariasLayer = mapp.getLayer("ap_luminarias");
            luminariasLayer.hide();
          }

    break;

    case 'tramosap':
          if(visible){
            var luminariasLayer = mapp.getLayer("ap_tramos");
            luminariasLayer.show();
          }else{
            var luminariasLayer = mapp.getLayer("ap_tramos");
            luminariasLayer.hide();
          }

    break;

    case 'modificaciones':
          if(visible){
            var luminariasLayer = mapp.getLayer("ap_modificaciones");
            luminariasLayer.show();
          }else{
            var luminariasLayer = mapp.getLayer("ap_modificaciones");
            luminariasLayer.hide();
          }

    break;

    case 'limitecomunal':
          if(visible){
            var luminariasLayer = mapp.getLayer("ap_limiteComunal");
            luminariasLayer.show();
          }else{
            var luminariasLayer = mapp.getLayer("ap_limiteComunal");
            luminariasLayer.hide();
          }

    break;
    default:

  }
}


export default layers()
