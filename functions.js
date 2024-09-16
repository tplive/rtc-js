// *** FUNCTION DEFINITIONS

const PRECISION = 5
const EPSILON = 1.0*10**(-PRECISION)

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
  // Subtract tuple a from tuple b.
  //
  return tuple(a.x - b.x,0,0,0)
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