import { makeNoise3D } from "open-simplex-noise"

import {
  matProj,
  vec_subtract,
  vec_cross_product,
  vec_divide,
  cardinalTransformation,
  vec_dot_product,
  // rgbToHex,
  ConvertRGBtoHex,
  cardinalTranslate,
  vec_normalise,
  triangleMatMul,
  Triangle_ClipAgainstPlane,
} from "../utils/math"
import perlin from "./todo/perlin"

import {
  ClippingVecs,
  Colours,
  Dims,
  mat4x4,
  Noise3D,
  transformations,
  translations,
  triangle,
  vec3d,
} from "./types"

export class Obj {
  public tris: triangle[]
  public verts
  public trisToRaster // type
  private clippingVecs: ClippingVecs
  public dims: Dims

  constructor(dims: Dims) {
    this.verts = new Array()
    this.tris = new Array()
    this.trisToRaster = new Array()
    this.dims = dims
    this.clippingVecs = {
      nearPlane: new vec3d(0, 0, 0.1),
      farPlane: new vec3d(0, 0, 1),
      vecOrigin: new vec3d(0, 0, 0),
      vecY: new vec3d(0, 1, 0),
      vecBottom: new vec3d(0, this.dims.h - 1, 0),
      vecMY: new vec3d(0, -1, 0),
      vecX: new vec3d(1, 0, 0),
      vecRight: new vec3d(this.dims.w - 1, 0, 0),
      vecMX: new vec3d(-1, 0, 0),
    }
  }

  parseObj(text: string) {
    const lines = text.split("\n")
    lines.forEach((item: string, ind: number) => {
      let coords = item.split(" ")
      if (coords[0] === "v") {
        this.verts.push(
          new vec3d(
            parseFloat(coords[1]),
            parseFloat(coords[2]),
            parseFloat(coords[3]),
          ),
        )
      } else if (coords[0] === "f") {
        let temp = new triangle()
        temp.p = [
          this.verts[+coords[1] - 1],
          this.verts[+coords[2] - 1],
          this.verts[+coords[3] - 1],
        ]
        this.tris.push(temp)
      }
    })
  }

  orderTris() {
    // Sort from '''z-index''' back to front
    this.trisToRaster.sort((a: triangle, b: triangle) => {
      const elem1 = (a.p[0].z + a.p[1].z + a.p[2].z) / 3
      const elem2 = (b.p[0].z + b.p[1].z + b.p[2].z) / 3
      return elem2 - elem1
    })
  }

  raster(
    vCamera: vec3d,
    lightDirection: vec3d,
    matView: mat4x4,
    transformation: { roll: number; pitch: number; yaw: number },
    translation: { x: number; y: number; z: number },
  ) {
    this.trisToRaster = []
    this.tris.forEach(tri => {
      let triRotated = cardinalTransformation(
        tri,
        transformation.roll,
        transformation.pitch,
        transformation.yaw,
      )
      let triTranslated = cardinalTranslate(
        triRotated,
        translation.x,
        translation.y,
        translation.z,
      )

      const line1 = vec_subtract(triTranslated.p[1], triTranslated.p[0])
      const line2 = vec_subtract(triTranslated.p[2], triTranslated.p[0])
      let normal = vec_normalise(vec_cross_product(line1, line2))

      let vCameraRay = vec_subtract(triTranslated.p[0], vCamera)
      if (vec_dot_product(normal, vCameraRay) < 0) {
        // Indicates how aligned light direction is with triangle face normal, -1<x<1
        const dp =
          (vec_dot_product(vec_normalise(lightDirection), normal) + 1) / 2

        // Convert world space to view space
        const triViewed = triangleMatMul(triTranslated, matView)

        let clipped = [new triangle(), new triangle()]
        let nClippedTriangles: [number, triangle[] | null] = [0, null]
        nClippedTriangles = Triangle_ClipAgainstPlane(
          this.clippingVecs.nearPlane,
          this.clippingVecs.farPlane,
          triViewed,
          clipped[0],
          clipped[1],
        )
        if (nClippedTriangles[0] && nClippedTriangles[1]) {
          for (let i = 0; i < nClippedTriangles[0]; i++) {
            // Project triangles from 3d -> 2d
            let triProjected = triangleMatMul(
              nClippedTriangles[1][i],
              matProj(this.dims.w, this.dims.h, this.dims.fov),
            )

            for (let a = 0; a < 3; a++) {
              triProjected.p[a] = vec_divide(
                triProjected.p[a],
                triProjected.p[a].w,
              )
            }

            for (let a = 0; a < 3; a++) {
              triProjected.p[a].x *= -1
              triProjected.p[a].y *= -1
            }

            // scale into real center??
            for (let a = 0; a < 3; a++) {
              triProjected.p[a].x *= 0.5 * this.dims.w
              triProjected.p[a].y *= 0.5 * this.dims.h
            }

            // Populate shade of triangle with light direction normal
            triProjected.c = {
              ...triProjected.c,
              fill: `${ConvertRGBtoHex(
                Math.floor(200 * dp),
                Math.floor(200 * dp),
                Math.floor(200 * dp),
              )}`,
            }

            this.trisToRaster.push(triProjected)
          }
        }
      }
    })
  }

  simpleRaster(transformation: transformations, translation: translations) {
    this.trisToRaster = []
    this.tris.forEach(tri => {
      let triRotated = cardinalTransformation(
        tri,
        transformation.roll,
        transformation.pitch,
        transformation.yaw,
      )
      let triTranslated = cardinalTranslate(
        triRotated,
        translation.x,
        translation.y,
        translation.z,
      )

      let triProjected = triangleMatMul(
        triTranslated,
        matProj(this.dims.w, this.dims.h, this.dims.fov),
      )

      // triangle clipping
      for (let a = 0; a < 3; a++) {
        triProjected.p[a].x *= 0.5 * this.dims.w
        triProjected.p[a].y *= 0.5 * this.dims.h
      }
      triProjected.c = tri.c
      this.trisToRaster.push(triProjected)
    })
  }

  clipTriangles() {
    let listTriangles: triangle[] = []
    for (let triToRaster of this.trisToRaster) {
      let clipped = [new triangle(), new triangle()]
      listTriangles.push(triToRaster)
      let nNewTriangles = 1
      for (let i = 0; i < 4; i++) {
        let nTrisToAdd: [number, triangle[] | null] = [0, null]
        while (nNewTriangles > 0) {
          let test = listTriangles.shift()
          nNewTriangles--
          switch (i) {
            case 0:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(
                this.clippingVecs.vecOrigin,
                this.clippingVecs.vecY,
                test,
                clipped[0],
                clipped[1],
              )
              break
            case 1:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(
                this.clippingVecs.vecBottom,
                this.clippingVecs.vecMY,
                test,
                clipped[0],
                clipped[1],
              )
              break
            case 2:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(
                this.clippingVecs.vecOrigin,
                this.clippingVecs.vecX,
                test,
                clipped[0],
                clipped[1],
              )
              break
            case 3:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(
                this.clippingVecs.vecRight,
                this.clippingVecs.vecMX,
                test,
                clipped[0],
                clipped[1],
              )
              break
          }
          if (nTrisToAdd[0] && nTrisToAdd[1]) {
            for (let w = 0; w < nTrisToAdd[0]; w++) {
              listTriangles.push(nTrisToAdd[1][w])
            }
          }
        }
        nNewTriangles = listTriangles.length
      }
    }
    this.trisToRaster = listTriangles
  }

  find() {
    let averages: { x: number[]; y: number[]; z: number[] } = {
      x: [],
      y: [],
      z: [],
    }
    this.trisToRaster.forEach((item: triangle, ind) => {
      averages.x.push(item.p[0].x)
      averages.y.push(item.p[0].y)
      averages.z.push(item.p[0].z)
    })

    let averageX = averages.x.reduce(function (avg, value, _, { length }) {
      return avg + value / length
    }, 0)
    let averageY = averages.y.reduce(function (avg, value, _, { length }) {
      return avg + value / length
    }, 0)
    let averageZ = averages.z.reduce(function (avg, value, _, { length }) {
      return avg + value / length
    }, 0)
    return [averageX, averageY, averageZ]
  }
}
// {obj.trisToRaster.map((triangle, triangleIndex) => (
//   <polygon key={triangleIndex}
//     points={`${triangle.p[0].x+Math.abs(triangle.p[0].x)},${triangle.p[0].y+Math.abs(triangle.p[0].y)} ${triangle.p[1].x+Math.abs(triangle.p[1].x)},${triangle.p[1].y+Math.abs(triangle.p[1].y)} ${triangle.p[2].x+Math.abs(triangle.p[2].x)},${triangle.p[2].y+Math.abs(triangle.p[2].y)}
//     `}

export class Grid extends Obj {
  private rows
  private cols
  private size
  private noise: Noise3D | undefined | perlin

  constructor(dims: Dims, colour: Colours, rows = 100, cols = 100, size = 10) {
    // this.noise = new perlin();
    super(dims)
    this.noise = makeNoise3D(Date.now())
    this.rows = rows
    this.cols = cols
    this.size = size
    for (let x = 0; x < cols; x += size) {
      for (let y = 0; y < rows; y += size) {
        let tri1 = new triangle()
        tri1.p = [
          new vec3d(x, y, 1),
          new vec3d(x + size, y, 1),
          new vec3d(x, y + size, 1),
        ]
        let tri2 = new triangle()
        tri2.p = [
          new vec3d(x + size, y, 1),
          new vec3d(x + size, y + size, 1),
          new vec3d(x, y + size, 1),
        ]
        tri1.c = colour
        tri2.c = colour
        this.tris.push(tri1, tri2)
      }
    }
  }

  noiseWarpZ(ticker: number, z: number, multiplier: number = 7) {
    if (this.noise == undefined) {
      return
    }
    this.tris.forEach((tri, triInd) => {
      tri.p.forEach((vert: vec3d, vertInd: number) => {
        // this.tris[triInd].p[vertInd].z = this.perlin?.get(vert.x/this.cols, vert.y/this.rows, ticker*5;
        // @ts-ignore
        this.tris[triInd].p[vertInd].z =
          (this.noise(vert.x / this.cols, vert.y / this.rows, z) + 1) **
          multiplier
        // this.tris[triInd].p[vertInd].z = Math.random()*5;
      })
    })
  }
}
