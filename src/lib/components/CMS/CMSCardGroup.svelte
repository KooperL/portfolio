<script lang="ts">
  import Card from "./CMSCard.svelte";

  export let cardGroup;
  export let functions: Record<string, Function> = {};

  const getLayoutClasses = () => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return `grid ${columnClasses[cardGroup.columns]} gap-4`;
  };
</script>

<div class={getLayoutClasses()}>
  {#each cardGroup.cards as card}
    <div
      class={`${cardGroup.horizontal ? "flex-none " : ""}`}
      style={cardGroup.horizontal
        ? `grid-column-start: 1; grid-column-end: -1;`
        : ""}
    >
      <Card {...card} horizontal={cardGroup.horizontal} {functions} />
    </div>
  {/each}
</div>
