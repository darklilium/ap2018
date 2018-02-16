import layers from './layers_service';
import $ from 'jquery';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';

export default function getTokenForDefaultUser(credentials){

  var promise = new Promise((resolve,reject)=>{

    let data = {
      username: '',
      password: credentials.password,
      client: 'requestip',
      expiration: 10080,
      format: 'jsonp',
    };

    //Si es vialactea incluida
    if(credentials.vialactea){
      data.username = credentials.user;
    }

    //verificar si es municipal o pertenece al dominio, ya que vialactea no está incluida en el usuario ingresado
    else{
      //si es municipal
      if(credentials.municipal){
        console.log("municipal?", credentials.municipal);
        //entrar con admin por default para obtener token: vialactea\\usrgis',"N3L4y5HZ
        data.username = `vialactea\\usrgis`;
        data.password = "N3L4y5HZ";
      }else{
        console.log("Verificando usuario que sea del dominio...", credentials.user);
        data.username = `vialactea\\${credentials.user}`;
        /*console.log(credentials.user,"nuevo nombre de usuario a calcular...");
        console.log("vialactea", credentials.vialactea);
        console.log("data", data);
        */
      }
    }

      $.ajax({
        method: 'POST',
        url: layers.read_generateTokenURL(),
        data: data,
        dataType: 'html'
      })
      .done(token=>{
        if ( (token.indexOf('Exception')>=0) || (token.indexOf('Error')>=0) ) {
          console.log("Error exception", token);
          reject('');
        }
        resolve(token);
      })
      .catch(error=>{
        reject(error);
      });

  });
  return promise;
}

//obtiene el usuario y password almacenados en la bd.
function loginMuniOptions(user, token){

  var promise = new Promise((resolve, reject)=>{
    var qTaskOfficeChilquinta = new QueryTask(layers.read_logAccess(token));
    var qOfficeChilquinta = new Query();
    qOfficeChilquinta.where = "usuario = '"+ user+ "'";
    qOfficeChilquinta.returnGeometry = false;
    qOfficeChilquinta.outFields=["*"];
    qTaskOfficeChilquinta.execute(qOfficeChilquinta, (featureSet)=>{
      if(!featureSet.features.length){
        return reject([])
      }else{
        let u = featureSet.features.map( (f,index)=>{
          return f.attributes;
        })


        const comunaOptions = {
          user: u[0].usuario,
          pass: u[0].pass,
          comuna: u[0].widget
        };
        console.log("opciones comuna", comunaOptions);
        return resolve(comunaOptions);

/*
        if(JSON.stringify(savedMuniUser) === JSON.stringify(usrObj)){
          return callback(true);
        }else{
          return callback(false);
        }
        */
      }

    });
  });

  return promise;

}

export {loginMuniOptions}
