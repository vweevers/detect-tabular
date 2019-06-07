var test       = require('tape')
  , tabular    = require('../')
  , fs         = require('fs')
  , concat     = require('concat-stream')
  , through2   = require('through2').obj
  , deepEqual  = require('deep-equal')
  , coerce     = require('coerce-tabular')

var formats = ['txt', 'csv', 'xlsx', 'xls', 'ods', 'json']
var expected = require('./air_pollution_nl.json').rows
var base = __dirname + require('path').sep + 'air_pollution_nl.'

formats.forEach(function(format){
  test(format, function(t){
    t.plan(4)

    fs.createReadStream(base + format)
      .pipe( tabular() )
      .pipe( coerce() )

      // Ignore tiny rounding differences
      .pipe( through2(function(obj, _, next){
        for(var k in obj) {
          if (typeof obj[k] != 'string')
            obj[k] = obj[k].toFixed(2)
        }

        next(null, obj)
      }))

      .pipe( concat(function(data){
        t.equal(data.length, expected.length, 'length ok')
        t.deepEqual(data[data.length-1], expected[expected.length-1], 'last row ok')
        t.deepEqual(data[0], expected[0], 'first row ok')
        t.ok(deepEqual(data, expected), 'deep equal')
      }))
  })
})
