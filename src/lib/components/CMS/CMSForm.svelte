<script lang="ts">
  import type { CMSNode, CMSEvent } from "$lib/utils/CMS/types";
  import CmsButton from "./CMSButton.svelte";
  import CmsFormField from "./CMSFormField.svelte";

  export let fields: any = [];
  export let submitButton: any = null;
  export let functions: Record<string, Function> = {};
  export let events: CMSEvent[] = [];

  let loading = false;
  let success = false;
  let error = "";
</script>

<form
  on:submit|preventDefault={() => {
    if (events.length > 0) {
      events.forEach((event) => {
        const funcName = event.name || event.action;
        if (functions[funcName] && event.params) {
          functions[funcName](event.params);
        }
      });
    }
  }}
  class="max-w-2xl mx-auto p-4"
>
  {#each fields as field}
    <CmsFormField {field} />
  {/each}

  {#if error}
    <div class="mb-4 text-red-500">{error}</div>
  {/if}

  {#if success}
    <div class="mb-4 text-green-500">Form submitted successfully!</div>
  {/if}

  {#if submitButton}
    <CmsButton
      id={submitButton.id || "submit"}
      label={loading ? "Submitting..." : submitButton.label}
      href=""
      disabled={loading}
      events={events}
      {functions}
      type="submit"
    />
  {/if}
</form>
