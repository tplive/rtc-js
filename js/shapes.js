// *** SHAPE CLASSES
class AbstractShape {
  // Abstract class that all shapes should inherit from
  
  constructor() {
    this._id = C.unique_id()
    this._transform = idmatrix()
    this._transform_inverse = idmatrix()
    this._material = material()
    this._casts_shadow = true
    if (this.constructor == AbstractShape) { throw new TypeError("Cannot instantiate an abstract class.") }
  }
  
  get id() { return this._id }
  get transform() { return this._transform }
  get transform_inverse() { return this._transform_inverse }
  get material() { return this._material }
  get casts_shadow() { return this._casts_shadow }
  get saved_ray() { return this._saved_ray }
  
  set transform(value) {
    if (value.d != undefined) {
      this._transform = value
      // Check if this is more expensive:
      this._transform_inverse = value.inverse()
    }
  }
  
  set material(mat) {
    if (mat.ambient != undefined) {
      this._material = mat
    }
  }

  set casts_shadow(tf) { this._casts_shadow = tf === true ? true : false }
  
  intersect(ray) {
    this._saved_ray = ray.transform(this._transform_inverse)
    
    return this._intersect(this._saved_ray)
  }
  
  normalAt(world_point) {
    
    return this._normal_at(this._transform_inverse.times_tuple(world_point))
  }
  
  _intersect(local_ray) { throw new Error("Abstract method.") }
  _normal_at(local_point) { throw new Error("Abstract method.") }
    
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

    return [intersection(t1, this), intersection(t2, this)]
  }
  
  _normal_at(local_normal) { 
    
    const world_normal = this._transform_inverse.transpose().times_tuple(local_normal)
    
    return world_normal.toVector().normalize()
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

    return [intersection(t1, this), intersection(t2, this)]
  }
  
  _normal_at(local_normal) { 
    
    const world_normal = this._transform_inverse.transpose().times_tuple(local_normal)
    
    return world_normal.toVector().normalize()
  }
  
  get toString() { return `Sphere(), ID: ${this._id}, Transformation matrix: ${this._transform.d}` }
}

class Plane extends AbstractShape {
  // The Plane represents a completely flat surface that extends infinitely in two directions.
  
  constructor() {
    super()
    this._normal = vector(0, 1, 0)
  }
  
  _intersect(local_ray) {
    // Intersect returns an array of points where a given ray (local_ray) intersects this plane.
    // This is an internal method, should never be called from the outside.
    // Instead call intersect(ray), which is inherited from AbstractShape.
    
    // This is how a Plane does intersection:
    
    // Ray is parallel to the plane if it has no slope in y at all.
    if (Math.abs(local_ray.direction.y) < C.EPSILON ) {
      // Return empty intersection array
      
      return []
    }
    
    const t = local_ray.origin.negate().y / local_ray.direction.y
    
    if (t < C.EPSILON) {
    
      return []
    } else {
    
      return [intersection(t, this)]
    }
  }
  
  _normal_at(local_normal) { return this._normal }
  
  get toString() { return `Plane(), ID: ${this._id}, Transformation matrix: ${this._transform.d}` }
}

class Cube extends AbstractShape {
  // The cube is defined as an AABB - Axis-Aligned Bounding Box. That is, a shape where sides are
  // aligned with the scene's axes - two are aligned with the x-axis, two with the y-axis and two
  // with the z-axis. They always start centered in the origin and extend -1 and +1 in each direction.
  // Then we use transformation matrices to scale, rotate and translate any way we want.
  
  constructor() {
    super()
  }
  
  _check_axis(origin, direction) {
    const tmin_numerator = -1 - origin
    const tmax_numerator = 1 - origin
    
    let tmin, tmax
    
    if (Math.abs(direction) >= C.EPSILON ) {
      tmin = tmin_numerator / direction
      tmax = tmax_numerator / direction
    } else {
      tmin = tmin_numerator * Infinity
      tmax = tmax_numerator * Infinity
    }
    
    if (tmin > tmax) {
      [tmin, tmax] = [tmax, tmin]
    }
    
    return { min: tmin, max: tmax }
  }
  
  _intersect(local_ray) {
    const xt = this._check_axis(local_ray.origin.x, local_ray.direction.x)
    const yt = this._check_axis(local_ray.origin.y, local_ray.direction.y)
    const zt = this._check_axis(local_ray.origin.z, local_ray.direction.z)
    
    const tmin = Math.max(xt.min, yt.min, zt.min)
    const tmax = Math.min(xt.max, yt.max, zt.max)
    
    if (tmin > tmax) { return [] }
    
    return [ intersection(tmin, this), intersection(tmax, this) ]
  }
  
  _normal_at(local_normal) {
    
    const maxc = Math.max(Math.abs(local_normal.x), Math.abs(local_normal.y), Math.abs(local_normal.z))
    
    if (maxc === Math.abs(local_normal.x)) {
      
      return vector(local_normal.x, 0, 0)
    } else if (maxc === Math.abs(local_normal.y)) {
      
      return vector(0, local_normal.y, 0)
    } else {
      
      return vector(0, 0, local_normal.z)
    }
  }
  
  get toString() { return `Cube(), ID: ${this._id}, Transformation matrix: ${this._transform.d}` }
}

class Cylinder extends AbstractShape {
  // The cylinder is for convenience defined as an infinitely long shape, 
  // with a radius of 1. The cylinder has controls to set its length 
  // and to allow one or both ends to be either open or capped.
  
  constructor() {
    super()
    this._minimum = -Infinity
    this._maximum = Infinity
    this._closed = false
  }
  
  _check_cap(ray, t) {
    // Helper function to reduce duplication. Checks to see if 
    // intersection at 't' is within a radius of 1 (radius of cylinder)
    // from the y axis.
    
    const x = ray.origin.x + t * ray.direction.x
    const z = ray.origin.z + t * ray.direction.z
    
    return (x**2 + z**2) <= 1.0
  }
  
  _intersect_caps(ray, xs) {
    
    // Caps only matter if the cylinder is closed, and might possibly
    // be intersected by the ray
    if (this._closed === false || Math.abs(ray.direction.y) <= C.EPSILON) { 
      //log("error", "_intersect_caps(): Cyl not closed or ray y close to 0")
      return xs 
    }
    
    //log("error", "_intersect_caps(): " + ray.direction.y)
    
    // Check for an intersection with the lower end cap by intersecting
    // the ray with the plane at y = cyl.minimum
    const t0 = (this.minimum - ray.origin.y) / ray.direction.y
    if (this._check_cap(ray, t0) ) { 
    
      //log("error", "_intersect_caps(): Intersection with lower end cap")
      xs.push(intersection(t0, this)) 
    }
    
    // Check for an intersection with the upper end cap by intersecting
    // the ray with the plane at y = cyl.maximum
    const t1 = (this.maximum - ray.origin.y) / ray.direction.y
    if (this._check_cap(ray, t1) ) { 
      //log("error", "_intersect_caps(): Intersection with upper end cap")
      
      xs.push(intersection(t1, this)) 
    }
    
    return xs
  }
    
  _intersect(local_ray) {
    
    const xs = []
    
    const a = local_ray.direction.x ** 2 + local_ray.direction.z ** 2
    
    // ray is parallel to the y axis
    if (a >= C.EPSILON) {
    
      const b = 2 * local_ray.origin.x * local_ray.direction.x + 
                2 * local_ray.origin.z * local_ray.direction.z
      
      const c = local_ray.origin.x ** 2 + local_ray.origin.z ** 2 - 1
      
      const disc = b ** 2 - 4 * a * c
      
      // ray does not intersect the cylinder
      if (disc < 0) { return [] }
      
      let t0 = (-b - Math.sqrt(disc)) / (2 * a)
      let t1 = (-b + Math.sqrt(disc)) / (2 * a)
      
      // Swap
      if (t0 > t1) {
        const tmp = t0
        t0 = t1
        t1 = tmp
      }  
      
      const y0 = local_ray.origin.y + t0 * local_ray.direction.y
      if (this._minimum < y0 && y0 < this._maximum ) { 
        //log("error", "_intersect(): y0 = " + y0)
        xs.push(intersection(t0, this))   
      }
      
      const y1 = local_ray.origin.y + t1 * local_ray.direction.y
      if (this._minimum < y1 && y1 < this._maximum ) { 
        //log("error", "_intersect(): y1 = " + y1)
        xs.push(intersection(t1, this)) 
      }
            
      //log("error", `minimum(${this._minimum}) < y0(${y0}) < maximum(${this._maximum}), minimum(${this._minimum}) < y1(${y1}) < maximum(${this._maximum})`)
    
      return this._intersect_caps(local_ray, xs)
    } else {
      // If a < C.EPSILON, skip cylinder intersection logic and just check end caps.
      
      return this._intersect_caps(local_ray, xs)
    }
  }
  
  _normal_at(local_normal) {
    
    // compute the square of the distance from the y axis
    const dist = local_normal.x**2 + local_normal.z**2
    
    //log("error", "_normal_at(): dist = " + dist)
    
    if (dist < 1.0 && local_normal.y >= (this._maximum - C.EPSILON) ) { 
      
      //log("error", "_normal_at():  " + vector(0, 1, 0))
      return vector(0, 1, 0)
    } else if (dist < 1.0 && local_normal.y <= (this._minimum + C.EPSILON) ) { 
      
      //log("error", "_normal_at(): + " + vector(0, -1, 0))
      return vector(0, -1, 0)
    } else {
      
      //log("error", "_normal_at(): local_normal = " + vector(local_normal.x, 0, local_normal.z))
      return vector(local_normal.x, 0, local_normal.z)
    }
  }
  
  get minimum()  { return this._minimum }
  get maximum()  { return this._maximum }
  get closed()   { return this._closed  }
  
  set minimum(v) { this._minimum = v    }
  set maximum(v) { this._maximum = v    }
  set closed(v)  { this._closed = v     }
  
  get toString() { return `Cylinder(), ID: ${this._id}, Transformation matrix: ${this._transform.d}` }
}
