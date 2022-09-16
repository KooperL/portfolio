import { triangle } from "./utils/types";

export function DrawFigure(props: {name: string, h: number | string, w: number | string}) {
  // const displayGCD = gcd(+props.w, +props.h);
  return (
    <figure>
      {/* <svg viewBox={`${0-+props.w/2} ${0-+props.h/2} ${+props.w/2} ${+props.h/2}`} width={props.w} height={props.h}> */}
      <svg viewBox={`0 0 ${+props.w} ${+props.h}`} width={props.w} height={props.h}>
        <use xlinkHref={`#${props.name}`}/>
      </svg>
    </figure>
  );
}

export function drawBlueprint(props: {name: string, tris: triangle[]}) {
  return (
    <svg className="defs-only" xmlns="http://www.w3.org/2000/svg">
      <symbol id={props.name}>
        {props.tris.map((triangle, triangleIndex) => (
          <polygon key={triangleIndex}
            points={`${triangle.p[0].x},${triangle.p[0].y} ${triangle.p[1].x},${triangle.p[1].y} ${triangle.p[2].x},${triangle.p[2].y}`}
            style={{
              fill: triangle['c']['fill'] ?? 'red',
              stroke: triangle['c']['stroke'] ?? 'pink',
              strokeWidth: triangle['c']['strokeWidth'] || 5.0,
            }}
          />
          ))}
      </symbol>
    </svg>
  );
}