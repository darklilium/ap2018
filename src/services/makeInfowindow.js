import mymap from './map_service';
import InfoTemplate from 'esri/InfoTemplate';
import domConstruct from 'dojo/dom-construct';
import on from 'dojo/on';


function myFunction(e){
  console.log("hola" ,e);
}

function ap_infoWindow_luminaria(lightID, poleNumber, connectionType, type, property,meansured, geometry){
  console.log(lightID);
  var map =  mymap.getMap();
  map.infoWindow.setTitle("ID Luminaria : " + lightID);
  var content = `<div style=padding-top: 10px;>ROTULO: ${poleNumber}<br /></div>
  <div style=padding-top: 10px;>Tipo Conexión: ${connectionType}<br /></div>
  <div style=padding-top: 10px;>Tipo: ${type}<br /></div>
  <div style=padding-top: 10px;>Propiedad: ${property}<br /></div>
  <div style=padding-top: 10px;>Medido: ${meansured}<br /></div>`;
  map.infoWindow.resize(250, 350);
  map.infoWindow.setContent(esri.substitute(esri.geometry.webMercatorToGeographic(geometry), content));
  map.infoWindow.show(geometry, map.getInfoWindowAnchor(geometry));

}


function ap_info(feature){

  var content = `<div style=padding-top: 10px;>ROTULO: ${feature.attributes.ROTULO}<br /></div>
  <div style=padding-top: 10px;>Tipo Conexión: ${feature.attributes.TIPO_CONEXION}<br /></div>
  <div style=padding-top: 10px;>Tipo: ${feature.attributes.TIPO}<br /></div>
  <div style=padding-top: 10px;>Propiedad: ${feature.attributes.PROPIEDAD}<br /></div>
  <div style=padding-top: 10px;>Medido: ${feature.attributes.MEDIDO_TERRENO}<br /></div>
  <div style=padding-top: 10px;><Button id="btn_ver_circuito" class="btn_ver_circuito ui button btn_header_menu">Ver Circuito</Button>
  <Button id="btn_editar" class="btn_editar ui button btn_header_menu">Editar</Button><br /></div>`;
    var title = "ID Luminaria " + feature.attributes.ID_LUMINARIA;
    var infoTemplate = new InfoTemplate();
    infoTemplate.setTitle(title);
    infoTemplate.setContent(content);

//on(document.getElementById('map'), '.clickMe:click', function() {console.log("holasdASd");});

    return infoTemplate;

}



export {ap_infoWindow_luminaria, ap_infoWindow_medidor, ap_info};
