// *** FUNCTION DEFINITIONS


// *** CONSTANTS

const PRECISION = 5
const EPSILON = 1.0*10**(-PRECISION)

// *** HELPER FUNCTIONS

function log(domId, msg) {
  const para = document.createElement("p");
  const node = document.createTextNode(msg);
  para.appendChild(node);
  const element = document.getElementById(domId);
  element.appendChild(para);
}

function downloadPPMfile(ppm_data, name) {
  // Download PPM file. Does NOT check that input data is valid PPM.
  
  var dataStr = "data:text/ppm;charset=utf-8," + encodeURIComponent(ppm_data)
  var downloadAnchorNode = document.createElement("a")
  downloadAnchorNode.innerHTML = "Click here to download file " + name + ".ppm"
  downloadAnchorNode.setAttribute("href",     dataStr)
  downloadAnchorNode.setAttribute("download", name + ".ppm")
  document.getElementById("error").appendChild(downloadAnchorNode)
}

// *** VECTOR FUNCTIONS

function equal(a, b) {
  // Comparing floating point numbers for equivalence may, due to rounding errors, fail.
  // By subtract a from b and comparing the result to a small constant EPSILON, we
  // can call them equal.
  
  return (Math.abs(a - b) < EPSILON.toFixed(PRECISION))
}

function equal_tuples(a, b) {
  // Compare x, y, z coordinates of a tuple. JS does not distinguish these types of objects
  // so a tuple == vector == point at this time.
  return (equal(a.x, b.x) && equal(a.y, b.y) && equal(a.z, b.z))
}

function add_tuples(a, b) {
  // Add two tuples together.
  // A point (w=1) added to a vector (w=0) is a new point.
  // A vector (w=0) added to another vector (w=0) is the resulting vector.
  // Adding two points produces w=2 which doesn't make sense.
  return tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w)
}

function subtract_tuples(a, b) {
  // Subtract values of tuple b from values of tuple a.
  return tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w)
}

function negate_tuple(t) {
  // Return a tuple with x=-x, y=-y, z=-z coordinates
  return tuple(t.x * -1, t.y * -1, t.z * -1, t.w * -1)
}

function multiply_vector(s, t) {
  // Multiply each component of the tuple t by the scalar value s
  return tuple(t.x * s, t.y * s, t.z * s, t.w * s)
}

function divide_vector(s, t) {
  // Multiply each component of the tuple t by the scalar value s
  return tuple(t.x / s, t.y / s, t.z / s, t.w / s)
}

function magnitude(v) {
  // Calculate the magnitude of a vector
  return Math.sqrt(v.x**2 + v.y**2 + v.z**2 + v.w**2)
}

function normalize(v) {
  // Normalize a vector using its magnitude
  var m = magnitude(v)
  return tuple(v.x / m, v.y / m, v.z / m, v.w / m)
}

function dot(a, b) {
  // Compute the dot product of two vectors
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w
}

function cross(a, b) {
  // Compute the cross product of two vectors
  // Order matters!
  return vector(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x)
}

function tuple(a, b, c, d) {
  return Object.freeze({ 
    x:a,
    y:b,
    z:c,
    w:d,
    toString: function() { return `x:${this.x} y:${this.y} z:${this.z} w:${this.w}`}})
}

function vector(a,b,c) {
  return tuple(a,b,c,0)
}

function point(a,b,c) {
  return tuple(a,b,c,1)
}

// *** COLOR FUNCTIONS

function color(r, g, b) {
  return Object.freeze({ 
    red:r, 
    green:g, 
    blue:b,
    toString: function() { return `red: ${this.red}, green: ${this.green}, blue: ${this.blue}`}})
}

function add_colors(c1, c2) {
  // Adding two colors by simple addition
  return color(c1.red + c2.red, c1.green + c2.green, c1.blue + c2.blue)
}

function subtract_colors(c1, c2) {
  // Subtracting two colors by simple subtraction
  return color(c1.red - c2.red, c1.green - c2.green, c1.blue - c2.blue)
}

function multiply_color(s, c1) {
  // Multiply scalar value by r, g, b components
  return color(s * c1.red, s * c1.green, s * c1.blue)
}

function multiply_colors(c1, c2) {
  // Multiply r, g, b components of two colors by each other
  return color(c1.red * c2.red, c1.green * c2.green, c1.blue * c2.blue)
}

function scale_color(c) {
  // Scale the value of a color between 0-255
  // > 1.0 = 255
  //   1.0 = 255
  //   0.5 = 128
  //   0.0 = 0
  // < 0.0 = 0
  
  let red = 255 * c.red
  red = red > 255 ? 255 : red && red < 0 ? 0 : red
  
  let grn = 255 * c.green
  grn = grn > 255 ? 255 : grn && grn < 0 ? 0 : grn
  
  let blu = 255 * c.blue
  blu = blu > 255 ? 255 : grn && blu < 0 ? 0 : blu
    
  //log("error", color(red, grn, blu).toString())
  
  return color(Math.round(red), Math.round(grn), Math.round(blu))
  
}

// *** CANVAS FUNCTIONS

function html_canvas(parent, width, height) {
  // Creates a canvas element as a child of parent, dimensions specified by width and height.
  // Returns the canvas context.
  
  const can = document.createElement("canvas")
  can.setAttribute("width", width)
  can.setAttribute("height", height)
  can.setAttribute("id", parent + "_canvas")
  document.getElementById(parent).appendChild(can)
  
  return can
}

function canvas(w, h) {
  // Create a canvas abstraction object. It has a width and a height and a pixel array.
  // Each pixel is defined by three values, r, g, b.
  // The format is a single array or bit stream.
  // To make the array as efficient as possible, we make it a const and pre-initialize length.
  // The RTC book assumes all x and y values are 0-based.
  // So 0 < x < w - 1, and 0 < y < h - 1
  
  const b = 3 // Bits per pixel. rgb = 3. rgba = 4.
  const d = Array(w * h * b).fill(0)
  //log("error", `w * h * b = ${w} * ${h} * ${b} = ${d.length}`)
  
  return {
    width:w,
    height:h,
    data:d,
    bits:b,
    pixel_at: function(x, y) {
      // Make sure pixels are within the canvas.
      if (x < 0 || y < 0 || x > w - 1 || y > h - 1) {
        throw `Coordinate values out of bounds: x, y: ${x}, ${y}`
      }
      
      const i = (w * y + x) * b
  
      return color(this.data[i], this.data[i+1], this.data[i+2])
    },
    write_pixel: function(x, y, color) {
    // Make sure pixels are within the canvas.
      if (x < 0 || y < 0 || x > w - 1 || y > h - 1) {
        throw `Coordinate values out of bounds: x, y: ${x}, ${y}`
      }
      const i = (w * y + x) * b
      // For debugging
      //log("error", `w: ${w} h: ${h} x: ${x} y: ${y} i: ${i} color: ${color.toString()} `)
      
      this.data[i]   = color.red
      this.data[i+1] = color.green
      this.data[i+2] = color.blue
      //log("error", `write_pixel: ${this.data[i]}, ${this.data[i+1]}, ${this.data[i+2]}`)
    }
    }
}

function canvas_to_ppm(canvas) {
  // Take a canvas object and return a PPM file.
  // The header should look like this, where 80 40 is W and H:
  // P3
  // 80 40
  // 255
  
  let ppm_array = []
  let counter = 0
  const bytes = canvas.width * canvas.height * canvas.bits
  const bytes_per_line = Math.floor(70 / (canvas.bits + 1))
  //log("error", "Bytes per line: " + bytes_per_line)
  //log("error", "Bytes: " + bytes)
  
  for (let k in canvas.data) {
    ppm_array.push(canvas.data[k])
    counter++
    if ( counter === bytes_per_line) {
      //log("error", `k: ${k}, ${k % bytes_per_line}`)
      ppm_array.push(`\n`)
      counter = 0
    }
  }
  // End file with a newline
  ppm_array.push(`\n\n`)
  
  // Trim whitespace from each line
  let split = ppm_array.join(" ")
  split = split.split("\n")
  
  for (let i in split) {
    split[i] = split[i].trim()
    split[i] = split[i] + "\n"
  }
  //log("error", split)
  var str = `P3
${canvas.width} ${canvas.height}
255
${split.join("")}
`
  return str
}

// *** MATRIX FUNCTIONS

function matrix(rows, cols) {
  
  const columns = Array(cols).fill(0)
  const array = Array(rows).fill(columns)
  
  return array
}

function matrix_equal(ma, mb) {
  // Test equality. A === B if Arows == Brows and Acols == Bcols
  
  const masize = ma.length * ma[0].length
  const mbsize = mb.length * mb[0].length
  if ( masize === mbsize && masize / ma[0].length === mbsize / mb[0].length ) {
    
    //log("error", `masize (${masize}) / ma[0].length (${ma[0].length}) === mbsize (${mbsize}) / mb[0].length (${mb[0].length})`)
    
    for (let r in ma) {
      //log("error", ma[r])
      //log("error", mb[r])
      for (let c in ma[r]) {
        //log("error", `${ma[r][c]} === ${mb[r][c]}`)
        if (!(equal(ma[r][c], mb[r][c]))) {
          return false
        }
      }
    }
  }
  return true
}

function multiply_matrices(a, b) {
  // Multiply matrices.
  // Only supports 4x4 matrices.
  
  // For SOME reason, using matrix(4, 4) here yields a matrix where the rows all point to the same array in memory! :O
  const m = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  
  for (let r = 0; r <= 3; r++) {
    //log("error", "r: " + r)
    for (let c = 0; c <= 3; c++) {
     //log("error", "    c: " + c)
     m[r][c] = 
       a[r][0] * b[0][c] + 
       a[r][1] * b[1][c] + 
       a[r][2] * b[2][c] + 
       a[r][3] * b[3][c]
     
     
     //log("error", `m[${r}][${c}] =  ${a[r][0] * b[0][c] + a[r][1] * b[1][c] + a[r][2] * b[2][c] + a[r][3] * b[3][c]}`)
    }
  }
  
  //log("error", a.join("\n"))
  //log("error", b.join("\n"))
  //log("error", m.join("\n"))
  
  return m
}

function multiply_matrix_by_tuple(ma, t) {
  // Multiply matrix by tuple.
  // Returns a tuple.
  
  let result = [0,0,0,0]
  
  for (let r = 0; r <= 3; r++) {
    result[r] = 
     ma[r][0] * t.x + 
     ma[r][1] * t.y + 
     ma[r][2] * t.z + 
     ma[r][3] * t.w
  }
  
  //log("error", ma.join("\n"))
  //log("error", t)
  //log("error", result)
  return tuple(result[0], result[1], result[2], result[3])
}