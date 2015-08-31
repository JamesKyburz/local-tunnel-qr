var getUserMedia = require('getusermedia')
var jsqrcode = require('jsqrcode')
var raf = require('raf')

var canvas = document.createElement('canvas')
canvas.width = 256
canvas.height = 256

var ctx = canvas.getContext('2d')

getUserMedia({video: true}, capture)

function capture (err, stream) {
  if (err) return snappy()

  var video = document.body.appendChild(document.createElement('video'))
  video.src = URL.createObjectURL(stream)
  video.play()
  captureVideo()
  function captureVode () {
    ctx.drawImage(video, 0, 0, 256, 256)
    try {
      var url = jsqrcode(canvas).decode(canvas)
      location.href = url
    } catch(e) {raf(draw)}
  }
}

function snappy () {
  var input = document.body.appendChild(document.createElement('input'))
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.setAttribute('capture', 'true')

  input.addEventListener('change', captureImage)

  function captureImage () {
    var reader = new FileReader()
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
          location.href = url
        } catch(e) {}
      }
    }
  }
}
