import { useEffect, useState } from "react";
import { Dims, Grid, RenderProps } from "../utils/types";
import { } from '../utils/math';
import { drawBlueprint, DrawFigure } from "../Draw";

// todo
export function Render(props: RenderProps) {
  const w = props.dims.w ?? 1280;
  const h = props.dims.h ?? 720;
  const fov = props.dims.fov ?? 90;
  const name = props.name ?? 'render';
  return (
    <div className="pt-20">
      <DrawFigure name={name} w={w} h={h} />
      <DrawSVG passed={props} />
    </div>
  );
}

function DrawSVG(props: {passed: RenderProps}) {
  const [ticker, setTicker] = useState(0);
  const [obj, setObj] = useState<Grid | null>(null);
  const move = {
    transformations: props.passed.transformations ?? {roll: 0.4, pitch: 4.7, yaw: 0.4},
    translations: props.passed.translations ?? {x: 11, y: 40, z: 50}
  }
  // const [mouseSpeed, setMouseSpeed] = useState(0)

  useEffect(() => {
    const dims: Dims = {w: props.passed.dims.w, h: props.passed.dims.h, fov: props.passed.dims.fov}

    const grid = new Grid(dims, props.passed.colours, 50, 50, 4);
    // grid.noiseWarpZ(ticker, mouseSpeed, 6);

    setObj(grid);

    console.log(obj)
  }, []);

  // var totalX = 0;
  // var totalY = 0;
  // var moveX = 0;
  // var moveY = 0;
  
  // document.addEventListener("mousemove", function(ev){
  //     totalX += Math.abs(ev.movementX);
  //     totalY += Math.abs(ev.movementY);
  //     moveX += ev.movementX;
  //     moveY += ev.movementY;
  // }, false);
  
  // setInterval(function(){
  //     // console.log(`Speed X: ${totalX}px/s, Y: ${totalY}px/s`);
  //     // console.log(`Movement X: ${moveX}px/s, Y: ${moveY}px/s`);
  //   setMouseSpeed(moveX+moveY)
  //     moveX = moveY = totalX = totalY = 0;
  // }, 10000);


  useEffect(() => {
    if(obj) {
      obj.simpleRaster(
        move.transformations,
        move.translations
      );
      obj.noiseWarpZ(ticker, ticker*3, 6);
      obj.orderTris()
      // console.log(ticker);
      // console.log(mouseSpeed)
  }
    setTimeout(() => setTicker(ticker+0.01),50);
  }, [ticker]);

  if(obj == null) {
    return (
      <p>Loading</p>
    );
  } else {
    return drawBlueprint({'name': props.passed.name, 'tris': obj.trisToRaster});
  }
}