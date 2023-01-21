import { vec3d } from "../types"

function lerp3d(start: vec3d, end: vec3d, t: number) {
  if (t > 0 && t < 1) {
    return new vec3d(
      start.x + (end.x - start.x) * t,
      start.y + (end.y - start.y) * t,
      start.z + (end.z - start.z) * t,
    )
  }
}

function lerp(start: number, end: number, percent: number) {
  return start + (end - start) * percent
}

function range(x: number, y: number): number[] {
  return x > y ? [] : [x, ...range(x + 1, y)]
}

function randomProperty(obj: any) {
  var keys = Object.keys(obj)
  return obj[keys[(keys.length * Math.random()) << 0]]
}

function randomPermutation(length: number) {
  // let arr = range(0, length);
  let perm = new Array(length)
  let validChoices = [...perm]
  for (let i = 0; i < length; i++) {
    let choice = validChoices.splice(randomProperty(validChoices), 1)
    perm[i] = choice[0]
  }
  return perm
}

function smoothDistance(d: number) {
  return d * d * d * (d * (d * 6 - 15) + 10)
}

function get3dPerlinNoise(point: vec3d, frequency: number): number {
  let permutationCount = 255
  let permutation = randomPermutation(permutationCount)

  point.x *= frequency
  point.y *= frequency
  point.z *= frequency
  ;((point: vec3d): number => {
    const flooredPointX0 = Math.floor(point.x)
    const flooredPointY0 = Math.floor(point.y)
    const flooredPointZ0 = Math.floor(point.z)

    const distanceX0 = point.x - flooredPointX0
    const distanceY0 = point.y - flooredPointY0
    const distanceZ0 = point.z - flooredPointZ0

    // bitwise and to make sure val is between range??

    const flooredPointX1 = flooredPointX0 + 1
    const flooredPointY1 = flooredPointY0 + 1
    const flooredPointZ1 = flooredPointZ0 + 1

    const permutationX0 = permutation[flooredPointX0]
    const permutationX1 = permutation[flooredPointX1]

    const permutationY00 = permutation[permutationX0 + flooredPointY0]
    const permutationY10 = permutation[permutationX1 + flooredPointY0]
    const permutationY01 = permutation[permutationX0 + flooredPointY1]
    const permutationY11 = permutation[permutationX1 + flooredPointY1]

    const permutationZ000 = permutation[permutationY00 + flooredPointZ0]
    const permutationZ100 = permutation[permutationY10 + flooredPointZ0]
    const permutationZ010 = permutation[permutationY01 + flooredPointZ0]
    const permutationZ110 = permutation[permutationY11 + flooredPointZ0]
    const permutationZ001 = permutation[permutationY00 + flooredPointZ1]
    const permutationZ101 = permutation[permutationY01 + flooredPointZ1]
    const permutationZ011 = permutation[permutationY10 + flooredPointZ1]
    const permutationZ111 = permutation[permutationY11 + flooredPointZ1]

    const smoothDistanceX = smoothDistance(distanceX0)
    const smoothDistanceY = smoothDistance(distanceY0)
    const smoothDistanceZ = smoothDistance(distanceZ0)

    return (
      lerp(
        lerp(
          lerp(permutationZ000, permutationZ100, distanceX0),
          lerp(permutationZ010, permutationZ110, distanceX0),
          distanceY0,
        ),
        lerp(
          lerp(permutationZ001, permutationZ101, distanceX0),
          lerp(permutationZ011, permutationZ111, distanceX0),
          distanceY0,
        ),
        distanceZ0,
      ) *
      (1 / permutationCount)
    )
  })(point)

  return 0
}

// https://www.youtube.com/watch?v=SoakEoUQ7Rg&t=239s
