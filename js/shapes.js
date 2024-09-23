// *** SHAPE CLASSES
class AbstractShape {
  // Abstract class that all shapes should inherit from
  
  constructor() {
    this._id = C.unique_id()
    this._transform = idmatrix()
    this._material = material()
    if (this.constructor == AbstractShape) { throw new TypeError("Cannot instantiate an abstract class.") }
  }
  
  get id() { return this._id }
  get transform() { return this._transform }
  get material() { return this._material }
  
  set transform(value) {
    if (value.d != undefined) {
      this._transform = value
    }
  }
  
  set material(mat) {
    if (mat.ambient != undefined) {
      this._material = mat
    }
  }
  intersect(ray) { return local_intersect(ray.transform(this._transform.inverse())) }
  
  _intersect(local_ray) { throw new Error("Abstract method.") }
  
  equals(obj) { return this._transform.equals(obj.transform) && this._material.equals(obj.material)}
  toString() { throw new Error("Abstract method.") } 
}

class TestShape extends AbstractShape {
  // The Shape class is an abstract class acting as a base class for all supported shapes.
  // Constructor fields are not really private.
  
  constructor() {
    super()
  }
  
  _intersect(local_ray) {
    // Intersect returns an array of points where a given ray (ra) intersects a given sphere (s)
    // This is an internal method, should never be called from the outside.
    // Instead call intersect, which is inherited from AbstractShape.
    
    // This is how a *Sphere* does intersection:
  
    // Vector from sphere's center to the ray origin
    // Remember: The sphere is centered at the world origin (0, 0, 0)
    
    const sphere_to_ray = local_ray.origin.minus(point(0, 0, 0))
    const a = local_ray.direction.dot(local_ray.direction)
    const b = 2 * local_ray.direction.dot(sphere_to_ray)
    const c = sphere_to_ray.dot(sphere_to_ray) - 1

    const discriminant = b**2 - 4*a*c

    // The discriminant is the key - if it's negative, the ray misses the sphere
    if (discriminant < 0 ) { return [] }

    // Otherwise, the equation has two solutions, which could be the same, if the
    // ray intersects at a perfect tangent
    const t1 = (-b - Math.sqrt(discriminant)) / ( 2 * a )
    const t2 = (-b + Math.sqrt(discriminant)) / ( 2 * a )

    return [intersection(t1, s), intersection(t2, s)]
  }
  
  get toString() { return `TestShape(), ID: ${this._id}, Transformation matrix: ${this._transform.d}` }
}

class Sphere extends AbstractShape {
  // The Sphere class represents a sphere object with data. This is the new norm.
  // Default values are set in the constructor and/or parameters.
  // Using getters and setters allows direct assignment, such as sphere.transform = translation(1, 2, 3)
  // Constructor fields are not really private.
  
  constructor() {
    super()
  }
  
  get toString() { return `Sphere(), ID: ${this._id}, Transformation matrix: ${this._transform.d}` }
}