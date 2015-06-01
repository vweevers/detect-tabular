var tabular = require('./')
  , fs      = require('fs')
  , keys    = require('map-tabular-keys')
  , snake   = require('snake-case')
  , json    = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( tabular() )
  .pipe( keys(snake) )
  .pipe( json.stringify() )
  .pipe( process.stdout )
