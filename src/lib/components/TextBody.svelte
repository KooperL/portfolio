<script lang="ts">
  import type { TextBody } from "$lib/utils/CMS/types";
  import Card from "./Card.svelte";
  import CardGroup from "./CardGroup.svelte";
  import CmsButton from "./CMSButton.svelte";
  import CmsButtonGroup from "./CMSButtonGroup.svelte";

  export let title: TextBody["title"];
  export let body: TextBody["body"];
  export let button: TextBody["button"];
  export let buttons: TextBody["buttons"];
  export let card: TextBody["card"];
  export let cards: TextBody["cards"];
  export let alignment: TextBody["alignment"] = "left";
  export let buttonActions: Record<string, Function> = {};

  $: textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];
</script>

<div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12 {textAlign}">
  {#if title}
    <h2 class="mb-4 text-3xl font-extrabold">{title}</h2>
  {/if}

  {#if body}
    <div class="space-y-4 text-gray-700">
      {#each body as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  {/if}

  {#if button}
    <div class="mt-6">
      <CmsButton {button} />
    </div>
  {/if}

  {#if buttons}
    <div class="mt-6">
      <CmsButtonGroup buttonGroup={buttons} {buttonActions} />
    </div>
  {/if}

  {#if card}
    <div class="mt-6">
      <Card {...card} {buttonActions} />
    </div>
  {/if}

  {#if cards}
    <div class="mt-6">
      <CardGroup cardGroup={cards} layout={"horizontal"} {buttonActions} />
    </div>
  {/if}
</div>
