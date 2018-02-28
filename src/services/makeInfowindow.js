import mymap from './map_service';


function ap_infoWindow_luminaria(lightID, poleNumber, connectionType, type, property,meansured, geometry){
  var map =  mymap.getMap();
  map.infoWindow.setTitle("ID Luminaria : " + lightID);
  var content = `<div style=padding-top: 10px;>ROTULO: ${poleNumber}<br /></div>
  <div style=padding-top: 10px;>Tipo Conexión: ${connectionType}<br /></div>
  <div style=padding-top: 10px;>Tipo: ${type}<br /></div>
  <div style=padding-top: 10px;>Propiedad: ${property}<br /></div>
  <div style=padding-top: 10px;>Medido: ${meansured}<br /><Button class="ui button btn_busqueda" id="editar_btn"">Editar</Button></div>`;
  map.infoWindow.resize(250, 350);
  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(geometry), content));
  map.infoWindow.show(geometry, map.getInfoWindowAnchor(geometry));

}


export {ap_infoWindow_luminaria, ap_infoWindow_medidor};
