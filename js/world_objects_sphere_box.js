const side = 40
const white = color(1, 1, 1)
const black = color(0, 0, 0)
const red = color(1, 0, 0)
const green = color(0, 1, 0)
const blue = color(0, 0, 1)

const floor = sphere()
floor.transform = translation(0, -side, 0).times_matrix(scaling(100, 0.01, 100))
floor.material.color = white
myworld.addObject(floor)

const ceiling = sphere()
ceiling.transform = translation(0, side, 0).times_matrix(scaling(100, 0.01, 100))
ceiling.material.color = red
myworld.addObject(ceiling)

const back_wall = sphere()
back_wall.transform = translation(0, 0, side).times_matrix(scaling(100, 100, 0.01))
myworld.addObject(back_wall)

const front_wall = sphere()
front_wall.transform = translation(0, 0, -side).times_matrix(scaling(100, 100, 0.01))
front_wall.material.color = white
myworld.addObject(front_wall)

const left_wall = sphere()
left_wall.transform = translation(-side, 0, 0).times_matrix(scaling(0.01, 100, 100))
left_wall.material.color = white
myworld.addObject(left_wall)

const right_wall = sphere()
right_wall.transform = translation(side, 0, 0).times_matrix(scaling(0.01, 100, 100))
right_wall.material.color = white
myworld.addObject(right_wall)