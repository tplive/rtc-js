// *** FUNCTION DEFINITIONS

const π = Math.PI

// *** CONFIGURATION OBJECT
const C = function() {
  // The configuration object holds all "global" objects, arrays and configuration values in one place.
  // Should be initialized on startup.
  
  const _precision = 5
  const _epsilon = 1.0*10**(-_precision)
  
  var _counter = 0
  
  return {
    PRECISION:_precision,
    EPSILON:_epsilon,
    RECURSIONS: 5,
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

function shuffle(arr) {
  // Durstenfeld shuffle algoritm. Found here: https://stackoverflow.com/a/12646864

  for (let i = arr.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1))
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

function canvas_to_html_canvas(ctx, can) {
  // Define canvas outside function, then pass context and canvas to this function
  for (let y = 0;y < can.height;y++) {
    for (let x = 0;x < can.width;x++) {
      const col = can.pixel_at(x, y)
      const sc = col.scaled()
      ctx.fillStyle = `rgb(${sc.red}, ${sc.green}, ${sc.blue})`
      //log("error", `rgb(${sc.red}, ${sc.green}, ${sc.blue})`)
      ctx.fillRect(x, y, 1, 1)
    }
  }
}

function equal(a, b) {
  // Comparing floating point numbers for equivalence may, due to rounding errors, fail.
  // By subtract a from b and comparing the result to a small constant EPSILON, we
  // can call them equal.
  
  return Math.abs(a - b) < C.EPSILON.toFixed(C.PRECISION)
}

// *** PROFILER GLOBAL MAP AND FUNCTION
// Wrap functions with profile, like tuple = profile(tuple) to count calls to the function.
// Output JSON.stringify(_calls) at the end of the run.
_calls = {}

profile = function(fn) {
    return function() {
        _calls[fn.name] = (_calls[fn.name] || 0) + 1;
        return fn.apply(this, arguments);
    }
}

// *** VECTOR FUNCTIONS

class Tuple {
  constructor(x, y, z, w) {
    if (isNaN(x) || isNaN(y) || isNaN(z) || isNaN(w) ) { 
      throw `Tuple cannot be NaN.`
    } else {
      this._x = x
      this._y = y
      this._z = z
      this._w = w
    }
  }
  
  get x() { return this._x }
  get y() { return this._y }
  get z() { return this._z }
  get w() { return this._w }
  
  
  toString() { 
    if (this._w === 0) { 
      return `vector(x:${this._x}, y:${this._y}, z:${this._z})` 
    } else if (this._w === 1) {
      return `point(x:${this._x}, y:${this._y}, z:${this._z})`
    } else {
      return `tuple(x:${this._x}, y:${this._y}, z:${this._z}, w:${this._w}`
    }
  }
  
  isPoint() { return this._w === 1 }
  isVector() { return this._w === 0 }
  toVector() {
    this._w = 0
    
    return this
  }
  
  equals(t)   { return equal(this._x, t.x) && equal(this._y, t.y) && equal(this._z, t.z) && equal(this._w, t.w) }
  minus(t)   { return new Tuple(this._x - t.x, this._y - t.y, this._z - t.z, this._w - t.w) }
  plus(t)    { return new Tuple(this._x + t.x, this._y + t.y, this._z + t.z, this._w + t.w) }
  negate()   { return new Tuple(-this._x, -this._y, -this._z, -this._w) }
  
  by_scalar(s) {
    if (this._w === 0) {
        return new Tuple(this._x * s, this._y * s, this._z * s, this._w * s)
      } else {
        throw(`Only vectors can be multiplied by scalar value.`)
      }
  }
  
  divided_by(s) {
    if (this._w === 0) {
      return new Tuple(this._x / s, this._y / s, this._z / s, this._w / s)
    } else {
      throw(`Only vectors can be multiplied by scalar value.`)
    }
  }
  
  dot(v) {
    if (this._w === 0 && v.w === 0) {
      return (this._x * v.x) + (this._y * v.y) + (this._z * v.z) + (this._w * v.w)
    } else {
      throw(`Can only calculate dot product of vectors.`)
    }
  }
  
  cross(v) {
    if (this._w === 0 && v.w === 0) {
        return new Tuple(this._y * v.z - this._z * v.y, this._z * v.x - this._x * v.z, this._x * v.y - this._y * v.x, this._w)
      } else {
        throw(`Can only calculate cross product of vectors.`)
      }
  }
  
  magnitude() {
    if (this._w === 0) {
      return Math.sqrt(this._x**2 + this._y**2 + this._z**2)
    } else {
      throw(`Can only calculate magnitude of vectors.`)
    }
  }
  
  normalize() {
    if (this._w === 0) {
      var m = this.magnitude()
      return new Tuple(this._x / m, this._y / m, this._z / m, this._w)
    } else {
      throw(`Can only normalize vectors.`)
    }
  }
}

function tuple(x, y, z, w) {
  // Factory function for tuples
  return new Tuple(x, y, z, w)
}

function vector(x, y, z) {
  // Factory function for vectors
  return new Tuple(x, y, z, 0)
}

function point(x, y, z) {
  // Factory function for points
  return new Tuple(x, y, z, 1)
}

// *** COLOR FUNCTIONS

class Color {
  constructor(r, g, b) {
    this._r = r
    this._g = g
    this._b = b
  }
  get red() { return this._r }
  get green() { return this._g }
  get blue() { return this._b }
  get isColor() { return true }
    
  toString() { return `red: ${this._r}, green: ${this._g}, blue: ${this._b}` }
  equals(c) { return equal(this._r, c.red) && equal(this._g, c.green) && equal(this._b, c.blue) }
  
  plus(c)  { return new Color(this._r + c.red, this._g + c.green, this._b + c.blue) }
  minus(c) { return new Color(this._r - c.red, this._g - c.green, this._b - c.blue) }
  times(c) { return new Color(this._r * c.red, this._g * c.green, this._b * c.blue) }
  
  by_scalar(s) { return new Color(this._r * s, this._g * s, this._b * s) }
  
  scaled() {
    // Scale the value of a color between 0-255
    // > 1.0 = 255
    //   1.0 = 255
    //   0.5 = 128
    //   0.0 = 0
    // < 0.0 = 0
  
    let red = 255 * this._r
    red = red > 255 ? 255 : red && red < 0 ? 0 : red
    
    let grn = 255 * this._g
    grn = grn > 255 ? 255 : grn && grn < 0 ? 0 : grn
  
    let blu = 255 * this._b
    blu = blu > 255 ? 255 : grn && blu < 0 ? 0 : blu
  
    return new Color(Math.round(red), Math.round(grn), Math.round(blu))
  }
}

function color(r, g, b) {
  // Factory function for color
  return new Color(r, g, b)
}

function add_colors(c1, c2) {
  // Adding two colors by simple addition
  throw(`add_colors(c1, c2) has been deprecated. Use c1.plus(c2) instead.`)
  return color(c1.red + c2.red, c1.green + c2.green, c1.blue + c2.blue)
}

function subtract_colors(c1, c2) {
  // Subtracting two colors by simple subtraction
  throw(`subtract_colors(c1, c2) has been deprecated. Use c1.minus(c2) instead.`)

  return color(c1.red - c2.red, c1.green - c2.green, c1.blue - c2.blue)
}

function multiply_color(s, c1) {
  // Multiply scalar value by r, g, b components
  throw(`multiply_color(s, c1) has been deprecated. Use c1.by_scalar(s) instead.`)

  return color(s * c1.red, s * c1.green, s * c1.blue)
}

function multiply_colors(c1, c2) {
  // Multiply r, g, b components of two colors by each other
  throw(`multiply_colors(c1, c2) has been deprecated. Use c1.times(c2) instead.`)

  return color(c1.red * c2.red, c1.green * c2.green, c1.blue * c2.blue)
}

function scale_color(c) {
  // Scale the value of a color between 0-255
  // > 1.0 = 255
  //   1.0 = 255
  //   0.5 = 128
  //   0.0 = 0
  // < 0.0 = 0
  throw(`scale_color(c) has been deprecated. Use c.scaled() instead.`)

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
  // Create a canvas object. It has a width and a height and a pixel array.
  // Each pixel is defined by three values, r, g, b.
  // The format is a single array or bit stream.
  // To make the array as efficient as possible, we make it a const and pre-initialize length.
  // The RTC book assumes all x and y values are 0-based.
  // So 0 < x < w - 1, and 0 < y < h - 1
  
  constructor(w, h) {
    this._width = w
    this._height = h
    this._bits = 3 // Bits per pixel. rgb = 3. rgba = 4.
    this._d = new Float32Array(w * h * this._bits).fill(0)
  }
  
  get width() { return this._width }
  get height() { return this._height }
  get data() { return this._d }
  get bits() { return this._bits }
  
  pixel_at(x, y) {
    // Make sure pixels are within the canvas.
    if (x < 0 || y < 0 || x > this._width - 1 || y > this._height - 1) {
      throw `Coordinate values out of bounds: x, y: ${x}, ${y}`
    }
    
    const i = (this._width * y + x) * this._bits
  
    return color(this._d[i], this._d[i+1], this._d[i+2])
  }
  
  write_pixel(x, y, color) {
    // Ignore pixels outside the canvas.
    if (x < 0 || y < 0 || x > this._width - 1 || y > this._height - 1) {
      return
    }
    
    const i = (this._width * Math.round(y) + Math.round(x)) * this._bits
    // For debugging
    //log("error", `w: ${w} h: ${h} x: ${x} y: ${y} i: ${i} color: ${color.toString()} `)
    
    this._d[i]   = color.red
    this._d[i+1] = color.green
    this._d[i+2] = color.blue
    //log("error", `write_pixel: ${this.data[i]}, ${this.data[i+1]}, ${this.data[i+2]}`)
  }
}

function canvas(w, h) {
  // Canvas factory 
  
  return new Canvas(w, h)
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

class Matrix {
  // A matrix consists of a bitstream represented in rows * columns
  // For efficiency, a typed array of Float32Array is used, and
  // index value is an integer calculation:
  // m4x4.at(r,c) = (4 * r + c)
  
  constructor(rows, columns) {
    this._r = parseInt(rows)
    this._c = parseInt(columns)
    this._length = this._r * this._c
    this._n = new Float32Array(this._length).fill(0)
  }
  
  get rows() { return this._r }
  get cols() { return this._c }
  get d() { return this._n } // Called d for legacy reasons
  get length() { return this._length }
  
  get(row, col) { return this._n[this._c * row + col] }
  
  put(row, col, val) { this._n[this._c * row + col] = val }
  
  putAll(arr) {
    for (let e=0; e < this._n.length;e++) {
      this._n[e] = arr[e]
    }
  }
  
  submatrix(row, col) {
    // This probably only works for 4x4 matrices, tbh.
    if( (this._r - 1) * (this._c - 1) < 4) { throw `Cannot get submatrix < 2x2`}
      
    //__a = new Float32Array((_r-1) * (_c-1)).fill(0)
      
    // Create a temporary array
    const temp = []
    
    // Calculate indexes on row and on col
    const indices = []
    
    for (let x=0; x < this._c; x++ ) {
      indices.push(this._c * row + x)
    }
    
    for (let x=0; x < this._r; x++ ) {
      indices.push(this._c * x + col)
    }
    
    const skip = new Set(indices)
    
    for (let i=0; i < this._length; i++ ) {
      if (!skip.has(i)) {
        temp.push(this._n[i])
      }
    }
    
    return Float32Array.of(...temp)  
  }
  
  times_tuple(t) {
    // Multiply matrix this._n by tuple t.
    // Returns a tuple.
    const res = new Float32Array(4)
    
    for (let r = 0; r <= 3; r++) {
      res[r] = 
        this.get(r,0) * t.x + 
        this.get(r,1) * t.y + 
        this.get(r,2) * t.z + 
        this.get(r,3) * t.w
    }
    
    return new Tuple(res[0], res[1], res[2], res[3] )
  }
  
  times_matrix(t) {
    // Multiply matrices.
    // Only supports 4x4 matrices.
    
    if (this._r === 4 && this._c === 4 && t.rows === 4 && t.cols === 4 ) {
      
      const m = matrix(4, 4)
      
      for (let r=0; r < 4; r++) {
        for (let c=0; c < 4; c++) {
          m.put(r,c,
            this.get(r,0) * t.get(0,c) + 
            this.get(r,1) * t.get(1,c) + 
            this.get(r,2) * t.get(2,c) + 
            this.get(r,3) * t.get(3,c)
          )
        }
      }
  
      return m
    } else {
      throw `Only supports multiplying 4x4 matrices. a = ${a.rows}, b = ${b.cols}`
    }
  }
  
  transpose() {
    // Turn rows into columns.
  
    const t = matrix(4, 4)
  
    for ( let r=0; r < 4; r++) {
      for (let c=0; c < 4; c++) {
        t.put(r,c,this.get(c,r))
      }
    }
  
    return t
  }
  
  minor(row, col) {
    // Mansplained: The minor of an element at row i and column j is the determinant of the submatrix at (i, j).
    // Inputs:
    //   ma: 3x3 array to calculate minor on.
    //   row: submatrix row
    //   col: submatrix column
    // Returns the determinant of the submatrix.
    
    const sm = matrix(this._r - 1, this._c - 1)
    sm.putAll(this.submatrix(row, col))

    return sm.determinant()
  }
  
  cofactor(row, col) {
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
  
    const min = this.minor(row, col)
  
    // Determine if indexes at row+col (r + c) is an odd number and if so, return the negative value of min, else return min.
        
    return (row + col) % 2 == 0 ? min : -min
  }
  
  determinant() {
    // Mansplained: Calculate the determinant of a matrix.
    // For a 2x2 matrix
    //   matrix = [a,b,c,d]
    // the calculation is ad - bc.
    // For larger matrices, take the first row and multiply each element with its cofactor.
    // Inputs:
    // m: matrix to calculate determinant for
    // Returns Determinant for matrix, as a number.
  
    let det = 0
  
    if (this._length === 4) {
      //log("error", "2x2 determinant")
      det = (this._n[0] * this._n[3] - this._n[1] * this._n[2])
    } else {
      //log("error", ">2x>2 determinant")
      for (let i = 0; i < this._c; i++) {
        det = det + this.get(0,i) * this.cofactor(0, i)
      }
    }
  
    return det
  }
  
  inverse() {
    // Mansplained: Calculate the inverse of a matrix
    
    const d = this.determinant()
    
    if (d === 0) {
      throw "Matrix is not invertible, determinant is 0"
    }
  
    const m2 = matrix(this._r, this._c)
    m2.putAll(this._n)
  
    for (let r=0; r < this._r; r++) {
      for (let c=0; c < this._c; c++) {
        const cof = this.cofactor(r, c)
        m2.put(c, r, cof / d)
      }
    }
  
    return m2
  }
  
  equals(m) {
    const structural_equality = this._r === m.rows && this._c === m.cols 
    const elements_equal = []
    
    if (structural_equality) {
      for (let i=0; i < this._length; i++) {
        if ( !equal(this._n[i], m.d[i]) ) {
          elements_equal.push(false)
        } else {
          elements_equal.push(true)
        }
      }
    } else { 
      // Immediately return if structural_equality is false
      return false 
    }
    
    // If any elements were different, they will be a false in this array
    return !elements_equal.includes(false)
  }
}

function matrix(rows, cols) {
  // Factory function for matrix
  
  return new Matrix(rows, cols)
}

function multiply_matrices(a, b) {
  // Multiply matrices.
  // Only supports 4x4 matrices.
  throw(`multiply_matrices() is deprecated. Use matrix.times_matrix(m) instead.`)
  
  // Yes, I'm aware that a 2x8 matrix will also pass this test, but I can't be bothered... ;)
  if (a.rows * a.cols != 16 || b.rows * b.cols != 16) {
    throw `Only supports multiplying 4x4 matrices. a = ${a.rows}, b = ${b.cols}`
  }
  const m = matrix(4, 4)
  
  for (let r=0;r<m.rows;r++) {
    for (let c=0;c<m.cols;c++) {
      m.put(r,c,
        a.get(r,0) * b.get(0,c) + 
        a.get(r,1) * b.get(1,c) + 
        a.get(r,2) * b.get(2,c) + 
        a.get(r,3) * b.get(3,c)
      )
     //log("error", `m.get(${r},${c}) = ${m.get(r,c)}`)
    }
  }
  
  return m
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
  throw(`transpose_matrix() is deprecated. Use matrix.transpose() instead.`)

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
  throw `determinant(m) has been deprecated. Use m.determinant() instead.`

  let det = 0
  
  if (m.d.length == 4) {
    //log("error", "2x2 determinant")
    det = (m.get(0,0) * m.get(1,1) - m.get(0,1) * m.get(1,0))
  } else {
    //log("error", ">2x>2 determinant")
    for (let i = 0;i<m.cols;i++) {
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
  throw `minor(ma, row, col) has been deprecated. Use ma.minor(row, col) instead.`

  //log("error", ma.join("\n"))
  const sm = matrix(ma.rows-1, ma.cols-1)
  sm.putAll(ma.submatrix(row, col))
  
  return sm.determinant()
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
  throw `cofactor(ma, r, c) has been deprecated. Use ma.cofactor(row, col) instead.`

  const min = minor(ma, r, c)
  
  // Determine if indexes at row+col (r + c) is an odd number and if so, return the negative value of min, else return min.
  //log("error", (r + c) % 2 == 0 ? min : min * -1)
  return (r + c) % 2 == 0 ? min : min * -1
}

function inverse(m) {
  // Mansplained: Calculate the inverse of a matrix
  throw `inverse(m) has been deprecated. Use m.inverse() instead.`

  const d = m.determinant()

  if (d === 0) {
    throw "Matrix is not invertible, determinant is 0"
  }
  
  const m2 = matrix(m.rows, m.cols)
  m2.putAll(m.d)
  
  for (let r=0;r<m.rows;r++) {
    for (let c=0;c<m.cols;c++) {
      const cof = m.cofactor(r, c)
      //log("error", "Cofactor: " + cof + ", c: " + c + " r: " + r)
      m2.put(c, r, cof / d)
      //log("error", "New value: " + m2[c][r])
    }
  }
  
  return m2
  
}

function translation(x, y, z) {
  // Returns a 4x4 translation matrix applying the x, y and z coordinates for translation.
  
  if (!isNaN(x) && !isNaN(y) && !isNaN(z) ) {
    const t = idmatrix()
    t.put(0,3,x)
    t.put(1,3,y)
    t.put(2,3,z)

    return t
  } else {
    throw(`Input variable is not a number: x = ${x}, y = ${y}, z = ${z}`)
  }
}

function scaling(x, y, z) {
  //Returns a 4x4 translation matrix applying the x, y and z coordinates for scaling.
  
  if (!isNaN(x) && !isNaN(y) && !isNaN(z) ) {
    // Could have used an idmatrix here, but we save a few cycles by avoiding to set then overwrite coords.
    const t = matrix(4, 4)
    t.put(0,0,x)
    t.put(1,1,y)
    t.put(2,2,z)
    t.put(3,3,1)

    return t
  } else {
    throw(`Input variable is not a number: x = ${x}, y = ${y}, z = ${z}`)
  }
}

function rotation_x(rad) {
  // Takes an angle in radians and returns a rotation matrix for the x-axis
  
  if (!isNaN(rad) ) {
    const cr = Math.cos(rad)
    const sr = Math.sin(rad)
    const t = idmatrix()

    t.put(1,1,cr)
    t.put(1,2,-sr)
    t.put(2,1,sr)
    t.put(2,2,cr)

    return t
  } else {
    throw(`Input variable is not a number: rad = ${rad}`)
  }
}

function rotation_y(rad) {
  // Takes an angle in radians and returns a rotation matrix for the y-axis
  
  if (!isNaN(rad) ) {
    const cr = Math.cos(rad)
    const sr = Math.sin(rad)
    const t = idmatrix()

    t.put(0,0,cr)
    t.put(0,2,sr)
    t.put(2,0,-sr)
    t.put(2,2,cr)

    return t
  } else {
    throw(`Input variable is not a number: rad = ${rad}`)
  }
}

function rotation_z(rad) {
  // Takes an angle in radians and returns a rotation matrix for the z-axis
  
  if (!isNaN(rad) ) {
    const cr = Math.cos(rad)
    const sr = Math.sin(rad)
    const t = idmatrix()

    t.put(0,0,cr)
    t.put(0,1,-sr)
    t.put(1,0,sr)
    t.put(1,1,cr)

    return t
  } else {
    throw(`Input variable is not a number: rad = ${rad}`)
  }
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
  
  if (!isNaN(xy) && !isNaN(xz) && !isNaN(yx) && !isNaN(yz) && !isNaN(zx) && !isNaN(zy) ) {
    
    const m = idmatrix()
    m.put(0,1,xy)
    m.put(0,2,xz)
    m.put(1,0,yx)
    m.put(1,2,yz)
    m.put(2,0,zx)
    m.put(2,1,zy)

    return m
  } else {
    throw(`Input variable is not a number: xy = ${xy}, xz = ${xz}, yx = ${yx}, yz = ${yz}, zx = ${zx}, zy = ${zy}`)
  }
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
  throw new Error(`transformations(trans) has been deprecated. Use transformation.times_matrix(transformation) instead.`)
  
  const m = idmatrix()
  
  let t = []
  
  for (let i=0;i<arguments.length;i++) {
    if (arguments[i].d != undefined ) {
      // Only push arguments that are matrices, ie they have .d defined.
      const mat = matrix(arguments[i].rows, arguments[i].cols)
      mat.putAll(arguments[i].d)
      t.push(mat)
    }
  }
  
  //log("error", "transformations(): t[0]) " + t[0].d)
  t = t.reverse()
  
  for (e in t) {
    // To set the result of the multiplied matrices, add .d
    m.putAll(m.times_matrix(t[e]).d)
    //log("error", `transformations(): ${e} ${t[e].d}`)
  }
  //log("error", "transformations(): m.d " + m.d)
  
  return m
}

function recursive_transformations(arr) {
  //log("error", "recursive_transformations()" )
  throw new Error(`recursive_transrformations(arr) has been deprecated. Use transformation.times_matrix(transformation) instead.`)
  const m = idmatrix()
  const i = arr.pop()
  if (arr.length === 0) {
    //log("error", "recursive_transformations(): " + "array.length=0")
    return m.times_matrix(i)
  } else {
    //log("error", "recursive_transformations(): " + "arr.length!=0")
    m.putAll(recursive_transformations(arr ) )
  }
  return m //ultiply_matrices(m, i )
}

// *** RAY FUNCTIONS
class Ray {
  // Return a "ray", consisting of a point called origin and a vector called direction.
  
  constructor(origin, direction) {
    if ( !origin.isPoint() || !direction.isVector() ) {
      throw `ray(): Origin must be a point (was ${origin.toString()}), and Direction must be a vector (was ${direction.toString()})`
    }
    
    this._o = origin // point
    this._d = direction // vector
    this._t = idmatrix()
  }
  
  get origin() { return this._o }
  get direction() { return this._d }
  
  transform(m) { return new Ray(m.times_tuple(this._o), m.times_tuple(this._d)) }
  
  toString() { return `origin: ${this.origin}, direction: ${this.direction}` }
  
}

function ray(o, d) {
  // Factory function for Ray
  return new Ray(o, d)
}

function old_ray(o, d) {
  // Return a "ray", consisting of a point called origin and a vector called direction.
  
  // Check that o is a point and d is a vector, by checking the w value of each
  if (!(o.w === 1 && d.w === 0) ) {
    throw `ray(): Origin must be a point (was ${o.toString()}), and Direction must be a vector (was ${d.toString()})`
  }
  
  return Object.freeze({
    origin:o,
    direction:d,
    transform: function(matr) {
      return ray(
        matr.times_tuple(o), 
        matr.times_tuple(d)
      )
    },
    toString: function() { return `origin: point(${this.origin}) direction: vector(${this.direction})`}
  })
  
}

function position(ray, t) {
  // Compute a ray's direction by t to find the total distance traveled
  return ray.direction.by_scalar(t).plus(ray.origin)
}

function sphere() {
  // Factory function for Sphere()
  // class is defined in shapes.js
  
  return new Sphere()
}

function intersect(s, ra) {
  // Intersect returns an array of points where a given ray (ra) intersects a given shape (s)
  
  // Vector from shape's center to the ray origin
  // Remember: The shape is centered at the world origin (0, 0, 0)
  throw new Error(`intersect(s, ra) has been deprecated. Use s.intersect(ra) instead.`)

  const r = ra.transform(s.transform_inverse) // Ray passed to intersect should be transformed by the inversed transformation matrix
  const shape_to_ray = r.origin.minus(point(0, 0, 0))
  const a = r.direction.dot(r.direction)
  const b = 2 * r.direction.dot(shape_to_ray)
  const c = shape_to_ray.dot(shape_to_ray) - 1
  
  const discriminant = b**2 - 4*a*c
  
  // The discriminant is the key - if it's negative, the ray misses the shape
  if (discriminant < 0 ) { return [] }
  
  // Otherwise, the equation has two solutions, which could be the same, if the
  // ray intersects at a perfect tangent
  const t1 = (-b - Math.sqrt(discriminant)) / ( 2 * a )
  const t2 = (-b + Math.sqrt(discriminant)) / ( 2 * a )

  return [intersection(t1, s), intersection(t2, s)]
}

function intersection(t_value, shape) {
  // The intersection function encapsulates t value and object
  
  return Object.freeze({
    t:t_value,
    object:shape
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
                                               .sort( function(a, b) { return a.t - b.t } )
  
  return list_of_intersections[0] 
}

// *** SHADING FUNCTIONS



function reflect(v_in, normal) {
  // Reflecting a vector around an incoming in vector and a normal
  // Pseudocode, page 83: return v_in - normal * 2 * v_in.dot(normal)
  
  //log("error", "reflect() v_in: " + v_in)
  //log("error", "reflect() normal: " + normal)
  
  return v_in.minus(normal.by_scalar(2).by_scalar(v_in.dot(normal)))
}

class PointLight {
  // The PointLight class represents a point light object with data.
  // Default values are set in the constructor and/or parameters.
  // Using getters and setters allows direct assignment, such as pointlight.intensity = color(1, 1, 1)
  // Constructor fields are not really private.
  
  constructor(position, intensity) {
    this._id = C.unique_id()
    this._position = position
    this._intensity = intensity
  }
  
  get id() {
    return this._id
  }
  
  get position() {
    return this._position
  }
  
  get intensity() {
    return this._intensity
  }
  
  get toString() {
    return `PointLight(), ID: ${this._id}, position: ${this._position}, intensity: ${this._intensity}`
  }
  
  set intensity(value) {
    if (value.red != undefined) {
      this._intensity = value
    } else {
      throw `Intensity must be a color() object. value = ${value} `
    }
  }
  
  set position(value) {
    if (value != undefined && value.x != undefined) {
      this._position = value
    } else {
      throw `Position must be a point() object. value = ${value} `
    }
  }
}

function point_light(p, i) {
  // Create an object representing a point light in the scene
  
  return new PointLight(p, i)
}

class Material {
  // The PointLight class represents a point light object with data.
  
  constructor() {
    this._id = C.unique_id()
    this._color = color(1, 1, 1)
    this._ambient = 0.1
    this._diffuse = 0.9
    this._specular = 0.9
    this._shininess = 200.0
    this._reflective = 0.0
  }
  
  get color() { return this._color }
  get ambient() { return this._ambient }
  get diffuse() { return this._diffuse }
  get specular() { return this._specular }
  get shininess() { return this._shininess }
  get reflective() { return this._reflective }
  get pattern() { return this._pattern }
  
  set color(col) { this._color = color(col.red, col.green, col.blue) }
  
  set ambient(amb) { this._ambient = amb }
  set diffuse(dif) { this._diffuse = dif }
  set specular(spe) { this._specular = spe }
  set shininess(shi) { this._shininess = shi }
  set reflective(ref) { this._reflective = ref }
  set pattern(pat) { this._pattern = pat }
  
  hasPattern() { return this._pattern != undefined }
  
  equals(mat) {
    return mat.color.equals(this._color) 
        && mat.ambient === this._ambient 
        && mat.diffuse === this._diffuse
        && mat.specular === this._specular 
        && mat.shininess === this._shininess
  }

}

function material() {
  // Create an object representing the default material
  
  return new Material()
}

function lighting(material, object, light, point, eyev, normalv, in_shadow) {
  // The lighting function computes shading for pixels
  
  const this_color = material.hasPattern() ? material.pattern.atShape(object, point) : material.color
    
  // Combine surface color with the light's color/intensity
  const effective_color = this_color.times(light.intensity)
  //log("error", "effective_color: " + effective_color)
  
  // Find the direction to the light source
  const lightv = light.position.minus(point).normalize()
  //log("error", "lightv: " + lightv)
  
  // Compute ambient contribution
  const ambient = effective_color.by_scalar(material.ambient)
  //log("error", "ambient: " + ambient)
  
  let diffuse, specular
  // light_dot_normal represents the cosine of the angle between the light vector and 
  // the normal vector. A negative number means the light is on the other side of the
  // surface.
  const light_dot_normal = lightv.dot(normalv)
  //log("error", "light_dot_normal: " + light_dot_normal)
  
  if (light_dot_normal < 0 || in_shadow ) {
    diffuse = color(0, 0, 0)
    specular = color(0, 0, 0)
  } else {
    // Compute the diffuse contribution
    diffuse = effective_color.by_scalar(material.diffuse * light_dot_normal)
    //log("error", "diffuse: " + diffuse)
    
    // reflect_dot_eye represents the cosine of the angle between the reflection vector
    // and the eye vector. A negative number means the light reflects away from the eye.
    // According to the book, it should be -lightv. But I saw no specular highlight while that was the case.
    // When I (by chance) changed it to lightv, the highlight is there!
    const reflectv = reflect(lightv.negate(), normalv)
    //log("error", "reflectv: " + reflectv)
    
    const reflect_dot_eye = reflectv.dot(eyev)
    //log("error", "reflect_dot_eye: " + reflect_dot_eye)
    
    if (reflect_dot_eye <= 0 ) {
      specular = color(0, 0, 0)
    } else {
      // Compute the specular contribution
      const factor = Math.pow(reflect_dot_eye, material.shininess)
      
      specular = light.intensity.by_scalar(material.specular * factor)
      //log("error", "light.intensity: " + light.intensity)
      //log("error", "material.specular: " + material.specular)
      //if (specular.red >= 0.01) {log("error", "specular.red: " + specular.red)}
    }
  }
  // Add the three contributions together to get the final shading
  //log("error", `ambient + diffuse + specular = " ${ambient} + ${diffuse} + ${specular} = ${add_colors(ambient, add_colors(diffuse, specular))}`)
  
  return ambient.plus(diffuse.plus(specular))
}

// *** SCENE FUNCTIONS

class World {
  // The World object holds all the objects for the scene
  
  constructor() {
    this._objects = []
    this._lights = []
  }
  
  get objects() { return this._objects }
  get lights() { return this._lights }
  
  addLight(light_object) { this._lights.push(light_object) }
  addObject(world_object) { this._objects.push(world_object) }
  
  has(object) {
    // Check if the world contains an object matching the input
    if (object.position != undefined && object.intensity != undefined) {
      // Input is a light object
      return this._lights.filter(e => e.position.equals(object.position) && e.intensity.equals(object.intensity))
    } else {
      // Input is a world object
      return this._objects.filter(e => e.transform.equals(object.transform) && e.material.equals(object.material) )
    }
  }
  toString() {
    return `World: ${this._objects}`
  }
}

function world() {
  // Creates World-objects
  return new World()
}

function default_world() {
  // Creates a default world
  
  // Create world object
  const w = world()
  
  // Create a default light object
  const light = point_light(point(-10, 10, -10), color(1, 1, 1))
  
  // Create a sphere
  const s1 = sphere()
  
  // Create a new material
  const mat = material()
  
  // Set material properties
  mat.color = color(0.8, 1.0, 0.6)
  mat.diffuse = 0.7
  mat.specular = 0.2
  
  // Apply material to sphere
  s1.material = mat
  
  // Create a new sphere
  const s2 = sphere()
  
  // Add a transform to the sphere
  s2.transform = scaling(0.5, 0.5, 0.5)
  
  // Add objects to the world
  w.addLight(light)
  w.addObject(s1)
  w.addObject(s2)
  
  return w
}

function intersect_world(w, r) {
  // Iterate over the world w and log all object intersections with ray r
  
  const _intersections = []
  
  if (w.objects === undefined || w.objects.length === 0) {
    throw(`Trying to iterate over an empty world`)
  }
  
  for (e in w.objects) {
    
    const f = w.objects[e].intersect(r)
    
    for (g in f) {
      //log("error", "Intersection: " + f[g].t)

      _intersections.push(f[g])
    } 
  }
  
  // Sort the array of intersections by their t-values
  return _intersections.sort( function(a, b) {
    return a.t - b.t
  })
}

class PrepareComputations {
  // Precomputes the state of an intersection, by means of the intersection (i) and a ray (r)
  
  constructor(i, r) {
    // i must be a singular intersection(t, object), not an array!
    if (!isNaN(i.t)) {
      this._i = i
      this._r = r
      this._p = position(this._r, this._i.t)
      this._e = this._r.direction.negate()
      this._n = this._i.object.normalAt(this._p)
      this._inside = this.is_inside()
      this._reflectv = reflect(r.direction, this._n)

    } else {
      throw(`Cannot construct a PrepareComputations object without a valid intersection, i.t was: ${i.t}`)
    }
  }
  
  get t() { return this._i.t }
  get object() { return this._i.object }
  get point() { return this._p }
  get eyev() { return this._e }
  get normalv() { return this._n }
  get inside() { return this._inside }
  get reflectv() { return this._reflectv }
  get over_point() { 
    
    return this.point.plus(this.normalv.by_scalar(C.EPSILON)) 
  }
  
  is_inside() {
    if (this._n.dot(this._e) < 0 ) {
      this._n = this._n.negate()
      return true
    } else {
      return false
    }
  }
    
  toString() { return `PrepareComputations(intersection, ray): t=${this.t} object.id=${this.object.id} point=${this.point} eyev=${this.eyev} normalv=${this.normalv} inside=${this.inside}` }
}

function prepare_computations(i, r) {
  // Precomputes the state of an intersection, by means of the intersection (i) and a ray (r)
  
  return new PrepareComputations(i, r)
}

function shade_hit(w, c, remaining = 5) {
  // Call lighting() function with the intersected object's material and the prepared computations
  
  const shadowed = is_shadowed(w, c.over_point)
  
  const surface = lighting(c.object.material, c.object, w.lights[0], c.point, c.eyev, c.normalv, shadowed)
  const reflected = reflected_color(w, c, remaining)

  return surface.plus(reflected)
}

function color_at(w, r, remaining = 5) {
  // The color_at function uses intersect(), prepare_computations()
  // and shade_hit() to compute the color at the resulting intersection
  
  const xs = intersect_world(w, r)
  
  if (xs.length === 0) {
    // Ray did not intersect any objects in this world
    return color(0, 0, 0)
  } else {
    
    // Find the hit
    const i = hit(xs)
    
    // We prepare the computations
    comps = prepare_computations(i, r)
    
    // We calculate the color
    return shade_hit(w, comps, remaining)
  }
}

function view_transform(from, to, up) {
  // Defines transformation matrix for the view, effectively moving "the eye"
  // The default transformation is the idmatrix()
  
  const forward = to.minus(from).normalize()
  //log("error", "view_transform(): forward: " + forward)
  
  const upn = up.normalize()
  //log("error", "view_transform(): upn: " + upn)
  
  const left = forward.cross(upn)
  //log("error", "view_transform(): left: " + left)
  
  const trueup = left.cross(forward)
  //log("error", "view_transform(): trueup: " + trueup)
  
  const orientation = matrix(4, 4)
  orientation.putAll([left.x,     left.y,     left.z,    0,
                      trueup.x,   trueup.y,   trueup.z,  0,
                     -forward.x, -forward.y, -forward.z, 0,
                              0,          0,          0, 1,
                    ])
  
  return orientation.times_matrix(translation(-from.x, -from.y, -from.z))
}

class Camera {
  // The virtual camera will let you "take pictures" of your scene.
  // Like a real camera, you can move it around, zoom in and out and
  // even rotate the camera upside down if that's the shot you want.
  
  constructor(h, v, fov) {
    this._h = h
    this._v = v
    this._f = fov
    this._transform = idmatrix()
    this._transform_inverse = idmatrix()
    
    const half_view = Math.tan(fov / 2 )
    const aspect = this._h / this._v
    
    if (aspect >= 1) {
      this._half_width = half_view
      this._half_height = half_view / aspect
    } else {
      this._half_width = half_view * aspect
      this._half_height = half_view
    }
  }
  
  get hsize() { return this._h }
  get vsize() { return this._v }
  get fov() { return this._f }
  get transform() { return this._transform }
  get transform_inverse() { return this._transform_inverse }
  get half_width() { return this._half_width }
  get half_height() { return this._half_height }
  
  set transform(value) {
    if (value.d != undefined) {
      this._transform = value
      this._transform_inverse = value.inverse()
    }
  }
  
  get pixel_size() {
    // Calculate pixel size for the camera
    
    return parseFloat((( this._half_width * 2 ) / this._h))
  }
}

function camera(hs, vs, fov) {
  // Factory function for camera
  
  return new Camera(hs, vs, fov)
}

function ray_for_pixel(cam, px, py) {
  // Compute ray that can pass through any given pixel on the canvas
  
  // Offset from edge of canvas to pixel's center
  const xoffset = (px + 0.5) * cam.pixel_size
  const yoffset = (py + 0.5) * cam.pixel_size
  
  // The untransformed coordinates of the pixel in world space.
  // (camera looks toward -z, so +x is to the left)
  const worldx = cam.half_width - xoffset
  const worldy = cam.half_height - yoffset
  
  // Using the camera matrix, transform the canvas point and the origin,
  // and then compute the ray's direction vector
  // (remember that the canvas is at z=-1)
  
  const pixel = cam.transform_inverse.times_tuple(point(worldx, worldy, -1))
  
  const origin = cam.transform_inverse.times_tuple(point(0, 0, 0))
  const direction = pixel.minus(origin)
    
  return ray(origin, direction.normalize())
}

function render(cam, w) {
  // The render function will render a scene and return a canvas
  
  const image = canvas(cam.hsize, cam.vsize)
  
  for (let y=0; y < cam.vsize; y++) {
    for (let x=0; x < cam.hsize; x++) {
      const ray = (ray_for_pixel(cam, x, y))
      const col = color_at(w, ray)
      image.write_pixel(x, y, col)
    }
  }
  
  return image
}

function render_pixel(cam, w, x, y) {
  // This function will render a single pixel and return the color
  // For use with externally controlled pixel-space, such as web worker.

  const ray = (ray_for_pixel(cam, x, y))
  const col = color_at(w, ray)

  return col
}

function is_shadowed(w, p) {
  // Compute shadow by casting a shadow ray from a point of intersection back
  // toward the light. If something intersects this ray, the point is considered
  // to be in shadow, and thus only ambient light should apply.
  
  const v = w.lights[0].position.minus(p)
  const distance = v.magnitude()
  const direction = v.normalize()
  
  const r = ray(p, direction)
  const xs = intersect_world(w, r)
  
  const h = hit(xs)
  
  return (h != undefined && h.t < distance)
}

// *** SHAPE FUNCTIONS

function test_shape() {
  // Factory function for TestShape()
  // class is defined in shapes.js
  
  return new TestShape()
}

function plane() {
  // Factory function for Plane()
  // class is defined in shapes.js
  
  return new Plane()
}

// *** PATTERN FUNCTIONS
  
function stripe_pattern(c1, c2) {
  // Factory function for StripePattern
  // Class is implemented in patterns.js
  
  return new StripePattern(c1, c2)
}

function test_pattern() {
  // Factory function for TestPattern
  // Class is implemented in patterns.js
  
  return new TestPattern()
}

function gradient_pattern(g1, g2) {
  // Factory function for GradientPattern
  // Class is implemented in patterns.js
  
  return new GradientPattern(g1, g2)
}

function ring_pattern(c1, c2) {
  // Factory function for RingPattern
  // Class is implemented in patterns.js
  
  return new RingPattern(c1, c2)
}

function chequered_pattern(c1, c2) {
  // Factory function for ChecqueredPattern
  // Class is implemented in patterns.js
  
  return new ChequeredPattern(c1, c2)
}

function reflected_color(w, comps, remaining = 5) {
  // This function returns the color black when the material's reflective attribute is 0
  
  if (remaining <= 0) { return color(0, 0, 0) }
  if (comps.object.material.reflective === 0.0 ) { return color(0, 0, 0) }
  
  const reflect_ray = ray(comps.over_point, comps.reflectv)
  
  const col = color_at(w, reflect_ray, remaining - 1)
  
  //log("error", comps.object.material.reflective)
  //log("error", col)
  return col.by_scalar(comps.object.material.reflective)
}
