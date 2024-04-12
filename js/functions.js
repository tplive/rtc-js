// *** FUNCTION DEFINITIONS
function tuple(a, b, c, d) {
  return Object.freeze({ x:a, y:b, z:c, w:d })
}

function vector(a,b,c) {
  return tuple(a,b,c,0)
}

function point(a,b,c) {
  return tuple(a,b,c,1)
}