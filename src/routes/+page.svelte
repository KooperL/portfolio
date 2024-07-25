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
      <span class="text-4xl font-bold">External links</span>

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
