import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import layers from './layers_service';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import makeSymbol from './makeSymbol';
import mapa from './map_service';
import extent from 'esri/geometry/Extent';
import graphicsUtils from 'esri/graphicsUtils';
import {ap_infoWindow_luminaria, ap_infoWindow_medidor} from './makeInfowindow';
import FeatureLayer from 'esri/layers/FeatureLayer';


var gLayerMedidor = new GraphicsLayer();
var gLayerLuminarias = new GraphicsLayer();
var gLayerLumAsoc = new GraphicsLayer();

export function getLuminariasAsociadas(token, comuna, idequipo){
  var promise = new Promise((resolve, reject)=>{
    gLayerLuminarias.clear()
    var map = mapa.getMap();
    var qTaskMedidores = new QueryTask(layers.read_luminarias(token));
    var qMedidores = new Query();

    qMedidores.returnGeometry = true;
    qMedidores.outFields=["*"];
    qMedidores.where = "COMUNA ='" + comuna + "' AND ID_EQUIPO_AP="+idequipo;

    qTaskMedidores.execute(qMedidores, (featureSet)=>{

      if(!featureSet.features.length){
        return resolve([])
      }
      let mySymbol = makeSymbol.makePointRelated();

      let finalResults = featureSet.features.map((result, index)=>{
        let children = {
          "ID LUMINARIA":  result.attributes['ID_LUMINARIA'],
          "TIPO CONEXIÓN": result.attributes['TIPO_CONEXION'],
          "PROPIEDAD": result.attributes['PROPIEDAD'],
          "MEDIDO": result.attributes['MEDIDO_TERRENO'],
          "DESCRIPCION": result.attributes['DESCRIPCION'],
          "ROTULO": result.attributes['ROTULO']
        };
        //draw the points
        var g = new Graphic(featureSet.features[index].geometry,mySymbol,children);
        gLayerLuminarias.add(g);
        return g;
      });
      map.addLayer(gLayerLuminarias,1);
      return resolve(featureSet.features);
    }, (error)=>{
      console.log(error,"Error doing query for getLuminariasAsociadas");
      return reject(error);
    });
  })
  return promise;
}

export function getLuminariaLocation(token, idluminaria, comuna){
  var promise = new Promise((resolve,reject)=>{

    let mySymbol = makeSymbol.makePoint();
    var map = mapa.getMap();
    gLayerLumAsoc.clear();
    var qTaskLuminaria = new QueryTask(layers.read_luminarias(token));
    var qLuminaria = new Query();

    qLuminaria.returnGeometry = true;
    qLuminaria.outFields=["*"];
    qLuminaria.where = "ID_LUMINARIA  =" + idluminaria + "AND COMUNA='"+ comuna+"'" ;

    qTaskLuminaria.execute(qLuminaria, (featureSet)=>{

      if(!featureSet.features.length){
        return resolve([]);
      }
      ap_infoWindow_luminaria(
        featureSet.features[0].attributes.ID_LUMINARIA,
        featureSet.features[0].attributes.ROTULO,
        featureSet.features[0].attributes.TIPO_CONEXION,
        featureSet.features[0].attributes.TIPO,
        featureSet.features[0].attributes.PROPIEDAD,
        featureSet.features[0].attributes.MEDIDO_TERRENO,
        featureSet.features[0].geometry)
      gLayerLumAsoc.add(new esri.Graphic(featureSet.features[0].geometry,mySymbol));

      var mql = window.matchMedia("(max-width: 767px)");
      var myExtend = graphicsUtils.graphicsExtent(featureSet.features[0].geometry);
      (mql.matches) ?  map.centerAndZoom(featureSet.features[0].geometry.offset(0,7),20) : map.centerAndZoom(featureSet.features[0].geometry.offset(-6,-3),20);



      map.addLayer(gLayerLumAsoc,1);


      return resolve(featureSet.features);
    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for getLuminariaLocation");
      return reject([]);
    });
  })

  return promise;

}

export function getDataLuminariasComuna(token,comuna){

  var promise = new Promise((resolve,reject)=>{

    var map = mapa.getMap();
    var qTaskMedidores = new QueryTask(layers.read_luminarias(token));
    var qMedidores = new Query();

    qMedidores.returnGeometry = true;
    qMedidores.outFields=["*"];
    qMedidores.where = "COMUNA ='" + comuna + "'";

    qTaskMedidores.execute(qMedidores, (featureSet)=>{

      if(!featureSet.features.length){
        return resolve([])
      }

      return resolve(featureSet.features);
    }, (error)=>{
      console.log(error,"Error doing query for getDataLuminariasComuna");
      return reject(error);
    });
  });

  return promise;
}
export function getFotografias(token, idnodo){

  var promise = new Promise((resolve,reject)=>{
    console.log("buscando fotos para nodo...:",idnodo);

    var qTaskFotografías = new esri.tasks.QueryTask(layers.read_fotografias(token));
    var qFotografias = new esri.tasks.Query();

    qFotografias.returnGeometry = true;
    qFotografias.outFields=["*"];
    qFotografias.where = "id_nodo =" + idnodo ;

    qTaskFotografías.execute(qFotografias, (featureSet)=>{

      if(!featureSet.features.length){
        return resolve([]);
      }

      var queryAttachments = new FeatureLayer(layers.read_fotografias(token));
      queryAttachments.queryAttachmentInfos(featureSet.features[0].attributes['OBJECTID'],(fotos)=>{
          console.log("fotos encontradas...",fotos.length);
        return resolve(fotos);
      });


    }, (Errorq)=>{
      console.log(Errorq,"Error doing query for getFotografías");
      return reject([]);
    });

  });

  return promise;

}
