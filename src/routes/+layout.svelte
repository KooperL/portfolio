<script lang="ts">
  import "../app.pcss";
  import { beforeNavigate } from "$app/navigation";
  // import TestScene from '$lib/components/scenes/grid/component.svelte'
  import {
    Button,
    Modal,
    Label,
    Input,
    Checkbox,
    Footer,
    FooterCopyright,
    FooterLinkGroup,
    Toast,
    FooterLink,
  } from "flowbite-svelte";
  import {
    FireOutline,
    ExclamationCircleOutline,
    UserCircleOutline,
  } from "flowbite-svelte-icons";
  import Navbar from "$lib/components/navbar.svelte";
  import { site } from "$lib/config";
  import { metadata, toast } from "$lib/app/stores";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let GridComponent;
  let formModal = false;
  $: title = ($metadata.title ? $metadata.title + " | " : "") + site.name;
  $: description = site.description;
  $: headline = $metadata.title;
  beforeNavigate(() => {});

  onMount(async () => {
    GridComponent = (
      await import("$lib/components/scenes/grid/component.svelte")
    ).default;
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="flex h-full flex-col">
  <header>
    <Navbar />
  </header>
  <main
    class="flex grow w-full bg-dotted-spacing-6 bg-dotted-primary-700 bg-dotted-radius-0.1"
  >
    <div class="w-full 2xl:min-w-96 2xl:w-2/3 2xl:w-1/2" style="height: 90vh;">
      <slot />
      {#if $toast?.text}
        <Toast class="absolute bottom-2.5 left-1/2 mb-4 -translate-x-1/2">
          {#if $toast.icon === "ExclamationCircleOutline"}
            <ExclamationCircleOutline
              slot="icon"
              class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
            />
          {:else if $toast.icon === "FireOutline"}
            <FireOutline
              slot="icon"
              class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
            />
          {/if}
          {$toast.text}
        </Toast>
      {/if}
    </div>
    <div
      class="hidden 2xl:block flex h-full flex-col items-center justify-center 2xl:aspect-square"
      style="max-width: 50%;"
    >
      {#if GridComponent}
        <svelte:component this={GridComponent} />
      {/if}
    </div>
  </main>
  <Footer class="flex justify-center">
    <FooterLinkGroup
      ulClass="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
    >
      <FooterLink href={`${base}`}>Home</FooterLink>
      <FooterLink href={`${base}/about`}>About</FooterLink>
      <FooterLink href={`${base}/contact`}>Contact</FooterLink>
    </FooterLinkGroup>
  </Footer>
</div>

<style>
  canvas {
    /* max-height: 48rem; */
    aspect-ratio: 1;
  }

  main1 {
    --dot-bg: black;
    --dot-color: red;
    --dot-size: 2px;
    --dot-space: 22px;
    background:
      linear-gradient(
          90deg,
          var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
          transparent 1%
        )
        center / var(--dot-space) var(--dot-space),
      linear-gradient(
          var(--dot-bg) calc(var(--dot-space) - var(--dot-size)),
          transparent 1%
        )
        center / var(--dot-space) var(--dot-space),
      var(--dot-color);
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
