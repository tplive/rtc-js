self.importScripts("functions.js")

let _scene = {}

self.onmessage = function(event) {
  console.log("render_worker.js: self.onmessage: " + JSON.stringify(event.data))
  _scene = event.data
}
// This is an attempt at a general function for rendering, by passing all configuration in
// through a .postMessage instead of flimsy query-parameters. This should enable *multi*-threaded workers
// by dividing up the pixel-space and spawning N workers, one for each pixel-space.

function render_worker() {
  

  cam = _scene.camera
  world = _scene.world

  console.log("render_worker() _scene " + cam)
  const hsize =  cam.hsize
  const vsize = 200//_scene.camera.vsize

  const size = vsize * hsize

  var render_status = "Idle"


  // Genererer et array med pixel-koordinater
  let pixels = []
  for (let y = 0; y < vsize; y++) {
    for (let x = 0; x < hsize; x++) {
      pixels.push([x, y])
    }
  }

  // Stokker dem grundig ;)
  shuffle(pixels)

  while (pixels.length > 0) {
    render_status = "Rendering"
    const coo = pixels.pop()
    const x = coo[0]
    const y = coo[1]
    
    const pix = color(0.8, 0.7, 0.6) //render_pixel(_scene.camera, _scene.world, x, y)
    const sc = pix.scaled()
    const percent = Math.round((size - pixels.length) / size * 100)
    render_status = percent >= 100 ? "Done" : render_status
    const msgData = {
      percent: percent,
      status: render_status,
      size: size,
      vsize: vsize,
      hsize: hsize,
      x: x,
      y: y,
      red: sc.red,
      green: sc.green,
      blue: sc.blue,
    }
    postMessage(msgData)
  }
}


render_worker()
