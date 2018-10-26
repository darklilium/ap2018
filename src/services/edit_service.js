
import $ from 'jquery';
import _ from 'lodash';
import layers from './layers_service';

  export function edit_query(values, geometry, token){
    console.log(values,"values");
    console.log(geometry,"values");
    console.log(token,"values");
    var promise = new Promise((resolve,reject)=>{

      //resolve(true);
      
      const data = {
        f: 'json',
        adds: JSON.stringify([{ attributes: values, geometry: {"x":geometry.x , "y": geometry.y}}]),
        token: token
      };

      $.ajax({
        method: 'POST',
        url: layers.read_modificaciones(),
        dataType:'html',
        data: data
      })
      .done(d =>{

        let json = JSON.parse(d);
        console.log(d, "efectivo?");
        if( (_.has(json,'error')) ){
          reject(false);
        }else{
          if( (_.has(json,'error')) ){
            reject(false);
          }else{
            let arrObject = [];
            if(json["addResults"][0].objectId>0){
              resolve(true);

            }else{
              reject(false);
            }
          }
        }
      })
      .fail(f=>{
        console.log(f,"no pase")
        reject(false)
      });

      
    });

    return promise;
  }
