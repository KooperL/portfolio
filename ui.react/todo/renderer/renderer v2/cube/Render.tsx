import React, { useEffect, useState, useRef } from "react"
import { Matrix, Vector, vec3d, triangle, mat4x4 } from "../utils/types"
import {
  MultiplyMatrixVector,
  matProj,
  vec_subtract,
  vec_cross_product,
  vec_normal,
  vec_divide,
  cardinalTransformation,
  vec_dot_product,
  // rgbToHex,
  ConvertRGBtoHex,
  cardinalTranslate,
  vec_normalise,
  matRotY,
  matRotX,
  mat_inverse,
  multiply_vecmat,
  vec_add,
  mat_multiply,
  mat_point_at,
  triangleMatMul,
  gcd,
  world_matrix,
  identity_matrix,
  mat_make_trans,
  vec_multiply,
} from "../utils/math"
// @ts-ignore
import ship from "./ship.obj"
import { useEventListener } from "../utils/helpers"
import { RasterSVG } from "../Draw"
import { Mesh, Obj } from "../utils/raster"
import { Scene } from "../utils/scene"

export function Render() {
  const w = 1280
  const h = 720
  const dims = { w: w, h: h }

  const name = "render"
  const [scene, setScene] = useState(new Scene(dims))
  const [ticker, setticker] = useState(scene.ticket)

  useEffect(() => {
    const Ship = new Mesh()
    fetch(ship)
      .then(r => r.text())
      .then(text => {
        Ship.fromOBJ(text)
        scene.addObject(Ship)
        scene.setFps(10)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      scene.refresh()
      console.log(123)
      setticker(ticker + 1)
    }, 1000)
  }, [ticker])

  useEventListener("keydown", (e: any) => {
    scene.controlCamera(e.key)
  })

  return (
    <div className="pt-20">
      <RasterSVG
        name="name"
        tris={scene.trisToRaster}
        dims={dims}
      />
    </div>
  )
}
