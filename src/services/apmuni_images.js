import env from './config.js';
/*value: para pagina,
* text: para titulo
* queryvalue: para servicio
*/
const MuniImages = [
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/algarrobo.png',
    value: 'algarrobo',
    text: 'Algarrobo',
    extent: [-71.67062, -33.3648],
    queryvalue: 'ALGARROBO',
    key: 1
  },
  {
    original: env.CSSDIRECTORY + 'images/logos/logos_menu/cabildo.png',
    value: 'cabildo',
    text: 'Cabildo',
    extent: [-71.0662 , -32.4258],
    queryvalue: 'CABILDO',
    key: 2
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/callelarga.png',
    value: 'callelarga',
    text: 'Calle Larga',
    extent: [-70.6258, -32.8575],
    queryvalue: 'CALLE LARGA',
    key: 3
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/cartagena.png',
    value: 'cartagena',
    text: 'Cartagena',
    extent: [-71.6046, -33.5482],
    queryvalue: 'CARTAGENA',
    key: 4
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/casablanca.png',
    value: 'casablanca',
    text: 'Casablanca',
    extent: [-71.4076, -33.319],
    queryvalue: 'CASABLANCA',
    key: 5
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/catemu.png',
    value: 'catemu',
    text: 'Catemu',
    extent: [-71.4076, -33.319],
    queryvalue: 'CATEMU',
    key: 6
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/cauquenes.png',
    value: 'cauquenes',
    text: 'Cauquénes',
    extent: [-72.3314, -35.9597],
    queryvalue: 'CAUQUÉNES',
    key: 7
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/colbun.png',
    value: 'colbun',
    text: 'Colbún',
    extent: [-71.4069, -35.6985],
    queryvalue: 'COLBÚN',
    key: 8
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/concon.png',
    value: 'concon',
    text: 'Concón',
    extent: [-71.5235, -32.9239],
    queryvalue: 'CONCON',
    key: 9
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/constitucion.png',
    value: 'constitucion',
    text: 'Constitución',
    extent: [-72.4094, -35.3335],
    queryvalue: 'CONSTITUCIÓN',
    key: 10
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/curacavi.png',
    value: 'curacavi',
    text: 'Curacaví',
    extent: [-71.1575, -33.4004],
    queryvalue: 'CURACAVI',
    key: 11
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/elquisco.png',
    value: 'elquisco',
    text: 'El Quisco',
    extent: [-71.6982, -33.3986],
    queryvalue: 'EL QUISCO',
    key: 12
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/eltabo.png',
    value: 'eltabo',
    text: 'El Tabo',
    extent: [-71.6669, -33.4557],
    queryvalue: 'EL TABO',
    key: 13
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/empedrado.png',
    value: 'empedrado',
    text: 'Empedrado',
    extent: [-72.2861, -35.5924],
    queryvalue: 'Empedrado',
    key: 14
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/hijuelas.png',
    value: 'hijuelas',
    text: 'Hijuelas',
    extent: [-71.1437, -32.798],
    queryvalue: 'HIJUELAS',
    key: 15
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/lacalera.png',
    value: 'lacalera',
    text: 'La Calera',
    extent: [-71.204, -32.7878],
    queryvalue: 'LA CALERA',
    key: 16
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/lacruz.png',
    value: 'lacruz',
    text: 'La Cruz',
    extent: [-71.2273, -32.8258],
    queryvalue: 'LA CRUZ',
    key: 17

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/laligua.png',
    value: 'laligua',
    text: 'La Ligua',
    extent: [-71.2326, -32.4499],
    queryvalue: 'LA LIGUA',
    key: 18

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/limache.png',
    value: 'limache',
    text: 'Limache',
    extent: [-71.2596, -33.0095],
    queryvalue: 'LIMACHE',
    key: 19

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/linares.png',
    value: 'linares',
    text: 'Linares',
    extent: [-71.6049, -35.8465],
    queryvalue: 'LINARES',
    key: 20

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/llayllay.png',
    value: 'llayllay',
    text: 'Llay Llay',
    extent: [-70.9428, -32.8444],
    queryvalue: 'LLAY LLAY',
    key: 21

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/longavi.png',
    value: 'longavi',
    text: 'Longaví',
    extent: [-71.6899, -35.9623],
    queryvalue: 'LONGAVÍ',
    key: 22

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/losandes.png',
    value: 'losandes',
    text: 'Los Andes',
    extent: [-70.5972, -32.8338],
    queryvalue: 'LOS ANDES',
    key: 23
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/ninhue.png',
    value: 'ninhue',
    text: 'Ninhue',
    extent: [-72.4061, -36.3947],
    queryvalue: 'NINHUE',
    key: 24
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/nogales.png',
    value: 'nogales',
    text: 'Nogales',
    extent: [-71.2078, -32.7382],
    queryvalue: 'NOGALES',
    key: 25
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/ñiquen.png',
    value: 'ñiquen',
    text: 'Ñiquén',
    extent: [-71.9102, -36.2941],
    queryvalue: 'ÑIQUEN',
    key: 26
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/olmue.png',
    value: 'olmue',
    text: 'Olmué',
    extent: [-71.1893,-32.9962],
    queryvalue: 'OLMUE',
    key: 27
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/panquehue.png',
    value: 'panquehue',
    text: 'Panquehue',
    extent: [-70.8333, -32.767],
    queryvalue: 'PANQUEHUE',
    key: 28
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/parral.png',
    value: 'parral',
    text: 'Parral',
    extent: [-71.8373, -36.1462],
    queryvalue: 'PARRAL',
    key: 29
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/puchuncavi.png',
    value: 'puchuncavi',
    text: 'Puchuncaví',
    extent: [-71.4122, -32.7275],
    queryvalue: 'PUCHUNCAVI',
    key: 30
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/putaendo.png',
    value: 'putaendo',
    text: 'Putaendo',
    extent: [-70.7177, -32.6285],
    queryvalue: 'PUTAENDO',
    key: 31
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/quillota.png',
    value: 'quillota',
    text: 'Quillota',
    extent: [-71.2497, -32.8803],
    queryvalue: 'QUILLOTA',
    key: 32
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/quilpue.png',
    value: 'quilpue',
    text: 'Quilpué',
    extent: [-71.4311, -33.0497],
    queryvalue: 'QUILPUE',
    key: 33
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/quintero.png',
    value: 'quintero',
    text: 'Quintero',
    extent: [-71.5313, -32.7660],
    queryvalue: 'QUINTERO',
    key: 34
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/retiro.png',
    value: 'retiro',
    text: 'Retiro',
    extent: [-71.7667,  -36.0500],
    queryvalue: 'RETIRO',
    key: 35
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/rinconada.png',
    value: 'rinconada',
    text: 'Rinconada',
    extent: [-70.7068,  -32.8774],
    queryvalue: 'RINCONADA',
    key: 36
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/sanantonio.png',
    value: 'sanantonio',
    text: 'San Antonio',
    extent: [-71.6131,  -33.5836],
    queryvalue: 'SAN ANTONIO',
    key: 37
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/sancarlos.png',
    value: 'sancarlos',
    text: 'San Carlos',
    extent: [-71.9862,  -36.4199],
    queryvalue: 'SAN CARLOS',
    key: 38
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/sanesteban.png',
    value: 'sanesteban',
    text: 'San Esteban',
    extent: [-70.5937,  -32.8081],
    queryvalue: 'SAN ESTEBAN',
    key: 39
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/sanfelipe.png',
    value: 'sanfelipe',
    text: 'San Felipe',
    extent: [-70.7208,  -32.75],
    queryvalue: 'SAN FELIPE',
    key: 40
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/sanjavier.png',
    value: 'sanjavier',
    text: 'San Javier',
    extent: [-71.7369,  -35.5908],
    queryvalue: 'SAN JAVIER',
    key: 41
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/santamaria.png',
    value: 'santamaria',
    text: 'Santa María',
    extent: [-70.6587,  -32.747],
    queryvalue: 'SANTA MARIA',
    key: 42
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/santodomingo.png',
    value: 'santodomingo',
    text: 'Santo Domingo',
    extent: [-71.6309,  -33.6366],
    queryvalue: 'SANTO DOMINGO',
    key: 43
  },
  {
    original: env.CSSDIRECTORY + 'images/logos/logos_menu/valparaiso.png',
    value: 'valparaiso',
    text: 'Valparaíso',
    extent: [-71.6272 ,-33.0394],
    queryvalue: 'VALPARAISO',
    key: 44

  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/villaalegre.png',
    value: 'villaalegre',
    text: 'Villa Alegre',
    extent: [-71.6829,  -35.6869],
    queryvalue: 'VILLA ALEGRE',
    key: 45
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/villaalemana.png',
    value: 'villaalemana',
    text: 'Villa Alemana',
    extent: [-71.3734,  -33.0476],
    queryvalue: 'VILLA ALEMANA',
    key: 46
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/vinadelmar.png',
    value: 'vinadelmar',
    text: 'Viña del Mar',
    extent: [-71.5523,  -33.0245],
    queryvalue: 'VIÑA DEL MAR',
    key: 47
  },
  {
    original:  env.CSSDIRECTORY + 'images/logos/logos_menu/yerbasbuenas.png',
    value: 'yerbasbuenas',
    text: 'Yerbas Buenas',
    extent: [-71.5833,  -35.7500],
    queryvalue: 'YERBAS BUENAS',
    key: 48
  }

]

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: '/assets/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: '/assets/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: '/assets/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: '/assets/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: '/assets/images/avatar/small/justen.jpg' },
  },
]

export {friendOptions, MuniImages}
