<script lang="ts">
  import type { HeroText } from "$lib/utils/CMS/types";
  import CmsButtonGroup from "./CMSButtonGroup.svelte";

  export let title: null | string = null;
  export let subtitle: null | string = null;
  export let buttons: null | HeroText["buttons"] = null;
  export let backgroundImage: null | HeroText["backgroundImage"] = null;
  export let functions: Record<string, Function> = {};
  export let size: "small" | "medium" = "medium";
  export let alignment: "left" | "center" = "center";

  $: bgStyle = backgroundImage
    ? `background-image: url(${backgroundImage.url})`
    : "";
</script>

<div class="relative bg-cover bg-center pt-8 pb-24 px-16 sm:py-16 sm:px-4" style={bgStyle}>
  <div class="background bottom bg-primary-700"></div>
  <div class="background top bg-gray-300"></div>
  <div
    class={`relative z-3 max-w-screen-xl ${alignment === "center" ? "mx-auto text-center" : "mx-4 text-left"}`}
    style="z-index:3;"
  >
    <h1
      class={`font-extrabold tracking-tight text-gray-700 leading-none ${size === "medium" ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl lg:text-4xl"}`}
    >
      {title}
    </h1>
    <p
      class={`mb-8 font-normal text-gray-700 ${size === "medium" ? "text-lg  lg:text-xl" : ""} ${alignment === "center" ? "sm:px-16 lg:px-48" : ""}`}
    >
      {subtitle}
    </p>
    {#if buttons}
      <CmsButtonGroup
        buttonGroup={{ ...buttons, alignment: "center" }}
        {functions}
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
