<script lang="ts">
  import { Button } from "flowbite-svelte";
  import Icon from "./CMSIcon.svelte";
  import { base } from "$app/paths";
  import type { CMSEvent } from "$lib/utils/CMS/types";

  export let id: string = "";
  export let label: string = "";
  export let href: string = "";
  export let testId: string = "";
  export let icon: string = "";
  export let disabled: boolean = false;
  export let events: CMSEvent[] = [];
  export let functions: Record<string, Function> = {};
</script>

<Button
  class="custom-button rounded text-nowrap"
  style="
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 66%, 78% 100%, 0 100%);
  "
  href={href ? (href.startsWith("/") ? `${base}${href}` : href) : undefined}
  {disabled}
  data-testid={testId}
  variant={"primary"}
  {...$$restProps}
  on:click={() => {
    events.forEach((event) => {
      const funcName = event.name || event.action;
      if (functions[funcName] && event.params) {
        functions[funcName](event.params);
      }
    });
  }}
>
  {#if icon}
    <Icon icon={icon} className="mr-2" />
  {/if}
  {label}
</Button>
