var getUserMedia = require('getusermedia')
var jsqrcode = require('jsqrcode')
var raf = require('raf')

var canvas = document.createElement('canvas')
canvas.width = 256
canvas.height = 256

var ctx = canvas.getContext('2d')

snappy()

getUserMedia({video: true}, capture)

function capture (err, stream) {
  if (err) return

  var video = document.body.appendChild(document.createElement('video'))
  video.src = window.URL.createObjectURL(stream)
  video.play()
  captureVideo()
  function captureVideo () {
    ctx.drawImage(video, 0, 0, 256, 256)
    try {
      var url = jsqrcode(canvas).decode(canvas)
      window.location.href = url
    } catch(e) {raf(captureVideo)}
  }
}

function snappy () {
  var input = document.body.appendChild(document.createElement('input'))
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.setAttribute('capture', 'true')

  input.addEventListener('change', captureImage)

  function captureImage () {
    var reader = new window.FileReader()
    var file = this.files[0]
    reader.addEventListener('loadend', loaded)
    reader.readAsDataURL(file)

    function loaded () {
      var image = document.createElement('img')
      image.addEventListener('load', captureImage)
      image.src = reader.result

      function captureImage () {
        ctx.drawImage(image, 0, 0, 256, 256)
        try {
          var url = jsqrcode(canvas).decode(canvas)
          window.location.href = url
        } catch(e) {}
      }
    }
  }
}
