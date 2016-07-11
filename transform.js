 var gtfs2geojson = require('./gtfs2geojson'),
  fs = require( 'fs' )
  EasyZip = require('easy-zip').EasyZip;

  var zip = new EasyZip();
  var sources = require('./sources.js');

  var geoJsonArray = [];

//iterate over sources
sources.forEach(function(source) {

  console.log('Reading ' + source.name + '/stops.txt' )
  //open shapes.txt, specify utf-8 encoding so we get a string back, not a buffer
  var text = fs.readFileSync( './temp/' + source.name + '/stops.txt','utf8' );


  if (!fs.existsSync('geojson/' + source.name)){
      fs.mkdirSync('geojson/' + source.name);
  }

  //transform shapes.txt
  var geoJson = gtfs2geojson.lines( text );
  var output = fs.createWriteStream('geojson/' + source.name + '/lines.geojson')
  output.write(JSON.stringify(geoJson));


  //transform stops.txt
  var geoJson = gtfs2geojson.stops( text );
  var output = fs.createWriteStream('geojson/' + source.name + '/stops.geojson')
  output.write(JSON.stringify(geoJson));
  
});

//combine all into zip file
var files = [];

sources.forEach(function(source) {
  files.push({
    source : 'geojson/' + source.name + '/lines.geojson',
    target: source.name + '/lines.geojson'
  })

  files.push({
    source : 'geojson/' + source.name + '/stops.geojson',
    target: source.name + '/stops.geojson'
  })
});

var zip4 = new EasyZip();
zip4.batchAdd(files,function(){
  zip4.writeToFile('geojson.zip');
});


