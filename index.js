'use strict'

const peek = require('peek-stream')
const detect = require('detect-format')
const csv = require('csv-parser')
const json = require('JSONStream')
const binary = require('is-binary')
const sheet = require('spreadsheet-stream')

module.exports = function (options) {
  options = options || {}

  return peek({ newline: false, maxBuffer: 8000 }, function (data, swap) {
    // bullet-proof nor teally
    if (binary(data.slice(0, 24).toString())) {
      return swap(null, sheet(options))
    }

    const detected = detect(data)

    if (detected.format === 'json') {
      swap(null, json.parse(detected.selector))
    } else if (detected.format === 'csv') {
      swap(null, csv({ separator: detected.separator }))
    } else {
      swap(null, sheet(options))
    }
  })
}
