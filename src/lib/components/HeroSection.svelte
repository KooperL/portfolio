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
  <div class="background bottom bg-primary-700"></div>
  <div class="background top bg-gray-300"></div>
  <div class="relative z-3 max-w-screen-xl mx-auto text-center" style="z-index:3;">
    <h1
      class="text-4xl font-extrabold tracking-tight text-gray-700 leading-none md:text-5xl lg:text-6xl"
    >
      {title}
    </h1>
    <p
      class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48"
    >
      {subtitle}
    </p>
    {#if buttons}
      <CmsButtonGroup
        buttonGroup={{ ...buttons, alignment: "center" }}
        {buttonActions}
      />
    {/if}
    <div class="my-16"></div>
  </div>
</div>

<style>
    .background {
    /**top: 5rem;**/
    top: 0;
    left: 0;
    position: absolute;
    height: 80%;
    width: 100%;
  }

  .top {
    animation-name: breathe-2;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    z-index: 2;
  }

  .bottom {
    animation-name: breathe-1;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    z-index: 1;
  }

  @keyframes breathe-1 {
    0% {
      border-bottom-right-radius: 60%;
      border-bottom-left-radius: 10%;
    }
    50% {
      border-bottom-right-radius: 65%;
      border-bottom-left-radius: 15%;
    }
    100% {
      border-bottom-right-radius: 60%;
      border-bottom-left-radius: 10%;
    }
  }

  @keyframes breathe-2 {
    0% {
      border-bottom-right-radius: 80%;
      border-bottom-left-radius: 20%;
    }
    50% {
      border-bottom-right-radius: 85%;
      border-bottom-left-radius: 35%;
    }
    100% {
      border-bottom-right-radius: 80%;
      border-bottom-left-radius: 20%;
    }
  }
</style>