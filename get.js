//gets GTFS for bus data for all 5 boroughs and the bus company, converts shapes.txt from each to geojson, combines them into one featurecollection for stops and another for lines

var gtfs2geojson = require( 'gtfs2geojson' ),
  fs = require( 'fs' ),
  download = require('download-file'),
  unzip = require('unzip');


var sources = require('sources.js');

sources.forEach(function(source) {
  var writePath = './temp/' + source.name
  var saveFile = source.name + '.zip'

  download(source.url, {
    directory: writePath,
    filename: saveFile
  },function(err) {
    console.log('Unzipping ' + writePath + '/' + saveFile);

    var stream = fs.createReadStream(writePath + '/' + saveFile)
      .pipe(unzip.Extract({ path: writePath }));
    
    stream.on('close', function() {
      console.log('Done with ' + source.name);
    })
  })
})






