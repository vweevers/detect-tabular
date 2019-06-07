# detect-tabular

**Detects tabular data (dsv, json, ndjson, xls, xlsx, xml, ods or sylk) and emits objects. Memory efficient for spreadsheets [if PHP is available](https://www.npmjs.com/package/phpexcel-stream), but [does not require it](https://github.com/vweevers/spreadsheet-stream). Spreadsheets and DSV must have a header.**

[![npm status](http://img.shields.io/npm/v/detect-tabular.svg?style=flat-square)](https://www.npmjs.org/package/detect-tabular) [![Travis build status](https://img.shields.io/travis/vweevers/detect-tabular.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/detect-tabular) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/detect-tabular.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/detect-tabular) [![Dependency status](https://img.shields.io/david/vweevers/detect-tabular.svg?style=flat-square)](https://david-dm.org/vweevers/detect-tabular)

## example

`npm i detect-tabular map-tabular-keys snake-case jsonstream`

```js
var detect = require('detect-tabular')
  , fs     = require('fs')
  , keys   = require('map-tabular-keys')
  , snake  = require('snake-case')
  , json   = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( detect() )
  .pipe( keys(snake) )
  .pipe( json.stringify() )
  .pipe( process.stdout )
```

> **_Tip_** &nbsp; If you need normalization like this or number coercion, jump to [tabular-stream](https://www.npmjs.org/package/tabular-stream). If you want a CLI that does multi-format conversion, check out [tabular-cli](https://www.npmjs.org/package/tabular-cli).

## api

### `detect([options])`

Returns a duplex stream - give it any tabular data, get back objects. There's one available option:

#### `boolean phpexcel`

Whether to use [`phpexcel-stream`](https://npmjs.com/package/phpexcel-stream) (memory efficient) or [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream) (usually faster) for spreadsheets. Default is `undefined`, meaning it will try to require `phpexcel-stream` but if PHP is not available, fallback to `spreadsheet-stream`. This might change in the future. Hopefully someone comes up with a native, pure streaming, memory efficient spreadsheet parser.

## supported input formats

Text formats:

- DSV (CSV, TSV or anything) through [csv-parser](https://npmjs.com/package/csv-parser)
- JSON and NDJSON through [JSONStream](https://npmjs.com/package/JSONStream)

And through [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream) or [phpexcel-stream](https://npmjs.com/package/phpexcel-stream):

- Office Open XML (xlsx, Excel 2007 and above)
- SpreadsheetML (xml, Excel 2003)
- BIFF 5-8 (xls, Excel 95 and above)
- Open Document Format/OASIS (ods)
- SYLK

<small><i>NB. It actually supports even more formats - depending on whether spreadsheet-stream or phpexcel-stream is used - but only the shared formats are listed here</small></i>.

## install

With [npm](https://npmjs.org) do:

```
npm install detect-tabular
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl). Inspired by [detect-data-stream](https://www.npmjs.com/package/detect-data-stream).  Test data © Statistics Netherlands, The Hague/Heerlen.
