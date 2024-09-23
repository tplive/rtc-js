// *** PATTERN CLASSES

class AbstractPattern {
  
  constructor() {
    this._id = C.unique_id()
    this._transform = idmatrix()
    this._transform_inverse = idmatrix()
  }
  
  get id() { return this._id }
  get transform() { return this._transform }
  get transform_inverse() { return this._transform_inverse }
  
  set transform(value) {
    if (value.d != undefined) {
      this._transform = value
      // Check if this is more expensive:
      this._transform_inverse = value.inverse()
    }
  }
  
  atShape(shape, world_point) {
    // 1. Convert point coordinates to object space by multiplying 
    //    by the inverse of the object's transform.
    // 2. Multiply the object space point by the inverse of the 
    //    pattern's transform to convert that point into pattern space.
    // 3. Pass the resulting point to _pattern_at() and return this result.
  
    const object_point = shape.transform_inverse.times_tuple(world_point)
    const pattern_point = this.transform_inverse.times_tuple(object_point)
  
    return this._at(pattern_point)
  }
  
  _at(point) { throw new Error("Abstract method.") }
}

class RandomPattern extends AbstractPattern {

  constructor(c1, c2) {
    super()
  }
  
  _at(point) {
  // This function returns a random color for every point
  
    return color(Math.random(), Math.random(), Math.random())
  }
}

class TestPattern extends AbstractPattern {

  constructor() {
    super()
  }
  
  _at(point) {
  // This function returns a random color for every point
  
    return color(point.x, point.y, point.z)
  }
}

class StripePattern extends AbstractPattern {
  // A stripe pattern alternates between two colors in one dimension.
  // c1 and c2 are the two colors.
  
  constructor(c1, c2) {
    super()
    
    if (c1.isColor && c2.isColor) {  
      this._color1 = c1
      this._color2 = c2
    } else {
      throw new Error("stripe_pattern() wants two colors as input")
    }
    
    if (this.constructor == AbstractPattern) { throw new TypeError("Cannot instantiate an abstract class.") }
  }
  
  get a() { return this._color1 }
  get b() { return this._color2 }
  
  _at(point) {
    // This function returns alternating colors depending on the x-coordinate of the point.
  
    return Math.floor(point.x) % 2 === 0 ? this._color1 : this._color2
  }
}

class GradientPattern extends AbstractPattern {
  // A gradient pattern smoothly transitions from one color to anotherin one dimension.
  // c1 and c2 are the two colors.
  
  constructor(g1, g2) {
    super()
    
    if (g1.isColor && g2.isColor) {
      this._gradient1 = g1
      this._gradient2 = g2
    } else {
      throw new Error("GradientPattern() wants two colors as input")
    }
    
    if (this.constructor == AbstractPattern) { throw new TypeError("Cannot instantiate an abstract class.") }
  }
  
  get a() { return this._gradient1 }
  get b() { return this._gradient2 }
  
  _at(point) {
    // This function returns an intermediate color depending on the x-coordinate of the point.
    
    const distance = this._gradient2.minus(this._gradient1)
    const fraction = point.x // The gradient covers the entire shape if we omit: "- Math.floor(point.x)" from the calculation
    //log("error", `Point.x: ${point.x}, Math.floor(point.x): ${Math.floor(point.x)}, fraction: ${fraction}`)
    
    return distance.by_scalar(fraction).plus(this._gradient1)
  }
}

class RingPattern extends AbstractPattern {
  // A ring pattern alternates between two colors in x and z dimensions,
  // resulting in concentric circles.
  // c1 and c2 are the two colors.
  
  constructor(c1, c2) {
    super()
    
    if (c1.isColor && c2.isColor) {  
      this._color1 = c1
      this._color2 = c2
    } else {
      throw new Error("stripe_pattern() wants two colors as input")
    }
    
    if (this.constructor == AbstractPattern) { throw new TypeError("Cannot instantiate an abstract class.") }
  }
  
  get a() { return this._color1 }
  get b() { return this._color2 }
  
  _at(point) {
    // This function returns alternating colors depending on the x-coordinate of the point.
  
    return Math.floor(Math.sqrt(point.x**2 + point.z**2)) % 2 === 0 ? this._color1 : this._color2
  }
}

class ChequeredPattern extends AbstractPattern {
  // A chequered pattern alternates between two colors in all three dimensions.
  // c1 and c2 are the two colors.
  
  constructor(c1, c2) {
    super()
    
    if (c1.isColor && c2.isColor) {  
      this._color1 = c1
      this._color2 = c2
    } else {
      throw new Error("stripe_pattern() wants two colors as input")
    }
    
    if (this.constructor == AbstractPattern) { throw new TypeError("Cannot instantiate an abstract class.") }
  }
  
  get a() { return this._color1 }
  get b() { return this._color2 }
  
  _at(point) {
    // This function returns alternating colors depending on the x, y and z coordinates of the point.
  
    return (Math.floor(point.x) + Math.floor(point.y) + Math.floor(point.z)) % 2 === 0 ? this._color1 : this._color2

  }
}
