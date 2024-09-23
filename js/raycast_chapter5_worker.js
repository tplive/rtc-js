self.importScripts("functions.js")

function render() {
  console.log("render()")

  var q = {} // Get configuration parameters from query parameters
  location.search.slice(1).split("&").forEach(function (key_value) { var kv = key_value.split("="); q[kv[0]] = kv[1]; })

  const size = q['size'] // Size of the canvas
  const origin = point(q['ox'], q['oy'], q['oz']) // Ray origin

  const wall_z = 10 // Wall at z
  const wall_size = 7 // Size of the wall

  // Calculations
  const pixel_size = wall_size / size
  const half = wall_size / 2

  const can = canvas(size, size)
  const shape = new Sphere()
  //shape.transform = transformations(shearing(1,0,0,0,0,0), scaling(2,2,2), translation(3,0,0), rotation_z(Math.PI/4))

  let index = 0

  // Genererer et array med pixel-koordinater
  let pixels = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      pixels.push([x, y])
    }
  }

  // Stokker dem grundig ;)
  shuffle(pixels)

  while (pixels.length > 0) {

    const coo = pixels.pop()
    const x = coo[0]
    const y = coo[1]

    const world_y = half - pixel_size * y

    scale_color(color(1.0, 0, 0))

    const world_x = -half + pixel_size * x

    const position = point(world_x, world_y, wall_z)

    const r = ray(origin, position.minus(origin).normalize())

    const xs = intersect(shape, r)
    let s1 = scale_color(color(1.0, 0, 0))
    if (hit(xs)) {

      can.write_pixel(x, y, s1)
      s1 = scale_color(color(1.0, 0, 0))
    } else {
      s1 = scale_color(color(0, 0, 0))
    }

    const msgData = {
      done: Math.round((size ** 2 - pixels.length) / size ** 2 * 100),
      size: size,
      x: x,
      y: y,
      red: s1.red,
      green: s1.green,
      blue: s1.blue,
    }

    postMessage(msgData)
  }
}

render()
