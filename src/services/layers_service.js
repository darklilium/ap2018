import env from '../services/config';

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
    }


  };
}

export default layers()
