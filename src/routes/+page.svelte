<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";

  onMount(async () => {});
</script>

<div class="box-border p-8 w-full">
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
          data-test="home-link-to-about"
          href="/about"
          class="w-48 my-1"
          variant="primary">about</Button
        >
        <Button
          data-test="home-link-to-contact"
          href="/contact"
          class="w-48 my-1"
          variant="primary">contact</Button
        >
      </div>
    </div>
      <div id="sites-summary" class="flex flex-col">
        <span class="text-2xl font-bold" data-test="title">Published sites</span
        >
        <span>Projects available right now, hosted on the public internet</span>
      </div>
      <Button
        data-test="projects-link-to-bingo"
        href="/projects/bingo-app"
        class="w-48 my-1"
        variant="primary">dropzones</Button
      >
      <Button
        data-test="projects-link-to-pento"
        href="/projects/pento"
        class="w-48 my-1"
        variant="primary">pento</Button
      >
    <div id="projects-summary" class="flex flex-col mt-5">
      <span class="text-2xl font-bold" data-test="title">Code projects</span>
      <span
        >Other projects that don't necessarily need to be found on the web.</span
      >
    </div>
    <div>
      <Button href="/projects/portfolio" class="w-48 my-1" variant="primary"
        >portfolio</Button
      >
      <Button
        href="/projects/svelte-pocketbase-quickstart"
        class="w-48 my-1"
        variant="primary"
        ><marquee class="text-xxs text-nowrap-fff"
          >svelte-pocketbase-quickstart</marquee
        ></Button
      >
      <Button href="/projects/md-app" class="w-48 my-1" variant="primary"
        >text processor</Button
      >
      <Button
        href="/projects/pocketbase-logging"
        class="w-48 my-1"
        variant="primary">pocketbase-logging</Button
      >
    </div>
    <div id="external-links-summary" class="flex flex-col mt-5">
      <span class="text-2xl font-bold">External links</span>
    </div>

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
  </Card>
</div>
