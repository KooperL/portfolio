import { makeNoise3D } from "open-simplex-noise";

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
  Triangle_ClipAgainstPlane
} from './math';
import perlin from "./todo/perlin";

import { ClippingVecs, Colours, Dims, mat4x4, Noise3D, transformations, translations, triangle, vec3d } from "./types";

export class Obj {
  private type;
  constructor(type: string) {
    switch(type) {
      case 'mesh':
        this.type = 'mesh'
    }
  }
}

export class Mesh extends Obj {
  public tris: triangle[];

  constructor(tris?: triangle[]) {
  super('mesh');
  this.tris = tris ?? [];
  }

  fromOBJ(text: string) {
    let verts:vec3d[] = [];
    const lines = text.split('\n');
    lines.forEach((item: string, ind:number) => {
      let coords = item.split(' ');
      if(coords[0] === 'v') {
        verts.push(new vec3d(parseFloat(coords[1]), parseFloat(coords[2]), parseFloat(coords[3])));
      } else if(coords[0] === 'f') {
        let temp = new triangle()
        temp.p = [verts[+coords[1]-1], verts[+coords[2]-1], verts[+coords[3]-1]]
        this.tris.push(temp);
      }
    });
  }
}
// {obj.trisToRaster.map((triangle, triangleIndex) => (
//   <polygon key={triangleIndex}
//     points={`${triangle.p[0].x+Math.abs(triangle.p[0].x)},${triangle.p[0].y+Math.abs(triangle.p[0].y)} ${triangle.p[1].x+Math.abs(triangle.p[1].x)},${triangle.p[1].y+Math.abs(triangle.p[1].y)} ${triangle.p[2].x+Math.abs(triangle.p[2].x)},${triangle.p[2].y+Math.abs(triangle.p[2].y)}
//     `}

export class Grid extends Obj{
  private rows;
  private cols;
  private size;
  private noise: (Noise3D | undefined | perlin);
  private tris: triangle[];

  constructor(colour: Colours, rows = 100, cols = 100, size = 10) {
    super('mesh')
    // this.noise = new perlin();
    this.tris = [];
    this.noise = makeNoise3D(Date.now());
    this.rows = rows;
    this.cols = cols;
    this.size = size;
    for(let x = 0; x < cols; x += size) {
      for(let y = 0; y < rows; y += size) {
        let tri1 = new triangle();
        tri1.p = [
          new vec3d(x, y, 1),
          new vec3d(x + size, y, 1),
          new vec3d(x, y + size, 1)
        ];
        let tri2 = new triangle();
        tri2.p = [
          new vec3d(x + size, y, 1),
          new vec3d(x + size, y + size, 1),
          new vec3d(x, y + size, 1)
        ];
        tri1.c = colour;
        tri2.c = colour;
        this.tris.push(tri1, tri2);
      }
    }
  }

  noiseWarpZ(ticker: number, z: number, multiplier: number = 7) {
    if(this.noise == undefined) {return}
    this.tris.forEach((tri, triInd) => {
      tri.p.forEach((vert: vec3d, vertInd: number) => {
          // this.tris[triInd].p[vertInd].z = this.perlin?.get(vert.x/this.cols, vert.y/this.rows, ticker*5;
          // @ts-ignore
          this.tris[triInd].p[vertInd].z = (this.noise(vert.x/this.cols, vert.y/this.rows, z)+1)**multiplier;
          // this.tris[triInd].p[vertInd].z = Math.random()*5;
      });
    });
  }
}