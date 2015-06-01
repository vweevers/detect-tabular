var peek     = require('peek-stream')
  , detect   = require('detect-format')
  , csv      = require('csv-parser')
  , json     = require('JSONStream')
  , pipeline = require('stream-combiner2')
  , binary   = require('is-binary')
  , excel    = require('excel-stream')

try {
  var php = require('phpexcel-stream')
} catch(e) {
  // Not available
}

var phpexcel = php && function() {
  return pipeline( php(), csv() )
}

module.exports = function (opts) {
  if (!opts || opts.phpexcel == null)
    var spreadsheet = phpexcel || excel
  else
    spreadsheet = opts.phpexcel ? phpexcel : excel;

  return peek({newline: false, maxBuffer: 8000}, function (data, swap) {
    // bullet-proof nor teally
    if (binary(data.slice(0,24).toString()))
      return swap(null, spreadsheet())

    var detected = detect(data)

    if(detected.format === 'json')
      swap(null, json.parse(detected.selector))
    else if(detected.format === 'csv')
      swap(null, csv({separator: detected.separator}))
    else
      swap(null, spreadsheet())
  })
}
