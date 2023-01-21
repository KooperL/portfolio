export type Noise3D = (x: number, y: number, z: number) => number

export type Matrix = number[][]

export interface Dims {
  w: number
  h: number
}

export interface Colours {
  fill: string
  stroke: string
  strokeWidth: number
}

export interface translations {
  x: number
  y: number
  z: number
}

export interface transformations {
  roll: number
  pitch: number
  yaw: number
}

export interface RenderProps {
  dims: Dims
  colours: Colours
  name: string
  transformations?: transformations
  translations?: translations
}

export interface ClippingVecs {
  nearPlane: vec3d
  farPlane: vec3d
  vecOrigin: vec3d
  vecY: vec3d
  vecBottom: vec3d
  vecMY: vec3d
  vecX: vec3d
  vecRight: vec3d
  vecMX: vec3d
}

export interface Vector {
  x: number
  y: number
  z: number
  w: number
}

export class vec3d {
  public x: number
  public y: number
  public z: number
  public w
  constructor(x = NaN, y = NaN, z = NaN, w = 1) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }
}

// infiniteUpdate() {
//   while(true) {
//     setTimeout((() => this.updateZ()),500);
//   }
// }

// infiniteScroll(speed = 1) {
//   while(true) {
//     setTimeout((() => {
//       this.tris.map((tris, triInd) => {
//         cardinalTranslate(tris, 0, speed, 0);
//       })

//     }),500);
//   }
// }

export class triangle {
  public p
  public c
  public e

  constructor() {
    // this.p = new Array(3).fill(vec3d);
    this.p = [new vec3d(), new vec3d(), new vec3d()]
    this.c = {
      fill: "red",
      stroke: "", // Colour of stroke
      strokeWidth: 0.01,
    }
    this.e = {}
  }
}

export class mat4x4 {
  public m: Matrix
  private arr: number[][] | undefined
  constructor(arr = undefined) {
    this.arr = arr
    if (this.arr === undefined) {
      this.m = new Array(4).fill(new Array(4))
    } else {
      this.m = this.arr
    }
  }
}
