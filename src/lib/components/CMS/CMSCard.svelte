<script lang="ts">
  import { Card } from "flowbite-svelte";
  import CmsImage from "./CMSImage.svelte";
  import CmsButton from "./CMSButton.svelte";
  import type { CMSNode, CMSEvent } from "$lib/utils/CMS/types";

  export let title: string = "";
  export let body: string = "";
  export let image: string = "";
  export let icon: string = "";
  export let testId: string = "";
  export let events: CMSEvent[] = [];
  export let functions: Record<string, Function> = {};
  export let children: CMSNode[] = [];
</script>

<Card class="w-full max-w-full" data-testid={testId}>
  <div class="flex flex-col">
    {#if image}
      <div class="h-full flex justify-center items-center">
        <CmsImage
          image={{ url: image, alt: title }}
          className="rounded-t-lg overflow-hidden"
        />
      </div>
    {/if}
    <div class="p-4 flex flex-col">
      {#if title}
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
          {title}
        </h5>
      {/if}

      {#if body}
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap">
          {body}
        </p>
      {/if}

      {#if events.length > 0}
        <div class="mt-2">
          <CmsButton
            id={testId + "-button"}
            label="Learn more"
            href=""
            {events}
            {functions}
          />
        </div>
      {/if}
    </div>
  </div>
</Card>
