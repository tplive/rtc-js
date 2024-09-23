// *** PATTERN CLASSES

class AbstractPattern {
  
  constructor() {
    this._id = C.unique_id()
    this._transform = idmatrix()
  }
  
  get id() { return this._id }
  get transform() { return this._transform }
  
  set transform(value) {
    if (value.d != undefined) {
      this._transform = value
      // Check if this is more expensive:
      //this._transform_inverse = value.inverse()
    }
  }
  
  atShape(shape, world_point) {
    // 1. Convert point coordinates to object space by multiplying 
    //    by the inverse of the object's transform.
    // 2. Multiply the object space point by the inverse of the 
    //    pattern's transform to convert that point into pattern space.
    // 3. Pass the resulting point to _pattern_at() and return this result.
  
    const object_point = shape.transform.inverse().times_tuple(world_point)
    const pattern_point = this.transform.inverse().times_tuple(object_point)
  
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
