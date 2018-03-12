import Map from 'esri/map';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import layers from './layers_service';


export function getPotenciaLuminaria(token) {

  var promise = new Promise((resolve,reject)=>{

    var qTask = new QueryTask(layers.read_potencia(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "1=1";

    qTask.execute(q, (featureSet)=>{

      if(!featureSet.features.length){
          return resolve([]);
      }
      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for getPotenciaLuminaria");
      return reject(Errorq)
    });

  })

  return promise;
}


export function getTipoConexiones(token) {

  var promise = new Promise((resolve,reject)=>{

    var qTask = new QueryTask(layers.read_tipo_conexion(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "1=1";

    qTask.execute(q, (featureSet)=>{

      if(!featureSet.features.length){
          return resolve([]);
      }
      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for getTipoConexiones");
      return reject(Errorq)
    });

  })

  return promise;
}

export function getTipoLuminarias(token) {

  var promise = new Promise((resolve,reject)=>{

    var qTask = new QueryTask(layers.read_tipo_luminarias(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "1=1";

    qTask.execute(q, (featureSet)=>{

      if(!featureSet.features.length){
          return resolve([]);
      }
      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for getTipoLuminarias");
      return reject(Errorq)
    });

  })

  return promise;
}

export function getPropiedadesLuminarias(token) {

  var promise = new Promise((resolve,reject)=>{

    var qTask = new QueryTask(layers.read_tipo_propiedad(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "1=1";

    qTask.execute(q, (featureSet)=>{

      if(!featureSet.features.length){
          return resolve([]);
      }
      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for getPropiedadesLuminarias");
      return reject(Errorq)
    });

  })

  return promise;
}
