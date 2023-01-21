// import React, { useEffect, useState, useRef } from "react";
// import { Matrix, Vector, vec3d, triangle, mat4x4 } from "../utils/types";
// import { MultiplyMatrixVector,
//   matProj,
//   vec_subtract,
//   vec_cross_product,
//   vec_normal,
//   vec_divide,
//   cardinalTransformation,
//   vec_dot_product,
//   // rgbToHex,
//   ConvertRGBtoHex,
//   cardinalTranslate,
//   vec_normalise,
//   matRotY,
//   matRotX,
//   mat_inverse,
//   multiply_vecmat,
//   vec_add,
//   mat_multiply,
//   mat_point_at,
//   triangleMatMul,
//   gcd,
//   world_matrix,
//   identity_matrix,
//   mat_make_trans,
//   vec_multiply
// } from '../utils/math';
// // @ts-ignore
// import ship from './ship.obj';
// import { useEventListener } from "../utils/helpers";
// import { RasterSVG } from "../Draw";
// import { Mesh, Obj } from "../utils/raster";
// import { Scene } from "../utils/scene";

// export function Render() {
//   const w = 1280;
//   const h = 720;
//   const dims = {w: w, h: h}

//   const name = 'render';
//   const [scene, setScene] = useState(new Scene(dims));
//   const [ticker, setticker] = useState(scene.ticket);

//   useEffect(() => {
//     const Ship = new Mesh();
//     fetch(ship).then(r => r.text()).then(text => {
//       Ship.fromOBJ(text);
//       scene.addObject(Ship)
//       scene.setFps(10)
//     });
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       scene.refresh()
//       console.log(123)
//       setticker(ticker+1)
//     }, 1000)

//   }, [ticker]);

//   useEventListener("keydown", ((e: any) => {
//     scene.controlCamera(e.key);
//   }));

//   return (
//     <div className="pt-20">
//       <RasterSVG name='name' tris={scene.trisToRaster} dims={dims} />
//     </div>
//   )
// }

import React, { useEffect, useState, useRef } from "react"

// @ts-ignore
import ship from "./ship.obj"
import { useEventListener } from "../utils/helpers"
import { RasterSVG } from "../Draw"
import { Mesh, Obj } from "../utils/raster"
import { Scene } from "../utils/scene"
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
  mat_inverse,
  mat_point_at,
  vec_add,
  multiply_vecmat,
  matRotY,
  vec_multiply,
} from "../utils/math"

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
} from "../utils/types"
import { orderTris } from "../utils/utils"

export function Render() {
  const w = 1280
  const h = 720
  const dims = { w: w, h: h }

  const name = "render"
  const [worldTransformations, setWorldTransformations] = useState({
    pitch: 0,
    roll: 0,
    yaw: 0,
  })
  const [worldTranslations, setWorldTranslations] = useState({
    x: 0,
    y: 0,
    z: 0,
  })
  const [cameraTransformations, setCameraTransformations] = useState({
    pitch: 0,
    yaw: 0,
    roll: 0,
  })

  const [objects, setObjects] = useState<any>([])

  const [vCamera, setVCamera] = useState(new vec3d(0, 1, -10))
  const [vLookDir, setVLookDir] = useState(new vec3d(0, 0, 0, 1))
  const [ticker, setTicker] = useState(0)
  const [lightDirection, setLightDirection] = useState(new vec3d(0, -2, -10))

  const [matView, setMatView] = useState(createMatview())
  const [matproj, setMatproj] = useState(createMatproj(60))

  // this.verts = new Array();
  // this.tris = new Array();
  const [trisToRaster, setTrisToRaster] = useState<Array<triangle>>([])
  const clippingVecs = {
    nearPlane: new vec3d(0, 0, 0.1),
    farPlane: new vec3d(0, 0, 1),
    vecOrigin: new vec3d(0, 0, 0),
    vecY: new vec3d(0, 1, 0),
    vecBottom: new vec3d(0, dims.h - 1, 0),
    vecMY: new vec3d(0, -1, 0),
    vecX: new vec3d(1, 0, 0),
    vecRight: new vec3d(dims.w - 1, 0, 0),
    vecMX: new vec3d(-1, 0, 0),
  }

  function createMatview() {
    let vUp = new vec3d(0, 1, 0)
    let vTarget = new vec3d(0, 0, 1)
    let matCameraRotYaw = matRotY(cameraTransformations.yaw)
    const vLookDir = multiply_vecmat(vTarget, matCameraRotYaw)
    vTarget = vec_add(vCamera, vLookDir)
    let matCamera = mat_point_at(vCamera, vTarget, vUp)
    return mat_inverse(matCamera)
  }

  function createMatproj(fov: number) {
    return matProj(dims.w, dims.h, fov)
  }

  function clipTriangles(trisToRaster: triangle[]) {
    return new Promise(r => {
      let listTriangles: triangle[] = []
      for (let triToRaster of [...trisToRaster]) {
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
                  clippingVecs.vecOrigin,
                  clippingVecs.vecY,
                  test,
                  clipped[0],
                  clipped[1],
                )
                break
              case 1:
                // @ts-ignore
                nTrisToAdd = Triangle_ClipAgainstPlane(
                  clippingVecs.vecBottom,
                  clippingVecs.vecMY,
                  test,
                  clipped[0],
                  clipped[1],
                )
                break
              case 2:
                // @ts-ignore
                nTrisToAdd = Triangle_ClipAgainstPlane(
                  clippingVecs.vecOrigin,
                  clippingVecs.vecX,
                  test,
                  clipped[0],
                  clipped[1],
                )
                break
              case 3:
                // @ts-ignore
                nTrisToAdd = Triangle_ClipAgainstPlane(
                  clippingVecs.vecRight,
                  clippingVecs.vecMX,
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
      // setTrisToRaster(listTriangles);
      r(listTriangles)
    })
  }

  function controlCamera(e: string) {
    console.log(vCamera)
    let vForward = vec_multiply(vLookDir, 2.0)
    switch (e) {
      case "w":
        setVCamera(vec_add(vCamera, vForward))
        break
      case "s":
        setVCamera(vec_subtract(vCamera, vForward))
        break
      case "a":
        setVCamera(new vec3d(vCamera.x + 1, vCamera.y, vCamera.z))
        break
      case "d":
        setVCamera(new vec3d(vCamera.x - 1, vCamera.y, vCamera.z))
        break
      case "ArrowUp":
        setVCamera(new vec3d(vCamera.x, vCamera.y + 1, vCamera.z))
        // setPitch(pitch + 0.1)
        break
      case "ArrowDown":
        setVCamera(new vec3d(vCamera.x, vCamera.y - 1, vCamera.z))
        // setPitch(pitch - 0.1)
        break
      case "ArrowLeft":
        setCameraTransformations({
          ...cameraTransformations,
          yaw: cameraTransformations.yaw - 0.01,
        })
        break
      case "ArrowRight":
        setCameraTransformations({
          ...cameraTransformations,
          yaw: cameraTransformations.yaw + 0.01,
        })
        break
    }
    setMatView(createMatview())
  }

  function find() {
    let averages: { x: number[]; y: number[]; z: number[] } = {
      x: [],
      y: [],
      z: [],
    }
    trisToRaster.forEach((item: triangle, ind) => {
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

  function render() {
    return new Promise(r => {
      const renderedTriangles: triangle[] = []
      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i]
        obj.tris.forEach((tri: any) => {
          // console.log(tri)
          let triRotated = cardinalTransformation(
            tri,
            worldTransformations.roll,
            worldTransformations.pitch,
            worldTransformations.yaw,
          )
          let triTranslated = cardinalTranslate(
            triRotated,
            worldTranslations.x,
            worldTranslations.y,
            worldTranslations.z,
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
              clippingVecs.nearPlane,
              clippingVecs.farPlane,
              triViewed,
              clipped[0],
              clipped[1],
            )
            if (nClippedTriangles[0] && nClippedTriangles[1]) {
              for (let i = 0; i < nClippedTriangles[0]; i++) {
                // Project triangles from 3d -> 2d
                let triProjected = triangleMatMul(
                  nClippedTriangles[1][i],
                  matproj,
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
                  triProjected.p[a].x *= 0.5 * dims.w
                  triProjected.p[a].y *= 0.5 * dims.h
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

                renderedTriangles.push(triProjected)
              }
            }
          }
        })
      }
      // setTrisToRaster(renderedTriangles);
      r(renderedTriangles)
    })
  }

  useEffect(() => {
    const Ship = new Mesh()
    fetch(ship)
      .then(r => r.text())
      .then(text => {
        Ship.fromOBJ(text)
        setObjects([Ship])
      })
  }, [])

  useEffect(() => {
    // if(objects.length) {
    render().then(tris => {
      clipTriangles(tris as triangle[]).then(clippedTris => {
        setTrisToRaster(clippedTris as triangle[])
      })
    })
    setTrisToRaster(orderTris(trisToRaster))
    setTimeout(() => {
      setTicker(ticker + 1)
    }, 10)
    // }
  }, [ticker])

  useEventListener("keydown", (e: any) => {
    controlCamera(e.key)
  })

  return (
    <div className="pt-20">
      <RasterSVG
        name="name"
        tris={trisToRaster}
        dims={dims}
      />
    </div>
  )
}
