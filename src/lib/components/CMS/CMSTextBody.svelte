<script lang="ts">
  import type { TextBody } from "$lib/utils/CMS/types";
  import Card from "./CMSCard.svelte";
  import CardGroup from "./CMSCardGroup.svelte";
  import CmsButton from "./CMSButton.svelte";
  import CmsButtonGroup from "./CMSButtonGroup.svelte";
  import CmsImage from "./CMSImage.svelte";
  import ImageGroup from "./CMSImageGroup.svelte";

  export let title: null | TextBody["title"] = null;
  export let body: null | TextBody["body"] = null;
  export let button: null | TextBody["button"] = null;
  export let buttons: null | TextBody["buttons"] = null;
  export let card: null | TextBody["card"] = null;
  export let cards: null | TextBody["cards"] = null;
  export let images: null | TextBody["images"] = null;
  export let alignment: null | TextBody["alignment"] = "left";
  export let functions: null | Record<string, Function> = null;
  export let order: number = 0;

  $: textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];
</script>

<div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12 {textAlign}">
  {#if title}
    <h2 class="mb-4 text-3xl font-extrabold text-gray-700 dark:text-white">
      {title}
    </h2>
  {/if}

  {#if body}
    <div class="space-y-4 text-gray-700 dark:text-gray-300">
      {#each body as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  {/if}

  {#if images}
    <div class="mt-6">
      <ImageGroup imageGroup={images} layout={"horizontal"} {functions} />
    </div>
  {/if}

  {#if button}
    <div class="mt-6">
      <CmsButton {button} />
    </div>
  {/if}

  {#if buttons}
    <div class="mt-6">
      <CmsButtonGroup buttonGroup={buttons} {functions} />
    </div>
  {/if}

  {#if card}
    <div class="mt-6">
      <Card {...card} {functions} />
    </div>
  {/if}

  {#if cards}
    <div class="mt-6">
      <CardGroup cardGroup={cards} layout={"horizontal"} {functions} />
    </div>
  {/if}
</div>
