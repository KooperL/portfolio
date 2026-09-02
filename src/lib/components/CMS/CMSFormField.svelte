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
</script>

<div class="mb-4">
  <Label for={field.id} class="mb-2">{field.label}</Label>

  {#if field.type === "textarea"}
    <Textarea
      id={field.id}
      placeholder={field.placeholder}
      required={field.required}
      minlength={field.validation?.minLength}
      maxlength={field.validation?.maxLength}
    />
  {:else if field.type === "select"}
    <Select
      id={field.id}
      required={field.required}
    >
      {#each field.options || [] as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </Select>
  {:else if field.type === "checkbox"}
    <Checkbox
      id={field.id}
      required={field.required}
    >
      {field.label}
    </Checkbox>
  {:else if field.type === "radio"}
    {#each field.options || [] as option}
      <Radio name={field.id} value={option.value}>
        {option.label}
      </Radio>
    {/each}
  {:else}
    <Input
      id={field.id}
      type={field.type}
      placeholder={field.placeholder}
      required={field.required}
      pattern={field.validation?.pattern}
      minlength={field.validation?.minLength}
      maxlength={field.validation?.maxLength}
    />
  {/if}
</div>
