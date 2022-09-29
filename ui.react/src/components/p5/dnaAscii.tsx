import { P5Instance } from "react-p5-wrapper";
import { makeNoise3D } from "open-simplex-noise";
import { Noise3D } from "open-simplex-noise/lib/3d";
import { Image } from "p5";
// import dna from '../../assets/dna.png';

function sketchWrapper(foreground: string) {
  function sketch(p5: P5Instance) {
    // const validChars = ['A','T','G','C']
    const validCharsBinary = ['1','0']
    const validCharsNucleotides = ['A','T','G','C']
    let img: Image;
  
    p5.setup = () => {
      img = p5.loadImage("./images/dna-64.jpg");
      p5.noCanvas()
      p5.frameRate(5)
    };

    p5.draw = () => {
      let parent: string[] = []
      img.loadPixels();
      for (let j = 0; j < img.height; j++) {
        let row = [];
        for (let i = 0; i < img.width; i++) {
          const pixelIndex = (i + (j * img.width)) * 4;
          const [r, g, b] = [
            (img.pixels[pixelIndex + 0]),
            (img.pixels[pixelIndex + 1]),
            (img.pixels[pixelIndex + 2])
          ]
          const avg = (r + g + b) / 3;   
          const opacity = 100-Math.floor((avg/255)*100);
          const seed = +Math.random().toFixed(1)
          if(opacity>10) {
            if(seed<0.9) {
              row.push(`<span style=opacity:${opacity}%>&nbsp;${validCharsNucleotides[Math.floor(Math.random()*validCharsNucleotides.length)]}</span>`)
            } else {
              row.push(`<span style="opacity:100%;color:${foreground};">&nbsp;${validCharsBinary[+((seed*10)%2)]}</span>`)
            }
          } else {
            row.push(`<span>&nbsp;&nbsp;</span>`)
          } 
        }
        parent.push(`<div>${row.join('')}</div>`)
      }
      //@ts-ignore
      document.getElementById('test').innerHTML = parent.join('')
    }
  }
  return sketch
}


export default sketchWrapper;