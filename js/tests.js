// *** TESTS
`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`

function test_tuple_function() {
  // Constructing a tuple should return a tuple object with matching values
  
  // A tuple with w=1.0 is a point
  const a = tuple(4.3, -4.2, 3.1, 1.0)
  const res1 = a.x === 4.3 && a.y === -4.2 && a.z === 3.1 && a.w === 1.0 && a.isPoint() && !a.isVector()
  
  const b = tuple(4.3, -4.2, 3.1, 0.0)
  const res2 = b.x === 4.3 && b.y === -4.2 && b.z === 3.1 && b.w === 0.0 && !b.isPoint() && b.isVector()
  
  return res1 && res2
}

function test_vector_function() {
  // Constructing a vector should return a tuple object with matching values and w=0

  var v = vector(4, -4, 3)
  

  return v.x === 4.0 && v.y === -4.0 && v.z === 3 && v.w === 0 && v.isVector() && !v.isPoint()
}

function test_point_function() {
  // Constructing a point should return a tuple object with matching values and w=1

  var v = point(4, -4, 3)
  

  return v.x === 4.0 && v.y === -4.0 && v.z === 3.0 && v.w == 1 && v.isPoint() && !v.isVector()
}

function test_equal_function() {
  // Comparing floating point numbers for equivalence may, due to rounding errors, fail
  // The function equal(a, b) will subtract a from b and compare the result to a small constant EPSILON.
  // and if the difference is smaller, we will call them equal.

  return equal(1.0, 1.0) 
      && !(equal(12.009, 12.008)) 
      && equal(123456.2345, 123456.234501)
}

function test_equal_tuples_function() {
  // Test that tuple, vector and point coordinates are the same, even with slight diff inside PRECISION value

  var t1 = tuple(110.999, -23.11, 2, 0)
  var t2 = tuple(110.9990000001, -23.11, 2.00000001, 0)
  var v1 = vector(110.999999, -23.11, 2.0)
  var v2 = vector(111.000001, -23.11, 2.0)
  var p1 = point(110.9990000002, -23.11, 2.00000001)
  var p2 = point(110.9990000001, -23.11, 1.99999999)
  
  return t1.equals(t2) && v1.equals(v2) && p1.equals(p2) && !p2.equals.v1
}

function test_add_tuples_function() {

  var t = tuple(110.999, -23.11, 2, 0)
  var v = vector(1.999, 23.11, 22.001)
  var p = point(110.9990000001, -23.11, 2.00000001)
  
  return t.plus(v).equals(tuple(112.998, 0.0, 24.001, 0))
}

function test_subtract_tuples_function() {

  var t = tuple(-44.555, 345.123, 1.0, 0)
  var v = vector(-33.44, 123.345, 0.0)

  var subtracted_tv = t.minus(v)
  
  return subtracted_tv.equals(tuple(t.x - v.x, t.y - v.y, t.z - v.z, t.w - v.w))
}

function test_negate_tuple_function() {
  // Test that negate_tuple() returns a tuple with x=-x, y=-y, z=-z coordinates
  
  var n = tuple(1, -2, 3, -4).negate()
  
  return n.x === -1, n.y === 2, n.z === -3, n.w === 4
}

function test_multiply_vector_function() {
  // Multiplying a tuple by a scalar
  // Given t = tuple(1, -2, 3, -4)
  // Then t * 3.5 = tuple(3.5, -7, 10.5, -14)
  // Except my Tuple will only allow vectors to be multiplied by scalar value
  // It will throw "Only vectors can be multiplied by scalar value." if the tuple
  // is not a vector.
  let should_throw_error = false
  
  try {
    var n = tuple(1, -2, 3, -4).by_scalar(3.5)
  } catch (error) {
    should_throw_error = true  
  }
  
  const m = vector(1, -2, 3).by_scalar(3.5)
  
  return equal(m.x, 3.5) 
      && equal(m.y, -7) 
      && equal(m.z, 10.5) 
      && equal(m.w, 0) 
      && should_throw_error
}

function test_divide_vector_function() {
  // Dividing a tuple by a scalar value
  // Given t = tuple(1, -2, 3, -4)
  // Then t / 2 = tuple(0.5, -1, 1.5, -2)
  // Except my Tuple will only allow vectors to be divided by scalar value
  // It will throw "Only vectors can be divided by scalar value." if the tuple
  // is not a vector.
  let should_throw_error = false
  
  try {
    const s = tuple(1, -2, 3, -4).divided_by(2)
  } catch (error) {
    should_throw_error = true  
  }
  
  const t = tuple(1, -2, 3, 0).divided_by(2)
      
  return equal(t.x, 0.5) 
      && equal(t.y, -1) 
      && equal(t.z, 1.5) 
      && equal(t.w, 0) 
      && should_throw_error
}

function test_magnitude_function() {
  // Magnitude, or length of a vector is the distance from one end of a vector to the other.
  // Given vector(x, y, z, 0), the magnitude is Math.sqrt(x**2 + y**2 + z**2 + w**2)
  
  var r = vector(0, 1, 0).magnitude()
  var s = vector(0, 0, 1).magnitude()
  var t = vector(1, 2, 3).magnitude()
  var u = vector(-1, -2, -3).magnitude()
  
  return equal(r, 1) 
      && equal(s, 1)
      && equal(t, Math.sqrt(14)) 
      && equal(u, Math.sqrt(14))
}

function test_normalize_function() {
  // Normalizing a vector means taking an arbitrary vector and converting it into a unit vector.
  // Normalizing vector(4, 0, 0) gives (1, 0, 0)
  // Normalizing vector(1, 2, 3) gives vector(1/sqrt(14, 2/sqrt(14), 3/sqrt(14))
  // The magnitude of a normalized vector is 1.
  
  var a = vector(4, 0, 0).normalize()
  var b = vector(1, 2, 3).normalize()
  
  return a.equals(vector(1, 0, 0)) 
      && b.equals(vector(1/Math.sqrt(14), 2/Math.sqrt(14), 3/Math.sqrt(14)))
  
}

function test_dot_function() {
  // Compute the dot product (aka scalar product) of two vectors
  // Given vector(1, 2, 3) and vector(2, 3, 4) the dot product is 20
  
  return vector(1, 2, 3).dot(vector(2, 3, 4)) == 20
}

function test_cross_function() {
  // The cross product is the same as the dot product, only it returns a vector instead of a scalar value.
  // Gives vector(1, 2, 3) and vector(2, 3, 4)
  // Then cross(a, b) == vector(-1, 2, -1)
  // and cross(b, a) == vector(1, -2, 1)
  var u = vector(1, 2, 3)
  var v = vector(2, 3, 4)
  
  var uv = u.cross(v)
  var vu = v.cross(u)
  
  return uv.equals(vector(-1, 2, -1)) 
      && vu.equals(vector(1, -2, 1))
}

// *** COLOR TEST FUNCTIONS

function test_color_function() {
  // Colors are tuples too!
  // Test creating a color(r, g, b) object
  const c = color(-0.5, 0.4, 1.7)
  
  return c.red == -0.5 
      && c.green == 0.4 
      && c.blue == 1.7
}

function test_add_colors_function() {
  // Adding two colors means simple addition of their r, g and b values.
  
  const c1 = color(0.9, 0.6, 0.75)
  const c2 = color(0.7, 0.1, 0.25)
  const c3 = c1.plus(c2)
  
  return c3.red === c1.red + c2.red
     && c3.blue === c1.blue + c2.blue
     && c3.green === c1.green + c2.green
}

function test_subtract_colors_function() {
  // Subtracting two colors means simple subtraction of their r, g and b values.
  
  const c1 = color(0.9, 0.6, 0.75)
  const c2 = color(0.7, 0.1, 0.25)
  const c3 = c1.minus(c2)
  
  return c3.red === c1.red - c2.red 
      && c3.green === c1.green - c2.green 
      && c3.blue === c1.blue - c2.blue
}

function test_multiply_color_function() {
  // Multiply r, g and b values by a scalar value.
  
  const c1 = color(0.9, 0.6, 0.75)
  const s = 1.5
  const c3 = c1.by_scalar(s)

  return equal(c3.red, 1.35)
      && equal(c3.green, 0.9)
      && equal(c3.blue, 1.125)
}

function test_multiply_colors_function() {
  // Multiply r, g and b values of two colors by each other.
  
  const c1 = color(0.9, 0.6, 0.75)
  const c2 = color(0.7, 0.1, 0.25)
  const c3 = c1.times(c2)
  
  return c3.red === c1.red * c2.red
      && c3.green === c1.green * c2.green
      && c3.blue === c1.blue * c2.blue
}

function test_scale_color_function() {
  // Scale color to value suitable for PPM file.
  // min = 0
  // max = 255
  // color = color object to be scaled.
  // return a new color object
  
  const c1 = color(0.9, -1.5, 2)
  const s1 = c1.scaled()
  
  return s1.red === 230 
      && s1.green === 0 
      && s1.blue === 255
}

// *** CANVAS TEST FUNCTIONS

function test_html_canvas_function() {
  // Creates a canvas initialized to all black pixels.
  // ID of canvas element is that of its parent, suffixed with "_canvas"
  
  const parent = "canvas_list"
  const w = 10
  const h = 20
  
  const can = html_canvas(parent, w, h)
  const context = can.getContext("2d")
  context.fillStyle = "black"
  context.fillRect(0, 0, w, h)
  
  return !!document.getElementById(parent + "_canvas")
}

function test_html_get_pixel_color_function() {
  // Create canvas, set a pixel to a given color value.
  // Read color value, compare.
  
  const parent = "canvas_list"
  const w = 10
  const h = 20
  
  const can = html_canvas(parent, w, h)
  const ctx = can.getContext("2d")
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = "red"
  ctx.fillRect(2, 2, 3, 3)
  
  const imgData = ctx.getImageData(2, 2, 1, 1)
  const c1 = color(255, 0,0)
  const c2 = color(imgData.data[0], imgData.data[1], imgData.data[2])
  
  return c1.red == c2.red 
      && c1.green == c2.green 
      && c1.blue == c2.blue
}

function test_canvas_function() {
  // This is a test for a canvas function that is pure data, not the HTML element called canvas.
  // A canvas is an object with width, height and a data array for pixel values.
  
  const w = 12
  const h = 12
  const can = canvas(w, h)
  
  // Test all values are 0.
  let sum = 0
  for (let key in can.data) {
    sum += can.data[key];
  }
  const valzero = sum === 0
    
  const i = 11
  can.data[11] = 255
  can.data[11+1] = 123
  can.data[11+2] = 234
  //log("error", "at i=11: " + can.data[11])
  
  return can.width === w 
      && can.height === h 
      && can.data[11] === 255 
      && can.data[11+1] === 123 
      && can.data[11+2] === 234 
      && can.data[1] === 0 
      && valzero
}

function test_write_pixel_function() {
  // Given a canvas, write a color to a pixel at desired coordinates and test reading the value.
  // To get pixel index value: w * y + x * b
  
  const w = 8
  const h = 8
  const can = canvas(w, h)
  const c1 = color(11, 22, 33)
  const len = can.data.length
  
  can.write_pixel(2, 2, c1)

  if(can.data.length > len) {
    log("error", "Array has been lengthened! Was: " + len + " and now: " + can.data.length )
    return false
  }
  const p1 = can.pixel_at(2, 2)
  
  //log("error", `p1index: ${p1index} +1: ${p1index+1} +2x: ${p1index+2}`)
  //log("error", `p1index: ${can.data[p1index]} +1: ${can.data[p1index+1]} +2x: ${can.data[p1index+2]}`)
  
  return p1.red === c1.red
      && p1.green === c1.green
      && p1.blue === c1.blue
}

function test_constructing_ppm_header() {
  // PPM header test
  // The header should look like this, where 80 40 is W and H:
  // P3
  // 80 40
  // 255
  
  const w = 80
  const h = 40
  const c = canvas(w, h)
  
  ppm = canvas_to_ppm(c)
  //log("error", ppm.slice(0, 13))
  
  return ppm.slice(0, 13) === `P3\n${w} ${h}\n255\n`
}

function test_ppm_pixel_data() {
  // Test pixel data is valid.
  // File should end with newline.
  // No line should exceed 70 characters, and must not split a color in two.
  // Colors must be scaled to values between 0 and 255.
  
  const w = 10
  const h = 10
  const can = canvas(w, h)
  const c1 = color(Math.random(), Math.random(), Math.random())
  
  const sc = c1.scaled()
  
  // Fill all pixels with color value c1, scaled to 0-255
  // This is part of the canvas_to_ppm function
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      can.write_pixel(x, y, sc)
    }
  }
  
  let ppm = canvas_to_ppm(can)
  //log("error", ppm)
    
  ppm = ppm.split("\n")
  
  
  let width_exceeded, starts_ws, ends_ws = false
  let last_is_newline = true
  
  for (let i = 0; i < ppm.length; i++) {
    if (ppm[i].length > 70) {
      width_exceeded = true
      log("error", "line " + (i + 1) + " exceeds 70 characters")
    }
    if(ppm[i][0] === " ") {
      starts_ws = true
      log("error", "line " + (i + 1) + " starts with whitespace")
    }
    if(ppm[i][ppm[i].length-1] === " ") {
      ends_ws = true
      log("error", "line " + (i + 1) + " ends with whitespace")
    }
  }
  
  if(ppm[ppm.length-1] != "") {
    last_is_newline = false
    log("error", "the last character is not a newline.")
  }
   
  return !width_exceeded 
      && !starts_ws 
      && !ends_ws 
      && last_is_newline
}

function test_canvas_to_ppm_function() {
  // Test function for making a ppm file from a canvas.
  const w = 4
  const h = 4
  const can = canvas(w, h)
  
  can.write_pixel(0,0, color(1, 1, 1))
  can.write_pixel(1,0, color(2, 2, 2))
  can.write_pixel(0,1, color(3, 3, 3))
  can.write_pixel(1,1, color(4, 4, 4))
  
  const ppm = canvas_to_ppm(can)
  
  //log("error", ppm)
  
  return (ppm === `P3\n4 4\n255\n1 1 1 2 2 2 0 0 0 0 0 0 3 3 3 4 4\n4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0\n\n\n\n`)
}

// *** MATRIX TEST FUNCTIONS

function test_create_matrix_function() {
  // Test create and verify matrices of 2x2, 3x3, 4x4, 3x5 and 5x3
  // matrix.at(row, col), row and col are 0-based indexes.
  // matrix.put(row, col, val)
  
  let m1 = false
  let m2 = false
  let m3 = false
  try {
    let m4x4 = matrix(4, 4)
  
    m4x4.put(0,0, 12.123456)
    m4x4.putAll([1,2,3,4,5.5,6.5,7.5,8.5,9,10,11,12,13.5,14.5,15.5,16.5])
    m1 = m4x4.get(0,0) === 1    // 4*0+0 = 0 
      && m4x4.get(0,3) === 4    // 4*0+3 = 3
      && m4x4.get(1,0) === 5.5  // 4*1+0 = 4
      && m4x4.get(2,2) === 11   // 4*2+2 = 10
      && m4x4.get(3,0) === 13.5 // 4*3+0 = 12
      && m4x4.get(3,2) === 15.5 // 4*3+2 = 14
      && m4x4.get(8,8) === undefined
          
  const m2x2 = matrix(2, 2)
  
  m2x2.put(0,0,1)
  m2x2.put(0,1,2)
  m2x2.put(0,2,3)
  m2x2.put(1,0,4)
  m2x2.put(1,1,5)
  m2x2.put(1,2,6)
  m2x2.put(2,0,7)
  m2x2.put(3,1,8)
  m2x2.put(2,2,9)
  
  //log("error", m2x2.d)
  m2 = equal(m2x2.get(0,0), 1)
    && equal(m2x2.get(0,1), 2)
    && equal(m2x2.get(1,0), 4)
    && equal(m2x2.get(1,1), 5)
    && m2x2.get(2,2) === undefined
  //log("error", m2x2.get(2,2))
  
  const m3x3 = matrix(3, 3)
  
  m3x3.put(0,0,-3.3)
  m3x3.put(0,1,5)
  m3x3.put(0,2,0)
  m3x3.put(1,0,1.0)
  m3x3.put(1,1,-2)
  m3x3.put(1,2,-7)
  m3x3.putAll([-3.3,5,0,-2,-7,0,1,1,1])
    
  //log("error", m3x3.d)
  m3 = equal(m3x3.get(0,0),-3.3) 
    && equal(m3x3.get(1,1),-7) 
    && equal(m3x3.get(2,2),1)
    && m3x3.get(-11,-11) === undefined

  } catch (error) {
    log("error", "Catch: " + error)
    return {
      error: error,
      msg: "test_create_matrix_function() failed with error message" + error,
      status: false
    }
  }
  return m1 && m2 && m3
}

function test_matrix_equal_function() {
  // Test the equality of two matrices.
  // Consider very similar floating point values, as with tuples.
  
  let is_equal = false
  let close_enough = false
  let not_equal = true
  
  try {
    const ma = matrix(4, 4)
    const mb = matrix(4, 4)

    // Populate matrix with putAll
    ma.putAll([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2])
    ma.put(0,0,11.22)
    //log("error", ma.get(0,0))

    // Make a copy
    mb.putAll(ma.d)
    //log("error", ma.d)
    //log("error", mb.d)

    is_equal = ma.equals(mb)

    // Change some values so they are not exactly equal but still within the PRECISION threshold
    // Should still be evaluated to equal
    ma.put(0,1,1.999999)

    mb.put(1,0,5.000001)

    close_enough = ma.equals(mb)

    // Change some values, so they're not equal any more
    mb.put(1,3,12)
    mb.put(3,1,1.34)
    ma.put(2,2,22)
    ma.put(0,0,3.1415)

    not_equal = ma.equals(mb)
    //log("error", "ma: " + ma.d)
    //log("error", "ma: " + mb.d)
  } catch (error) {
    log("error", "Catch: " + error)
  }
  
  return is_equal 
      && close_enough 
      && !not_equal
}

function test_multiply_matrices_function() {
  // Multiplying two matrices
  // Only 4x4 matrices.
  
  const ma = matrix(4, 4)
  const mb = matrix(4, 4)
  const mc = matrix(4, 4)
  ma.putAll([1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2])
  mb.putAll([-2,1,2,3,3,2,1,-1,4,3,6,5,1,2,7,8])
  mc.putAll([20,22,50,48,44,54,114,108,40,58,110,102,16,26,46,42])
  
  return mc.equals(ma.times_matrix(mb))
}

function test_multiply_matrix_by_tuple_function() {
  // Multiply matrix by tuple.
  // Similar to multiply_matrices, but this time "matrix B" is a tuple, treated as a one column matrix.
  // Given tuple(1,2,3,1)
  // Given 1 2 3 4
  //       2 4 4 2
  //       8 6 4 1
  //       0 0 0 1
  // Return tuple(18, 24,33, 1)
  
  const ma = matrix(4, 4)
  const t = tuple(1,2,3,1)
  
  ma.putAll([1,2,3,4,2,4,4,2,8,6,4,1,0,0,0,1])
  
  const r = tuple(18,24,33,1)
  
  return r.equals(ma.times_tuple(t))
  
}

function test_idmatrix_function() {
  // The idmatrix() function returns the id matrix
  // 1 0 0 0
  // 0 1 0 0
  // 0 0 1 0
  // 0 0 0 1
  
  const m = idmatrix()
  const i = matrix(4,4)
  i.put(0,0,1)
  i.put(1,1,1)
  i.put(2,2,1)
  i.put(3,3,1)
  
  return m.equals(i)
}

function test_multiply_by_identity_matrix_function() {
  // Multiplying any number by 1 gives the same number back. The number 1 is for this reason called the
  // "multiplicative identity". There also exists an "identity matrix", and this test
  // demonstrates the "non-effect" of multiplying matrix and tuple by the identity matrix.
  
  const m = matrix(4,4)
  m.putAll([7,9,3,5,2,2,0,8,2,6,2,9,2,2,2,2])
  
  const t = tuple(7, 6, 5, 4)
  
  // This is the multiplicative identity for matrices:
  const id_matrix = idmatrix()
  
  return t.equals(id_matrix.times_tuple(t)) && m.equals(m.times_matrix(id_matrix))
  
}

function test_transpose_matrix_function() {
  // Transposing a matrix involves turning rows into columns.
  // Given:
  // 0 9 3 0
  // 9 8 0 8
  // 1 8 5 3
  // 0 0 5 8
  // The function will return:
  // 0 9 1 0
  // 9 8 8 0
  // 3 0 5 5
  // 0 8 3 8
  
  const ma = matrix(4, 4)
  ma.putAll([0,9,3,0,9,8,0,8,1,8,5,3,0,0,5,8])
  
  const mt = matrix(4, 4)
  mt.putAll([0,9,1,0,9,8,8,0,3,0,5,5,0,8,3,8])
  
  return mt.equals(ma.transpose())
  
}

function test_transpose_identity_matrix() {
  //Transposing identity matrix should return identity matrix.
  
  const t = idmatrix()
  
  return t.equals(t.transpose())
}

function test_calculate_determinant_of_2x2_matrix() {
  // Calculate determinant of a 2x2 matrix
  
  const m = matrix(2, 2)
  
  m.putAll([1,5,  //  | a, b |
           -3,2]) //  | c, d |
  
  // d = ad - bc = 1*2 - 5*(-3) = 17
    
  return m.determinant() === 17
}

function test_submatrix_function() {
  // A submatrix is what is left after removing a given row and column.
  // The submatrix of a 4x4 matrix is a 3x3 matrix.
  // -6 1  1 6      -6  1 6
  // -8 5  8 6  ==> -8  8 6
  // -1 0  8 2      -7 -1 1
  // -7 1 -1 1
  // The submatrix of a 3x3 matrix is a 2x2 matrix.
  
  let sm3_equals_m4c = false
  let sm2_equals_m3c = false
  
  try {
    // 4x4 ==> 3x3
    const m4 = matrix(4, 4)
    m4.putAll([-6,1,1,6,-8,5,8,6,-1,0,8,2,-7,1,-1,1])
    
    //log("error", m4.d)
    //log("error", m4.submatrix(2,1))
    //log("error", m4.submatrix(1,2))
    
    // The expected result:
    const m4c = matrix(3, 3)
    m4c.putAll([-6,1,6,-8,8,6,-7,-1,1])

    const sm3 = matrix(3, 3)
    sm3.putAll(m4.submatrix(2,1)) // From m4, remove row 2 and column 1


    sm3_equals_m4c = sm3.equals(m4c)
    
    // 3x3 ==> 2x2
    const m3 = matrix(3, 3)
    m3.putAll([1,5,0,-3,2,7,0,6,-3])

    // The expected result:
    const m3c = matrix(2, 2)
    m3c.putAll([-3,2,0,6])

    const sm2 = matrix(2, 2)
    sm2.putAll(m3.submatrix(0, 2))
    sm2_equals_m3c = sm2.equals(m3c)
    //log("error", sm2.d)
    //log("error", m3c.d)
  } catch (error) {
    log("error", "Catch: " + error)
  }
  
  return sm3_equals_m4c 
      //&& sm2_equals_m3c
}

function test_minor_function() {
  //Explained: The minor of an element at row i and column j is the determinant of the submatrix at (i, j).
  
  const i = 1
  const j = 0
  const m3 = matrix(3, 3)
  m3.putAll([3,5,0,2,-1,-7,6,-1,5])
  
  const m2 = matrix(2, 2)
  m2.putAll(m3.submatrix(i, j))
  
  const d = m2.determinant() // [[5,0],[-1,5]]
  
  const min = m3.minor(i, j)
  
  //log("error", `d: ${d}, minor: ${min}`)
  
  return (d === min)
}

function test_cofactor_function() {
  //The cofactor is a possible negation of the minor, depending on which row/col its at.
  //The following figure is helpful:
  // | + - + |
  // | - + - |
  // | + - + |
  // Also, doing a "negate if row + col is odd number" should work.
  
  const m3 = matrix(3, 3)
  m3.putAll([3,5,0,2,-1,-7,6,-1,5])
  
  const coughs = matrix(3,3)
  const mins = matrix(3,3)
  
  // Test every single cofactor
  for (let r=0; r < m3.rows; r++) {
    for (let c=0; c < m3.cols; c++) {
      mins.put(r, c, m3.minor(r, c))
      coughs.put(r,c, m3.cofactor(r, c))
    }
  }
  
  const expected_cofactors = matrix(3, 3)
  expected_cofactors.putAll([-12,-52,4,-25,15,33,-35,21,-13])
  
  //log("error", "expected_cofactors\n" + expected_cofactors.d)
  //log("error", "coughs\n" + coughs.d)
  //log("error", "minors\n" + mins.d)
  
  const min1 = m3.minor(0, 0) // = -12
  const cof1 = m3.cofactor(0, 0) //= -12
  
  const min2 = m3.minor(1, 0) // = 25
  const cof2 = m3.cofactor(1, 0) //= -25
  
  //log("error", `${min1} === ${cof1}, ${min2} === ${-cof2}`)
  
  return min1 === cof1
      && min2 === -cof2 
      && coughs.equals(expected_cofactors)
}

function test_calculate_determinant_of_3x3_matrix() {
  // Determining determinants of larger matrices
  // 
  
  const m = matrix(3, 3)
  m.putAll([1,2,6,-5,8,-4,2,6,4])
  
  cof1 = m.cofactor(0, 0) // = 56
  cof2 = m.cofactor(0, 1) // = 12
  cof3 = m.cofactor(0, 2) // = -46
  d1 = m.determinant() // = -196
  
  //log("error", "cofactor (0,0) = " + cof1)
  //log("error", "cofactor (0,1) = " + cof2)
  //log("error", "cofactor (0,2) = " + cof3)
  //log("error", "determinant of m = " + d1)
  
  return m.cofactor(0, 0) === 56
      && m.cofactor(0, 1) === 12
      && m.cofactor(0, 2) === -46
      && m.determinant() === -196
}

function test_is_matrix_invertible() {
  // We need to be able to detect if a matrix is invertible.
  // If the determinant is 0, the matrix is not invertible.
  
  const m1 = matrix(4, 4)
  
  // Invertible matrix
  m1.putAll([6,4,4,4,5,5,7,6,4,-9,3,-7,9,1,7,-6])
  
  const detm1 = m1.determinant() // -2120
  
  const m2 = matrix(4, 4)
  
  // Non-invertible matrix
  m2.putAll([-4,2,-2,-3,9,6,2,6,0,-5,1,-5,0,0,0,0])
  
  const detm2 = m2.determinant() // 0
  
  //log("error", detm1)
  //log("error", detm2)
  
  return (detm1 === -2120 && detm2 === 0)
}

function test_inverse_matrix_function() {
  // Test inverting a matrix.
  
  const m = matrix(4, 4)
  m.putAll([-5,2,6,-8,1,-5,1,8,7,7,-6,-7,1,-3,7,4])
  
  const im = m.inverse()
  const det = m.determinant() // = 532
  const cof1 = m.cofactor(2, 3) // = -160
  const e1 = im.get(3,2) // = -160/532 
  //log("error", e1 + " equals -160/532=" + -160/532)
  const cof2 = m.cofactor(3, 2) // 105
  const e2 = im.get(2,3) // = 105/532 ???
  //log("error", e2 + " equals 105/532=" + 105/532)
  
  const expected_inverse = matrix(4,4)
  expected_inverse.putAll([0.21805,0.45113,0.24060,-0.04511,
    -0.80827,-1.45677,-0.44361,0.52068,
    -0.07895,-0.22368,-0.05263,0.19737,
    -0.52256,-0.81391,-0.30075,0.30639
  ])
  
  const is_inverse = im.equals(expected_inverse)
      
  return is_inverse 
      && equal(cof1, -160) 
      && equal(cof2, 105) 
      && equal(e1, -160/532) 
      && equal(e2, 105/532)
}

function test_inverse_matrix_function_2() {
  // Test inverting another couple of matrices for good measure.
  
  const m1 = matrix(4, 4)
  m1.putAll([8,-5,9,2,7,5,6,1,-6,0,9,6,-3,0,-9,-4])
  const m2 = matrix(4, 4)
  m2.putAll([9,3,0,9,-5,-2,-6,-3,-4,9,6,4,-7,6,6,2])
  
  // Expected result of inverse(m1):
  const exp_m1i = matrix(4, 4)
  exp_m1i.putAll([-0.15385,-0.15385,-0.28205,-0.53846,
    -0.07692,0.12308,0.02564,0.03077,
    0.35897,0.35897,0.43590,0.92308,
    -0.69231,-0.69231,-0.76923,-1.92308]
  )
  
  const exp_m2i = matrix(4, 4)
  exp_m2i.putAll([-0.04074,-0.07778,0.14444,-0.22222,
    -0.07778,0.03333,0.36667,-0.33333,
    -0.02901,-0.14630,-0.10926,0.12963,
    0.17778,0.06667,-0.26667,0.33333]
  )
  
  const m1i = m1.inverse()
  const m2i = m2.inverse()
  
  //log("error", m2i.join("\n"))
  
  return m1i.equals(exp_m1i) 
      && m2i.equals(exp_m2i)
}

function test_multiply_by_inverse() {
  // Test that it is indeed possible to 
  // multiply matrix A by matrix B to produce matrix C
  // and then multiplying C by the inverse of B to get A again!
  
  const ma = matrix(4, 4)
  ma.putAll([3,-9,7,3,3,-8,2,-9,-4,4,4,1,-6,5,-1,1])
  
  const mb = matrix(4, 4)
  mb.putAll([8,2,2,2,3,-1,7,0,7,0,5,4,6,-2,0,5])
  
  const mc = ma.times_matrix(mb)
  
  return ma.equals(mc.times_matrix(mb.inverse()))
}

function test_translation_function() {
  //Test translation(x, y, z) workhorse.
  
  const t = translation(5, -3, 2)
  
  // Test 1: Multiplying by a translation matrix
  const p1 = point(-3, 4, 5)
  const result1 = t.times_tuple(p1) // = tuple(2, 1, 7, 1)
  
  
  // Test 2: Multiplying by the inverse of a translation matrix
  const inv2 = t.inverse()
  const p2 = point(-3, 4, 5)
  const result2 = inv2.times_tuple(p2) // = tuple()

  // Translation does not affect vectors
  const v3 = vector(-3, 4, 5)
  const result3 = t.times_tuple(v3)
  

  //log("error", result1.toString())
  //log("error", result2.toString())
  //log("error", result3.toString())
  
  return result1.equals(point(2, 1, 7)) 
      && result2.equals(point(-8, 7, 3)) 
      && result3.equals(vector(-3, 4, 5))
  
}

function test_scaling_function() {
  // Test scaling(x, y, z) function
  
  const t = scaling(2, 3, 4)
  const v = vector(-4, 6, 8)
  
  // 1. A scaling matrix applied to a point
  const p1 = point(-4, 6, 8)
  const r1 = t.times_tuple(p1)
  
  // 2. A scaling matrix applied to a vector
  const r2 = t.times_tuple(v)
  
  // 3. Multiplying by the inverse of a scaling matrix
  const inv3 = t.inverse()
  const r3 = inv3.times_tuple(v)
  
  // 4. Reflection is scaling by a negative value
  const t4 = scaling(-1, 1, 1)
  const p4 = point(2, 3, 4)
  const r4 = t4.times_tuple(p4)
  
  return r1.equals(point(-8, 18, 32))
      && r2.equals(vector(-8, 18, 32))
      && r3.equals(vector(-2, 2, 2))
      && r4.equals(point(-2, 3, 4))
}

function test_angle_function() {
  // The angle function converts between degrees and radians and vice versa.
  
  //log("error", angle(Math.PI/2).deg())
  
  return angle(360).rad() === 2 * Math.PI 
      && angle(Math.PI/2).deg() === 90 
}

function test_rotation_x_function() {
  // Test rotating a tuple around the x axis
  
  const p = point(0, 1, 0)
  
  // Rotate point a half quarter around the x-axis
  const half_quarter = rotation_x( Math.PI / 4)
  
  // Rotate point a full quarter around the x-axis
  const full_quarter = rotation_x( Math.PI / 2)
  
  const rotate_p_half_quarter = half_quarter.times_tuple(p)
  const rotate_p_full_quarter = full_quarter.times_tuple(p)
  
  // Test that the inverse of an x-rotation rotates in the opposite direction
  const inv = half_quarter.inverse()
  const rotate_p_negative_half_quarter = inv.times_tuple(p)
  
  return rotate_p_half_quarter.equals(point(0, Math.sqrt(2)/2, Math.sqrt(2)/2))
      && rotate_p_full_quarter.equals(point(0, 0, 1))
      && rotate_p_negative_half_quarter.equals(point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2))
}

function test_rotation_y_function() {
  // Test rotating a tuple around the y axis
  
  const p = point(0, 0, 1)
  
  // Rotate point a half quarter around the y-axis
  const half_quarter = rotation_y( Math.PI / 4)
  
  // Rotate point a full quarter around the y-axis
  const full_quarter = rotation_y( Math.PI / 2)
  
  const rotate_p_half_quarter = half_quarter.times_tuple(p)
  const rotate_p_full_quarter = full_quarter.times_tuple(p)
  
  return rotate_p_half_quarter.equals(point(Math.sqrt(2)/2, 0, Math.sqrt(2)/2))
      && rotate_p_full_quarter.equals(point(1, 0, 0))
}

function test_rotation_z_function() {
  // Test rotating a tuple around the z axis
  
  const p = point(0, 1, 0)
  
  // Rotate point a half quarter around the z-axis
  const half_quarter = rotation_z( Math.PI / 4)
  
  // Rotate point a full quarter around the z-axis
  const full_quarter = rotation_z( Math.PI / 2)
  
  const rotate_p_half_quarter = half_quarter.times_tuple(p)
  const rotate_p_full_quarter = full_quarter.times_tuple(p)
  
  return rotate_p_half_quarter.equals(point( -Math.sqrt(2)/2, Math.sqrt(2)/2, 0))
      && rotate_p_full_quarter.equals(point(-1, 0, 0))
}

function test_shearing_function() {
  //Test applying shearing to a point
  // shearing applies like this
  // x in proportion to y
  // x in proportion to z
  // y in proportion to x
  // y in proportion to z
  // z in proportion to x
  // z in proportion to y
  // and is given like this shearing(xy, xz, yx, yz, zx, zy)
  
  const p = point(2, 3, 4)
  
  // 1. A shearing transformation moves x in proportion to y
  const t1 = shearing(1, 0, 0, 0, 0, 0)
  
  const r1 = t1.times_tuple(p)
  
  // 2. A shearing transformation moves x in proportion to z
  const t2 = shearing(0, 1, 0, 0, 0, 0)
  const r2 = t2.times_tuple(p)
  
  // 3. A shearing transformation moves y in proportion to x
  const t3 = shearing(0, 0, 1, 0, 0, 0)
  const r3 = t3.times_tuple(p)
  
  // 4. A shearing transformation moves y in proportion to z
  const t4 = shearing(0, 0, 0, 1, 0, 0)
  const r4 = t4.times_tuple(p)
  
  // 5. A shearing transformation moves z in proportion to x
  const t5 = shearing(0, 0, 0, 0, 1, 0)
  const r5 = t5.times_tuple(p)
  
  // 6. A shearing transformation moves z in proportion to y
  const t6 = shearing(0, 0, 0, 0, 0, 1)
  const r6 = t6.times_tuple(p)
  
  return r1.equals(point(5, 3, 4))
      && r2.equals(point(6, 3, 4))
      && r3.equals(point(2, 5, 4))
      && r4.equals(point(2, 7, 4))
      && r5.equals(point(2, 3, 6))
      && r6.equals(point(2, 3, 7))
}

function test_chained_transformations() {
  // Test chaining multiple transformations
  
  // Objects to transform
  let p = point(1, 0, 1)
    
  // Transformations to apply
  const rx = rotation_x(Math.PI / 2)
  const rz = rotation_z(Math.PI / 2)
  const ry = rotation_y(Math.PI / 2)
  const sc = scaling(5, 5, 5)
  const tr = translation(10, 5, 7)
  
  // Transformations one by one:
  // Apply rotation first
  const p1 = rx.times_tuple(p)
  const r1 = p1.equals(point(1, -1, 0))
  //log("error", `Rotated matrix: ${p1}`)
  
  // Then apply scaling
  const p2 = sc.times_tuple(p1)
  const r2 = p2.equals(point(5, -5, 0))
  //log("error", `Rotated and scaled: ${p2}`)
  
  // Then apply translation
  const p3 = tr.times_tuple(p2)
  const r3 = p3.equals(point(15, 0, 7))
  //log("error", `Rotated and scaled and translated: ${p3}`)
  
  // These transformations should be applied in reverse order; tr, sc, rx
  const chained  = tr
  const chained1 = chained.times_matrix(sc)
  const chained2 = chained1.times_matrix(rx)
  const chained3 = chained2.times_matrix(rz)
  const chained4 = chained3.times_matrix(ry)
  //log("error", `Transformations tr sc rx rz ry: ${chained1.d}`)
  
  const one_op = tr.times_matrix(sc.times_matrix(rx.times_matrix(rz.times_matrix(ry))))
  
  return r1 
      && r2 
      && r3 
      && chained4.equals(one_op)

}

function test_apply_individual_transformations() {
  // Test applying individual transformations
  
  const p1 = point(1, 0, 1)
  const rx = rotation_x(Math.PI / 2)
  const s = scaling(5, 5, 5)
  const t = translation(10, 5, 7)
  
  // Apply rotation first
  const p2 = rx.times_tuple(p1)
  const r1 = p2.equals(point(1, -1, 0))
  //log("error", `Rotated matrix: ${p2}`)
  // Then apply scaling
  const p3 = s.times_tuple(p2)
  const r2 = p3.equals(point(5, -5, 0))
  //log("error", `Rotated and scaled: ${p3}`)
  // Then apply translation
  const p4 = t.times_tuple(p3)
  //log("error", `Rotated and scaled and translated: ${p4}`)
  
  return r1 
      && r2 
      && p4.equals(point(15, 0, 7))
}

// *** RAY TESTS

function test_creating_ray_function() {
  // Test creating and querying a ray
  
  const origin = point(1, 2, 3)
  const direction = vector(4, 5, 6)
  
  const r = ray(origin, direction)
    
  return r.origin.isPoint() 
      && r.origin.equals(origin)
      && r.direction.isVector()
      && r.direction.equals(direction)
}

function test_position_function() {
  // Test position function
  // Position takes a ray and a number t, which is the distance from the ray's
  // origin
  
  // Computing a point from a distance
  
  const r = ray(point(2, 3, 4), vector(1, 0, 0))
  
  const p1 = position(r, 0) // = point(2, 3, 4)
  const p2 = position(r, 1) // = point(3, 3, 4)
  const p3 = position(r, -1) // = point(1, 3, 4)
  const p4 = position(r, 2.5) // = point(4.5, 3, 4)

  return p1.equals(point(2, 3, 4))
      && p2.equals(point(3, 3, 4))
      && p3.equals(point(1, 3, 4))
      && p4.equals(point(4.5, 3, 4))
}

function test_sphere_function() {
  // The sphere() function should return a unique value for every invocation, as the sphere's id.
  
  const spheres = []
  const n = 100
  
  // Create a lot of spheres and store their ids in the array
  for (let i=0; i < n; i++) {
    const s = sphere()
    //log("error", s.id)
    spheres.push(s.id)
  }
  
  // Create a new Set of values from sphere ids. A Set can only contain unique values
  let unique = [...new Set(spheres)]
  return spheres.length === n && spheres.length === unique.length
}

function test_intersect_sets_the_object_on_the_intersection() {
  // Make sure the intersect functions sets the actual object on the intersection, not just the t values.
  
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = sphere()
  
  const xs = s.intersect(r)
  return xs.length === 2 && xs[0].object === s && xs[1].object === s
}

function test_ray_intersects_sphere_at_two_points() {
  // The intersect function returns all points where a ray intersects a shape, in this case a sphere.
  
  // A ray intersects a sphere at two points
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = sphere()
  
  const xs = s.intersect(r)
  
  return xs.length === 2 && xs[0].t === 4.0 && xs[1].t === 6.0
}

function test_ray_intersects_sphere_at_tangent() {
  // The intersect function returns all points where a ray intersects a shape, in this case a sphere.
  
  // A ray intersects a sphere at a tangent
  const r = ray(point(0, 1, -5), vector(0, 0, 1))
  const s = sphere()
  
  const xs = s.intersect(r)
  
  return xs.length === 2 && xs[0].t === 5.0 && xs[1].t === 5.0
}

function test_ray_misses_a_sphere() {
  // The intersect function returns all points where a ray intersects a shape, in this case a sphere.
  
  // A ray intersects a sphere at a tangent
  const r = ray(point(0, 2, -5), vector(0, 0, 1))
  const s = sphere()
  
  const xs = s.intersect(r)
  
  return xs.length === 0
}

function test_ray_originates_inside_a_sphere() {
  // The intersect function returns all points where a ray intersects a shape, in this case a sphere.
  // This is an edge case where the ray originates inside the sphere. In this case too, 
  // it should return both intersections, in front of as well as behind the rays origin.
  
  // A ray originates inside a sphere
  const r = ray(point(0, 0, 0), vector(0, 0, 1))
  const s = sphere()
  
  const xs = s.intersect(r)
  
  return xs.length === 2 && xs[0].t === -1.0 && xs[1].t === 1.0
}

function test_sphere_is_behind_a_ray() {
  // The intersect function returns all points where a ray intersects a shape, in this case a sphere.
  // This is an edge case where the sphere is behind the ray. In this case too,
  // it should return both intersections, both with negative values (behind) the rays origin.
  
  // A sphere is behind the ray
  const r = ray(point(0, 0, 5), vector(0, 0, 1))
  const s = sphere()
  
  const xs = s.intersect(r)
  
  return xs.length === 2 && xs[0].t === -6.0 && xs[1].t === -4.0
}

function test_intersection_function() {
  // Test the intersection function
  // An intersection encapsulates t and object
  
  const s = sphere()
  const i = intersection(3.5, s)
  
  return i.t === 3.5 && i.object.id === s.id

}

function test_intersections_function() {
  // Test intersections function. Aggregates intersections
  
  const _intersections = []
  
  const s1 = sphere()
  const s2 = sphere()
  const s3 = sphere()
  const i1 = intersection(1, s1)
  const i2 = intersection(2, s2)
  const i3 = intersection(3, s3)
  
  _intersections.push(i1)
  _intersections.push(i2)
  
  // Techniques for concatenating arrays
  // intersections = [...intersections, i1, i3]
  // intersections = intersections.concat([i1, i3])
  
  //log("error", _intersections[0].t )
  //log("error", _intersections[0].object.id )
  for (const i in _intersections) { 
    //log("error", _intersections[i].object.id)
  }

  return _intersections[0].object === s1 
      && _intersections[1].object === s2
}

function test_hit_function() {
  // Test the hit function, which returns the lowest non-negative value of
  // intersection objects from a list of intersections
  
  const s = sphere()

  // The hit, when all intersections have a positive t  
  const i1 = intersection(1, s)
  const i2 = intersection(2, s)
  const xs1 = intersections(i2, i1) // Note backwards sorting
  const h1 = hit(xs1)
  
  // The hit, when some intersections have negative t
  const i3 = intersection(-1, s)
  const i4 = intersection(1, s)
  const xs2 = intersections(i4, i3) // Note backwards sorting
  const h2 = hit(xs2)
  
  // The hit, when all intersections have negative t
  const i5 = intersection(-2, s)
  const i6 = intersection(-1, s)
  const xs3 = intersections(i6, i5) // Note backwards sorting
  const h3 = hit(xs3)
  
  // The hit is always the lowest nonnegative intersection
  const i7 = intersection(5, s)
  const i8 = intersection(7, s)
  const i9 = intersection(-3, s)
  const i10 = intersection(2, s)
  const xs4 = intersections(i7, i8, i9, i10)
  const h4 = hit(xs4)
  
  return h1[0] === i1
      && h2[0] === i4 
      && !h3[0] // h3: there are no intersections, returns "undefined", which equals "false"
      && h4[0] === i10 
}

function test_transform_function() {
  // Test transform function.
  // Transform takes a ray and applies a transformation matrix.
  
  // Translating a ray
  const r = ray(point(1, 2, 3), vector(0, 1, 0))
  const m = translation(3, 4, 5)
  const r2 = r.transform(m)
  
  // Scaling a ray
  const r3 = ray(point(1, 2, 3), vector(0, 1, 0))
  const m2 = scaling(2, 3, 4)
  const r4 = r3.transform(m2)
  
  return r2.origin.equals(point(4, 6, 8)) 
      && r2.direction.equals(vector(0, 1, 0))
      && r4.origin.equals(point(2, 6, 12)) 
      && r4.direction.equals(vector(0, 3, 0))
}

function test_transform_sphere() {
  // This tests that we 
  //   * can allow transformation to be applied to a sphere
  //   * that the sphere has a default transformation
  //   * that its transformation can be assigned
  
  const s = sphere()
  
  
  // Transformations to apply
  const tr = translation(2, 3, 4)
  const sc = scaling(2, 2, 2)
  const rx = rotation_x(Math.PI / 2)
  const ry = rotation_y(Math.PI / 2)
  const rz = rotation_z(Math.PI / 2)
  
  // A sphere's default transformation
  const default_transform_equals_idmatrix = s.transform.equals(idmatrix())
  
  // Changing a sphere's transformation
  //log("error", s.transform.d)
  //log("error", tr.d)
  s.transform = tr
  
  //log("error", s.transform.d)
  const new_transform_is_set = s.transform.equals(tr)
  //log("error", new_transform_is_set)
  //log("error", s.toString)
    
  // Intersecting a scaled sphere with a ray
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s2 = sphere()
  s2.transform = sc
  
  const xs = s2.intersect(r)
  const test_intersecting_scaled_sphere_with_ray = xs.length === 2 && xs[0].t === 3 && xs[1].t === 7
  
  //log("error", "test_transform_sphere() " + s2.transform.d)
  //log("error", "xs.length: " + xs.length)
  //log("error", "xs[0].t: " + xs[0].t)
  //log("error", "xs[1].t: " + xs[1].t)
  
  // Test transformations function on a sphere
  const s3 = sphere()
  const s4 = sphere()
  
  // Add chained transformations to s3
  const t1 = tr.times_matrix(sc.times_matrix(rz))
  s3.transform = t1
  
  // Manually add transformations to s4
  const chained = tr.times_matrix(sc.times_matrix(rz))

  s4.transform = chained
  
  const transformations_applied_to_sphere = s3.transform.equals(s4.transform)
    
  return default_transform_equals_idmatrix 
    && new_transform_is_set 
    && test_intersecting_scaled_sphere_with_ray 
    && transformations_applied_to_sphere
}

// *** SHADING TESTS

function test_normal_at_function() {
  // Compute the normal on a shape at a point...
  
  const s = sphere()
  const sq3 = Math.sqrt(3)
  
  // ...on the x axis
  const nx = s.normalAt(point(1, 0, 0))
  const rx = nx.equals(vector(1, 0, 0))
  
  // ...on the y axis
  const ny = s.normalAt(point(0, 1, 0))
  const ry = ny.equals(vector(0, 1, 0))
  
  // ...on the z axis
  const nz = s.normalAt(point(0, 0, 1))
  const rz = nz.equals(vector(0, 0, 1))
  
  // ...on a nonaxial point
  const nn = s.normalAt(point(sq3/3, sq3/3, sq3/3))
  const rn = nn.equals(vector(sq3/3, sq3/3, sq3/3))
  
  // Test that the normal is a normalized vector
  const rm = nn.equals(nn.normalize())
  
  return rx && ry && rz && rn && rm
}

function test_normal_on_transformed_sphere() {
  // Test computing the normal on a translated sphere
  const s1 = sphere()
  
  s1.transform = translation(0, 1, 0)
  const n1 = s1.normalAt(point(0, 1.70711, -0.70711))
  const v1 = vector(0, 0.70711, -0.70711)
  
  // Test computing the normal on a transformed sphere
  const s2 = sphere()
  
  const transforms = scaling(1, 0.5, 1).times_matrix(rotation_z(Math.PI/5))
  
  s2.transform = transforms
  const n2 = s2.normalAt(point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2))
  const v2 = vector(0, 0.97014, -0.24254)

  return n1.equals(v1) && n2.equals(v2)
}

function test_reflect_function() {
  // Test reflecting a vector approaching at 45°
  
  const v1 = vector(1, -1, 0)
  
  const n1 = vector(0, 1, 0)
  const r1 = reflect(v1, n1)
  
  // Test reflecting a vector off a slanted surface
  const sqr2 = Math.sqrt(2)
  
  const v2 = vector(0, -1, 0)
  const n2 = vector(sqr2/2, sqr2/2, 0)
  const r2 = reflect(v2, n2)
  
  return r1.equals(vector(1, 1, 0)) 
      && r2.equals(vector(1, 0, 0))
}

function test_point_light_function() {
  // Test that a point light has a position and intensity
  
  const intensity = color(1, 1, 1)
  const position = point(0, 0, 0)
  
  const light = point_light(point(0, 0, 0), color(1, 1, 1))
  
  
  return position.equals(light.position)
      && intensity.equals(light.intensity)
}

function test_material_function() {
  // Test the default material
  
  // Create a default material
  const m = material()
  
  return m.color.equals(color(1, 1, 1))
      && m.ambient   === 0.1
      && m.diffuse   === 0.9
      && m.specular  === 0.9
      && m.shininess === 200
}

function test_sphere_has_material() {
  // Tests that a sphere object now has a material property
  
  // Create a sphere and a material
  const s = sphere()
  const m = material()
  
  // Test that sphere has default material
  const sphere_has_default_material = s.material.ambient === m.ambient 
                                   && s.material.shininess === 200
                                   && s.material.specular === 0.9
  
  // Create another material
  const m2 = material()
  
  // Change its attributes
  m2.shininess = 111.22
  m2.specular = 0.01
  m2.ambient = 1.1
  
  // Assign the new material to the sphere
  s.material = m2

  // Test that the sphere will have the new material with correct values
  const sphere_can_be_assigned_a_material = s.material.shininess === 111.22 
                                         && s.material.specular === 0.01
                                         && s.material.ambient === 1.1

  return sphere_has_default_material
      && sphere_can_be_assigned_a_material
}

function test_lighting_function() {
  // Test that the lighting() function can shade objects correctly
  
  const s = sphere()
  const m = material()
  const position = point(0, 0, 0)
  const in_shadow = true
  
  // Lighting with the eye between the light and the surface
  const eyev1    = vector(0, 0, -1)
  const normalv1 = vector(0, 0, -1)
  const light1   = point_light(point(0, 0, -10), color(1, 1, 1))
  const r1       = lighting(m, s, light1, position, eyev1, normalv1, !in_shadow)
  
  // Lighting with the eye between light and surface, eye offset 45°
  const eyev2    = vector(0, Math.sqrt(2)/2, -Math.sqrt(2)/2)
  const normalv2 = vector(0, 0, -1)
  const light2   = point_light(point(0, 0, -10), color(1, 1, 1))
  const r2       = lighting(m, s, light2, position, eyev2, normalv2, !in_shadow)
  
  // Lighting with eye opposite surface, light offset 45°
  const eyev3    = vector(0, 0, -1)
  const normalv3 = vector(0, 0, -1)
  const light3   = point_light(point(0, 10, -10), color(1, 1, 1))
  const r3       = lighting(m, s, light3, position, eyev3, normalv3, !in_shadow)
  
  // Lighting with eye in the path of the reflection vector
  const eyev4    = vector(0, -Math.sqrt(2)/2, -Math.sqrt(2)/2)
  const normalv4 = vector(0, 0, -1)
  const light4   = point_light(point(0, 10, -10), color(1, 1, 1))
  const r4       = lighting(m, s, light4, position, eyev4, normalv4, !in_shadow)
    
  // Lighting with the light behind the surface
  const eyev5    = vector(0, 0, -1)
  const normalv5 = vector(0, 0, -1)
  const light5   = point_light(point(0, 0, 10), color(1, 1, 1))
  const r5       = lighting(m, s, light5, position, eyev5, normalv5, !in_shadow)
  
  // Lighting with the surface in shadow, added 12.06.24
  const eyev6      = vector(0, 0, -1)
  const normalv6   = vector(0, 0, -1)
  const light6     = point_light(point(0, 0, -10), color(1, 1, 1))
  const r6         = lighting(m, s, light6, position, eyev6, normalv6, in_shadow)
  
  
  // When lighting function negates lightv, specular dot disappears. When we don't negate, it works, but then this
  // test fails. Documenting this here for now, and allowing test to fail.
  // 11.06.24: Solved when discovering a bug in the hit() function.
  
  return r1.equals(color(1.9, 1.9, 1.9)) // Should be 1.9, 1.9, 1.9, is 1.0, 1.0, 1.0
      && r2.equals(color(1.0, 1.0, 1.0))
      && r3.equals(color(0.7364, 0.7364, 0.7364))
      && r4.equals(color(1.6364, 1.6364, 1.6364)) // Should be 1.6364, 1.6364, 1.6364, is red: 0.73639, 0.73639, 0.73639
      && r5.equals(color(0.1, 0.1, 0.1))
      && r6.equals(color(0.1, 0.1, 0.1)) // In shadow, only ambient light affects
}

// *** SCENE TESTS

function test_world_function() {
  // Creating a world object
  // A world that contains no objects.
  
  const w = world()
  
  return w.objects.length === 0 && w.lights.length === 0
}

function test_create_default_world_function() {
  // A default world contains to concentric spheres, where the outermost is a unit sphere and the innermost has a radius of 0.5.
  // Both lie at the origin.
  
  const light = point_light(point(-10, 10, -10), color(1, 1, 1))
  const s1 = sphere()
  const m1 = material()
  m1.color = color(0.8, 1.0, 0.6)
  m1.diffuse = 0.7
  m1.specular = 0.2
  
  const s2 = sphere()
  s2.transform = scaling(0.5, 0.5, 0.5)
  
  const w = default_world()
  
  return w.has(light)
      && w.has(s1)
      && w.has(s2)
}

function test_intersect_world_function() {
  // Test intersecting a world with a ray
  
  const w = default_world()
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const xs = intersect_world(w, r)
  
  //log("error", xs.length)
  //log("error", xs[0].t)
  //log("error", xs[1].t)
  //log("error", xs[2].t)
  //log("error", xs[3].t)
  
  return xs.length === 4 
      && xs[0].t === 4 
      && xs[1].t === 4.5 
      && xs[2].t === 5.5 
      && xs[3].t === 6
}

function test_prepare_computations_function() {
  // Test precomputing the state of an intersection
  
  const r1 = ray(point(0, 0, -5), vector(0, 0, 1))
  const s1 = sphere()
  const i1 = intersection(4, s1)
  
  const comps1 = prepare_computations(i1, r1)
  //log("error", " comps.t: " + comps.t)
  //log("error", " comps.eyev: " + comps.eyev)
  //log("error", " comps: " + comps.toString())
  const res1 = comps1.t === i1.t
            && comps1.object.equals(i1.object)
            && comps1.point.equals(point(0, 0, -1))
            && comps1.eyev.equals(vector(0, 0, -1))
            && comps1.normalv.equals(vector(0, 0, -1))
  
  // Testing over_point calculation
  // The hit should offset the point
  const r2 = ray(point(0, 0, -5), vector(0, 0, 1))
  const s2 = sphere()
  s2.transform = translation(0, 0, 1)
  const i2 = intersection(5, s2)
  const comps2 = prepare_computations(i2, r2)
  const res2 = comps2.over_point.z < (-C.EPSILON/2) 
            && comps2.point.z > comps2.over_point.z
            
  return res1 && res2
}

function test_hit_inside_object() {
  // Test hit when an intersection occurs on the outside
  
  const r1 = ray(point(0, 0, -5), vector(0, 0, 1))
  const s1 = sphere()
  const i1 = intersection(4, s1)
  const comps1 = prepare_computations(i1, r1)
  
  // Test hit when an intersection occurs on the inside
  const r2 = ray(point(0, 0, 0), vector(0, 0, 1))
  const s2 = sphere()
  const i2 = intersection(1, s2)
  const comps2 = prepare_computations(i2, r2)

  const res2 = comps2.point.equals(point(0, 0, 1)) 
            && comps2.eyev.equals(vector(0, 0, -1))
            && comps2.inside
            && comps2.normalv.equals(vector(0, 0, -1)) // Would have been 0, 0, 1, but it's inverted!
  
  return !comps1.inside && res2
}

function test_shade_hit_function() {
  // Test to make sure shading is done correctly both inside and outside an object
  
  // Test shading an intersection
  const w = default_world()
  
  // Test shading an intersection
  const r1 = ray(point(0, 0, -5), vector(0, 0, 1))
  const s1 = w.objects[0]
  const i1 = intersection(4, s1)
  const comps1 = prepare_computations(i1, r1)
  const c1 = shade_hit(w, comps1)
  const res1 = c1.equals(color(0.38066, 0.47583, 0.2855))
  
  // Test shading an intersection from the inside
  w.lights[0] = point_light(point(0, 0.25, 0), color(1, 1, 1))
  const r2 = ray(point(0, 0, 0), vector(0, 0, 1))
  const s2 = w.objects[1]
  const i2 = intersection(0.5, s2)
  const comps2 = prepare_computations(i2, r2)
  const c2 = shade_hit(w, comps2)
  //log("error", c2)
  // Something is off here. If I set the light's color values at 9.0498 (10x the expected output)
  // the test passes. But following instructions, output is at 0.1, almost complete darkness.
  // The above test works fine, but that's on the outside of the object.
  // No, the anomaly in the lighting() function doesn't affect this, I tried.
  // According to the books errata, others have also gotten other values here. 
  // Someone made it come together by loosening the EPSILON value. But not by 10x!! :D
  // I can't figure it out, and so I move on...
  // 11.06.24: This was fixed when I sorted out the sorting order in hit()
  const res2 = c2.equals(color(0.90498, 0.90498, 0.90498))
  
  // shade_hit() is given an intersection in shadow
  const w3 = world()
  w3.addLight(point_light(point(0, 0, -10), color(1, 1, 1)))
  const s3 = sphere()
  w3.addObject(s3)
  const s4 = sphere()
  s4.transform = translation(0, 0, 10)
  w3.addObject(s4)
  const r3 = ray(point(0, 0, 5), vector(0, 0, 1))
  const i3 = intersection(4, s4)
  const comps3 = prepare_computations(i3, r3)
  const c3 = shade_hit(w3, comps3)
  const res3 = c3.equals(color(0.1, 0.1, 0.1))
  
  return res1 && res2 && res3
}

function test_color_at_function() {
  // Test that the color_at function gives the correct color when applied to a default world
  
  const w = default_world()
  
  // First, when ray misses
  const r1 = ray(point(0, 0, -5), vector(0, 1, 0))
  const c1 = color_at(w, r1)
  
  // The color when a ray hits
  const r2 = ray(point(0, 0, -5), vector(0, 0, 1))
  const c2 = color_at(w, r2)
  
  // The color with an intersection behind the ray
  w.objects[0].material.ambient = 1.0
  const outer = w.objects[0]
  w.objects[1].material.ambient = 1.0
  const inner = w.objects[1]
  
  const r3 = ray(point(0, 0, 0.75), vector(0, 0, -1))
  const c3 = color_at(w, r3)
  //log("error", c3)
  //log("error", inner.material.color)
  
  //log("error", c2)
  return c1.equals(color(0, 0, 0)) 
      && c2.equals(color(0.38066, 0.47583, 0.2855))
      //&& c3.equals(inner.material.color)
}

function test_view_transform_function() {
  // The view_transformation function orientates "the eye" in the world
  // mimicking the placement of a camera looking in a given direction
  
  const up = vector(0, 1, 0)
  
  // Test transformation matrix for the default orientation
  const from1 = point(0, 0, 0)
  const to1 = point(0, 0, -1)
  const up1 = vector(0, 1, 0)
  const t1 = view_transform(from1, to1, up1)
  
  // A view transformation matrix looking in the positive z direction
  const from2 = point(0, 0, 0)
  const to2 = point(0, 0, 1)
  const up2 = vector(0, 1, 0)
  const t2 = view_transform(from2, to2, up2)
  
  // The view transformation moves the world
  const from3 = point(0, 0, 8)
  const to3 = point(0, 0, 0)
  const up3 = vector(0, 1, 0)
  const t3 = view_transform(from3, to3, up3)
  
  // An arbitrary view transformation
  const from4 = point(1, 3, 2)
  const to4 = point(4, -2, 8)
  const up4 = vector(1, 1, 0)
  const t4 = view_transform(from4, to4, up4)
  const expected_t4 = matrix(4, 4)
  expected_t4.putAll([-0.50709, 0.50709,  0.67612, -2.36643,
                      0.76772, 0.60609,  0.12122, -2.82843,
                     -0.35857, 0.59761, -0.71714,  0.00000,
                      0.00000, 0.00000,  0.00000,  1.00000
                    ])
  
  return t1.equals(idmatrix()) 
      && t2.equals(scaling(-1, 1, -1))
      && t3.equals(translation(0, 0, -8))
      && t4.equals(expected_t4)
}

function test_camera_function() {
  // Test that the virtual camera performs as expected
  
  // Constructing a camera
  const hsize = 160
  const vsize = 120
  const fov = π / 2 // First test of UTF-8 π character as a constant. Sexy! 😍
  
  const c1 = camera(hsize, vsize, fov)
  
  const res = c1.hsize === 160 
           && c1.vsize === 120 
           && c1.fov === π / 2 
           && c1.transform.equals(idmatrix())
  
  // The pixel size for a horizontal canvas
  const c2 = camera(200, 125, π / 2)
  
  // The pixel size for a vertical canvas
  const c3 = camera(125, 200, π / 2)
  
  //log("error", c2.pixel_size)
  //log("error", c3.pixel_size)
  
  return res 
      && equal(c2.pixel_size, 0.01)
      && equal(c3.pixel_size, 0.01)
}

function test_ray_for_pixel_function() {
  // Test creating rays that can pass through any given pixel on the canvas.
  
  // Constructing a ray through the center of the canvas
  const c1 = camera(201, 101, π / 2)
  const r1 = ray_for_pixel(c1, 100, 50)
  const res1 = r1.origin.equals(point(0, 0, 0)) 
           && r1.direction.equals(vector(0, 0, -1))
  
  // Constructing a ray through a corner of the canvas
  const c2 = camera(201, 101, π / 2)
  const r2 = ray_for_pixel(c2, 0, 0)
  const res2 = r2.origin.equals(point(0, 0, 0)) 
            && r2.direction.equals(vector(0.66519, 0.33259, -0.66851))
  
  // Constructing a ray when the camera is transformed
  const c3 = camera(201, 101, π / 2)
  c3.transform = rotation_y(π/4).times_matrix(translation(0, -2, 5))
  const r3 = ray_for_pixel(c3, 100, 50)
  const res3 = r3.origin.equals(point(0, 2, -5)) 
            && r3.direction.equals( vector( Math.sqrt(2)/2, 0, -Math.sqrt(2)/2 ) )
    
  return res1 
      && res2 
      && res3
}

function test_render_function() {
  // Test the render() function. Takes a camera and a world and renders and image
  // by returning it as a canvas.
  
  // *** TELEMETRY
  //tuple = profile(tuple)
  //matrix = profile(matrix)

  // Rendering a world with a camera
  const w = default_world()
  const c = camera(11, 11, π / 2)
  const from = point(0, 0, -5)
  const to = point(0, 0, 0)
  const up = vector(0, 1, 0)
  c.transform = view_transform(from , to, up)
  
  const image = render(c, w)
  //log("error", image.pixel_at(5, 5))
  
  return image.pixel_at(5,5).equals(color(0.38066, 0.47583, 0.2855))
}

function test_is_shadowed_function() {
  // Test shadow_at function. Shadows are computed by casting a ray 
  // from each point of intersection toward the light source. If
  // something intersects that shadow ray, the point is considered
  // to be in shadow, and thus only ambient light applies.
  
  const w = default_world()
  
  // There is no shadow when nothing is colinear with point and light
  const p1 = point(0, 10, 0)
  const res1 = is_shadowed(w, p1)
  
  // Shadow when an object is between the point and the light
  const p2 = point(10, -10, 10)
  const res2 = is_shadowed(w, p2)
  
  // There is no shadow when an object is behind the light
  const p3 = point(-20, 20, -20)
  const res3 = is_shadowed(w, p3)
  
  // There is no shadow when an object is behind the point
  const p4 = point(-2, 2, -2)
  res4 = is_shadowed(w, p4)
  
  return !res1 // should be false
      && res2  // should be true
      && !res3 // should be false
      && !res4 // should be false
}

// *** SHAPE TESTS

function test_test_shape_function() {
  // Not a typo. We need a test_shape() implementation, since the book
  // assumes that our programming languange supports abstract classes.
  // Which it sort of does, I guess...
  
  // The default transformation
  const s = test_shape()
  const res1 = s.transform.equals(idmatrix())
  
  const ts = new TestShape()
  
  // Assigning a transformation
  s.transform = translation(2, 3, 4)
  const res2 = s.transform.equals(translation(2, 3, 4))
  
  // The default material
  res3 = s.material.equals(material())
  
  // Assigning a material
  const m = material()
  m.ambient = 1
  s.material = m
  res4 = s.material.equals(m)
  
  return res1 && res2 && res3 && res4
}

function test_shape_inherited_intersect_function() {
  // Test that the new AbstractShape's abstract intersect-function
  // performs as expected - each concrete implementation class
  // should have its own "private" intersect method, and should get the
  // inversed transformation-matrix from the concrete inherited
  // .intersect(ray) method.
  
  // Intersecting a scaled shape with a ray
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const s = test_shape()
  s.transform = scaling(2, 2, 2)
  const xs1 = s.intersect(r)

  //log("error", "s.saved_ray: " + s.saved_ray)
  const res1 = s.saved_ray.origin.equals(point(0, 0, -2.5))
            && s.saved_ray.direction.equals(vector(0, 0, 0.5))
  
  // Intersecting a translated shape with a ray
  s.transform = translation(5, 0, 0)
  const xs2 = s.intersect(r)
  const res2 = s.saved_ray.origin.equals(point(-5, 0, -5))
            && s.saved_ray.direction.equals(vector(0, 0, 1))
  
  return res1 && res2
}

function test_shape_inherited_normal_at_function() {
  // Test that the new AbstractShape's abstract normal_at-function
  // performs as expected - each concrete implementation class
  // should have its own "private" normal_at method, and should get the
  // inversed transformation-matrix from the concrete inherited
  // .normalAt(world_point) method.
  
  // Computing the normal on a translated shape
  const s1 = test_shape()
  s1.transform = translation(0, 1, 0)
  const n1 = s1.normalAt(point(0, 1.70711, -0.70711))
  const res1 = n1.equals(vector(0, 0.70711, -0.70711))
  
  // Computing the normal on a transformed shaped
  const s2 = test_shape()
  const m = scaling(1, 0.5, 1).times_matrix(rotation_z(π/5))
  s2.transform = m
  const n2 = s2.normalAt(point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2 ))
  const res2 = n2.equals(vector(0, 0.97014, -0.24254))
  
  //log("error", "n1: " + n1)
  //log("error", "n2: " + n2)
  
  return res1 && res2
}

function test_plane_function() {
  // Test that a plane extends infinitely in two directions
  // and is indeed completely planar - it has the same normal everywhere; [0, 1, 0].
  // Plane is a new implementation of a shape, and thus it extends AbstractShape.
  
  const p = plane()
  
  // The normal of a plane is constant everywhere
  const n1 = p.normalAt(point(0, 0, 0))
  const n2 = p.normalAt(point(10, 0, -10))
  const n3 = p.normalAt(point(-5, 0, 150))
  
  const res1 = n1.equals(vector(0, 1, 0)) 
            && n2.equals(vector(0, 1, 0)) 
            && n3.equals(vector(0, 1, 0))
            
  // Intersect with ray parallel to the plane
  const r2 = ray(point(0, 10, 0), vector(0, 0, 1))
  const xs2 = p.intersect(r2)
  const res2 = xs2.length === 0
  
  // Intersect with a coplanar ray
  const r3 = ray(point(0, 0, 0), vector(0, 0, 1))
  const xs3 = p.intersect(r3)
  const res3 = xs3.length === 0
  
  // A ray intersecting a plane from above
  const r4 = ray(point(0, 1, 0), vector(0, -1, 0))
  const xs4 = p.intersect(r4)
  const res4 = xs4.length === 1
            && xs4[0].t === 1 
            && xs4[0].object.equals(p)
  
  // A ray intersecting a plane from below
  const r5 = ray(point(0, -1, 0), vector(0, 1, 0))
  const xs5 = p.intersect(r5)
  const res5 = xs5.length === 1
            && xs5[0].t === 1 
            && xs5[0].object.equals(p)
    
  return res1 && res2 && res3 && res4 && res5
}

// *** TEST PATTERN FUNCTIONS

function test_stripe_pattern_function() {
  // Testing the stripe pattern function
  
  const white = color(1,1,1)
  const black = color(0,0,0)
  
  const pattern = stripe_pattern(white, black)  
  const res1 = pattern.a.equals(white) && pattern.b.equals(black)
  
  return res1
}

function test_stripe_at_function() {
  // Testing the stripe at point function
  
  const white = color(1,1,1)
  const black = color(0,0,0)

  const pattern = stripe_pattern(white, black)
  
  // A stripe pattern is constant i y
    // Only call ._at from the outside for testing!
  const res1 = pattern._at(point(0, 0, 0)).equals(white) 
            && pattern._at(point(0, 1, 0)).equals(white) 
            && pattern._at(point(0, 2, 0)).equals(white)
  
  // A stripe pattern is constant in z
  // Only call ._at from the outside for testing!
  const res2 = pattern._at(point(0, 0, 0)).equals(white) 
            && pattern._at(point(0, 0, 1)).equals(white) 
            && pattern._at(point(0, 0, 2)).equals(white)
  
  // A stripe pattern alternates in x
  // Only call ._at from the outside for testing!
  const res3 = pattern._at(point(0, 0, 0)).equals(white) 
            && pattern._at(point(0.9, 0, 0)).equals(white) 
            && pattern._at(point(1, 0, 0)).equals(black)
            && pattern._at(point(-0.1, 0, 0)).equals(black)
            && pattern._at(point(-1, 0, 0)).equals(black)
            && pattern._at(point(-1.1, 0, 0)).equals(white)
  
  return res1 && res2 && res3
}

function test_lighting_has_stripe_pattern() {
  // Test that material has the stripe pattern and that
  // the lighting() function applies the stripe pattern.
  
  const m = material()
  m.pattern = stripe_pattern(color(1, 1, 1), color(0, 0, 0))
  m.ambient = 1
  m.diffuse = 0
  m.specular = 0
  
  const s = sphere()
  s.material = m
  
  const eyev = vector(0, 0, -1)
  const normalv = vector(0, 0, -1)
  const light = point_light(point(0, 0, -10), color(1, 1, 1))
  
  // Lighting with a pattern applied
  const c1 = lighting(m, s, light, point(0.9, 0, 0), eyev, normalv, false)
  const c2 = lighting(m, s, light, point(1.1, 0, 0), eyev, normalv, false)
    
  return c1.equals(color(1, 1, 1)) && c2.equals(color(0, 0, 0))
}

function test_stripe_at_object_function() {
  // Test that pattern follows the object's transformation
  // Makes sure pattern is applied in object space instead of 
  // world space.
  
  const white = color(1, 1, 1)
  const black = color(0, 0, 0)
  const obj = sphere()
  const pattern = stripe_pattern(white, black)
  
  // Stripes with an object transformation
  obj.transform = scaling(2, 2, 2)
  const c1 = pattern.atShape(obj, point(1.5, 0, 0))
  
  // Stripes with a pattern transformation
  pattern.transform = scaling(2, 2, 2)
  const c2 = pattern.atShape(obj, point(1.5, 0, 0))
  
  // Stripes with both an object and pattern transformation
  obj.transform = scaling(2, 2, 2)
  pattern.transform = translation(0.5, 0, 0)
  const c3 = pattern.atShape(obj, point(2.5, 0 ,0))
  
  return c1.equals(white) 
      && c2.equals(white) 
      && c3.equals(white)
}

function test_pattern_has_inherited_from_abstract_class() {
  // Test to see that a pattern has inherited the AbstractPattern's
  // functionality.
  
  // Check that transform and id are inherited and applied from AbstractPattern
  const s1 = sphere()
  const p1 = test_pattern()
  const p_has_transform = p1.transform.equals(idmatrix())
  const p_has_id = typeof p1.id == 'number' && p1.id > 0
  
  // Check that transformation can be set
  p1.transform = translation(1, 2, 3)
  const p_can_transform = p1.transform.equals(translation(1, 2, 3))
  
  // A pattern with an object transformation
  const s2 = sphere()
  s2.transform = scaling(2, 2, 2)
  const p2 = test_pattern()
  const c2 = p2.atShape(s2, point(2, 3, 4))
  const res2 = c2.equals(color(1, 1.5, 2))
  
  // A pattern with a pattern transformation
  const s3 = sphere()
  const p3 = test_pattern()
  p3.transform = scaling(2, 2, 2)
  const c3 = p3.atShape(s3, point(2, 3, 4))
  const res3 = c3.equals(color(1, 1.5, 2))
  
  // A pattern with both an object and pattern transformation
  const s4 = sphere()
  s4.transform = scaling(2, 2, 2)
  const p4 = test_pattern()
  p4.transform = translation(0.5, 1, 1.5)
  c4 = p4.atShape(s4, point(2.5, 3, 3.5))
  const res4 = c4.equals(color(0.75, 0.5, 0.25))
    
  return p_has_transform 
      && p_has_id
      && p_can_transform
      && res2
      && res3
      && res4
}

function test_gradient_pattern_function() {
  // Test GradientPattern class
  const white = color(1, 1, 1)
  const black = color(0, 0, 0)
  
  const pattern = gradient_pattern(white, black)
  
  // Only call ._at from the outside for testing!
  const res1 = pattern._at(point(0, 0, 0)).equals(white)
            && pattern._at(point(0.25, 0, 0)).equals(color(0.75, 0.75, 0.75))
            && pattern._at(point(0.5, 0, 0)).equals(color(0.5, 0.5, 0.5))
            && pattern._at(point(0.75, 0, 0)).equals(color(0.25, 0.25, 0.25))
  
  return res1
}

function test_ring_pattern_function() {
  // Test RingPattern class
  
  const white = color(1, 1, 1)
  const black = color(0, 0, 0)
  
  const pattern = ring_pattern(white, black)
  
  // Only call ._at from the outside for testing!
  const res1 = pattern._at(point(0, 0, 0)).equals(white)
            && pattern._at(point(1, 0, 0)).equals(black)
            && pattern._at(point(0, 0, 1)).equals(black)
            && pattern._at(point(0.708, 0, 0.708)).equals(black)
  
  return res1
}

function test_chequered_pattern_function() {
  // Test ChequeredPattern class
  
  const white = color(1, 1, 1)
  const black = color(0, 0, 0)
  
  const pattern = chequered_pattern(white, black)
  
  // Chequers should repeat in x
  // Only call ._at from the outside for testing!
  const res1 = pattern._at(point(0, 0, 0)).equals(white)
            && pattern._at(point(0.99, 0, 0)).equals(white)
            && pattern._at(point(1.01, 0, 0)).equals(black)
  
  // Chequers should repeat in y
  // Only call ._at from the outside for testing!
  const res2 = pattern._at(point(0, 0, 0)).equals(white)
            && pattern._at(point(0, 0.99, 0)).equals(white)
            && pattern._at(point(0, 1.01, 0)).equals(black)
  
  // Chequers should repeat in z
  // Only call ._at from the outside for testing!
  const res3 = pattern._at(point(0, 0, 0)).equals(white)
            && pattern._at(point(0, 0, 0.99)).equals(white)
            && pattern._at(point(0, 0, 1.01)).equals(black)
  
  return res1 && res2 && res3
}

// REFLECTION AND REFRACTION TESTS

function test_material_reflective_attribute() {
  // Test that the material has a reflective attribute that can be assigned.
  
  const m = material()
  
  const res1 = m.reflective === 0.0
  
  m.reflective = 1.12
  
  const res2 = m.reflective === 1.12
  
  return res1 && res2
}

function test_prepare_computations_reflectv() {
  // Test that prepare_computations will compute the reflect vector.
  
  // Precomputing the reflection vector
  const shape = plane()
  const r = ray(point(0, 1, -1), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))
  const i = intersection(Math.sqrt(2), shape)
  const comps = prepare_computations(i, r)
  
  return comps.reflectv.equals(vector(0, Math.sqrt(2)/2, Math.sqrt(2)/2))
}

function test_reflected_color_function() {
  // Test that hitting a non-reflective surface, reflected_color() returns black.
  
  // The reflected color for a non-reflective material
  const w1 = default_world()
  const r1 = ray(point(0, 0, 0), vector(0, 0, 1))
  
  const shape1 = w1.objects[1]
  shape1.material.ambient = 1
  
  const i1 = intersection(1, shape1)
  const comps1 = prepare_computations(i1, r1)
  c1 = reflected_color(w1, comps1)
  const res1 = c1.equals(color(0, 0, 0))
  
  // The reflected color for a reflective material
  const w2 = default_world()
  const shape2 = plane()
  shape2.material.reflective = 0.5
  shape2.transform = translation(0, -1, 0)
  
  w2.addObject(shape2)
  const r2 = ray(point(0, 0, -3), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))
  const i2 = intersection(Math.sqrt(2), shape2)
  const comps2 = prepare_computations(i2, r2)
  c2 = reflected_color(w2, comps2)
  const res2 = c2.equals(color(0.19033, 0.237915, 0.14275))
  
  // Testing shade_hit() with a reflective material
  const w3 = default_world()
  const shape3 = plane()
  shape3.material.reflective = 0.5
  shape3.transform = translation(0, -1, 0)
  
  w3.addObject(shape3)
  const r3 = ray(point(0, 0, -3), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))
  const i3 = intersection(Math.sqrt(2), shape3)
  const comps3 = prepare_computations(i3, r3)
  const c3 = shade_hit(w3, comps3)
  const res3 = c3.equals(color(0.8767577, 0.9243408, 0.82918))
    
  return res1 && res2 && res3
}

function test_avoid_infinite_recursion_reflection() {
  // Test that code is safe against infinite reflections.
  // May halt the bowser and cause stack overflow or out of memory situations.
  
  // color_at() with mutually reflective surfaces
  const w = world()
  w.addLight(point_light(point(0, 0, 0), color(1, 1, 1)))
  
  const lower = plane()
  lower.material.reflective = 1.0
  lower.transform = translation(0, -1, 0)
  w.addObject(lower)
  
  const upper = plane()
  upper.material.reflective = 1.0
  upper.transform = translation(0, 1, 0)
  w.addObject(upper)
  
  const r = ray(point(0, 0, 0), vector(0, 1, 0))
  
  try {
    const c1 = color_at(w, r) // should terminate successfully
    //log("error", c1)
    return true
  } catch (e) {
    log("error", e)
    return false
  }
}

function test_limit_recursion_of_reflection() {
  // Test that code is safe against infinite reflections.
  // May halt the browser and cause stack overflow or out of memory situations.
  
  // color_at() with mutually reflective surfaces
  const w = world()
  w.addLight(point_light(point(0, 0, 0), color(1, 1, 1)))
  
  const lower = plane()
  lower.material.reflective = 1.0
  lower.transform = translation(0, -1, 0)
  w.addObject(lower)
  
  const upper = plane()
  upper.material.reflective = 1.0
  upper.transform = translation(0, 1, 0)
  w.addObject(upper)
  
  const r = ray(point(0, 0, 0), vector(0, 1, 0))
  
  try {
    const c1 = reflected_color(w, r, 0) // should terminate successfully
    //log("error", c1)
    return c1.equals(color(0, 0, 0))
  } catch (e) {
    //log("error", e)
    return false
  }
}

function test_material_has_transparency_and_refraction() {
  // Test that Material has new attributes transparency and refractive_index,
  // and that they can be set.
  
  const m = material()
  const default_transparency_is_0 = m.transparency === 0.0
  const default_refractive_index_is_1 = m.refractive_index === 1.0
  
  m.transparency = 0.5
  m.refractive_index = 1.52
  
  return default_transparency_is_0
      && default_refractive_index_is_1
      && m.transparency === 0.5 
      && m.refractive_index === 1.52
}

function test_glass_sphere_function() {
  // Test helper function glass_sphere()
  // Should return a glass sphere.
  
  const g = glass_sphere()
  
  return g.transform.equals(idmatrix())
      && g.material.transparency === 1.0
      && g.material.refractive_index === 1.5
}

function test_finding_n1_and_n2_refractive_indices() {
  // Test that PrepareComputations can calculate n1 and n2
  // for refractive intersections.
  
  const a = glass_sphere()
  a.transform = scaling(2, 2, 2)
  a.material.refractive_index = 1.5
  
  const b = glass_sphere()
  b.transform = translation(0, 0, -0.25)
  b.material.refractive_index = 2.0
  
  const c = glass_sphere()
  c.transform = translation(0, 0, 0.25)
  c.material.refractive_index = 2.5
  
  const r = ray(point(0, 0, -4), vector(0, 0, 1))
  
  const xs = intersections(intersection(2, a),
                           intersection(2.75, b),
                           intersection(3.25, c),
                           intersection(4.75, b),
                           intersection(5.25, c),
                           intersection(6, a)   )
  
  const expected = [[1.0, 1.5],
                    [1.5, 2.0],
                    [2.0, 2.5],
                    [2.5, 2.5],
                    [2.5, 1.5],
                    [1.5, 1.0]]
  
  const res = []
  for (i in xs) {
    log("error", "xs[i].t: " + xs[i].t)
    const comps = prepare_computations(xs[i], r, xs)
    log("error", "comps.n1: " + comps.n1)
    log("error", "comps.n2: " + comps.n2)
    
    res.push( comps.n1 === expected[i][0] 
           && comps.n2 === expected[i][1] )
  }
  
  return !res.includes(false)
}

function test_computing_under_point() {
  // Test that PrepareComputations will compute the under_point
  
  // The under point is offset below the surface
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const shape = sphere()
  shape.transform = translation(0, 0, 1)
  
  const i = intersection(5, shape)
  const xs = intersections(i)
  
  const comps = prepare_computations(i, r, xs)
  
  return comps.under_point.z > C.EPSILON/2 
      && comps.point.z < comps.under_point.z
}

function test_refracted_color_of_opaque_object() {
  // Test new function refracted_color(world, comps, remaining)
  // Show that it returns black when the hit applies to an opaque object.
  
  const w = default_world()
  const shape = w.objects[0]
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const xs = intersections(intersection(4, shape), intersection(6, shape))
  const comps = prepare_computations(xs[0], r, xs)
  const c = refracted_color(w, comps, 5)
  
  return c.equals(color(0, 0, 0))  
}

function test_refracted_color_at_max_recursions() {
  // Test new function refracted_color(world, comps, remaining)
  // Show that it returns black when it runs out of recursions.
  
  const w = default_world()
  const shape = w.objects[0]
  shape.material.transparency = 1.0
  shape.material.refractive_index = 1.5
  const r = ray(point(0, 0, -5), vector(0, 0, 1))
  const xs = intersections(intersection(4, shape), intersection(6, shape))
  const comps = prepare_computations(xs[0], r, xs)
  const c = refracted_color(w, comps, 0)
  
  return c.equals(color(0, 0, 0))
}
