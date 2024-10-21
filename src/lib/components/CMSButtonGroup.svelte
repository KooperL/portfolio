<script lang="ts">
  import type { ButtonGroup } from "$lib/utils/CMS/types";
  import CMSButton from "./CMSButton.svelte";

  export let buttonGroup: ButtonGroup;
  export let buttonActions: Record<string, Function> = {};

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const layoutClasses = {
    horizontal: "flex-row space-x-2",
    vertical: "flex-col space-y-2",
  };
</script>

<div
  class="flex flex-wrap {alignmentClasses[buttonGroup.alignment || 'left']} 
              {layoutClasses[buttonGroup.layout || 'horizontal']}"
>
  {#each buttonGroup.buttons as button}
    <CMSButton {button} {buttonActions} />
  {/each}
</div>
