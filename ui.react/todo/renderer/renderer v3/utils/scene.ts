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
  Triangle_ClipAgainstPlane,
  mat_inverse,
  mat_point_at,
  vec_add,
  multiply_vecmat,
  matRotY,
  vec_multiply
} from './math';
import perlin from "./todo/perlin";

import { ClippingVecs, Colours, Dims, mat4x4, Noise3D, transformations, translations, triangle, vec3d } from "./types";
import { orderTris } from "./utils";


export class Scene {
  private framesPerSecond = 1000;
  private objects: any[] = [];

  // public tris: triangle[];
  // public verts;
  public trisToRaster: triangle[];
  private clippingVecs: ClippingVecs;
  public dims: Dims;
  public ticket: number;
  private worldTransformations: transformations;
  private cameraTransformations: transformations;
  private worldTranslations: translations;

  private vCamera: vec3d;
  private vLookDir: vec3d;
  private lightDirection: vec3d;
  private matproj: mat4x4;
  public matView: mat4x4;

  constructor(dims: Dims) {
    this.worldTransformations = {
      pitch: 0,
      roll: 0,
      yaw: 0
    };
    this.worldTranslations = {
      x: 0,
      y: 0,
      z: 0
    };
    this.cameraTransformations = {
      pitch: 0,
      yaw: 0,
      roll: 0
    };
    this.dims = dims;


    this.vCamera = new vec3d(0, 1, -10);
    this.vLookDir = new vec3d(0, 0, 0, 1);
    this.ticket = 0;
    this.lightDirection = new vec3d(0,-2,-10);

    this.matView = this.createMatview();
    this.matproj = this.createMatproj(60);

    // this.verts = new Array();
    // this.tris = new Array();
    this.trisToRaster = new Array();
    this.clippingVecs =  {
      nearPlane: new vec3d(0,0,0.1),
      farPlane: new vec3d(0,0,1),
      vecOrigin: new vec3d(0,0,0),
      vecY: new vec3d(0,1,0),
      vecBottom: new vec3d(0,this.dims.h-1,0),
      vecMY: new vec3d(0,-1,0),
      vecX: new vec3d(1,0,0),
      vecRight: new vec3d(this.dims.w-1,0,0),
      vecMX: new vec3d(-1,0,0)
    };
  }

  setFps(num: number) {
    this.framesPerSecond = 1000 / num;
  }

  addObject(obj: any) {
    this.objects.push(obj);
  }

  refresh() {
    setTimeout(() => {
      console.log(this.vCamera, this.ticket)
      // if( new yaw) {
      this.matView = this.createMatview();
      // }
      this.render();
      console.log('her')
      this.clipTriangles();
      this.trisToRaster = orderTris(this.trisToRaster);
      this.ticket += 1;
      // this.find()
    }, this.framesPerSecond);
  }

  render () {
    this.trisToRaster = [];
    for (let i=0;i<this.objects.length;i++) {
      const obj = this.objects[i]
      obj.tris.forEach((tri: any) => {
        // console.log(tri)
        let triRotated = cardinalTransformation(tri, this.worldTransformations.roll, this.worldTransformations.pitch, this.worldTransformations.yaw);
        let triTranslated = cardinalTranslate(triRotated, this.worldTranslations.x, this.worldTranslations.y, this.worldTranslations.z);

        const line1 = vec_subtract(triTranslated.p[1], triTranslated.p[0]);
        const line2 = vec_subtract(triTranslated.p[2], triTranslated.p[0]);
        let normal = vec_normalise(vec_cross_product(line1, line2));

        let vCameraRay = vec_subtract(triTranslated.p[0], this.vCamera);
        if(vec_dot_product(normal, vCameraRay) < 0) {

          // Indicates how aligned light direction is with triangle face normal, -1<x<1
          const dp = (vec_dot_product(vec_normalise(this.lightDirection), normal)+1) / 2;

          // Convert world space to view space
          const triViewed = triangleMatMul(triTranslated, this.matView);

          let clipped = [new triangle(), new triangle()];
          let nClippedTriangles:[number, triangle[] | null] = [0, null];
          nClippedTriangles = Triangle_ClipAgainstPlane(this.clippingVecs.nearPlane, this.clippingVecs.farPlane, triViewed, clipped[0], clipped[1]);
          if(nClippedTriangles[0] && nClippedTriangles[1]) {
            for(let i=0;i<nClippedTriangles[0];i++) {

            // Project triangles from 3d -> 2d
            let triProjected = triangleMatMul(nClippedTriangles[1][i], this.matproj);

            for(let a=0;a<3;a++) {
              triProjected.p[a] = vec_divide(triProjected.p[a], triProjected.p[a].w);
            }

            for(let a=0;a<3;a++) {
              triProjected.p[a].x *= -1;
              triProjected.p[a].y *= -1;
            }

            // scale into real center??
            for(let a=0;a<3;a++) {
              triProjected.p[a].x *= (0.5 * this.dims.w);
              triProjected.p[a].y *= (0.5 * this.dims.h);
            }

            // Populate shade of triangle with light direction normal
            triProjected.c = {
              ...triProjected.c,
              fill: `${ConvertRGBtoHex(Math.floor(200*dp), Math.floor(200*dp), Math.floor(200*dp))}`
            };

            this.trisToRaster.push(triProjected);
            }
          }
        }
      });
    }
  }
  
  // simpleRaster(
  //   transformation: transformations,
  //   translation: translations
  // ) {
  //   this.trisToRaster = [];
  //   this.tris.forEach((tri) => {
  //     let triRotated = cardinalTransformation(tri, transformation.roll, transformation.pitch, transformation.yaw);
  //     let triTranslated = cardinalTranslate(triRotated, translation.x, translation.y, translation.z);

  //     let triProjected = triangleMatMul(triTranslated, matProj(this.dims.w, this.dims.h, this.dims.fov));

  //     // triangle clipping
  //     for(let a=0;a<3;a++) {
  //       triProjected.p[a].x *= (0.5 * this.dims.w);
  //       triProjected.p[a].y *= (0.5 * this.dims.h);
  //     }
  //     triProjected.c = tri.c
  //     this.trisToRaster.push(triProjected);
  //   });
  // }


  createMatview() {
    let vUp = new vec3d(0,1,0);
    let vTarget = new vec3d(0,0,1);
    let matCameraRotYaw = matRotY(this.cameraTransformations.yaw);
    const vLookDir = multiply_vecmat(vTarget, matCameraRotYaw);
    vTarget = vec_add(this.vCamera, vLookDir);
    let matCamera = mat_point_at(this.vCamera, vTarget, vUp);
    return mat_inverse(matCamera);
  }
  
  createMatproj(fov: number) {
    return matProj(this.dims.w, this.dims.h, fov);
  }

  clipTriangles() {
    let listTriangles: triangle[] = [];
    for (let triToRaster of this.trisToRaster) {
      let clipped = [new triangle(), new triangle()];
      listTriangles.push(triToRaster);
      let nNewTriangles = 1;
      for(let i=0;i<4;i++) {
        let nTrisToAdd: [number, triangle[] | null] = [0, null];
        while (nNewTriangles > 0) {
          let test = listTriangles.shift();
          nNewTriangles--;
          switch(i) {
            case 0:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(this.clippingVecs.vecOrigin, this.clippingVecs.vecY, test, clipped[0], clipped[1]);
              break;
            case 1:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(this.clippingVecs.vecBottom, this.clippingVecs.vecMY, test, clipped[0], clipped[1]);
              break;
            case 2:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(this.clippingVecs.vecOrigin, this.clippingVecs.vecX, test, clipped[0], clipped[1]);
              break;
            case 3:
              // @ts-ignore
              nTrisToAdd = Triangle_ClipAgainstPlane(this.clippingVecs.vecRight, this.clippingVecs.vecMX, test, clipped[0], clipped[1]);
              break;
          }
          if(nTrisToAdd[0] && nTrisToAdd[1]) {
            for(let w=0;w<nTrisToAdd[0];w++) {
              listTriangles.push(nTrisToAdd[1][w]);
            }
          }
        }
        nNewTriangles = listTriangles.length;
      }
    }
    this.trisToRaster = listTriangles;
  }

  controlCamera(e: string) {
    console.log(this.vCamera)
    let vForward = vec_multiply(this.vLookDir, 2.0);
    switch(e) {
      case 'w':
        this.vCamera = vec_add(this.vCamera, vForward);
        break;
      case 's':
        this.vCamera = vec_subtract(this.vCamera, vForward);
        break;
      case 'a':
        this.vCamera = new vec3d(this.vCamera.x + 1, this.vCamera.y, this.vCamera.z);
        break;
      case 'd':
        this.vCamera = new vec3d(this.vCamera.x - 1, this.vCamera.y, this.vCamera.z);
        break;
      case 'ArrowUp':
        this.vCamera = new vec3d(this.vCamera.x, this.vCamera.y + 1, this.vCamera.z);
        // setPitch(pitch + 0.1)
        break;
      case 'ArrowDown':
        this.vCamera = new vec3d(this.vCamera.x, this.vCamera.y - 1, this.vCamera.z);
        // setPitch(pitch - 0.1)
        break;
      case 'ArrowLeft':
        this.cameraTransformations.yaw = this.cameraTransformations.yaw - 0.01;
        break;
      case 'ArrowRight':
        this.cameraTransformations.yaw = this.cameraTransformations.yaw + 0.01;
        break;
    };
  }

  find() {
    let averages: {x: number[], y: number[], z: number[]} = {x: [], y: [], z:[]}
    this.trisToRaster.forEach((item: triangle, ind) => {
      averages.x.push(item.p[0].x)
      averages.y.push(item.p[0].y)
      averages.z.push(item.p[0].z)
    });

    let averageX = averages.x.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
    let averageY = averages.y.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
    let averageZ = averages.z.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
    return [averageX, averageY, averageZ];
  }
}






// function setup() {
//   world.fps()
//   world.add(new Grid)

// }

// function draw() {
//   world.translate()



//   world.render()
// }
