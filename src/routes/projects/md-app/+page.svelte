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
      <span class="text-4xl font-bold" data-test="title">Text processor</span>
      <div>
        <p class=" font-bold">
          This toy project was made to follow the footsteps over the famously
          difficult issue of rich text editing in browsers.
        </p>
        <p>
          When it comes to having customised rich text (colour, bold, underline,
          headings) on websites, third-party text editors called WYSIWYG editors
          are used by the developers.
        </p>
        <p>
          This is because unlike modern web development, web browsers were
          initially built with no standardization, and different web browsers on
          different systems handle rich text editing different. Hence the
          introduction of specialised third-party editors
        </p>
      </div>
      <div class="flex space-x-4">
        <Button on:click={(e) => {logger.debug('md-app-page','Press "back" button')}} href="/" class="w-48" variant="primary">back</Button>
        <Button
          on:click={(e) => {logger.debug('md-app-page','Press "code" button')}} href="https://github.com/KooperL/mdApp"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />view code</Button
        >
        <Button
          on:click={(e) => {logger.debug('md-app-page','Press "demo" button')}} href="https://mdapp-site.pages.dev/"
          class="w-48"
          variant="primary"
          ><ArrowRightToBracketOutline class="w-5 h-5 pr-2" />demo</Button
        >
      </div>
    </div>
  </Card>
</div>
