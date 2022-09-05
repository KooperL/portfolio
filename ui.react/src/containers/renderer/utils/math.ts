import { Matrix, Vector, vec3d, triangle, mat4x4 } from './types';

export function gcd(w:number, h:number): number {
  return (h === 0) ? w : gcd (h, w%h);
}

export function ColorToHex(color: number) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

export function ConvertRGBtoHex(red: number, green: number, blue: number) {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

// export function rgbToHex(r: number, g: number, b: number) {
//   return "//" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

export function vec_divide(num: vec3d, den: number) {
  if(den !== 0) {
    return new vec3d(num.x/den, num.y/den, num.z/den);
  }
  return num;
}

export function vec_multiply(num: vec3d, k: number) {
  return new vec3d(num.x*k, num.y*k, num.z*k);
}

export function multiply_vecmat(vec: vec3d, mat: mat4x4) {
  // if (mat.length == 1) {  //.shape
  //   mat = mat[0]
  // } else {
  //   mat = mat
  return new vec3d(
    vec.x*mat.m[0][0]+vec.y*mat.m[1][0]+vec.z*mat.m[2][0]+vec.w*mat.m[3][0],
    vec.x*mat.m[0][1]+vec.y*mat.m[1][1]+vec.z*mat.m[2][1]+vec.w*mat.m[3][1],
    vec.x*mat.m[0][2]+vec.y*mat.m[1][2]+vec.z*mat.m[2][2]+vec.w*mat.m[3][2],
    vec.x*mat.m[0][3]+vec.y*mat.m[1][3]+vec.z*mat.m[2][3]+vec.w*mat.m[3][3]);
  // }
}

export function vec_subtract(vec1: vec3d, vec2: vec3d) {
  return new vec3d(vec1.x-vec2.x, vec1.y-vec2.y, vec1.z-vec2.z);
}

export function vec_add(vec1: vec3d, vec2: vec3d) {
  return new vec3d(vec1.x+vec2.x, vec1.y+vec2.y, vec1.z+vec2.z);
}

export function mat_multiply(A: mat4x4, B: mat4x4) {
  var result = new Array(A.m.length).fill(0).map(row => new Array(B.m[0].length).fill(0));
  // @ts-ignore
  return new mat4x4(result.map((row, i) => {
    return row.map((val, j) => {
      return A.m[i].reduce((sum, elm, k) => sum + (elm*B.m[k][j]) ,0);
    });
  }));
}



export function MultiplyMatrixVector(i: Vector, m: mat4x4) {
  const o = new vec3d(
    i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + m.m[3][0],
    i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + m.m[3][1],
    i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + m.m[3][2]
  );
  const w = i.x * m.m[0][3] + i.y * m.m[1][3] + i.z * m.m[2][3] + m.m[3][3];

  if (w !== 0) {
    o.x /= w;
    o.y /= w;
    o.z /= w;
  }
  return o;
}

export function mat_make_trans(x: number,y: number, z: number): mat4x4 {
  //@ts-ignore
  return new mat4x4([
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [x,y,z,1],
    ]);
}

export function mat_inverse(m: mat4x4) {
  // @ts-ignore
  // return new mat4x4([
  //   [m.m[0][0], m.m[1][0], m.m[2][0], 0, ],
  //   [m.m[0][1], m.m[1][1], m.m[2][1], 0, ],
  //   [m.m[0][2], m.m[1][2], m.m[2][2], 0, ],
  //   [-(m.m[3][0] * m.m[0][0] + m.m[3][1] * m.m[0][1] + m.m[3][2] * m.m[0][2]),
  //    -(m.m[3][0] * m.m[1][0] + m.m[3][1] * m.m[1][1] + m.m[3][2] * m.m[1][2]),
  //    -(m.m[3][0] * m.m[2][0] + m.m[3][1] * m.m[2][1] + m.m[3][2] * m.m[2][2]), 1, ],
  //   ]);

    return new mat4x4([
      [m.m[0][0], m.m[1][0], m.m[2][0], 0],
      [m.m[0][1], m.m[1][1], m.m[2][1], 0],
      [m.m[0][2], m.m[1][2], m.m[2][2], 0],
      [-(m.m[3][0] * m.m[0][0] + m.m[3][1] * m.m[1][0] + m.m[3][2] * m.m[2][0]),
       -(m.m[3][0] * m.m[0][1] + m.m[3][1] * m.m[1][1] + m.m[3][2] * m.m[2][1]),
       -(m.m[3][0] * m.m[0][2] + m.m[3][1] * m.m[1][2] + m.m[3][2] * m.m[2][2]), 1, ],
      ]);

  // let matrix = new mat4x4();
  // matrix.m[0][0] = m.m[0][0];
  // matrix.m[0][1] = m.m[1][0];
  // matrix.m[0][2] = m.m[2][0];
  // matrix.m[0][3] = 0.0;

  // matrix.m[1][0] = m.m[0][1];
  // matrix.m[1][1] = m.m[1][1];
  // matrix.m[1][2] = m.m[2][1];
  // matrix.m[1][3] = 0.0;

  // matrix.m[2][0] = m.m[0][2];
  // matrix.m[2][1] = m.m[1][2];
  // matrix.m[2][2] = m.m[2][2];
  // matrix.m[2][3] = 0.0;

  // matrix.m[3][0] = -(m.m[3][0] * m.m[0][0] + m.m[3][1] * m.m[1][0] + m.m[3][2] * m.m[2][0]);
  // matrix.m[3][1] = -(m.m[3][0] * m.m[0][1] + m.m[3][1] * m.m[1][1] + m.m[3][2] * m.m[2][1]);
  // matrix.m[3][2] = -(m.m[3][0] * m.m[0][2] + m.m[3][1] * m.m[1][2] + m.m[3][2] * m.m[2][2]);
  // matrix.m[3][3] = 1.0;
  // return matrix;
}

export function vec_dot_product(input1: vec3d, input2: vec3d) {
  return input1.x * input2.x + input1.y * input2.y + input1.z * input2.z;
}

export function vec_length(input1: vec3d) {
  return Math.sqrt(vec_dot_product(input1, input1));
}

export function vec_normalise_length(input1: vec3d) {
  const l = vec_length(input1);
  return vec_divide(input1, l);
}

export function vec_normalise(input1: vec3d) {
  const l = vec_normal(input1);
  return vec_divide(input1, l);
}

export function vec_normal(vec: vec3d): number {
  return Math.sqrt(
    vec.x*vec.x+
    vec.y*vec.y+
    vec.z*vec.z);
}

export function vec_cross_product(v1: vec3d, v2: vec3d) {
  return new vec3d(
    v1.y * v2.z - v1.z * v2.y,
    v1.z * v2.x - v1.x * v2.z,
    v1.x * v2.y - v1.y * v2.x
  );
}

export function matProj(
    screenwidth: number,
    screenheight: number,
    fov: number,
    zfar = 1000.0,
    znear = 0.1
  ) {
  const znorm = zfar/(zfar-znear);
  const aspectRatio = screenwidth/screenheight;
  const fovRad = 1/Math.tan(fov*0.5 / 180.0 * Math.PI);
  // const fovRad = 1/(Math.tan((fov*0.5*Math.PI)/(180.0)));
  //@ts-ignore
  return new mat4x4([
    [aspectRatio*fovRad,0,0,0],
    [0,fovRad,0,0],
    [0,0,znorm,1],
    [0,0,(-zfar*znear)/(zfar-znear),0]
  ]);
}

export function matRotX(angle: number) {
  //@ts-ignore
  return new mat4x4([
    [1,0,0,0],
    [0,Math.cos(angle),-(Math.sin(angle)),0],
    [0,Math.sin(angle),Math.cos(angle),0],
    [0,0,0,1]
  ]);
}

export function matRotY(angle: number) {
  //@ts-ignore
  return new mat4x4([
    [Math.cos(angle),0,Math.sin(angle),0],
    [0,1,0,0],
    [-(Math.sin(angle)),0,Math.cos(angle),0],
    [0,0,0,1]
  ]);
}

export function matRotZ(angle: number) {
  //@ts-ignore
  return new mat4x4([
    [Math.cos(angle),-(Math.sin(angle)),0,0],
    [Math.sin(angle),Math.cos(angle),0,0],
    [0,0,1,0],
    [0,0,0,1]
  ]);
}

export function cardinalTransformation(tri: triangle,
  roll: number,
  pitch: number,
  yaw: number,
  funcs = {
    x: matRotX,
    y: matRotY,
    z: matRotZ,
  }) {
  let a = tri.p.map((vec, ind) => MultiplyMatrixVector(vec, funcs.x(pitch)));
  let b = a.map((vec, ind) => MultiplyMatrixVector(vec, funcs.y(yaw)));
  let c = b.map((vec, ind) => MultiplyMatrixVector(vec, funcs.z(roll)));
  let d = new triangle();
  d.p=c;
  return d;
}

export function cardinalTranslate(tri: triangle,
  x: number,
  y: number,
  z: number,
) {
  let triTranslated = new triangle();
  for(let a=0;a<3;a++) {
    triTranslated.p[a].x = tri.p[a].x + x;
    triTranslated.p[a].y = tri.p[a].y + y;
    triTranslated.p[a].z = tri.p[a].z + z;
  }
  return triTranslated;
}

export function identity_matrix() {
  //@ts-ignore
	return new mat4x4([
		[1,0,0,0],
		[0,1,0,0],
		[0,0,1,0],
		[0,0,0,1]
  ]);
}


export function world_matrix(trans: number[]) {
	let matTrans = mat_make_trans(trans[0],trans[1],trans[2]);
  //@ts-ignore
	let matWorld = new mat4x4([
		[1,0,0,0],
		[0,1,0,0],
		[0,0,1,0],
		[0,0,0,1]
  ]);
	return mat_multiply(matWorld, matTrans);
}

export function mat_point_at(pos: vec3d, target: vec3d, up: vec3d) {
	let newForward = vec_subtract(target, pos);
	newForward = vec_normalise(newForward);

	let a = vec_multiply(newForward, vec_dot_product(up, newForward));
	let newUp = vec_subtract(up, a);
	newUp = vec_normalise(newUp);

	let newRight = vec_cross_product(newUp, newForward);
  //@ts-ignore
	return new mat4x4([
    [newRight.x, newRight.y, newRight.z, 0],
    [newUp.x, newUp.y, newUp.z, 0],
    [newForward.x, newForward.y, newForward.z, 0],
    [pos.x, pos.y, pos.z, 1]
  ]);
}

export function triangleMatMul(tri: triangle, mat: mat4x4) {
  const triNew = new triangle();
  for(let a=0;a<3;a++) {
    triNew.p[a] = MultiplyMatrixVector(tri.p[a], mat);
  }
  return triNew;
}

export function triangleDiv(tri: triangle) {
  const triNew = new triangle();
  for(let a=0;a<3;a++) {
    triNew.p[a] = vec_divide(tri.p[a], tri.p[a].w);
  }
  return triNew;
}



export function Triangle_ClipAgainstPlane(
  plane_p: vec3d,
  plane_n: vec3d,
  in_tri: triangle,
  out_tri1: triangle,
  out_tri2: triangle
): [number, triangle[] | null] {
  plane_n = vec_normalise(plane_n)

  function dist(p: vec3d): number{
    let n = vec_normalise(p);
    return (plane_n.x * p.x + plane_n.y * p.y + plane_n.z * p.z - vec_dot_product(plane_n, plane_p));
  }

  let inside_points = [new vec3d(), new vec3d(), new vec3d()];
  let nInsidePointCount = 0;
  let outside_points = [new vec3d(), new vec3d(), new vec3d()];
  let nOutsidePointCount = 0;

  let d0 = dist(in_tri.p[0]);
  let d1 = dist(in_tri.p[1]);
  let d2 = dist(in_tri.p[2]);

  if (d0 >= 0) {
    inside_points[nInsidePointCount++] = in_tri.p[0];
    // nInsidePointCount += 1;
  } else {
    outside_points[nOutsidePointCount++] = in_tri.p[0];
    // nOutsidePointCount += 1;
  }
  if (d1 >= 0) {
    inside_points[nInsidePointCount++] = in_tri.p[1];
    // nInsidePointCount += 1;
  } else {
    outside_points[nOutsidePointCount++] = in_tri.p[1];
    // nOutsidePointCount += 1;
  }
  if (d2 >= 0) {
    inside_points[nInsidePointCount++] = in_tri.p[2];
    // nInsidePointCount += 1;
  } else {
    outside_points[nOutsidePointCount++] = in_tri.p[2];
    // nOutsidePointCount += 1;
  }

  
  if (nInsidePointCount === 0) {
    return [0, [out_tri1, out_tri2]];
  }
  if (nInsidePointCount === 3) {
    out_tri1 = in_tri;
    return [1, [out_tri1, out_tri2]];
  }
  if (nInsidePointCount === 1 && nOutsidePointCount === 2) {
    out_tri1.c =  in_tri.c;

    // The inside point is valid, so keep that...
    out_tri1.p[0] = inside_points[0];
    out_tri1.p[1] = vector_intersect_plane(plane_p, plane_n, inside_points[0], outside_points[0]);
    out_tri1.p[2] = vector_intersect_plane(plane_p, plane_n, inside_points[0], outside_points[1]);
    return [1, [out_tri1, out_tri2]] // Return the newly formed single triangle
  }
  if (nInsidePointCount === 2 && nOutsidePointCount === 1) {

    out_tri1.c =  in_tri.c;
    out_tri2.c =  in_tri.c;

    out_tri1.p[0] = inside_points[0];
    out_tri1.p[1] = inside_points[1];
    out_tri1.p[2] = vector_intersect_plane(plane_p, plane_n, inside_points[0], outside_points[0]);

    out_tri2.p[0] = inside_points[1];
    out_tri2.p[1] = out_tri1.p[2];
    out_tri2.p[2] = vector_intersect_plane(plane_p, plane_n, inside_points[1], outside_points[0]);
    return [2, [out_tri1, out_tri2]];
  }
  return [0, null]
}


export function vector_intersect_plane(
  plane_p: vec3d,
  plane_n: vec3d,
  lineStart: vec3d,
  lineEnd: vec3d
): vec3d {
  plane_n = vec_normalise(plane_n);
  let plane_d = -vec_dot_product(plane_n, plane_p);
  let ad = vec_dot_product(lineStart, plane_n);
  let bd = vec_dot_product(lineEnd, plane_n);
  let t = (-plane_d - ad) / (bd - ad);
  let lineStartToEnd = vec_subtract(lineEnd, lineStart);
  let lineToIntersect = vec_multiply(lineStartToEnd, t);
  return vec_add(lineStart, lineToIntersect);
}