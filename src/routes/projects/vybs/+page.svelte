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
      <span class="text-4xl font-bold" data-test="title">vybs.tv</span>
      <div>
        <span class=" font-bold">Pretty web animations.</span>
        <div
          class="h-96 aspect-square border-solid border-3 bg-primary-600 rounded box-border p-1 m-4 flex justify-center items-center"
        >
          <iframe src="https://vybs.tv" class="w-full h-full" />
        </div>
      </div>
      <div class="flex space-x-4">
        <Button
          on:click={(e) => {
            logger.debug("vybs-page", 'Press "back" button');
          }}
          href="/projects"
          class="w-48"
          variant="primary">back</Button
        >
        <Button
          on:click={(e) => {
            logger.debug("vybs-page", 'Press "visit" button');
          }}
          href="https://vybs.tv/"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />visit</Button
        >
      </div>
    </div>
  </Card>
</div>
