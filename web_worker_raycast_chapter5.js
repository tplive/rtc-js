const origin = point(0, 0, -5) // Ray origin
const wall_z = 10 // Wall at z
const wall_size = 7 // Size of the wall
const size = 300 // Side length in pixels
const pixel_size = wall_size / size
const half = wall_size / 2
const can = canvas(size, size)
const c1 = color(1.0, 0, 0)
const s1 = scale_color(c1)
const shape = new Sphere()
// Av en eller annen grunn går det ikke an å legge til rotation her... :O
//shape.transform = transformations(shearing(1,0,0,0,0,0), scale(2,2,2), translation(3,0,0))//rotation_z(Math.pi/4)) 

// HTML canvas
const html_can = html_canvas("error", size, size)
var context = html_can.getContext("2d")
context.fillStyle = "black"
context.fillRect(0, 0, size, size)
context.fillStyle = `rgb(${c1.red}, ${c1.green}, ${c1.blue}`

function render() {
for (let y=0;y < size;y++) {
  const world_y = half - pixel_size * y
  
  for (let x=0;x < size;x++) {
    const world_x = -half + pixel_size * x
    
    const position = point(world_x, world_y, wall_z)
    
    //log("error", normalize(subtract_tuples(position, origin)))
    const r = ray(origin, normalize(subtract_tuples(position, origin)))
    //log("error", `(${x}, ${y})`)
    
    const xs = intersect(shape, r)
    
    if (hit(xs)) {
      //log("error", r)
      //can.write_pixel(x, y, s1)
      context.fillStyle = `rgb(${s1.red}, ${s1.green}, ${s1.blue}`
      context.fillRect(x, y, 1, 1)
    }
     postMessage(`Calculating pixel (${x}, ${y})`)
  }
}
}

render()

// How about we create the entire canvas and set the pixels just in time?

// Show canvas
//log("error", ppm)
//downloadPPMfile(can, "plot")
