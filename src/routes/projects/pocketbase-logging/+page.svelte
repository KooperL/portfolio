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
      <span class="text-4xl font-bold" data-test="title"
        >pocketbase-logging</span
      >
      <div>
        <p class=" font-bold">
          This project aims to empower developers by instantly standing up a
          fullstack logging application
        </p>
        <p>
          Logging applications can capture actions, behaviours, application
          state and more. In no time, you can have a fullstack logging
          application up and running, ready to capture and store logs from your
          applications.
        </p>
        <p>
          Under the hood, this project uses Pocketbase, a backend service that
          provides a simple and secure way to store and retrieve data in
          addition to serving a frontend UI.
        </p>
      </div>
      <div class="flex space-x-4">
        <Button href="/" class="w-48" variant="primary">back</Button>
        <Button
          href="https://github.com/KooperL/pocketbase-logging"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />view code</Button
        >
        <Button
          href="https://logger.pockethost.io/realtime"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />demo</Button
        >
      </div>
    </div>
  </Card>
</div>
