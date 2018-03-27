import Map from 'esri/map';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import layers from './layers_service';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import makeSymbol from './makeSymbol';
import {ap_infoWindow_luminaria, ap_infoWindow_medidor} from './makeInfowindow';

var gLayerFind = new GraphicsLayer();

function searchIDNODO(searchType,value, token, mapa, comuna) {

  var promise = new Promise((resolve,reject)=>{

    gLayerFind.clear();
    let pointSymbol = makeSymbol.makePoint();
    var qTask = new QueryTask(layers.read_luminarias(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "id_nodo =" + value + " AND COMUNA='" + comuna +"'";

    qTask.execute(q, (featureSet)=>{
      console.log("Resultados: ",featureSet.features.length);
      if(!featureSet.features.length){
          mapa.infoWindow.hide();
          return resolve([]);

      }
      gLayerFind.add(new Graphic(featureSet.features[0].geometry,pointSymbol));
      mapa.addLayer(gLayerFind,1);
      mapa.centerAndZoom(featureSet.features[0].geometry,20);
      ap_infoWindow_luminaria(
        featureSet.features[0].attributes.ID_LUMINARIA,
        featureSet.features[0].attributes.ROTULO,
        featureSet.features[0].attributes.TIPO_CONEXION,
        featureSet.features[0].attributes.TIPO,
        featureSet.features[0].attributes.PROPIEDAD,
        featureSet.features[0].attributes.MEDIDO_TERRENO,
        featureSet.features[0].geometry)

      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for searchIDNODO");
      return reject(Errorq)
    });

  })

  return promise;
}

function searchROTULO(searchType,value, token, mapa, comuna) {

  var promise = new Promise((resolve,reject)=>{

    gLayerFind.clear();
    let pointSymbol = makeSymbol.makePoint();
    var qTask = new QueryTask(layers.read_luminarias(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "ROTULO ='" + value + "' AND COMUNA='" + comuna +"'";

    qTask.execute(q, (featureSet)=>{
      console.log("Resultados: ",featureSet.features.length);
      if(!featureSet.features.length){
        mapa.infoWindow.hide();
          return resolve([]);
      }
      gLayerFind.add(new Graphic(featureSet.features[0].geometry,pointSymbol));
      mapa.addLayer(gLayerFind,1);
      mapa.centerAndZoom(featureSet.features[0].geometry,20);
    /*  ap_infoWindow_luminaria(
        featureSet.features[0].attributes.ID_LUMINARIA,
        featureSet.features[0].attributes.ROTULO,
        featureSet.features[0].attributes.TIPO_CONEXION,
        featureSet.features[0].attributes.TIPO,
        featureSet.features[0].attributes.PROPIEDAD,
        featureSet.features[0].attributes.MEDIDO_TERRENO,
        featureSet.features[0].geometry)
        */
      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for searchROTULO");
      return reject(Errorq)
    });

  })

  return promise;
}

function searchNMEDIDOR(searchType,value, token, mapa, comuna) {

  var promise = new Promise((resolve,reject)=>{

    gLayerFind.clear();
    let pointSymbol = makeSymbol.makeLine();
    var qTask = new QueryTask(layers.read_equipos(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "numero_medidor ='" + value + "' AND COMUNA='" + comuna +"'";

    qTask.execute(q, (featureSet)=>{
      console.log("Resultados: ",featureSet.features.length);
      if(!featureSet.features.length){
        mapa.infoWindow.hide();
          return resolve([]);
      }
      gLayerFind.add(new Graphic(featureSet.features[0].geometry,pointSymbol));
      mapa.addLayer(gLayerFind,1);
      mapa.centerAndZoom(featureSet.features[0].geometry.getExtent().getCenter(),20);

      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for searchNMEDIDOR");
      return reject(Errorq)
    });

  })

  return promise;
}

function searchNCLIENTE(searchType,value, token, mapa, comuna) {

  var promise = new Promise((resolve,reject)=>{

    gLayerFind.clear();
    let pointSymbol = makeSymbol.makeLine();
    var qTask = new QueryTask(layers.read_equipos(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "nis =" + value + " AND COMUNA='" + comuna +"'";

    qTask.execute(q, (featureSet)=>{
      console.log("Resultados: ",featureSet.features.length);
      if(!featureSet.features.length){
        mapa.infoWindow.hide();
          return resolve([]);
      }
      gLayerFind.add(new Graphic(featureSet.features[0].geometry,pointSymbol));
      mapa.addLayer(gLayerFind,1);
      mapa.centerAndZoom(featureSet.features[0].geometry.getExtent().getCenter(),20);

      return resolve(featureSet.features)
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for searchNMEDIDOR");
      return reject(Errorq)
    });

  })

  return promise;
}

function searchElement(searchType,value, token, mapa, comuna) {

   var promise = new Promise((resolve,reject)=>{

      switch (searchType) {
        case 'IDNODO':
              searchIDNODO(searchType,value,token,mapa,comuna)
              .then(features=>{
                resolve(features)
              })
              .catch(error=>{
                return reject(error)
              })
        break;

        case 'ROTULO':
              searchROTULO(searchType,value,token,mapa,comuna)
              .then(features=>{
                resolve(features)
              })
              .catch(error=>{
                return reject(error)
              })
        break;

        case 'NMEDIDOR':
              searchNMEDIDOR(searchType,value,token,mapa,comuna)
              .then(features=>{
                resolve(features)
              })
              .catch(error=>{
                return reject(error)
              })
        break;

        case 'NCLIENTE':
              searchNCLIENTE(searchType,value,token,mapa,comuna)
              .then(features=>{
                resolve(features)
              })
              .catch(error=>{
                return reject(error)
              })
        break;

        default:

      }
  })
  return promise;
}

export {searchElement}
