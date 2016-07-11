 var gtfs2geojson = require('./gtfs2geojson'),
  fs = require( 'fs' );

 var sources = require('./sources.js');

 var geoJsonArray = [];

//iterate over sources
sources.forEach(function(source) {

  console.log('Reading ' + source.name + '/stops.txt' )
  //open shapes.txt, specify utf-8 encoding so we get a string back, not a buffer
  var text = fs.readFileSync( './temp/' + source.name + '/stops.txt','utf8' );

  //pass text to gtfs2geojson, stringify resulting object, write to file
  var geoJson = gtfs2geojson.stops( text );


  var output = fs.createWriteStream('geojson/' + source.name + '/stops.geojson')
  output.write(JSON.stringify(geoJson));


});





