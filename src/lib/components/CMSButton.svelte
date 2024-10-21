<script lang="ts">
  import { Button } from "flowbite-svelte";
  import * as typess from "$lib/utils/CMS/types";
  import Icon from "./Icon.svelte";

  export let button: typess.Button;
  export let buttonActions: Record<string, Function> = {};

  // Map CMS button variants to Flowbite variants
  const variantMap = {
    primary: "blue",
    secondary: "light",
    ghost: "alternative",
  };
</script>

<Button
  href={button.href}
  color={variantMap[button.variant || "primary"]}
  disabled={button.disabled}
  data-testid={button.testId}
  {...$$restProps}
  on:click={() => {
    console.log("Button clicked", buttonActions, button);
    if (button.events) {
      button.events.forEach((event) => {
        if (buttonActions[event.name]) {
          buttonActions[event.name](...event.payload);
        }
      });
    }
  }}
>
  {#if button.icon}
    <Icon icon={button.icon} className="mr-2" />
  {/if}
  {button.label}
</Button>
