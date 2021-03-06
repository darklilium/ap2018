import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import layers from './layers_service';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import makeSymbol from './makeSymbol';
import mapa from './map_service';
import extent from 'esri/geometry/Extent';
import graphicsUtils from 'esri/graphicsUtils';

var gLayerMedidor2 = new GraphicsLayer();

export function getDataMedidores(token, comuna){
  var promise = new Promise((resolve, reject)=>{

    var qTaskMedidores = new QueryTask(layers.read_equipos(token));
    var qMedidores = new Query();

    qMedidores.returnGeometry = true;
    qMedidores.outFields=["*"];
    qMedidores.where = "comuna ='" + comuna + "'";

    qTaskMedidores.execute(qMedidores, (featureSet)=>{
    
      if(!featureSet.features.length){
        return resolve([])
      }

      return resolve(featureSet.features);
    }, (error)=>{
      console.log(error,"Error doing query for getMedidores");
      return reject(error);
    });
  })
  return promise;
}


export function getSelectedMeterLocation(token, idequipo){
  var promise = new Promise((resolve, reject)=>{


    var map = mapa.getMap();
    var qTaskMedidores = new QueryTask(layers.read_equipos(token));
    var qMedidores = new Query();
    gLayerMedidor2.clear();//no borra graficos
    qMedidores.returnGeometry = true;
    qMedidores.outFields=["*"];
    qMedidores.where = "id_medidor ='" + idequipo + "'";

    qTaskMedidores.execute(qMedidores, (featureSet)=>{

      if(!featureSet.features.length){
        return resolve([])
      }
      var myLineSymbol = makeSymbol.makeLine();
      gLayerMedidor2.add(new esri.Graphic(featureSet.features[0].geometry,myLineSymbol));
      map.addLayer(gLayerMedidor2);
      return resolve(featureSet.features);
    }, (error)=>{
      console.log(error,"Error doing query for getSelectedMeterLocation");
      return reject(error);
    });
  })
  return promise;
}

export {gLayerMedidor2};