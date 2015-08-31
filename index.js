#!/usr/bin/env node

var open = require('open')

process.stdin.on('data', showQr)

function showQr (data) {
  var tunnelUrl = data.toString().match(/(http.*)/)[1]
  open('https://45fc0fdf85dc010142a22c9fd401dd5500b3b798.htmlb.in/#/' + tunnelUrl)
}
