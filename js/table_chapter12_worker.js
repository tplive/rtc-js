self.importScripts("shapes.js")
self.importScripts("patterns.js")
self.importScripts("functions.js")

function render_worker() {

  var q = {} // Get configuration parameters from query parameters
  location.search.slice(1).split("&").forEach(function (key_value) { var kv = key_value.split("="); q[kv[0]] = kv[1]; })

  const vsize = q['vsize'] // Vertical size of the canvas
  const hsize = q['hsize'] // Horizontal size of the canvas

  const size = vsize * hsize

  var render_status = "Idle"

  // DEFINE SCENE
  // *** SCENE

// Putting it together chapter 12. Cubes


// Performance counter
const start = performance.now()

// SCENE TELEMETRY
tuple = profile(tuple)
matrix = profile(matrix)
color = profile(color)
lighting = profile(lighting)
intersect_world = profile(intersect_world)

// DEFINE WORLD
const sky = color(0.7, 0.7, 1.0)
const white = color(1, 1, 1)
const black = color(0, 0, 0)
const blue = color(0.4, 0.4, 1.0)
const green = color(0.4, 1.0, 0.4)
const red = color(1.0, 0.4, 0.4)
const yellow = color(0.9, 0.9, 0.3)
const brown = color(0.45, 0.25, 0.05)
const lightbrown = brown.by_scalar(1.22222)

const myworld = world()

const width  = 50
const height = 40
const depth  = 50

const world_rotation = idmatrix()//.times_matrix(rotation_y(0))

// MATERIALS
const wood = material()
wood.pattern = ring_pattern(brown, lightbrown)
wood.pattern.transform = scaling(0.1, 0.1, 0.1)

const marble = material()
marble.refractive_index = 1.42
marble.diffuse = 0.1
marble.ambient = 0.1
marble.transparency = 1.0
marble.reflectivity = 0.9

const world_cube = cube()
world_cube.transform = world_rotation.times_matrix(translation(0, height / 2, 0).times_matrix(scaling(width, height / 2, depth)))
world_cube.material.color = sky
world_cube.material.specular = 0.001
world_cube.material.pattern = stripe_pattern(sky, sky.by_scalar(0.7))
world_cube.material.pattern.transform = scaling(0.03, 1, 0.03).times_matrix(rotation_y( π / 3))
myworld.addObject(world_cube)

const flceil = cube()
flceil.transform = world_rotation.times_matrix(translation(0, height / 2, 0).times_matrix(scaling(width, (height-2) / 2, depth)))
flceil.material.pattern = chequered_pattern(color(0.1, 0.1, 0.1), white.by_scalar(0.6))
flceil.material.reflective = 0.1
flceil.material.ambient = 0
flceil.material.pattern.transform = scaling(0.1, 0.1, 0.1)
myworld.addObject(flceil)

// SCENE OBJECTS

const surf_height = 10
const table_thickness = 0.2
const leg_thickness = 0.6

const table = cube()
table.transform = translation(0, surf_height, 0).times_matrix(scaling(12, table_thickness, 8))
table.material = structuredClone(wood)
table.material.reflective = 0.3
//table.material.color = sky
myworld.addObject(table)

const leg1 = cube()
leg1.transform = translation(11, surf_height/2, 7).times_matrix(scaling(leg_thickness, surf_height/2, leg_thickness))
leg1.material = wood
myworld.addObject(leg1)

const leg2 = cube()
leg2.transform = translation(-11, surf_height/2, 7).times_matrix(scaling(leg_thickness, surf_height/2, leg_thickness))
leg2.material = wood
myworld.addObject(leg2)

const leg3 = cube()
leg3.transform = translation(-11, surf_height/2, -7).times_matrix(scaling(leg_thickness, surf_height/2, leg_thickness))
leg3.material = wood
myworld.addObject(leg3)

const leg4 = cube()
leg4.transform = translation(11, surf_height/2, -7).times_matrix(scaling(leg_thickness, surf_height/2, leg_thickness))
leg4.material = wood
myworld.addObject(leg4)

const mirror = cube()
mirror.transform = world_rotation.times_matrix(translation(width / 6, height / 2, depth -1).times_matrix(scaling(width/2, height/3, 0.3)))
mirror.material.color = black
mirror.material.reflective = 0.9
myworld.addObject(mirror)

const oledtv = cube()
oledtv.transform = world_rotation.times_matrix(translation(width / 4, height / 2, -depth +2).times_matrix(scaling(width/2, height/3, 0.3)))
oledtv.material.reflective = 0.05
oledtv.material.pattern = gradient_pattern(sky, color(1, 0, 1))
oledtv.material.pattern.transform = scaling(2.5, 1, 3)
myworld.addObject(oledtv)

const tc1 = cube()
tc1.transform = translation(0, surf_height + 1.93, 0).times_matrix(scaling(1, 1, 1).times_matrix(rotation_x(π / 4).times_matrix(rotation_z(π / 4))))
tc1.material.reflective = 0.2
tc1.material.pattern = chequered_pattern(random_color(), random_color())
tc1.material.pattern.transform = scaling(0.1, 0.2, 0.3)
myworld.addObject(tc1)

const paper = cube()
paper.transform = translation(5, surf_height + table_thickness, -2).times_matrix(scaling(2, 0.1, 3).times_matrix(rotation_y(π / 7)))
paper.material.reflective = 0.0
paper.material.pattern = stripe_pattern(white, black)
paper.material.pattern.transform = scaling(0.01, 0.001, 0.1).times_matrix(rotation_y(π))
myworld.addObject(paper)

const lampx = 25
const lampy = 2.5
const lampz = 0

const ball1 = sphere()
ball1.transform = translation(lampx, lampy + 3 + 3, lampz).times_matrix(scaling(3, 3, 3))
ball1.material = marble
myworld.addObject(ball1)

const ball2 = sphere()
ball2.transform = translation(lampx, lampy + 3 + 3 + 3 + 4, lampz).times_matrix(scaling(3, 4, 3))
ball2.material.pattern = gradient_pattern(random_color(), random_color())
ball2.material.reflective = 0.8
myworld.addObject(ball2)

const ball3 = sphere()
ball3.transform = translation(lampx, lampy + 3 + 3 + 3 + 4 + 4 + 5, lampz).times_matrix(scaling(3, 5, 3))
//ball3.material.pattern = gradient_pattern(random_color(), random_color())
//ball3.material.reflective = 0.8
ball3.material = marble
myworld.addObject(ball3)

const stand = cube()
stand.transform = translation(lampx, lampy, lampz).times_matrix(scaling(3, 3, 3).times_matrix(rotation_y(1)))
stand.material.color = color(0.8, 0.8, 0.2)
stand.material.reflective = 0.9
myworld.addObject(stand)



// CAMERA...
const cam = camera(hsize, vsize, π / 3)
const from = point(-18, surf_height + 10, -38) // Forward
//const from = point(0, surf_height + 2, 20) // Rear
//const from = point(20, surf_height + 2, 15) // ~60 deg rear left
//const from = point(-20, surf_height + 2, 15) // ~60 deg rear right
//const from = point(20, surf_height + 2, 0) // From right
//const from = point(-20, surf_height + 2, 0) // From left
//const from = point(0, 30, -1) // From top (angle π / 80)
const to = point(0, surf_height + 2, 0)
const up = vector(0, 1, 0)
cam.transform = view_transform(from, to, up)

// LIGHT...
const light = point_light(point(20, 30, -25), color(1, 1, 1))
myworld.addLight(light)

// AAND ACTION!

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
