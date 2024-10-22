<script lang="ts">
  import type { EmbeddedFrame } from "$lib/utils/CMS/types";

  export let url = "";
  // export let width = "100%";
  // export let height = "500px";

  export let className = "w-full h-128";
</script>

<iframe src={url} class={className} />
