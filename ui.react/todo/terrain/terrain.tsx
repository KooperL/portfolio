import { mesh, triangle, vec3d } from "../../src/containers/renderer/utils/types";


export function terrain() {
  const w: number = 600;
  const h: number = 600;
  const scale: number = 20;
  const cols: number = w / scale;
  const rows: number = h / scale;

  let sheet = new Mesh();

  for(let i=0;i<rows;i++) {
    for(let a=0;a<cols;a++) {

    }
  }

}

function render(props) {
  return (
    <svg className="defs-only" xmlns="http://www.w3.org/2000/svg">
      <symbol id={props.name}>
        {obj.tris.map((triangle, triangleIndex) => (
          <polygon key={triangleIndex} points={`${triangle.p[0].x},${triangle.p[0].y} ${triangle.p[1].x},${triangle.p[1].y} ${triangle.p[2].x},${triangle.p[2].y}`}
            style={{
              fill: props.fill,
              stroke: props.stroke,
              strokeWidth: props.strokeWidth,
            }}
          />
          ))}
      </symbol>
    </svg>
  );
}