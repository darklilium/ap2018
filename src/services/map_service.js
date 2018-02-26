
import Map from 'esri/map';

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

export default mapa;
