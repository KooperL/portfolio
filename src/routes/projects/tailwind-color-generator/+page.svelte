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
      <span class="text-4xl font-bold" data-test="title"
        >tailwind-color-generator</span
      >
      <div>
        <p class=" font-bold">
          This handy tool helps you generate a custom color spectrum for your
          Tailwind CSS configuration. It solves the problem of creating
          consistent and visually appealing color palettes for your web
          projects. Simply choose three key colors or randomize them, and the
          tool will generate a full spectrum with corresponding Tailwind
          configuration.
        </p>
        <p>
          Tailwind is a framework that simultaneously fixes CSS as well as
          streamlining the process of standardising style formats.
        </p>
        <p>
          The colours generated here can be plugged straight into a tailwind
          configuration file to instantly use a beatiful colour palatte across a
          project using tailwind.
        </p>
      </div>
      <div class="flex space-x-4">
        <Button
          on:click={(e) => {
            logger.debug("tailwind-color-generator", 'Press "back" button');
          }}
          href="/"
          class="w-48"
          variant="primary">back</Button
        >
        <Button
          on:click={(e) => {
            logger.debug("tailwind-color-generator", 'Press "code" button');
          }}
          href="https://github.com/KooperL/tailwind-color-generator"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />view code</Button
        >
        <Button
          on:click={(e) => {
            logger.debug("tailwind-color-generator", 'Press "demo" button');
          }}
          href="https://kooperl.github.io/tailwind-color-generator/"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />demo</Button
        >
      </div>
    </div>
  </Card>
</div>
