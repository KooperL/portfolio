<script lang="ts">
  import { onMount } from "svelte";
  import { Alert } from "flowbite-svelte";
  import HeroSection from "$lib/components/HeroSection.svelte";
  import TextBodyComponent from "$lib/components/TextBody.svelte";
  import CardComponent from "$lib/components/Card.svelte";
  import FormComponent from "$lib/components/Form.svelte";
  import type {
    Content,
    ContentElement,
    TextBody,
    Card,
    Form,
    EmbeddedFrame,
  } from "$lib/utils/CMS/types";
  import EmbeddedFrameComponent from "$lib/components/EmbeddedFrame.svelte";

  // Input can be either a JSON string or a parsed Content object
  export let content: string | Content;
  export let loading = false;
  export let functions: Record<string, Function> = {};

  let parsedContent: Content | null = null;
  let error: string | null = null;

  // Content type guards
  const isTextBody = (
    element: ContentElement,
  ): element is { type: "textBody"; content: TextBody } =>
    element.type === "textBody";

  const isCard = (
    element: ContentElement,
  ): element is { type: "card"; content: Card } => element.type === "card";

  const isForm = (
    element: ContentElement,
  ): element is { type: "form"; content: Form } => element.type === "form";

  const isEmbeddedFrame = (
    element: ContentElement,
  ): element is { type: "embeddedFrame"; content: EmbeddedFrame } =>
    element.type === "embeddedFrame";

  // Content validation
  function validateContent(content: Content): boolean {
    try {
      // Basic structure validation
      if (
        !content.pageContent ||
        !Array.isArray(content.pageContent.elements)
      ) {
        throw new Error("Invalid content structure");
      }

      // Validate each element has required properties
      content.pageContent.elements.forEach((element) => {
        if (!element.type || !element.content) {
          throw new Error(
            `Invalid element structure: ${JSON.stringify(element)}`,
          );
        }
      });

      return true;
    } catch (err) {
      error = err.message;
      return false;
    }
  }

  // Parse content if it's a string
  function parseContent() {
    try {
      if (typeof content === "string") {
        parsedContent = JSON.parse(content);
      } else {
        parsedContent = content;
      }

      if (!validateContent(parsedContent)) {
        parsedContent = null;
      }
    } catch (err) {
      error = "Failed to parse content";
      parsedContent = null;
    }
  }

  // Watch for content changes
  $: if (content) {
    error = null;
    parseContent();
  }

  // Sort elements by order
  function sortElements(elements: ContentElement[]): ContentElement[] {
    return [...elements].sort((a, b) => a.content.order - b.content.order);
  }
</script>

{#if loading}
  <div class="flex justify-center items-center min-h-[200px]">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
    ></div>
  </div>
{:else if error}
  <Alert color="red" class="mb-4">
    <span class="font-medium">Error:</span>
    {error}
  </Alert>
{:else if parsedContent}
  <!-- Hero Section -->
  {#if parsedContent.heroText}
    <section class="mb-8">
      <HeroSection {...parsedContent.heroText} buttonActions={functions} />
    </section>
  {/if}

  <!-- Main Content -->
  {#each sortElements(parsedContent.pageContent.elements) as element}
    <section class="mb-8 h-fit">
      {#if isTextBody(element)}
        <TextBodyComponent {...element.content} buttonActions={functions} />
      {:else if isForm(element)}
        <FormComponent {...element.content} {functions} />
      {:else if isEmbeddedFrame(element)}
        <EmbeddedFrameComponent {...element.content} />
      {:else}
        <Alert color="yellow">
          Unknown content type: {element.type}
        </Alert>
      {/if}
    </section>
  {/each}
{/if}
