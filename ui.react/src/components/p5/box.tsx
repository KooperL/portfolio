import { P5Instance } from "react-p5-wrapper";
import { makeNoise3D } from "open-simplex-noise";
import { Noise3D } from "open-simplex-noise/lib/3d";


function sketchWrapper(width: number, height: number, background: string, foreground:string, stroke: string) {
  function sketch(p5: P5Instance) {
    const scale = 50;
    const w = 600;
    const h = 600;
    const cols = width/scale;
    const rows = height/scale;

    const speedModifier = 100;
    const heightModifier = 9;
    const magnifier = 20;
    let noise: Noise3D;

    p5.setup = () => {
      p5.createCanvas(width, height, p5.WEBGL);
      noise = makeNoise3D(Date.now());
      p5.frameRate(60)
    };

    p5.draw = () => {
      p5.background(background);
      p5.fill(foreground);
      // p5.normalMaterial();
      // p5.push();
      // p5.rotateZ(p5.frameCount * 0.01);
      // p5.rotateX(p5.frameCount * 0.01);
      // p5.rotateY(p5.frameCount * 0.01);
      // p5.plane(50);
      // p5.pop();
      // p5.translate(p5.width/2, p5.height/2);
      p5.rotateX(p5.PI / 3);
      p5.translate(p5.width/8, -p5.height, -300);
      p5.rotateZ(p5.PI/3);
      p5.stroke(stroke);
      p5.strokeWeight(2);
      // p5.noFill();
      for(let y = 0; y < rows-1; y++) {
        p5.beginShape(p5.TRIANGLE_STRIP);
        for(let x = 0; x < cols; x++) {
          p5.vertex(x*scale, y*scale, (noise((x*scale/rows)/magnifier, (y*scale/cols)/magnifier, p5.frameCount/speedModifier)+1)**heightModifier);
          p5.vertex(x*scale, (y+1)*scale, (noise((x*scale/rows)/magnifier, (y+1)*scale/cols/magnifier, p5.frameCount/speedModifier)+1)**heightModifier);
        }
        p5.endShape()
      }
    };
  }
  return sketch
}


export default sketchWrapper;