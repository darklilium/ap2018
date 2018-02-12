import env from '../services/config';

function layers(){

  var serviceMain;
  var serviceURL;

  if(env.BUILDFOR=="INTERNA"){
    serviceMain = 'http://gisred.chilquinta/arcgis/';
  }else{
    serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';

  }
   serviceURL = serviceMain + 'rest/services/';

  //check 8 and last one
  return {
    read_dynamic_ap(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer?f=json&token=" + token.read();
    },
    read_generateTokenURL(){
      return serviceMain + "tokens/generateToken";
    },

    read_luminarias(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/1?f=json&token=" + token.read();
    },

    read_tramosAP(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/2?f=json&token=" + token.read();
    },

    read_modificacionesAP(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/0?f=json&token=" + token.read();
    },

    read_limiteComunal(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/MapServer/4?f=json&token=" + token.read();
    },

    read_rotulos(){
      return serviceURL + "Chilquinta_006/Nodos_006/MapServer/0?f=json&token=" + token.read();
    },

    read_medidores(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/3?f=json&token=" + token.read();
    },

    read_fotos(){
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/10?f=json&token=" + token.read();
    },

    read_ap_modificaciones_applyedits() {
      return serviceURL + "AP_Municipal/AP_MUNICIPAL/FeatureServer/0/applyedits";
    },

//*//*/

    read_SSEE(){
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer?f=json&token=" + token.read();
    },
    read_layerAlimentador(){  /*using*/
        return serviceURL + "Chilquinta_006/Tramos_006/MapServer?f=json&token=" + token.read();
    },

    read_logAccess(){  /*using*/
      return serviceURL + "Admin/LogAccesos/FeatureServer/2?f=json&token=" + token.read();
    },
    read_logAccess2(){
    //chq mapabase(){
    return serviceURL + "Admin/LogAccesos/FeatureServer/2?f=json&token=" + token.read();;
    },
    read_mapabase(){
      return serviceURL + "MapaBase/MapServer?f=json&token=" + token.read();
    },
    //dmps adresses
    read_cartography(){
      return serviceURL + "Cartografia/DMPS/MapServer?f=json&token=" + token.read();
    },

    //The following layers and services are just for Interruptions app. (interrupciones.html and interruptions.js)
    //Featurelayer for orders per sed (with graphics)


    //CODING REFACTOR: 09/11
    read_logAcessosSave(){
      return serviceURL +"Admin/LogAccesos/FeatureServer/1/applyedits";
    }


  };
}

export default layers()
