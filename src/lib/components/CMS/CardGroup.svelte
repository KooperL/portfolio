<script lang="ts">
  import Card from "./CMSCard.svelte";

  export let cardGroup;
  export let layout;
  export let columns = 3;
  export let functions: Record<string, Function> = {};

  const getLayoutClasses = () => {
    if (layout === "horizontal") {
      return "flex flex-wrap overflow-x-auto gap-4";
    }

    const columnClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return `grid ${columnClasses[columns]}`;
  };
</script>

<div class={getLayoutClasses()}>
  {#each cardGroup.cards as card}
    <div
      class={`${layout === "horizontal" ? "flex-none" : ""} w-full md:w-[350px] 2xl:w-full 3xl:w-[350px]`}
    >
      <Card {...card} {functions} />
    </div>
  {/each}
</div>
