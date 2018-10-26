import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import layers from './layers_service';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import makeSymbol from './makeSymbol';
import mapa from './map_service';
import extent from 'esri/geometry/Extent';
import graphicsUtils from 'esri/graphicsUtils';

var gLayerTramos = new GraphicsLayer();

export function getTramosMedidor(token,comuna,idmedidor){

var promise = new Promise((resolve,reject)=>{
  gLayerTramos.clear();
  let mySymbol = makeSymbol.makeTrackLine();
  var map = mapa.getMap();

  var qTaskTramos = new QueryTask(layers.read_tramos(token));
  var qTramos = new Query();

  qTramos.returnGeometry = true;
  qTramos.outFields=["*"];
  qTramos.where = "id_equipo_ap  =" + idmedidor ;

  qTaskTramos.execute(qTramos, (featureSet)=>{

    if(!featureSet.features.length){
      return resolve([]);
    }
    featureSet.features.forEach(feature =>{
      gLayerTramos.add(new esri.Graphic(feature.geometry,mySymbol));
    });
    map.addLayer(gLayerTramos);
    
    return resolve(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for getTramosMedidor");
    return reject([]);
  });

});

return promise;



}

export {gLayerTramos};