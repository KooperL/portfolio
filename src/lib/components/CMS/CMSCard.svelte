<script lang="ts">
  import { Card } from "flowbite-svelte";
  import CmsImage from "./CMSImage.svelte";
  import CmsButton from "./CMSButton.svelte";
  import CmsButtonGroup from "./CMSButtonGroup.svelte";
  import type { Card as CardType } from "$lib/utils/CMS/types";

  export let title: null | CardType["title"] = null;
  export let body: null | CardType["body"] = null;
  export let image: null | CardType["image"] = null;
  export let button: null | CardType["button"] = null;
  export let buttonGroup: null | CardType["buttonGroup"] = null;
  export let variant: null | CardType["variant"] = "default";
  export let functions: null | Record<string, Function> = {};
</script>

<Card
  class={`${
    variant === "featured"
      ? "border-blue-500 shadow-lg"
      : variant === "minimal"
        ? "border-0 shadow-none"
        : ""
  } w-full max-w-full`}
>
  {#if image}
    <CmsImage
      {image}
      className="rounded-t-lg overflow-hidden"
    />
  {/if}

  {#if title}
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white"
    >
      {title}
    </h5>
  {/if}

  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
    {body}
  </p>

  {#if button}
    <CmsButton {button} {functions} />
  {/if}

  {#if buttonGroup}
    <CmsButtonGroup {buttonGroup} {functions} />
  {/if}
</Card>
