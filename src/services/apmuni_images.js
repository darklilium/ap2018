import env from './config.js';
/*value: para pagina,
* text: para titulo
* queryvalue: para servicio
*/
const MuniImages = [
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/algarrobo.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/algarrobo.png',
    value: 'algarrobo',
    text: 'Algarrobo',
    extent: [-71.67062, -33.3648],
    queryvalue: 'ALGARROBO',
    key: 1
  },
  {
    dashboard_logo: env.CSSDIRECTORY + '/images/dashboard_images/logos/cabildo.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/cabildo.png',
    value: 'cabildo',
    text: 'Cabildo',
    extent: [-71.0662 , -32.4258],
    queryvalue: 'CABILDO',
    key: 2
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/callelarga.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/callelarga.png',
    value: 'callelarga',
    text: 'Calle Larga',
    extent: [-70.6258, -32.8575],
    queryvalue: 'CALLE LARGA',
    key: 3
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/cartagena.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/cartagena.png',
    value: 'cartagena',
    text: 'Cartagena',
    extent: [-71.6046, -33.5482],
    queryvalue: 'CARTAGENA',
    key: 4
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/casablanca.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/casablanca.png',
    value: 'casablanca',
    text: 'Casablanca',
    extent: [-71.4076, -33.319],
    queryvalue: 'CASABLANCA',
    key: 5
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/catemu.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/catemu.png',
    value: 'catemu',
    text: 'Catemu',
    extent: [-71.4076, -33.319],
    queryvalue: 'CATEMU',
    key: 6
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/cauquenes.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/cauquenes.png',
    value: 'cauquenes',
    text: 'Cauquénes',
    extent: [-72.3314, -35.9597],
    queryvalue: 'CAUQUÉNES',
    key: 7
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/colbun.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/colbun.png',
    value: 'colbun',
    text: 'Colbún',
    extent: [-71.4069, -35.6985],
    queryvalue: 'COLBÚN',
    key: 8
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/concon.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/concon.png',
    value: 'concon',
    text: 'Concón',
    extent: [-71.5235, -32.9239],
    queryvalue: 'CONCON',
    key: 9
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/constitucion.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/constitucion.png',
    value: 'constitucion',
    text: 'Constitución',
    extent: [-72.4094, -35.3335],
    queryvalue: 'CONSTITUCIÓN',
    key: 10
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/curacavi.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/curacavi.png',
    value: 'curacavi',
    text: 'Curacaví',
    extent: [-71.1575, -33.4004],
    queryvalue: 'CURACAVI',
    key: 11
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/elquisco.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/elquisco.png',
    value: 'elquisco',
    text: 'El Quisco',
    extent: [-71.6982, -33.3986],
    queryvalue: 'EL QUISCO',
    key: 12
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/eltabo.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/eltabo.png',
    value: 'eltabo',
    text: 'El Tabo',
    extent: [-71.6669, -33.4557],
    queryvalue: 'EL TABO',
    key: 13
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/empedrado.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/empedrado.png',
    value: 'empedrado',
    text: 'Empedrado',
    extent: [-72.2861, -35.5924],
    queryvalue: 'Empedrado',
    key: 14
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/hijuelas.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/hijuelas.png',
    value: 'hijuelas',
    text: 'Hijuelas',
    extent: [-71.1437, -32.798],
    queryvalue: 'HIJUELAS',
    key: 15
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/lacalera.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/lacalera.png',
    value: 'lacalera',
    text: 'La Calera',
    extent: [-71.204, -32.7878],
    queryvalue: 'LA CALERA',
    key: 16
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/lacruz.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/lacruz.png',
    value: 'lacruz',
    text: 'La Cruz',
    extent: [-71.2273, -32.8258],
    queryvalue: 'LA CRUZ',
    key: 17

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/laligua.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/laligua.png',
    value: 'laligua',
    text: 'La Ligua',
    extent: [-71.2326, -32.4499],
    queryvalue: 'LA LIGUA',
    key: 18

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/limache.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/limache.png',
    value: 'limache',
    text: 'Limache',
    extent: [-71.2596, -33.0095],
    queryvalue: 'LIMACHE',
    key: 19

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/linares.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/linares.png',
    value: 'linares',
    text: 'Linares',
    extent: [-71.6049, -35.8465],
    queryvalue: 'LINARES',
    key: 20

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/llayllay.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/llayllay.png',
    value: 'llayllay',
    text: 'Llay Llay',
    extent: [-70.9428, -32.8444],
    queryvalue: 'LLAY LLAY',
    key: 21

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/longavi.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/longavi.png',
    value: 'longavi',
    text: 'Longaví',
    extent: [-71.6899, -35.9623],
    queryvalue: 'LONGAVÍ',
    key: 22

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/losandes.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/losandes.png',
    value: 'losandes',
    text: 'Los Andes',
    extent: [-70.5972, -32.8338],
    queryvalue: 'LOS ANDES',
    key: 23
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/ninhue.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/ninhue.png',
    value: 'ninhue',
    text: 'Ninhue',
    extent: [-72.4061, -36.3947],
    queryvalue: 'NINHUE',
    key: 24
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/nogales.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/nogales.png',
    value: 'nogales',
    text: 'Nogales',
    extent: [-71.2078, -32.7382],
    queryvalue: 'NOGALES',
    key: 25
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/ñiquen.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/ñiquen.png',
    value: 'ñiquen',
    text: 'Ñiquén',
    extent: [-71.9102, -36.2941],
    queryvalue: 'ÑIQUEN',
    key: 26
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/olmue.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/olmue.png',
    value: 'olmue',
    text: 'Olmué',
    extent: [-71.1893,-32.9962],
    queryvalue: 'OLMUE',
    key: 27
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/panquehue.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/panquehue.png',
    value: 'panquehue',
    text: 'Panquehue',
    extent: [-70.8333, -32.767],
    queryvalue: 'PANQUEHUE',
    key: 28
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/parral.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/parral.png',
    value: 'parral',
    text: 'Parral',
    extent: [-71.8373, -36.1462],
    queryvalue: 'PARRAL',
    key: 29
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/puchuncavi.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/puchuncavi.png',
    value: 'puchuncavi',
    text: 'Puchuncaví',
    extent: [-71.4122, -32.7275],
    queryvalue: 'PUCHUNCAVI',
    key: 30
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/putaendo.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/putaendo.png',
    value: 'putaendo',
    text: 'Putaendo',
    extent: [-70.7177, -32.6285],
    queryvalue: 'PUTAENDO',
    key: 31
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/quillota.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/quillota.png',
    value: 'quillota',
    text: 'Quillota',
    extent: [-71.2497, -32.8803],
    queryvalue: 'QUILLOTA',
    key: 32
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/quilpue.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/quilpue.png',
    value: 'quilpue',
    text: 'Quilpué',
    extent: [-71.4311, -33.0497],
    queryvalue: 'QUILPUE',
    key: 33
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/quintero.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/quintero.png',
    value: 'quintero',
    text: 'Quintero',
    extent: [-71.5313, -32.7660],
    queryvalue: 'QUINTERO',
    key: 34
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/retiro.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/retiro.png',
    value: 'retiro',
    text: 'Retiro',
    extent: [-71.7667,  -36.0500],
    queryvalue: 'RETIRO',
    key: 35
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/rinconada.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/rinconada.png',
    value: 'rinconada',
    text: 'Rinconada',
    extent: [-70.7068,  -32.8774],
    queryvalue: 'RINCONADA',
    key: 36
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/sanantonio.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/sanantonio.png',
    value: 'sanantonio',
    text: 'San Antonio',
    extent: [-71.6131,  -33.5836],
    queryvalue: 'SAN ANTONIO',
    key: 37
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/sancarlos.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/sancarlos.png',
    value: 'sancarlos',
    text: 'San Carlos',
    extent: [-71.9862,  -36.4199],
    queryvalue: 'SAN CARLOS',
    key: 38
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/sanesteban.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/sanesteban.png',
    value: 'sanesteban',
    text: 'San Esteban',
    extent: [-70.5937,  -32.8081],
    queryvalue: 'SAN ESTEBAN',
    key: 39
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/sanfelipe.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/sanfelipe.png',
    value: 'sanfelipe',
    text: 'San Felipe',
    extent: [-70.7208,  -32.75],
    queryvalue: 'SAN FELIPE',
    key: 40
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/sanjavier.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/sanjavier.png',
    value: 'sanjavier',
    text: 'San Javier',
    extent: [-71.7369,  -35.5908],
    queryvalue: 'SAN JAVIER',
    key: 41
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/santamaria.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/santamaria.png',
    value: 'santamaria',
    text: 'Santa María',
    extent: [-70.6587,  -32.747],
    queryvalue: 'SANTA MARIA',
    key: 42
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/santodomingo.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/santodomingo.png',
    value: 'santodomingo',
    text: 'Santo Domingo',
    extent: [-71.6309,  -33.6366],
    queryvalue: 'SANTO DOMINGO',
    key: 43
  },
  {
    dashboard_logo: env.CSSDIRECTORY + '/images/dashboard_images/logos/valparaiso.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/valparaiso.png',
    value: 'valparaiso',
    text: 'Valparaíso',
    extent: [-71.6272 ,-33.0394],
    queryvalue: 'VALPARAISO',
    key: 44

  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/villaalegre.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/villaalegre.png',
    value: 'villaalegre',
    text: 'Villa Alegre',
    extent: [-71.6829,  -35.6869],
    queryvalue: 'VILLA ALEGRE',
    key: 45
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/villaalemana.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/villaalemana.png',
    value: 'villaalemana',
    text: 'Villa Alemana',
    extent: [-71.3734,  -33.0476],
    queryvalue: 'VILLA ALEMANA',
    key: 46
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/vinadelmar.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/vinadelmar.png',
    value: 'vinadelmar',
    text: 'Viña del Mar',
    extent: [-71.5523,  -33.0245],
    queryvalue: 'VIÑA DEL MAR',
    key: 47
  },
  {
    dashboard_logo:  env.CSSDIRECTORY + '/images/dashboard_images/logos/yerbasbuenas.png',
    dashboard_bg: env.CSSDIRECTORY + '/images/dashboard_images/bg/yerbasbuenas.png',
    value: 'yerbasbuenas',
    text: 'Yerbas Buenas',
    extent: [-71.5833,  -35.7500],
    queryvalue: 'YERBAS BUENAS',
    key: 48
  }

]

function filterComunaOptions(c){



}

export {MuniImages, filterComunaOptions}
