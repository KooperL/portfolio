<script lang="ts">
  import type { CmsDocumentObject, CmsNode, CmsEvent } from "./cms";
  import type { ResolvedNode } from "./parser";
  import { resolveDocument } from "./parser";
  import { dispatchEvents } from "./events";
  import type { FunctionRegistry } from "./events";
  import { Button, Card } from "flowbite-svelte";
  import { base } from "$app/paths";
  import CMSIcon from "$lib/components/CMS/CMSIcon.svelte";

  // Top-level mode: pass a document
  export let doc: CmsDocumentObject | null = null;
  export let variables: Record<string, any> = {};
  export let functions: FunctionRegistry = {};

  // Recursive node mode (used internally via <svelte:self>)
  export let node: ResolvedNode | null = null;

  $: resolved = doc ? resolveDocument(doc, variables) : null;

  function handleEvents(events: CmsEvent[] | undefined, payload: Record<string, string> = {}) {
    dispatchEvents(events, { event: payload }, functions);
  }
</script>

{#if node}
  <!-- Recursive node rendering -->
  {#if node.type === "title"}
    <h2 class="mb-4 text-3xl font-extrabold text-gray-700 dark:text-white {node.styling ?? ''}">
      {node.props.value ?? ''}
    </h2>
  {:else if node.type === "text"}
    <div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12 text-left {node.styling ?? ''}">
      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        {#each (node.props.value ?? '').split('\n\n').filter(p => p.length) as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    </div>
  {:else if node.type === "textarea"}
    <div class="text-gray-700 dark:text-gray-300 {node.styling ?? ''}">
      {node.props.value ?? ''}
    </div>
  {:else if node.type === "hero"}
    <div class="relative bg-cover bg-center pt-8 pb-24 px-16 sm:py-16 sm:px-4 {node.styling ?? ''}">
      <div class="background bottom bg-primary-700"></div>
      <div class="background top bg-gray-300"></div>
      <div class="relative z-3 max-w-screen-xl mx-auto text-center" style="z-index:3;">
        <h1 class="font-extrabold tracking-tight text-gray-700 leading-none text-4xl md:text-5xl lg:text-6xl">
          {node.props.title ?? ''}
        </h1>
        <p class="mb-8 font-normal text-gray-700 text-lg lg:text-xl sm:px-16 lg:px-48">
          {node.props.subtitle ?? ''}
        </p>
        <div class="my-16"></div>
        {#if node.children && node.children.length > 0}
          <div class="flex flex-wrap gap-3 justify-center">
            {#each node.children as child}
              <svelte:self node={child} {functions} />
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {:else if node.type === "container"}
    <div class="py-4 px-2 mx-auto max-w-screen-xl lg:px-12 {node.styling ?? ''}">
      {#if node.props.title}
        <h3 class="mb-2 text-2xl font-bold text-gray-700 dark:text-white">
          {node.props.title}
        </h3>
      {/if}
      {#if node.props.description}
        <p class="mb-4 text-gray-600 dark:text-gray-300">{node.props.description}</p>
      {/if}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each node.children as child (child.id)}
          <svelte:self node={child} {functions} />
        {/each}
      </div>
    </div>
  {:else if node.type === "buttonContainer"}
    <div class="flex flex-wrap gap-3 justify-center {node.styling ?? ''}">
      {#each node.children as child (child.id)}
        <svelte:self node={child} {functions} />
      {/each}
    </div>
  {:else if node.type === "card"}
    <Card class="w-full max-w-full {node.styling ?? ''}">
      <div class="flex flex-col">
        {#if node.props.image}
          <div class="h-full flex justify-center items-center">
            <img
              src={node.props.image}
              alt={node.props.title ?? node.id}
              class="rounded-t-lg overflow-hidden"
            />
          </div>
        {/if}
        <div class="p-4 flex flex-col">
          {#if node.props.title}
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
              {node.props.title}
            </h5>
          {/if}
          {#if node.props.description}
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap">
              {node.props.description}
            </p>
          {/if}
          {#if node.props.url}
            <div class="mt-2">
              <Button
                class="custom-button rounded text-nowrap"
                style="-webkit-clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%); clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%);"
                href={node.props.url.startsWith('/') ? `${base}${node.props.url}` : node.props.url}
                variant="primary"
              >
                Learn more
              </Button>
            </div>
          {/if}
        </div>
      </div>
    </Card>
  {:else if node.type === "button"}
    <Button
      class="custom-button rounded text-nowrap"
      style="-webkit-clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%); clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%);"
      href={node.props.url ? (node.props.url.startsWith('/') ? `${base}${node.props.url}` : node.props.url) : undefined}
      variant="primary"
      on:click={() => handleEvents(node.events, {})}
    >
      {#if node.props.icon}
        <CMSIcon icon={node.props.icon} className="mr-2" />
      {/if}
      {node.props.text ?? node.props.value ?? ''}
    </Button>
  {:else if node.type === "image"}
    <img
      src={node.props.media ?? node.props.src ?? ''}
      alt={node.props.alt ?? node.id}
      class={node.styling ?? ''}
    />
  {:else if node.type === "input"}
    <input
      type="text"
      class="mb-2 w-full px-3 py-2 border rounded text-gray-700 {node.styling ?? ''}"
      value={node.props.value ?? ''}
      on:input={(e) => handleEvents(node.events, { value: e.target.value })}
    />
  {:else if node.type === "embeddedFrame"}
    <iframe src={node.props.url ?? ''} class="w-full h-128 {node.styling ?? ''}" />
  {:else if node.type === "table"}
    <table class="w-full text-sm text-left text-gray-500 {node.styling ?? ''}">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {#each Object.keys(node.props) as col}
            <th class="px-6 py-3">{col}</th>
          {/each}
        </tr>
      </thead>
    </table>
  {:else}
    <div class={node.styling ?? ''}>
      <span class="text-gray-400 text-sm">[{node.type}] {node.id}</span>
    </div>
  {/if}
{:else if resolved}
  <!-- Top-level document rendering -->
  {#each resolved.pages as pageData (pageData.page.id)}
    {#each pageData.children as child (child.id)}
      <svelte:self node={child} {functions} />
    {/each}
  {/each}
{/if}

<style>
  .background {
    top: 0;
    left: 0;
    position: absolute;
    height: 80%;
    width: 100%;
  }
  .top {
    animation-name: breathe-2;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    z-index: 2;
  }
  .bottom {
    animation-name: breathe-1;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    z-index: 1;
  }
  @keyframes breathe-1 {
    0% { border-bottom-right-radius: 60%; border-bottom-left-radius: 10%; }
    50% { border-bottom-right-radius: 65%; border-bottom-left-radius: 15%; }
    100% { border-bottom-right-radius: 60%; border-bottom-left-radius: 10%; }
  }
  @keyframes breathe-2 {
    0% { border-bottom-right-radius: 80%; border-bottom-left-radius: 20%; }
    50% { border-bottom-right-radius: 85%; border-bottom-left-radius: 35%; }
    100% { border-bottom-right-radius: 80%; border-bottom-left-radius: 20%; }
  }
</style>
