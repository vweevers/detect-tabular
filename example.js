'use strict'

const tabular = require('.')
const fs = require('fs')
const keys = require('map-tabular-keys')
const snake = require('snake-case').snakeCase
const json = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe(tabular())
  .pipe(keys(snake))
  .pipe(json.stringify())
  .pipe(process.stdout)
