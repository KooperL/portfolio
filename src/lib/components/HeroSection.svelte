<script lang="ts">
  import type { HeroText } from "$lib/utils/CMS/types";
  import CmsButtonGroup from "./CMSButtonGroup.svelte";

  export let title: string;
  export let subtitle: string;
  export let buttons: HeroText["buttons"];
  export let backgroundImage: HeroText["backgroundImage"];
  export let buttonActions: Record<string, Function> = {};

  $: bgStyle = backgroundImage
    ? `background-image: url(${backgroundImage.url})`
    : "";
</script>

<div class="relative bg-cover bg-center py-16 px-4" style={bgStyle}>
  <div class="absolute inset-0 bg-black/50 rounded"></div>
  <div class="relative z-10 max-w-screen-xl mx-auto text-center">
    <h1
      class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
    >
      {title}
    </h1>
    <p
      class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
    >
      {subtitle}
    </p>
    {#if buttons}
      <CmsButtonGroup
        buttonGroup={{ ...buttons, alignment: "center" }}
        {buttonActions}
      />
    {/if}
  </div>
</div>
