# nyc-gtfs2geojson
Script to extract GeoJSON points and lines from NYC GTFS Data.  Extracts lines from `shapes.txt`, and points from `stops.txt`

## How to use
- Install dependencies `npm install`
- Start with an array of objects for GTFS data sources: `sources.js`.  Each has a name and a url.
- Download and unzip each source `node get.js`
- Transform each into GeoJson `node transform.js`
- Geojson is saved in `./geojson/{source.name}/{stops||lines}.geojson

##gtfs2geojson
This script uses a modified version of `[gtfs2geojson(https://github.com/tmcw/gtfs2geojson)`, a node package by Tom MacWright.  We have added parsing for `stops.txt` and will do a Pull Request back to the package soon.

## How we are using it
- The resulting GeoJSON files are included in this repo.  The github file URLS are the source for another ETL that loads the data into a PostGIS database for use in mapping applications.
