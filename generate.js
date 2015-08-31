var qr = require('qr-element')
var size = {width: 256, height: 256}
document.body.appendChild(qr(window.location.hash.slice(2), size))
