
import Map from 'esri/map';
import VETiledLayer from 'esri/virtualearth/VETiledLayer';

var mapa = {
  createMap: function(div,basemap,center,zoom, popup){
      this.mapa = new Map(div, {
        center: center,
        basemap: basemap,
        zoom:zoom,
        logo: false,
        infoWindow: popup
      });
      return this.mapa;
  },
  getMap: function(){
    return this.mapa;
  }
}

var veTileRoad = new VETiledLayer({
  bingMapsKey: "Asrn2IMtRwnOdIRPf-7q30XVUrZuOK7K2tzhCACMg7QZbJ4EPsOcLk6mE9-sNvUe",
  mapStyle: VETiledLayer.MAP_STYLE_ROAD,
  id:"veroad"
});

var veTileAerial = new VETiledLayer({
  bingMapsKey: "Asrn2IMtRwnOdIRPf-7q30XVUrZuOK7K2tzhCACMg7QZbJ4EPsOcLk6mE9-sNvUe",
  mapStyle: VETiledLayer.MAP_STYLE_AERIAL,
  id:"veaerial"
});

var veTileWithLabels = new VETiledLayer({
  bingMapsKey: "Asrn2IMtRwnOdIRPf-7q30XVUrZuOK7K2tzhCACMg7QZbJ4EPsOcLk6mE9-sNvUe",
  mapStyle: VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS,
  id:"velabels"
});

export function changeBasemap(mapType){
    var mapp = mapa.getMap();

    switch (mapType) {
      case 'topo':

        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        mapp.setBasemap(mapType);
      break;

      case 'hybrid':

        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        mapp.setBasemap(mapType);
      break;


      case 'aerial':
        //bing map: satelite
        //desabilitar ve tiled layers (bing maps)
        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        mapp.setBasemap('topo');
        mapp.addLayer(veTileAerial,1);
      break;

      case 'aerialWithLabels':

        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        mapp.setBasemap('topo');
        mapp.addLayer(veTileWithLabels,1);
      break;

      case 'roads':

        if(mapp.getLayer("veroad")){
          console.log("habilitado veroad");
          mapp.removeLayer(mapp.getLayer("veroad"));
        }

        if(mapp.getLayer("veaerial")){
          console.log("habilitado veaerial");
          mapp.removeLayer(mapp.getLayer("veaerial"));
        }

        if(mapp.getLayer("velabels")){
          console.log("habilitado velabels");
          mapp.removeLayer(mapp.getLayer("velabels"));
        }
        mapp.setBasemap('topo');
        mapp.addLayer(veTileRoad,1);
      break;
  
  }
}

export default mapa;
