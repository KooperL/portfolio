<script lang="ts">
  import type { EmbeddedFrame } from "$lib/utils/CMS/types";

  export let url = "";
  export let className = "w-full h-128";
</script>

<iframe src={url} class={className} />
