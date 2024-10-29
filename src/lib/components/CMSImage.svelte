<script lang="ts">
  import type { Image } from "$lib/utils/CMS/types";

  export let image: Image;
  export let className = "";

</script>
<img
  src={image.url}
  alt={image.alt}
  class={className}
  width={image.width}
  height={image.height}
  loading={image.lazy ? "lazy" : "eager"}
/>

{#if image.caption}
  <figcaption class="mt-2 text-sm text-gray-500">
    {image.caption}
  </figcaption>
{/if}
