import { triangle, vec3d } from "./types"

export function orderTris(trisToRaster: triangle[]) {
  // Sort from '''z-index''' back to front
  trisToRaster.sort((a: triangle, b: triangle) => {
    const elem1 = (a.p[0].z + a.p[1].z + a.p[2].z) / 3
    const elem2 = (b.p[0].z + b.p[1].z + b.p[2].z) / 3
    return elem2 - elem1
  })
  return trisToRaster
}
