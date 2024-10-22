<script lang="ts">
  import {
    Label,
    Input,
    Textarea,
    Select,
    Checkbox,
    Radio,
  } from "flowbite-svelte";

  export let field: any;
  export let binding: any;
</script>

<div class="mb-4">
  <Label for={field.id} class="mb-2">{field.label}</Label>

  {#if field.type === "textarea"}
    <Textarea
      id={field.id}
      placeholder={field.placeholder}
      required={field.validation?.required}
      minlength={field.validation?.minLength}
      maxlength={field.validation?.maxLength}
      bind:value={binding.bind}
    />
  {:else if field.type === "select"}
    <Select
      id={field.id}
      required={field.validation?.required}
      bind:value={binding.bind}
    >
      {#each field.options || [] as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </Select>
  {:else if field.type === "checkbox"}
    <Checkbox
      id={field.id}
      required={field.validation?.required}
      bind:checked={binding.bind}
    >
      {field.label}
    </Checkbox>
  {:else if field.type === "radio"}
    {#each field.options || [] as option}
      <Radio name={field.id} value={option.value} bind:group={binding.bind}>
        {option.label}
      </Radio>
    {/each}
  {:else}
    <Input
      id={field.id}
      type={field.type}
      placeholder={field.placeholder}
      required={field.validation?.required}
      pattern={field.validation?.pattern}
      minlength={field.validation?.minLength}
      maxlength={field.validation?.maxLength}
      bind:value={binding.bind}
    />
  {/if}
</div>
