<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";

  onMount(async () => {});
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full bg-white/50">
    <div class="flex flex-col space-y-4">
      <span class="text-4xl font-bold">Welcome to my portfolio</span>
      <div id="home-summary">
        <span class=" font-bold"
          >I'm Kooper. Have a poke around and enjoy your visit. Let me know if
          you like what you see!</span
        >
        <span class="hidden md:block"
          >(Try playing around with the plane on the right)</span
        >
      </div>

      <div data-test="home-internal-link-container">
        <Button
          data-test="home-link-to-projects"
          href="/projects"
          class="w-48 my-1"
          variant="primary">Projects</Button
        >
        <Button
          data-test="home-link-to-about"
          href="/about"
          class="w-48 my-1"
          variant="primary">About</Button
        >
        <Button
          data-test="home-link-to-contact"
          href="/contact"
          class="w-48 my-1"
          variant="primary">Contact</Button
        >
      </div>
      <!-- Temp added -->
      <span class="text-2xl font-bold" data-test="title">Published sites</span>
    <div>
      <Button
        data-test="projects-link-to-bingo"
        href="/projects/bingoApp"
        class="w-48"
        variant="primary">dropzones</Button
      >
      <Button
        data-test="projects-link-to-pento"
        href="/projects/pento"
        class="w-48"
        variant="primary">pento</Button
      >
      {#if false}<Button href="/projects/vybs" class="w-48" variant="primary"
          >vybs</Button
        >{/if}
</div>
      <span class="text-2xl font-bold" data-test="title">My projects</span>

<div>
      <Button
        href="https://github.com/KooperL/svelte-pocketbase-quickstart"
        class="w-48"
        variant="primary"
        ><ArrowRightToBracketOutline class="w-5 pr-2 h-5" /><marquee
          class="text-xxs text-nowrap-fff">svelte-pocketbase-quickstart</marquee
        ></Button
      >
      <Button
        href="https://github.com/KooperL/mdApp"
        class="w-48"
        variant="primary"
        ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />mdApp</Button
      >
    </div>
      <!-- Temp added -->
      <span class="text-2xl font-bold">External links</span>

      <div data-test="home-external-link-container">
        <Button
          data-test="home-link-to-github"
          href="https://github.com/KooperL"
          class="w-48 my-1"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 pr-2 h-5" />GitHub</Button
        >
        <Button
          data-test="home-link-to-linkedin"
          href="https://linkedin.com/in/kooper"
          class="w-48 my-1"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />LinkedIn</Button
        >
      </div>
    </div>
  </Card>
</div>
