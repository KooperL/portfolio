<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";
    import { logger } from "$lib/logger";

  onMount(async () => {});
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full bg-white/50">
    <div class="flex flex-col space-y-4">
      <span class="text-4xl font-bold" data-test="title">Portfolio</span>
      <div>
        <p class=" font-bold">This site, here, right now.</p>
        <p>
          The purpose of this project is to showcase my work and provide a
          platform for me to share my thoughts and ideas.
        </p>
        <p>
          Built with SvelteKit and TailwindCSS, this site is a playground for me
          to experiment with new technologies and ideas.
        </p>
        <p>
          Feel free to have a poke around the live site or the source code and
          let me know what you think!
        </p>
      </div>
      <div class="flex space-x-4">
        <Button on:click={(e) => {logger.debug('portfolio-page','Press "back" button')}} href="/" class="w-48" variant="primary">back</Button>
        <Button
          on:click={(e) => {logger.debug('portfolio-page','Press "code" button')}} href="https://github.com/KooperL/portfolio"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />view code</Button
        >
        <Button
          class="w-48"
          variant="primary"
          on:click={() => {logger.debug('portfolio-page','Press "demo" button');alert("Demo? Are you not entertained??")}}>demo</Button
        >
      </div>
    </div>
  </Card>
</div>
