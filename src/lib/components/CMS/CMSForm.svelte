<script lang="ts">
  import type { Form } from "$lib/utils/CMS/types";
  import CmsButton from "./CMSButton.svelte";
  import CmsFormField from "./CMSFormField.svelte";

  export let fields: Form["fields"];
  export let submitButton: Form["submitButton"];
  export let bindings: Record<string, { bind: string }> = {};
  export let functions: Record<string, Function> = {};

  let loading = false;
  let success = false;
  let error = "";
</script>

<form
  on:submit|preventDefault={() => {
    if (submitButton.events) {
      submitButton.events.forEach((event) => {
        if (functions[event.name]) {
          functions[event.name](...event.payload);
        }
      });
    }
  }}
  class="max-w-2xl mx-auto p-4"
>
  {#each fields as field}
    <CmsFormField {field} binding={bindings[field.id]} />
  {/each}

  {#if error}
    <div class="mb-4 text-red-500">{error}</div>
  {/if}

  {#if success}
    <div class="mb-4 text-green-500">
      {successMessage || "Form submitted successfully!"}
    </div>
  {/if}

  <CmsButton
    button={{
      ...submitButton,
      disabled: loading,
      label: loading ? "Submitting..." : submitButton.label,
    }}
    type="submit"
  />
</form>
