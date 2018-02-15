import layers from './layers_service';
import $ from 'jquery';


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
        console.log(credentials.user,"nuevo nombre de usuario a calcular...");
        console.log("vialactea", credentials.vialactea);
        console.log("data", data);
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
          reject("");
          return;
        }
        console.log(token,"tengo esto");
        resolve(token);

      })
      .catch(error=>{
        console.log(error,"failure");
        reject(error);

      });

  });
  return promise;
}
