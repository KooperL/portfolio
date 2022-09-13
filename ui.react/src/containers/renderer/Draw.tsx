import { Dims, triangle } from "./utils/types";


export function RasterSVG(props: {name: string, tris: triangle[], dims: Dims}) {
  return (
    <>
      <figure>
        {/* <svg viewBox={`${0-+props.w/2} ${0-+props.h/2} ${+props.w/2} ${+props.h/2}`} width={props.w} height={props.h}> */}
        <svg viewBox={`0 0 ${+props.dims.w} ${+props.dims.h}`} width={props.dims.w} height={props.dims.h}>
          <use xlinkHref={`#${props.name}`}/>
        </svg>
      </figure>
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
    </>
  );
}