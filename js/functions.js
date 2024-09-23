// *** FUNCTION DEFINITIONS


// *** CONFIGURATION OBJECT
const C = function() {
  // The configuration object holds all "global" objects, arrays and configuration values in one place.
  // Should be initialized on startup.
  
  const _precision = 5
  const _epsilon = 1.0*10**(-_precision)
  
  var _counter = 0
  
  var _intersections = []
  var config = {
    a:1,
    b:2
  }
  function init(){
  }
  function scroll(){
  }
  function highlight(){
  }
  return {
    PRECISION:_precision,
    EPSILON:_epsilon,
    intersections:_intersections,
    unique_id: function unique_id() {return _counter++}
  }
}();

// *** HELPER FUNCTIONS

function log(domId, msg) {
    
  const para = document.createElement("p");
  const node = document.createTextNode(msg);
  para.appendChild(node);
  const element = document.getElementById(domId);
  element.appendChild(para);
}

function downloadPPMfile(can, name) {
  // Download PPM file. Takes canvas and file firstname as input.
  
  var dataStr = "data:text/ppm;charset=utf-8," + encodeURIComponent(canvas_to_ppm(can))
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
  
  return (Math.abs(a - b) < C.EPSILON.toFixed(C.PRECISION))
}

function equal_tuples(a, b) {
  // Compare x, y, z coordinates of a tuple. JS does not distinguish these types of objects
  // so a tuple == vector == point at this time.
  return (equal(a.x, b.x) && equal(a.y, b.y) && equal(a.z, b.z) && equal(a.w, b.w))
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

function multiply_vector(v, s) {
  // Multiply each component of the tuple t by the scalar value s
  return tuple(v.x * s, v.y * s, v.z * s, v.w * s)
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
    toString: function() { return `x:${this.x} y:${this.y} z:${this.z} w:${this.w}`}
  })
    
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


class Canvas {
  // Create a canvas abstraction object. It has a width and a height and a pixel array.
  // Each pixel is defined by three values, r, g, b.
  // The format is a single array or bit stream.
  // To make the array as efficient as possible, we make it a const and pre-initialize length.
  // The RTC book assumes all x and y values are 0-based.
  // So 0 < x < w - 1, and 0 < y < h - 1
  
  constructor(w, h) {
    this.width = w
    this.height = h
    this.bits = 3 // Bits per pixel. rgb = 3. rgba = 4.
    this.d = new Uint8ClampedArray(w * h * b).fill(0)
  }
  
  get width() {return this.width}
  get height() {return this.height}
  get data() {return this.d}
  
  pixel_at(x, y) {
    // Make sure pixels are within the canvas.
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      throw `Coordinate values out of bounds: x, y: ${x}, ${y}`
    }
    
    const i = (this.width * y + x) * this.bits
  
    return color(this.d[i], this.d[i+1], this.d[i+2])
  }
  
  write_pixel(x, y, color) {
    // Ignore pixels outside the canvas.
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return
    }
    
    const i = (this.width * Math.round(y) + Math.round(x)) * this.bits
    // For debugging
    //log("error", `w: ${w} h: ${h} x: ${x} y: ${y} i: ${i} color: ${color.toString()} `)
    
    this.d[i]   = color.red
    this.d[i+1] = color.green
    this.d[i+2] = color.blue
    //log("error", `write_pixel: ${this.data[i]}, ${this.data[i+1]}, ${this.data[i+2]}`)
  }
}

function canvas(w, h) {
  // Create a canvas abstraction object. It has a width and a height and a pixel array.
  // Each pixel is defined by three values, r, g, b.
  // The format is a single array or bit stream.
  // To make the array as efficient as possible, we make it a const and pre-initialize length.
  // The RTC book assumes all x and y values are 0-based.
  // So 0 < x < w - 1, and 0 < y < h - 1
  
  const b = 3 // Bits per pixel. rgb = 3. rgba = 4.
  
  //const d = Array(w * h * b).fill(0)
  
  // Typed Array
  const d = new Uint8ClampedArray(w * h * b).fill(0)
  
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
    // Ignore pixels outside the canvas.
      if (x < 0 || y < 0 || x > w - 1 || y > h - 1) {
        return
      }
      const i = (w * Math.round(y) + Math.round(x)) * b
      // For debugging
      //log("error", `w: ${w} h: ${h} x: ${x} y: ${y} i: ${i} color: ${color.toString()} `)
      
      this.data[i]   = color.red
      this.data[i+1] = color.green
      this.data[i+2] = color.blue
      //log("error", `write_pixel: ${this.data[i]}, ${this.data[i+1]}, ${this.data[i+2]}`)
    }
    }
}

function canvas_to_ppm(can) {
  // Take a canvas object and return a PPM file.
  // The header should look like this, where 80 40 is W and H:
  // P3
  // 80 40
  // 255
  
  let ppm_array = [] // Cannot be typed array, as it will have strings
  let counter = 0
  const bytes = can.width * can.height * can.bits
  const bytes_per_line = Math.floor(70 / (can.bits + 1))
  //log("error", "Bytes per line: " + bytes_per_line)
  //log("error", "Bytes: " + bytes)
  
  for (let k in can.data) {
    ppm_array.push(can.data[k])
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
${can.width} ${can.height}
255
${split.join("")}
`
  return str
}

// *** MATRIX FUNCTIONS

function matrix(rows, cols) {
  // A matrix consists of a bitstream represented in rows * columns
  // For efficiency, a typed array of Float32Array is used, and
  // index value is an integer calculation:
  // m4x4.at(r,c) = (4 * r + c)
  
  const _r = rows
  const _c = cols
  
  const _a = new Float32Array(rows * cols).fill(0)
  //log("error", "_a: " + this._a)

  return Object.freeze({
    rows:_r,
    cols:_c,
    d:_a,
    put: function(row, col, val) { _a[_c * row + col] = val },
    putAll: function(arr) {
      for (let e=0; e < _a.length;e++) {
        _a[e] = arr[e]
      }
    },
    get: function(row, col) { return _a[_c * row + col] },
    submatrix: function(row, col) {
      if((_r-1)*(_c-1) < 4) { throw `Cannot get submatrix < 2x2`}
      
      //__a = new Float32Array((_r-1) * (_c-1)).fill(0)
      temp = []
      // Calculate indexes on row and on col
      const indices = []
      for (let x=0;x<cols;x++) {
        indices.push(cols*row+x)
      }
      for (let x=0;x<rows;x++) {
        indices.push(cols*x+col)
      }
      //log("error", indices)
      const skip = new Set(indices)
      
      for (let i=0;i<_r*_c;i++) {
        if (!skip.has(i)) {
          temp.push(_a[i])
        }
      }
      return Float32Array.of(...temp)
    }
  })
}

function matrix_equal(ma, mb) {
  // Test equality. A === B if Arows === Brows and Acols === Bcols
  //log("error", `matrix_equal(): Running`)
  
  // Ensure structural equality first.
  if ( ma.rows === mb.rows && ma.cols === mb.cols ) {
    
    for (let i=0;i<ma.d.length;i++) {
    
      if ( !equal(ma.d[i], mb.d[i]) ) {
        //log("error", `These fuckers aren't equal: ${ma.d[i]} and ${mb.d[i]}`)
        return false
      }
    }
  }
  return true
}

function multiply_matrices(a, b) {
  // Multiply matrices.
  // Only supports 4x4 matrices.
  //log("error", a.rows)
  
  if (a.rows * a.cols != 16 || b.rows * b.cols != 16) {
    throw `Only supports multiplying 4x4 matrices. a = ${a.rows}, b = ${b.cols}`
  }
  const m = matrix(4, 4)
  
  for (let r=0;r<m.rows;r++) {
    //log("error", "r: " + r)
    for (let c=0;c<m.cols;c++) {
     //log("error", "    c: " + c)
     m.put(r,c, 
       a.get(r,0) * b.get(0,c) + 
       a.get(r,1) * b.get(1,c) + 
       a.get(r,2) * b.get(2,c) + 
       a.get(r,3) * b.get(3,c)
     )
     
     
     //log("error", `m.get(${r},${c}) = ${m.get(r,c)}`)
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
  
  const result = []
  for (let r = 0; r <= 3; r++) {
    result[r] = 
     ma.get(r,0) * t.x + 
     ma.get(r,1) * t.y + 
     ma.get(r,2) * t.z + 
     ma.get(r,3) * t.w
  }
  
  //log("error", ma.join("\n"))
  //log("error", t)
  //log("error", result)
  return tuple(result[0], result[1], result[2], result[3])
}

function idmatrix() {
  // Return an id_matrix
  const m = matrix(4, 4)
  m.put(0,0,1)
  m.put(1,1,1)
  m.put(2,2,1)
  m.put(3,3,1)
  
  return m
  
}

function transpose_matrix(m) {
  // Turn rows into columns.
  
  const t = matrix(4, 4)
  
  for (let r=0;r<m.rows;r++) {
    //log("error", "r: " + r)
    for (let c=0;c<m.cols;c++) {
     //log("error", "    c: " + c)
     t.put(r,c,m.get(c,r))
    }
  }
  
  return t
  
}

function determinant(m) {
  // Mansplained: Calculate the determinant of a matrix.
  // For a 2x2 matrix
  //   matrix = [a,b,c,d]
  // the calculation is ad - bc.
  // For larger matrices, take the first row and multiply each element with its cofactor.
  // Inputs:
  // m: matrix to calculate determinant for
  // Returns Determinant for matrix, as a number.
  
  let det = 0
  
  if (m.d.length == 4) {
    //log("error", "2x2 determinant")
    det = (m.get(0,0) * m.get(1,1) - m.get(0,1) * m.get(1,0))
  } else {
    //log("error", ">2x>2 determinant")
    for (let i = 0;i<m.rows;i++) {
      det = det + m.get(0,i) * cofactor(m, 0, i)
    }
  }
  
  return det
  
}

function submatrix(mat, row, col) {
  throw `submatrix(mat, row, col) has been deprecated. Use mat.submatrix(row, col) instead.`
}

function minor(ma, row, col) {
  // Mansplained: The minor of an element at row i and column j is the determinant of the submatrix at (i, j).
  // Inputs:
  //   ma: 3x3 array to calculate minor on.
  //   row: submatrix row
  //   col: submatrix column
  // Returns the determinant of the submatrix.
  
  //log("error", ma.join("\n"))
  const sm = matrix(ma.rows-1, ma.cols-1)
  sm.putAll(ma.submatrix(row, col))
  const d = determinant(sm)
  return d
  
}

function cofactor(ma, r, c) {
  // Mansplained: 
  // The cofactor is a possible negation of the minor, depending on which row/col its at.
  // The following figure is helpful:
  // | + - + |
  // | - + - |
  // | + - + |
  // Also, doing a "negate if row + col is odd number" should work.
  // Inputs:
  //   ma: The matrix to calculate cofactor on
  //   r: row to calculate cofactor on
  //   c: col to calculate cofactor on
  // Returns cofactor of matrix at row, col.
  
  const min = minor(ma, r, c)
  
  // Determine if indexes at row+col (r + c) is an odd number and if so, return the negative value of min, else return min.
  //log("error", (r + c) % 2 == 0 ? min : min * -1)
  return (r + c) % 2 == 0 ? min : min * -1
}

function inverse(m) {
  // Mansplained: Calculate the inverse of a matrix
  
  if (determinant(m) === 0) {
    throw "Matrix is not invertible, determinant is 0"
  }
  
  let d = determinant(m)
  let m2 = matrix(m.rows, m.cols)
  m2.putAll(m.d)
  
  for (let r=0;r<m.rows;r++) {
    for (let c=0;c<m.cols;c++) {
      const cof = cofactor(m, r, c)
      //log("error", "Cofactor: " + cof + ", c: " + c + " r: " + r)
      m2.put(c, r, cof / d)
      //log("error", "New value: " + m2[c][r])
    }
  }
  
  return m2
  
}

function translation(x, y, z) {
  // Returns a 4x4 translation matrix applying the x, y and z coordinates for translation.
  
  const t = idmatrix()
  t.put(0,3,x)
  t.put(1,3,y)
  t.put(2,3,z)
  
  return t
}

function scale(x, y, z) {
  //Returns a 4x4 translation matrix applying the x, y and z coordinates for scaling.
  
  // Could have used an idmatrix here, but we save a few cycles by avoiding to set then overwrite coords.
  const t = matrix(4, 4)
  t.put(0,0,x)
  t.put(1,1,y)
  t.put(2,2,z)
  t.put(3,3,1)
  
  return t
}

function rotation_x(rad) {
  // Takes an angle in radians and returns a rotation matrix for the x-axis
  
  const cr = Math.cos(rad)
  const sr = Math.sin(rad)
  const t = idmatrix()

  t.put(1,1,cr)
  t.put(1,2,-sr)
  t.put(2,1,sr)
  t.put(2,2,cr)
  
  return t
}



function rotation_y(rad) {
  // Takes an angle in radians and returns a rotation matrix for the y-axis
  
  const cr = Math.cos(rad)
  const sr = Math.sin(rad)
  const t = idmatrix()

  t.put(0,0,cr)
  t.put(0,2,sr)
  t.put(2,0,-sr)
  t.put(2,2,cr)
  
  return t
}

function rotation_z(rad) {
  // Takes an angle in radians and returns a rotation matrix for the z-axis
  
  const cr = Math.cos(rad)
  const sr = Math.sin(rad)
  const t = idmatrix()

  t.put(0,0,cr)
  t.put(0,1,-sr)
  t.put(1,0,sr)
  t.put(1,1,cr)
  
  return t
}

function shearing(xy, xz, yx, yz, zx, zy) {
  // Input values for shearing axes in proportion to each other:
  // x in proportion to y
  // x in proportion to z
  // y in proportion to x
  // y in proportion to z
  // z in proportion to x
  // z in proportion to y
  // shearing(xy, xz, yx, yz, zx, zy)
  
  const m = idmatrix()
  m.put(0,1,xy)
  m.put(0,2,xz)
  m.put(1,0,yx)
  m.put(1,2,yz)
  m.put(2,0,zx)
  m.put(2,1,zy)
  
  return m
  
}

function angle(v) {
  // The angle function converts between degrees and radians and vice versa.
  
  return Object.freeze({
    rad: function() { return (v * (Math.PI/180))},
    deg: function() { return (v * (180/Math.PI))}
  })
}


function transformations(trans) {
  // Transformations given as parameters will be applied in the reverse order
  // We can apply translation, scaling, rotation and shearing into a single operation.
  
  let m = idmatrix()
  //log("error", "Start: " + m)

  
  for (let i=0;i < arguments.length;i++) {
    
    // Unless argument is a point or vector, multiply by m
    if (!(arguments[i].w === 1 || arguments[i].w === 0)) {
      //log("error", `Applying ${i}: ${arguments[i]}`)
      m = multiply_matrices(arguments[i], m)
      //log("error", "Result: " + m)
    }
  }
  
  return m
}

// *** RAY FUNCTIONS

function ray(o, d) {
  // Return a "ray", consisting of a point called origin and a vector called direction.
  
  // Check that o is a point and d is a vector, by checking the w value of each
  if (!(o.w === 1 && d.w === 0) ) {
    throw `ray(): Origin must be a point (was ${o.toString()}), and Direction must be a vector (was ${d.toString()})`
  }
  
  return Object.freeze({
    origin:o,
    direction:d,
    toString: function() { return `origin: point(${this.origin}) direction: vector(${this.direction})`}
  })
  
}

function position(ray, t) {
  // Compute a ray's direction by t to find the total distance traveled
  return add_tuples(multiply_vector(ray.direction, t), ray.origin)
}

class Sphere {
  // The Sphere class represents a sphere object with data. This is the new norm.
  // Default values are set in the constructor and/or parameters.
  // Using getters and setters allows direct assignment, such as sphere.transform = translation(1, 2, 3)
  // Constructor fields are not really private.
  
  constructor() {
    this._id = C.unique_id()
    this._transform = idmatrix()
  }
  
  get id() {
    return this._id
  }
  
  get transform() {
    return this._transform
  }
  
  get toString() {
    return `Sphere(), ID: ${this._id}, Transformation matrix: ${this._transform}`
  }
  
  set transform(value) {
    this._transform = multiply_matrices(this._transform, value) 
  }
}

function intersect(s, ra) {
  // Intersect returns an array of points where a given ray (ra) intersects a given sphere (s)
  
  // Vector from sphere's center to the ray origin
  // Remember: The sphere is centered at the world origin (0, 0, 0)
  
  const r = transform(ra, inverse(s.transform)) // Ray passed to intersect should be transformed by the inversed transformation matrix

  const sphere_to_ray = subtract_tuples(r.origin, point(0, 0, 0))
  const a = dot(r.direction, r.direction)
  const b = 2 * dot(r.direction, sphere_to_ray)
  const c = dot(sphere_to_ray, sphere_to_ray) - 1
  
  const discriminant = b**2 - 4*a*c
  
  // The discriminant is the key - if it's negative, the ray misses the sphere
  if (discriminant < 0 ) { return [] }
  
  // Otherwise, the equation has two solutions, which could be the same, if the
  // ray intersects at a perfect tangent
  const t1 = (-b - Math.sqrt(discriminant)) / ( 2 * a )
  const t2 = (-b + Math.sqrt(discriminant)) / ( 2 * a )
  
  return [intersection(t1, s), intersection(t2, s)]
}

function intersection(t_value, sphere) {
  // The intersection function encapsulates t value and object
  
  return Object.freeze({
    t:t_value,
    object:sphere
  })
}

function intersections() {
  // This method takes an arbitrary number of intersection objects as input and
  // aggregates them in an array
  let arr = []
  for (let i=0; i < arguments.length;i++) {
    arr.push(arguments[i])
  }
  return arr
}

function hit(list_of_intersections) {
  // This function returns the intersection with the lowest non-negative number from a list of intersections
  
  if (!Array.isArray(list_of_intersections)) {return } // There are no intersections, return undefined
    
  list_of_intersections = list_of_intersections.filter( item => { if (item.t > 0) {return item}} )
  
  return list_of_intersections.sort().reverse()[0]
}

function transform(r, matr) {
  // Transform applies a transformation matrix to a ray
  
  return ray(multiply_matrix_by_tuple(matr, r.origin), multiply_matrix_by_tuple(matr, r.direction))
}

