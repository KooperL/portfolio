<script lang="ts">
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";

  export let icon: string;
  export let className = "";
</script>

{#if icon === "ArrowRightToBracketOutline"}
  <ArrowRightToBracketOutline class={className} />
{/if}
