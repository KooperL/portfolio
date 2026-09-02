<script lang="ts">
  export let title: string = "";
  export let body: string[] = [];
  export let alignment: "left" | "center" | "right" = "left";

  $: textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];
</script>

<div class="py-2 px-2 mx-auto max-w-screen-xl lg:px-12 {textAlign}">
  {#if title}
    <h2 class="mb-4 text-3xl font-extrabold text-gray-700 dark:text-white">
      {title}
    </h2>
  {/if}

  {#if body && body.length > 0}
    <div class="space-y-4 text-gray-700 dark:text-gray-300">
      {#each body as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
  {/if}
</div>
