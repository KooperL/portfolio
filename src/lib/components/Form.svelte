<script lang="ts">
  import type { Form } from "$lib/utils/CMS/types";
  import CmsButton from "./CMSButton.svelte";
  import CmsFormField from "./CMSFormField.svelte";

  export let title: string;
  export let fields: Form["fields"];
  export let submitButton: Form["submitButton"];
  export let endpoint: Form["endpoint"];
  export let successMessage: Form["successMessage"];
  export let errorMessage: Form["errorMessage"];
  export let bindings = {};
  export let functions = {};

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
  <h3 class="mb-4 text-2xl font-bold">{title}</h3>

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
