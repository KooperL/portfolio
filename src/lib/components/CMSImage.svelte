<script lang="ts">
    
    export let image: any;
    export let className = '';
  </script>
  
  <img
    src={image.url}
    alt={image.alt}
    class={className}
    width={image.width}
    height={image.height}
    loading={image.lazy ? 'lazy' : 'eager'}
  />
  
  {#if image.caption}
    <figcaption class="mt-2 text-sm text-gray-500">
      {image.caption}
    </figcaption>
  {/if}