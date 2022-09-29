function generateNucleotide(nWidth: number, nHeight: number, bWidth: number, bHeight: number) {
  const totalWidth = (nWidth * 2) + bWidth;
  const totalHeight = Math.max(nHeight, bHeight);

  const n1Body = 0

  let rows = new Array(totalHeight)
  for(let y=0; y<totalHeight;y++) {
    let row = new Array(totalWidth);
    for(let x = 0; x<totalWidth; x++) {

      for(let n1 = 0; n1<nWidth; n1++) {

      }


    }
  }
}

export default generateNucleotide;




function printPattern(radius: number, border: number) {
  var dist = 0.0;
  let rows:string[][] = []
  for (var i = 0; i <= 2 * radius; i++) {
    let row:string[] = []
    for (var j = 0; j <= 2 * radius; j++) {
      dist = Math.sqrt(
        (i - radius) * (i - radius) +
        (j - radius) * (j - radius)
      );
      let query;
      if(border < 0) {
        query = dist > radius                                                   // Inverted solid circle
      } else if (border === 0) {
        query  = dist < radius                                                  // solid circle
      } else {
        query  = dist > radius - border && dist < radius + border               // Hollow circle with border
      }
      if (query) {
        row.push(' * ')
      } else {
        row.push('   ')
      }
    }
    row.push('\n')
    rows.push(row)
  }
  console.log(rows.map((e:string[]) => e.join('')).join(''))
  
}       

var radius = 6;
printPattern(radius, 0);