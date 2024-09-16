// *** FUNCTION DEFINITIONS

const PRECISION = 5
const EPSILON = 1.0*10**(-PRECISION)

function display_msg(domId, msg) {
  const para = document.createElement("p");
  const node = document.createTextNode(msg);
  para.appendChild(node);
  const element = document.getElementById(domId);
  element.appendChild(para);
}

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

function display_tuple(a) {
  return `x:${a.x} y:${a.y} z:${a.z} w:${a.w}`
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
  return Object.freeze({ x:a, y:b, z:c, w:d })
}

function vector(a,b,c) {
  return tuple(a,b,c,0)
}

function point(a,b,c) {
  return tuple(a,b,c,1)
}

// *** COLOR FUNCTIONS

function color(r, g, b) {
  return Object.freeze({ red:r, green:g, blue:b})
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