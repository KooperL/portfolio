<script lang="ts">
    import { Card } from 'flowbite-svelte';
    import CmsImage from './CMSImage.svelte';
    import CmsButton from './CMSButton.svelte';
    import CmsButtonGroup from './CMSButtonGroup.svelte';
    import type { Card as CardType } from '$lib/utils/CMS/types';
    
    export let title: CardType['title'];
    export let body: CardType['body'];
    export let image: CardType['image'];
    export let button: CardType['button'];
    export let buttonGroup: CardType['buttonGroup'];
    export let variant: CardType['variant'] = 'default';
    export let buttonActions: Record<string, Function> = {};
  </script>
  
  <Card
    class={variant === 'featured' ? 'border-blue-500 shadow-lg' : 
      variant === 'minimal' ? 'border-0 shadow-none' : ''}
  >
    {#if image}
      <CmsImage {image} className="w-full rounded-t-lg" />
    {/if}
    
    {#if title}
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
    {/if}
    
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {body}
    </p>
    
    {#if button}
      <CmsButton {button} {buttonActions}/>
    {/if}
    
    {#if buttonGroup}
      <CmsButtonGroup buttonGroup={buttonGroup} {buttonActions}/>
    {/if}
  </Card>
  