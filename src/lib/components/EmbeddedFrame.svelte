<script lang="ts">
  import type { EmbeddedFrame } from "$lib/utils/CMS/types";

  export let frame: EmbeddedFrame;
  export let className = "";
</script>

<iframe
  src={frame.url}
  class={className}
  width={frame.width}
  height={frame.height}
  frameborder="0"
  allowfullscreen="true"
/>
