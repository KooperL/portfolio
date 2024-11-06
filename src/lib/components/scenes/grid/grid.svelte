<script lang="ts">
  import {
    BoxGeometry,
    EdgesGeometry,
    Line,
    LineBasicMaterial,
    PlaneGeometry,
    Vector3,
    WireframeGeometry,
  } from "three";
  import { createNoise3D } from "simplex-noise";
  import { T, useFrame } from "@threlte/core";
  import { OrbitControls, interactivity } from "@threlte/extras";
  import { Pane, Checkbox } from "svelte-tweakpane-ui";
  import { autoRotate, tickSpeed, tick } from "./state";
  import { Line2 } from "three/examples/jsm/Addons.js";
  import fragmentShader from "./echo/fragment.glsl?raw";
  import vertexShader from "./echo/vertex.glsl?raw";
  import { quadOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { DEG2RAD } from "three/src/math/MathUtils.js";
  import colors from "tailwindcss/colors";

  export let renderer;
  let camera;
  let cameraPositionX = tweened(-110, { duration: 2000 });
  let cameraPositionY = tweened(90, { duration: 2000 });
  let cameraPositionZ = tweened(20, { duration: 2000 });
  let resizeCanvasToDisplaySize = () => {
    const canvas = renderer;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  const gridSize = 20;
  const noise = createNoise3D();
  const geometry = new PlaneGeometry(gridSize, gridSize, gridSize, 30);
  let ticker = 0;

  function updateVertexHeights(time: number, speed: number) {
    const vertices = geometry.getAttribute("position").array;
    const scale = 2; // TODO: adjust the scale of the noise
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      // @ts-ignore
      const nse =
        noise(x / 5, y / 5, time / 5) * 2 +
        noise(x / 40, y / 40, time / 40) * 3;

      vertices[i + 2] = nse;
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
    // geometry.computeFaceNormals()
  }

  onMount(() => {
    // setTimeout(() => {
    //   $cameraPositionX = 0
    // }, 2000)
  });

  updateVertexHeights(ticker, $tickSpeed);

  useFrame((a) => {
    ticker += 0.01;
    updateVertexHeights(ticker, $tickSpeed);
    resizeCanvasToDisplaySize();
  });

  interactivity();
  const pulsePosition = new Vector3();
  const pulseTimer = tweened(0, {
    easing: quadOut,
  });
</script>

<T.PerspectiveCamera
  bind:this={camera}
  makeDefault
  position={[$cameraPositionX, $cameraPositionY, $cameraPositionZ]}
  fov={15}
>
  <OrbitControls autoRotate target.y={1.5} autoRotateSpeed={0.2} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.Mesh
  {geometry}
  rotation.x={DEG2RAD * -90}
  on:click={({ point }) => {
    pulsePosition.set(point.x, point.y, point.z);
    pulseTimer.set(0, {
      duration: 0,
    });
    pulseTimer.set(1, {
      duration: 2000,
    });
  }}
>
  <T.LineBasicMaterial color={colors.indigo[600]} wireframe />
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
