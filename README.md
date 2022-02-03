# detect-tabular

> **A stream that detects tabular data (spreadsheets, dsv or json) and yields objects.**  
> Supports 20+ different file formats. Spreadsheets and DSV must have a header.

[![npm status](http://img.shields.io/npm/v/detect-tabular.svg)](https://www.npmjs.org/package/detect-tabular)
[![node](https://img.shields.io/node/v/detect-tabular.svg)](https://www.npmjs.org/package/detect-tabular)
[![Test](https://img.shields.io/github/workflow/status/vweevers/detect-tabular/Test?label=test)](https://github.com/vweevers/detect-tabular/actions/workflows/test.yml)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript&logoColor=fff)](https://standardjs.com)

## Example

`npm i detect-tabular map-tabular-keys snake-case jsonstream`

```js
const detect = require('detect-tabular')
const fs = require('fs')
const keys = require('map-tabular-keys')
const snake = require('snake-case').snakeCase
const json = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe(detect())
  .pipe(keys(snake))
  .pipe(json.stringify())
  .pipe(process.stdout)
```

> **_Tip_**   If you need normalization like this or number coercion, jump to [tabular-stream](https://www.npmjs.org/package/tabular-stream). If you want a CLI that does multi-format conversion, check out [tabular-cli](https://www.npmjs.org/package/tabular-cli).

## API

### `detect([options])`

Returns a duplex stream - give it any tabular data, get back objects. Options are passed as-is to [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream) (if applicable).

## Supported Input Formats

Text formats:

- DSV (CSV, TSV or anything) through [`csv-parser`](https://npmjs.com/package/csv-parser)
- JSON and NDJSON through [`JSONStream`](https://npmjs.com/package/JSONStream)

Binary formats, through [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream):

- Office Open XML (xlsx, Excel 2007 and above)
- SpreadsheetML (xml, Excel 2003)
- BIFF 5-8 (xls, Excel 95 and above)
- Open Document Format/OASIS (ods)
- SYLK
- [And more](https://github.com/SheetJS/js-xlsx).

NB. Because these binary formats are not streamable, `spreadsheet-stream` will buffer the whole thing in memory. As a safe-guard you can set the `maxSize` option (in bytes): `detect({ maxSize: 1024 * 1024 })`. See [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream) for details.

## Install

With [npm](https://npmjs.org) do:

```
npm install detect-tabular
```

## License

[MIT](LICENSE).

Test data © Statistics Netherlands, The Hague/Heerlen.
