const side = 50
const white = color(1, 1, 1)
const black = color(0, 0, 0)
const red = color(1, 0, 0)
const green = color(0, 1, 0)
const blue = color(0, 0, 1)

const floor = plane()
floor.transform = translation(0, -side, 0)
floor.material.pattern = stripe_pattern(random_color(), random_color())
floor.material.pattern.transform = rotation_y(π / 4)
myworld.addObject(floor)

const ceiling = plane()
ceiling.transform = translation(0, side, 0)
ceiling.material.pattern = stripe_pattern(random_color(), random_color())
ceiling.material.pattern.transform = rotation_y(π / 6)
myworld.addObject(ceiling)

const back_wall = plane()
back_wall.material.pattern = stripe_pattern(random_color(), random_color())
back_wall.material.pattern.transform = rotation_y(π / 4)
back_wall.transform = translation(0, 0, side).times_matrix(rotation_x(π / 2))
myworld.addObject(back_wall)

const front_wall = plane()
front_wall.material.pattern = stripe_pattern(random_color(), random_color())
front_wall.material.pattern.transform = rotation_y(π / 6)
front_wall.transform = translation(0, 0, -side).times_matrix(rotation_x(π / 2))
myworld.addObject(front_wall)

const left_wall = plane()
left_wall.material.pattern = stripe_pattern(random_color(), random_color())
left_wall.material.pattern.transform = rotation_y(π / 4)
left_wall.transform = translation(-side, 0, 0).times_matrix(rotation_z(π / 2))
myworld.addObject(left_wall)

const right_wall = plane()
right_wall.transform = translation(side, 0, 0).times_matrix(rotation_z(π / 2))
right_wall.material.pattern = stripe_pattern(random_color(), random_color())
right_wall.material.pattern.transform = rotation_y(π / 6)
myworld.addObject(right_wall)