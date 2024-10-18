<script lang="ts">
    import CmsButton from "./CMSButton.svelte";
    import CmsFormField from "./CMSFormField.svelte";

    
    export let title: string;
    export let fields: Form['fields'];
    export let submitButton: Form['submitButton'];
    export let endpoint: Form['endpoint'];
    export let successMessage: Form['successMessage'];
    export let errorMessage: Form['errorMessage'];
    
    let formData = {};
    let loading = false;
    let success = false;
    let error = '';
    
    async function handleSubmit() {
      if (!endpoint) return;
      
      loading = true;
      error = '';
      success = false;
      
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Submission failed');
        
        success = true;
        formData = {};
      } catch (err) {
        error = errorMessage || 'An error occurred. Please try again.';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="max-w-2xl mx-auto p-4">
    <h3 class="mb-4 text-2xl font-bold">{title}</h3>
    
    {#each fields as field}
      <CmsFormField 
        {field} 
        bind:value={formData[field.id]} 
      />
    {/each}
    
    {#if error}
      <div class="mb-4 text-red-500">{error}</div>
    {/if}
    
    {#if success}
      <div class="mb-4 text-green-500">{successMessage || 'Form submitted successfully!'}</div>
    {/if}
    
    <CmsButton
      button={{
        ...submitButton,
        disabled: loading,
        label: loading ? 'Submitting...' : submitButton.label
      }}
      type="submit"
    />
  </form>