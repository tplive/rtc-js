// *** TESTS
function test_tuple_function() {
  // Constructing a tuple with x=1, y=2, z=3, w=1 should return a tuple object with matching values

  var t = tuple(1, 2, 3, 1)

  return (t.x == 1 && t.y == 2 && t.z == 3 && t.w == 1)
}

function test_vector_function() {
  // Constructing a vector with x=-3.5, y=2.211, z=0.001 should return a tuple object with matching values and w=0

  var v = vector(-3.5, 2.211, 0.001)
  

  return (v.x == -3.5 && v.y == 2.211 && v.z == 0.001 && v.w == 0)
}

function test_point_function() {
  // Constructing a point with x=143.556, y=-900.88, z=555.555 should return a tuple object with matching values and w=1

  var v = point(143.556, -900.88, 555.555)
  

  return (v.x == 143.556 && v.y == -900.88 && v.z == 555.555 && v.w == 1)
}

function test_equal_function() {
  // Comparing floating point numbers for equivalence may, due to rounding errors, fail
  // The function equal(a, b) will subtract a from b and compare the result to a small constant EPSILON.
  // and if the difference is smaller, we will call them equal.

  return (equal(1.0, 1.0) && !(equal(12.009, 12.008)) && equal(123456.2345, 123456.234501))
}

function test_equal_tuples_function() {
  // Test that tuple, vector and point coordinates are the same, even with slight diff outside PRECISION value

  var t = tuple(110.999, -23.11, 2, 2)
  var v = vector(110.999, -23.11, 2.0)
  var p = point(110.9990000001, -23.11, 2.00000001)

  return (equal_tuples(t, v) && equal_tuples(v, p) && equal_tuples(p, t))
}

function test_add_tuples_function() {

  var t = tuple(110.999, -23.11, 2, 0)
  var v = vector(1.999, 23.11, 22.001)
  var p = point(110.9990000001, -23.11, 2.00000001)
  
  var result_tv = tuple(112.998, 0.0, 24.001, 1)

  return (equal_tuples(add_tuples(t, v), result_tv))
}

function test_subtract_tuples_function() {

  var t = tuple(-44.555, 345.123, 1.0, 0)
  var v = vector(-33.44, 123.345, 0.0)

  var subtracted_tv = subtract_tuples(t, v)
  
  return (equal_tuples(subtracted_tv, tuple(t.x - v.x, t.y - v.y, t.z - v.z, t.w - v.w)))
}

function test_negate_tuple_function() {
  // Test that negate_tuple() returns a tuple with x=-x, y=-y, z=-z coordinates
  
  var n = negate_tuple(tuple(1, -2, 3, -4))
  return (n.x == -1, n.y == 2, n.z == -3, n.w == 4 )
}

function test_multiply_vector_function() {
  // Multiplying a tuple by a scalar
  // Given t = tuple(1, -2, 3, -4)
  // Then t * 3.5 = tuple(3.5, -7, 10.5, -14)
  
  var m = multiply_vector(3.5, tuple(1, -2, 3, -4))
  return (equal(m.x, 3.5) && equal(m.y, -7) && equal(m.z, 10.5) && equal(m.w, -14))
}

function test_divide_vector_function() {
  // Dividing a tuple by a scalar value
  // Given t = tuple(1, -2, 3, -4)
  // Then t / 2 = tuple(0.5, -1, 1.5, -2)
  
  var t = divide_vector(2, tuple(1, -2, 3, -4))
  var t_result = (equal(t.x, 0.5) && equal(t.y, -1) && equal(t.z, 1.5) && equal(t.w, -2))
    
  return (t_result)
}

function test_magnitude_function() {
  // Magnitude, or length of a vector is the distance from one end of a vector to the other.
  // Given vector(x, y, z, 0), the magnitude is Math.sqrt(x**2 + y**2 + z**2 + w**2)
  
  var r = magnitude(vector(0, 1, 0))
  var s = magnitude(vector(0, 0, 1))
  var t = magnitude(vector(1, 2, 3))
  var u = magnitude(vector(-1, -2, -3))
  
  return (equal(r, 1) && equal(s, 1), equal(t, Math.sqrt(14)) && equal(u, Math.sqrt(14)))
}

function test_normalize_function() {
  // Normalizing a vector means taking an arbitrary vector and converting it into a unit vector.
  // Normalizing vector(4, 0, 0) gives (1, 0, 0)
  // Normalizing vector(1, 2, 3) gives vector(1/sqrt(14, 2/sqrt(14), 3/sqrt(14))
  // The magnitude of a normalized vector is 1.
  
  var a = normalize(vector(4, 0, 0))
  var b = normalize(vector(1, 2, 3))
  
  return (equal_tuples(a, vector(1, 0, 0)) && equal_tuples(b, vector(1/Math.sqrt(14), 2/Math.sqrt(14), 3/Math.sqrt(14))))
  
}

function test_dot_function() {
  // Compute the dot product (aka scalar product) of two vectors
  // Given vector(1, 2, 3) and vector(2, 3, 4) the dot product is 20
  
  return (dot(vector(1, 2, 3), vector(2, 3, 4)) == 20)
}

function test_cross_function() {
  // The cross product is the same as the dot product, only it returns a vector instead of a scalar value.
  // Gives vector(1, 2, 3) and vector(2, 3, 4)
  // Then cross(a, b) == vector(-1, 2, -1)
  // and cross(b, a) == vector(1, -2, 1)
  var u = vector(1, 2, 3)
  var v = vector(2, 3, 4)
  
  var uv = cross(u, v)
  var vu = cross(v, u)
  
  return (equal_tuples(uv, vector(-1, 2, -1)) && equal_tuples(vu, vector(1, -2, 1)))
}

// *** COLOR TESTS

function test_color_function() {
  // Colors are tuples too!
  // Test creating a color(r, g, b) object
  var c = color(-0.5, 0.4, 1.7)
  return (c.red == -0.5 && c.green == 0.4 && c.blue == 1.7)
}

function test_add_colors_function() {
  // Adding two colors means simple addition of their r, g and b values.
  
  var c1 = color(0.9, 0.6, 0.75)
  var c2 = color(0.7, 0.1, 0.25)
  
  var c3 = add_colors(c1, c2)
  return (c3.red == c1.red + c2.red && c3.blue == c1.blue + c2.blue && c3.green == c1.green + c2.green) 
}

function test_subtract_colors_function() {
  // Subtracting two colors means simple subtraction of their r, g and b values.
  
  var c1 = color(0.9, 0.6, 0.75)
  var c2 = color(0.7, 0.1, 0.25)
  
  var c3 = subtract_colors(c1, c2)
  return (c3.red == c1.red - c2.red && c3.blue == c1.blue - c2.blue && c3.green == c1.green - c2.green) 
}

function test_multiply_color_function() {
  // Multiply r, g and b values by a scalar value.
  
  var c1 = color(0.9, 0.6, 0.75)
  var scalar = 1.5
  
  var c3 = multiply_color(scalar, c1)
  return (c3.red == c1.red * scalar && c3.blue == c1.blue * scalar && c3.green == c1.green * scalar) 
}

function test_multiply_colors_function() {
  // Multiply r, g and b values of two colors by each other.
  
  var c1 = color(0.9, 0.6, 0.75)
  var c2 = color(0.7, 0.1, 0.25)
    
  var c3 = multiply_colors(c1, c2)
  return (c3.red == c1.red * c2.red && c3.blue == c1.blue * c2.blue && c3.green == c1.green * c2.green) 
}

function test_scale_color_function() {
  // Scale color to value suitable for PPM file.
  // min = 0
  // max = 255
  // color = color object to be scaled.
  // return a new color object
  
  const min = 0   // Minimum scaled value
  const max = 255 // Maximum scaled value
  
  const c1 = color(0.9, -1.5, 2)
  const s1 = scale_color(c1)
  
  return (s1.red === 230 && s1.green === 0 && s1.blue === 255)
  
}

function test_html_canvas_function() {
  // Creates a canvas initialized to all black pixels.
  // ID of canvas element is that of its parent, suffixed with "_canvas"
  
  var parent = "canvas_list"
  var w = 10
  var h = 20
  
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
  
  return (c1.red == c2.red && c1.green == c2.green && c1.blue == c2.blue)
}

function test_canvas_function() {
  // This is a test for a canvas function that is pure data, not the HTML element called canvas.
  // A canvas is an object with width, height and a data array for pixel values.
  const w = 12
  const h = 12
  var can = canvas(w, h)
  
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
  return (can.width === w && can.height === h && can.data[11] === 255 && can.data[11+1] === 123 && can.data[11+2] === 234 && can.data[1] == 0 && valzero)
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
  return (p1.red === c1.red && p1.green === c1.green && p1.blue === c1.blue) 
}

function test_catch_canvas_out_of_bounds() {
  // Given a canvas, test that writing pixels or reading outside bounds will throw an exception.
  const w = 7
  const h = 6
  const can = canvas(w, h)
  const c1 = color(110, 220, 330) // Color values are unbounded for calculations, but cannot exceed 255 in display.
  
  var errors = [] // An array of errors from tests below
  
  var t1, t2, t3, t4, t5 = false
  try {
    can.write_pixel(4, 5, c1) // Should not fail
    can.pixel_at(4, 5, c1) // Should not fail
  } catch (err) {
    errors.push(err)
    t1 = true
  }
  
  try {
    can.write_pixel(-1, 1) // -1 is out of bounds
  } catch (err) {
    errors.push(err)
    t2 = true
  }
      
  try {
      can.write_pixel(1, -1) // -1 is out of bounds
  } catch (err) {
    errors.push(err)
    t3 = true
  }
  
  try {
    can.write_pixel(w, h + 1) // y > h is out of bounds
  } catch (err) {
    errors.push(err)
    t4 = true
  }
  
  try {
    can.write_pixel(w + 1, h) // x > w is out of bounds
  } catch (err) {
    errors.push(err)
    t5 = true
  }
  
  //log("error", "Failed tests: " + errors.join("\n"))
    
  return ( !t1 && t2 && t3 && t4 && t5 ) 
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
  
  return (ppm.slice(0, 13) === `P3\n${w} ${h}\n255\n`)
}

function test_ppm_pixel_data() {
  // Test pixel data is valid.
  // File should end with newline.
  // No line should exceed 70 characters, and must not split a color in two.
  // Colors must be scaled to values between 0 and 255.
  
  const w = 10
  const h = 10
  const can = canvas(w, h)
  const c1 = color(1.0, 0.55432, 0.4)
  
  const scaled_color = scale_color(c1)
  
  // Fill all pixels with color value c1, scaled to 0-255
  // This is part of the canvas_to_ppm function
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      can.write_pixel(x, y, scale_color(c1))
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
   
  return (!width_exceeded && !starts_ws && !ends_ws && last_is_newline)
  
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

function test_create_matrix_function() {
  // Test create and verify matrices of 2x2, 3x3, 4x4, 3x5 and 5x3
  // matrix[row][col], row and col are 0-based indexes.
  
  //const m4x4 = create_matrix(4, 4)
  const m4x4 = matrix(4, 4)
  
  m4x4[0] = [1,2,3,4]
  m4x4[1] = [5.5,6.5,7.5,8.5]
  m4x4[2] = [9,10,11,12]
  m4x4[3] = [13.5, 14.5, 15.5, 16.5]
  
  //log("error", m4x4.join("\n"))
  const m1 = (m4x4[0][0] === 1 && m4x4[0][3] === 4 && m4x4[1][0] === 5.5 && m4x4[2][2] === 11 && m4x4[3][0] === 13.5 && m4x4[3][2] === 15.5)

  const m2x2 = matrix(2, 2)
  
  m2x2[0] = [-3,5]
  m2x2[1] = [1,-2]
  
  //log("error", m2x2)
  const m2 = (m2x2[0][0] === -3 && m2x2[0][1] === 5 && m2x2[1][0] === 1 && m2x2[1][1] === -2)

  const m3x3 = matrix(3, 3)
  
  m3x3[0] = [-3,5,0]
  m3x3[1] = [1,-2,-7]
  m3x3[2] = [0,1,1]
  
  //log("error", m3x3)
  const m3 = (m3x3[0][0] === -3 && m3x3[1][1] === -2 && m3x3[2][2] === 1)

  return (m1 && m2 && m3)
}

function test_matrix_equal_function() {
  // Test the equality of two matrices.
  // Consider very similar floating point values, as with tuples.
  
  let ma = matrix(4, 4)
  
  ma = [[1,2,3,4],[5,6,7,8],[9,8,7,6],[5,4,3,2]]
  
  mb = structuredClone(ma)
  
  const is_equal = matrix_equal(ma, mb)
  
  // Some values not equal but within the PRECISION threshold
  // Should still be equal
  ma[0][1] = 1.999999
  mb[1][0] = 5.00001
  
  const close_enough = matrix_equal(ma, mb)
    
  // Change some values, so they're not equal any more
  mb[1][3] = 12
  mb[3][1] = 1.34
  ma[2][2] = 22
  ma[0][0] = 3.1415
  
  const not_equal = matrix_equal(ma, mb)
  
  return (is_equal && close_enough && !not_equal)
  
}

function test_multiply_matrices_function() {
  // Multiplying two matrices
  // Only 4x4 matrices.
  
  let ma = matrix(4, 4)
  let mb = matrix(4, 4)
  let mc = matrix(4, 4)
  
  ma = [
    [1,2,3,4],
    [5,6,7,8],
    [9,8,7,6],
    [5,4,3,2]
  ]
  
  mb = [
    [-2,1,2,3],
    [3,2,1,-1],
    [4,3,6,5],
    [1,2,7,8]
  ]
  
  mc = [
    [20,22,50,48],
    [44,54,114,108],
    [40,58,110,102],
    [16,26,46,42]
  ]
  
  //log("error", multiply_matrices(ma, mb).join("\n"))
  
  return (matrix_equal(mc, multiply_matrices(ma, mb)))
}

function test_multiply_matrix_by_tuple_function() {
  // Multiply matrix by tuple.
  // Similar to multiply_matrices, but this time "matrix B" is a tuple, treated as a one column matrix.
  
  let ma = matrix(4, 4)
  let t = tuple(1,2,3,1)
  
  ma = [
    [1,2,3,4],
    [2,4,4,2],
    [8,6,4,1],
    [0,0,0,1]
  ]
  
  const r = tuple(18,24,33,1)
  
  return (equal_tuples(r, multiply_matrix_by_tuple(ma, t)))
  
}

function test_multiply_by_identity_matrix_function() {
  // Multiplying any number by 1 gives the same number back. The number 1 is for this reason called the
  // "multiplicative identity". There also exists an "identity matrix", and this test
  // demonstrates the "non-effect" of multiplying matrix and tuple by the identity matrix.
  
  const ma = [[7,9,3,5],[2,2,0,8],[2,6,2,9],[2,2,2,2]]
  const t = tuple(7, 6, 5, 4)
  
  // This is the multiplicative identity for matrices:
  const id_matrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
  
  return (equal_tuples(t, multiply_matrix_by_tuple(id_matrix, t)) && matrix_equal(ma, multiply_matrices(ma, id_matrix)))
  
}

function test_transpose_matrix_function() {
  // Transposing a matrix involves turning rows into columns.
  
  const ma = [[0,9,3,0], [9,8,0,8], [1,8,5,3], [0,0,5,8]]
  const mt = [[0,9,1,0], [9,8,8,0], [3,0,5,5], [0,8,3,8]]
  
  //log("error", ma.join("\n"))
  //log("error", transpose_matrix(ma).join("\n"))
  return matrix_equal(mt, transpose_matrix(ma))
  
}

function test_transpose_identity_matrix() {
  //Transposing identity matrix should return identity matrix.
  
  const t = transpose_matrix([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
  
    return matrix_equal(t, transpose_matrix(t))

}

function test_calculate_determinant_of_2x2_matrix() {
  // Calculate determinant of a 2x2 matrix
  
  const m = matrix(2, 2)
  
  m[0] = [1,5]
  m[1][0] = -3
  m[1][1] = 2
  
  return (determinant(m) === 17)
}

function test_submatrix_function() {
  // A submatrix is what is left after removing a given row and column.
  // The submatrix of a 4x4 matrix is a 3x3 matrix. 
  // The submatrix of a 3x3 matrix is a 2x2 matrix.
  
  // 4x4 ==> 3x3
  let m4 = matrix(4, 4)
  m4 = [[-6,1,1,6],[-8,5,8,6],[-1,0,8,2],[-7,1,-1,1]]
  
  // The expected result:
  m4c = [[-6,1,6],[-8,8,6],[-7,-1,1]]
  
  const sm3 = submatrix(m4, 2, 1)
  
  //log("error", sm3.join("\n"))
  //log("error", m4c.join("\n"))
  //log("error", "Equal: " + matrix_equal(sm3, m4c))
  
  // 3x3 ==> 2x2
  let m3 = matrix(3, 3)
  m3 = [[1,5,0],[-3,2,7],[0,6,-3]]
  
  // The expected result:
  m3c = [[-3,2],[0,6]]
  
  const sm2 = submatrix(m3, 0, 2)
  
  //log("error", sm2.join("\n"))
  //log("error", m3c.join("\n"))
  //log("error", "Equal: " + matrix_equal(sm2, m3c))
  
  return ( matrix_equal(sm3, m4c) && matrix_equal(sm2, m3c) )
}

function test_minor_function() {
  //Explained: The minor of an element at row i and column j is the determinant of the submatrix at (i, j).
  
  let m3 = matrix(3, 3)
  
  m3 = [[3,5,0],[2,-1,-7],[6,-1,5]]
  
  const m2 = submatrix(structuredClone(m3), 1, 0)
  
  const d = determinant([[5,0],[-1,5]])
  
  const min = minor(structuredClone(m3), 1, 0)
  
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
  
  let m = matrix(3, 3)
  const m3 = [[3,5,0],[2,-1,-7],[6,-1,5]]
  
  const min1 = minor(structuredClone(m3), 0, 0) // = -12
  const cof1 = cofactor(structuredClone(m3), 0, 0) //= -12
  
  const min2 = minor(structuredClone(m3), 1, 0) // = 25
  const cof2 = cofactor(structuredClone(m3), 1, 0) //= -25
  
  //log("error", `${min1}, ${cof1}, ${min2}, ${cof2}`)
  
  return (min1 === cof1 && min2 === -cof2)
  
}

function test_calculate_determinant_of_3x3_matrix() {
  // Determining determinants of larger matrices
  // 
  
  const m = [[1,2,6],[-5,8,-4],[2,6,4]]
  
  cof1 = cofactor(structuredClone(m), 0, 0) // = 56
  cof2 = cofactor(structuredClone(m), 0, 1) // = 12
  cof3 = cofactor(structuredClone(m), 0, 2) // = -46
  d1 = determinant(structuredClone(m)) // = -196
  
  //log("error", "cofactor (0,0) = " + cof1)
  //log("error", "cofactor (0,1) = " + cof2)
  //log("error", "cofactor (0,2) = " + cof3)
  //log("error", "determinant of m = " + d1)
  
  return (
       cofactor(structuredClone(m), 0, 0) === 56
    && cofactor(structuredClone(m), 0, 1) === 12
    && cofactor(structuredClone(m), 0, 2) === -46
    && determinant(structuredClone(m)) === -196
  )
}

function test_is_matrix_invertible() {
  // We need to be able to detect if a matrix is invertible.
  // If the determinant is 0, the matrix is not invertible.
  
  let m1 = matrix(4, 4)
  
  // Invertible matrix
  m1 = [[6,4,4,4],[5,5,7,6],[4,-9,3,-7],[9,1,7,-6]]
  
  const detm1 = determinant(m1) // -2120
  
  let m2 = matrix(4, 4)
  
  // Non-invertible matrix
  m2 = [[-4,2,-2,-3],[9,6,2,6],[0,-5,1,-5],[0,0,0,0]]
  
  const detm2 = determinant(m2) // 0
  
  return (detm1 === -2120 && detm2 === 0)

}