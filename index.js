#!/usr/bin/env node

var open = require('open')

process.stdin.on('data', showQr)

function showQr (data) {
  var tunnelUrl = data.toString().match(/(http.*)/)[1]
  open('https://4dcabac60edc2fbe5a99fa24fd53c342e476ee98.htmlb.in/#/' + encodeURIComponent(tunnelUrl))
}
