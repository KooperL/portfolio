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
        >svelte-pocketbase-quickstart</span
      >
      <div>
        <p class=" font-bold">
          Boilerplate, distilled into it's most generic form.
        </p>
        <p>
          Quickly get started with a Svelte project that uses Pocketbase as a
          backend service. This project is a great starting point for any Svelte
          project that needs a backend service.
        </p>
      </div>
      <div class="flex space-x-4">
        <Button href="/" class="w-48" variant="primary">back</Button>
        <Button
          href="https://github.com/KooperL/svelte-pocketbase-quickstart"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />view code</Button
        >
        <Button
          href="https://svelte-pocketbase-quickstart.pages.dev"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />demo</Button
        >
      </div>
    </div>
  </Card>
</div>
