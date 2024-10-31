<script lang="ts">
  import type { ImageGroup } from "$lib/utils/CMS/types";
  import Card from "./CMSCard.svelte";
  import CmsImage from "./CMSImage.svelte";

  export let imageGroup: ImageGroup;
  export let layout;
  export let columns: 2 | 4 | 3 = 3;
  export let functions: Record<string, Function> = {};

  const getLayoutClasses = () => {
    if (layout === "horizontal") {
      return "w-full justify-around flex flex-wrap overflow-x-auto gap-4";
    }

    const columnClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return `grid ${columnClasses[columns]}`;
  };
</script>

<div class={getLayoutClasses()}>
  {#each imageGroup.images as image}
    <div
      class={`${layout === "horizontal" ? "flex-none" : ""} w-full md:w-[350px] 2xl:w-full 3xl:w-[350px]`}
    >
      {@debug image}
      <CmsImage {image} {functions} />
    </div>
  {/each}
</div>
