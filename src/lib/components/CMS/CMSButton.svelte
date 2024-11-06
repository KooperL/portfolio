<script lang="ts">
  import { Button } from "flowbite-svelte";
  import * as typess from "$lib/utils/CMS/types";
  import Icon from "./CMSIcon.svelte";
    import { base } from "$app/paths";

  export let button: typess.Button;
  export let functions: Record<string, Function> = {};
</script>

<Button
  class="custom-button rounded text-nowrap"
  style="
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%);
  "
  href={button?.href ? button.href.startsWith('/') ? `${base}${button.href}` : button.href : null}
  disabled={button.disabled}
  data-testid={button.testId}
  variant={"primary"}
  {...$$restProps}
  on:click={() => {
    if (button.events) {
      button.events.forEach((event) => {
        if (functions[event.name]) {
          functions[event.name](...event.payload);
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

<style>
</style>
