import React, { useEffect, useState, useRef } from "react";
import { Matrix, Vector, vec3d, triangle, mat4x4, Obj, Grid } from "../utils/types";
import { MultiplyMatrixVector,
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
  vec_multiply
} from '../utils/math';
// @ts-ignore
import ship from './ship.obj';
import { useEventListener } from "../utils/helpers";
import { drawBlueprint } from "../Draw";


export function DrawFigure(props: {name: string, h: number | string, w: number | string}) {
  // const displayGCD = gcd(+props.w, +props.h);
  return (
    <figure>
      <svg viewBox={`0 0 ${+props.w} ${+props.h}`} width={props.w} height={props.h}>
        <use xlinkHref={`#${props.name}`}/>
      </svg>
    </figure>
  )
}

export function Render() {
  const w = 1280;
  const h = 720;
  const fov = 90;
  const name = 'render';
  return (
    <div className="pt-20">
      <DrawFigure name={name} w={w} h={h} />
      <DrawSVG name={name} w={w} h={h} fov={fov} />
    </div>
  )
}

function DrawSVG(props: any) {
  const [ticker, setTicker] = useState(0);
  const [obj, setObj] = useState<Obj | null>(null);
  const [vCamera, setvCamera] = useState(new vec3d(0, 1, -10))
  const [vLookDir, setvLookDir] = useState(new vec3d(0, 0, 0, 1))
  const [pitch, setPitch] = useState(0)
  const [yaw, setYaw] = useState(0)

  useEffect(() => {
    const dims = {w: props.w, h: props.h, fov: props.fov}
    const Ship = new Obj(dims);
    fetch(ship).then(r => r.text()).then(text => {
      Ship.parseObj(text);
    });
    setObj(Ship);

    // const grid = new Grid(dims, 20, 20, 4);
    // grid.updateZ();

    // setObj(grid);

    console.log(obj)
  }, []);

  useEventListener("keydown", ((e: any) => {
    let vForward = vec_multiply(vLookDir, 2.0)
    switch(e.key) {
      case 'w':
        setvCamera(vec_add(vCamera, vForward))
        break;
      case 's':
        setvCamera(vec_subtract(vCamera, vForward))
        break;
      case 'a':
        setvCamera(new vec3d(vCamera.x + 1, vCamera.y, vCamera.z))
        break;
      case 'd':
        setvCamera(new vec3d(vCamera.x - 1, vCamera.y, vCamera.z))
        break;
      case 'ArrowUp':
        setvCamera(new vec3d(vCamera.x, vCamera.y + 1, vCamera.z))
        // setPitch(pitch + 0.1)
        break;
      case 'ArrowDown':
        setvCamera(new vec3d(vCamera.x, vCamera.y - 1, vCamera.z))
        // setPitch(pitch - 0.1)
        break;
      case 'ArrowLeft':
        setYaw(yaw - 0.01)
        break;
      case 'ArrowRight':
        setYaw(yaw + 0.01)
        break;
    };
    // console.log(vCamera);
  }));

  useEffect(() => {
    let lightDirection = new vec3d(0,-2,-10);

    const matView = (() => {
      let vUp = new vec3d(0,1,0);
      let vTarget = new vec3d(0,0,1);
      let matCameraRotYaw = matRotY(yaw); // fYaw
      setvLookDir(multiply_vecmat(vTarget, matCameraRotYaw));
      vTarget = vec_add(vCamera, vLookDir);
      let matCamera = mat_point_at(vCamera, vTarget, vUp);
      let matView = mat_inverse(matCamera);
      return matView;
    })();

    if(obj) {
      // obj.raster(
      //   vCamera,
      //   lightDirection,
      //   matView,
      //   {roll: 0, pitch: 2.4, yaw: 0},
      //   {x: -105, y: -30, z: 100}
      // );
      // obj.updateZ();


      obj.raster(
        vCamera,
        lightDirection,
        matView,
        {roll: ticker, pitch: ticker, yaw: ticker},
        {x: -5, y: -10, z: 10}
      );
      obj.clipTriangles();
      obj.orderTris();
      // console.log(...obj.find())
      // console.log('camera', vCamera)
      // console.log(ticker)

  }
    setTimeout(() => setTicker(ticker+0.01),10);
  }, [ticker]);

  if(obj == null) {
    return (
      <p>Loading</p>
    );
  } else {
    return drawBlueprint({'name': props.name, 'tris': obj.trisToRaster});
  }
}
