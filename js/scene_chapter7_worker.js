self.importScripts("functions.js")

function render_worker() {

  var q = {} // Get configuration parameters from query parameters
  location.search.slice(1).split("&").forEach(function (key_value) { var kv = key_value.split("="); q[kv[0]] = kv[1]; })

  const vsize = q['vsize'] // Vertical size of the canvas
  const hsize = q['hsize'] // Horizontal size of the canvas

  const size = vsize * hsize

  var render_status = "Idle"

  // DEFINE SCENE
  const floor = sphere()
  floor.transform = scaling(10, 0.01, 10)
  floor.material.color = color(1, 0.9, 0.9)
  floor.material.specular = 0.0

  const left_wall = sphere()
  left_wall.transform = transformations(scaling(10, 0.01, 10), rotation_x(π / 2), rotation_y(-π / 4), translation(0, 0, 5))
  left_wall.material = floor.material

  const right_wall = sphere()
  right_wall.transform = transformations(scaling(10, 0.01, 10), rotation_x(π / 2), rotation_y(π / 4), translation(0, 0, 5))
  right_wall.material = floor.material

  const middle = sphere()
  middle.transform = translation(-0.5, 1, 0.5)
  middle.material.color = color(0.1, 1, 0.5)
  middle.material.diffuse = 0.7
  middle.material.specular = 0.3

  const right = sphere()
  right.transform = transformations(translation(2.8, 1, -0.5), scaling(0.5, 0.5, 0.5))
  right.material.color = color(0.5, 1, 0.1)
  right.material.diffuse = 0.7
  right.material.specular = 0.3

  const left = sphere()
  left.transform = transformations(translation(-5.5, 1, -0.75), scaling(0.33, 0.33, 0.33))
  left.material.color = color(1, 0.8, 0.1)
  left.material.diffuse = 0.7
  left.material.specular = 0.3

  const light = point_light(point(-10, 10, -10), color(1, 1, 1))

  const cam = camera(hsize, vsize, π / 3)
  const from = point(0, 1.5, -5)
  const to = point(0, 1, 0)
  const up = vector(0, 1, 0)
  cam.transform = view_transform(from, to, up)

  const myworld = world()

  myworld.addLight(light)
  myworld.addObject(floor)
  myworld.addObject(left_wall)
  myworld.addObject(right_wall)
  myworld.addObject(middle)
  myworld.addObject(right)
  myworld.addObject(left)

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
    
    const pix = render_pixel(cam, myworld, x, y)
    const sc = scale_color(pix)
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
