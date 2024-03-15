<script lang="ts">
    import { BoxGeometry, EdgesGeometry, Line, LineBasicMaterial, PlaneGeometry, Vector3, WireframeGeometry } from 'three'
    import { createNoise3D } from 'simplex-noise'
    import { T, useFrame } from '@threlte/core'
    import { OrbitControls, interactivity } from '@threlte/extras'
    import { Pane, Checkbox } from 'svelte-tweakpane-ui'
    import { autoRotate, tickSpeed, tick } from './state'
  import { Line2 } from 'three/examples/jsm/Addons.js'
  import fragmentShader from './fragment.glsl?raw'
  import vertexShader from './vertex.glsl?raw'
  import { quadOut } from 'svelte/easing'
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

export let renderer
  let camera
  let resizeCanvasToDisplaySize = () => {
  const canvas = renderer
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
console.log('resize') 
    // update any render target sizes here
  }
}

    const gridSize = 20
    const noise = createNoise3D()
    const geometry =new PlaneGeometry(gridSize, gridSize, gridSize, 30)
    let ticker = 0

    function updateVertexHeights(time: number, speed: number) {
      const vertices = geometry.getAttribute('position').array
      const scale = 2 // Adjust the scale of the noise
    //   console.log(vertices)
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i]
        const y = vertices[i + 1]
        const z = vertices[i + 2]
        // @ts-ignore
        const nse = noise(x /5 , y /5 , time / 5) * 2 +  noise(x /40 , y /40 , time / 40) * 3

        vertices[i + 2] = nse
      }
      geometry.computeVertexNormals()
        geometry.attributes.position.needsUpdate = true

    }

    onMount(() => {
  


    })

    // Initial update
    updateVertexHeights(ticker, $tickSpeed)
  
    useFrame((a) => {
        // console.log(a)
        ticker += 0.01
      updateVertexHeights(ticker, $tickSpeed) // Update vertex heights on every frame with current time and speed
      resizeCanvasToDisplaySize()

    })

    interactivity()
  const pulsePosition = new Vector3()
  const pulseTimer = tweened(0, {
    easing: quadOut
  })
  </script>
  
  <T.PerspectiveCamera
  bind:this={camera}
  makeDefault
  position={[-110, 90, 20]}
  fov={15}
>
  <OrbitControls
    autoRotate
    target.y={1.5}
    autoRotateSpeed={0.2}
  />
</T.PerspectiveCamera>

<T.Mesh
  {geometry}
  rotation.x={DEG2RAD * -90}
  on:click={({ point }) => {
    pulsePosition.set(point.x, point.y, point.z)
    pulseTimer.set(0, {
      duration: 0
    })
    pulseTimer.set(1, {
      duration: 2000
    })
  }}
>
    <T.MeshStandardMaterial
        color="#f0f0f0"
        wireframe />

  <!-- <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    uniforms={{
      pulseTimer: {
        value: 0
      },
      pulsePosition: {
        value: pulsePosition
      }
    }}
    uniforms.pulseTimer.value={$pulseTimer}
  /> -->
</T.Mesh>
  <style>
    div {
      height: 100%;
    }
  </style>
  