#!/usr/bin/env node

var open = require('open')

process.stdin.on('data', showQr)

function showQr (data) {
  var tunnelUrl = data.toString().match(/(http.*)/)[1]
  open('https://5eda1947231db5bfc1b274e2a8f9040e538b075b.htmlb.in/#/' + tunnelUrl)
}
