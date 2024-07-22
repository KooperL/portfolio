<script>
  import TestScene from "$lib/components/scenes/grid/grid.svelte";
  import { Canvas } from "@threlte/core";
  import { World } from "@threlte/rapier";
  import { Flex, Box } from "@threlte/flex";
  let renderer;
</script>

<Canvas id="canvas" bind:this={renderer}>
  <World>
    <TestScene {renderer} />
  </World>
</Canvas>

<style>
  canvas {
    /* max-height: 48rem; */
    aspect-ratio: 1;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
