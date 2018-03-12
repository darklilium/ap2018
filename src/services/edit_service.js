
import $ from 'jquery';
import _ from 'lodash';
import layers from './layers_service';

  export function edit_query(values, geometry, token){
    console.log(values,"values");
    console.log(geometry,"values");
    console.log(token,"values");
    var promise = new Promise((resolve,reject)=>{
      /*
      const data = {
        f: 'json',
        adds: JSON.stringify([{ attributes: values, geometry: {"x":geometry.x , "y": geometry.y}}]),
        token: token
      };

      $.ajax({
        method: 'POST',
        url: layers.read_ap_modificaciones_applyedits(),
        dataType:'html',
        data: data
      })
      .done(d =>{

        let json = JSON.parse(d);
        console.log(json);
        if( (_.has(json,'error')) ){
          return callback(false);
        }else{
          if( (_.has(json,'error')) ){
            return callback(false);
          }else{
            let arrObject = [];
            if(json["addResults"][0].objectId>0){
              return callback(true);

            }else{
              return callback(false);
            }
          }
        }
      })
      .fail(f=>{
        console.log(f,"no pase")
        callback(false)
      });

      */
    });

    return promise;
  }
