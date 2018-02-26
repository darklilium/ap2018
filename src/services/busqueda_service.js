import Map from 'esri/map';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import layers from './layers_service';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import makeSymbol from './makeSymbol';

var gLayerFind = new GraphicsLayer();

function searchElement(searchType,value, token, mapa, comuna) {

  var promise = new Promise((resolve,reject)=>{

    gLayerFind.clear();
    let pointSymbol = makeSymbol.makePoint();

    var qTask = new QueryTask(layers.read_luminarias(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "id_nodo ='" + value + "' AND COMUNA='" + comuna +"'";

    qTask.execute(q, (featureSet)=>{
      console.log("Resultados: ",featureSet.features.length);
      if(!featureSet.features.length){
          return resolve([]);
      }
      gLayerFind.add(new Graphic(featureSet.features[0].geometry,pointSymbol));
      mapa.addLayer(gLayerFind,1);
      mapa.centerAndZoom(featureSet.features[0].geometry,20);

      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for searchRotulo");
      return reject(Errorq)
    });

  })

  return promise;
}

export {searchElement}
