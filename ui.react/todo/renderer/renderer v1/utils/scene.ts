export class Scene {
  private framesPerSecond = 60
  private objects: any = {}

  private constructor() {}

  fps(num: number) {
    this.framesPerSecond = num
  }

  addObject(obj: any) {
    this.objects.push(obj)
  }
}

// function setup() {
//   world.fps()
//   world.add(new Grid)

// }

// function draw() {
//   world.translate()

//   world.render()
// }
