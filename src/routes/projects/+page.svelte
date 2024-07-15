<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Card, Button, Skeleton } from 'flowbite-svelte';
	import { site } from '$lib/config';
  import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons'

	onMount(async () => {


		
	});
</script>

<div class="box-border p-8 w-full h-full">
<Card class="w-full max-w-full h-full bg-white/50">
	<div class="flex flex-col space-y-4">
		<span class="text-4xl font-bold" data-test="title">Published sites</span>
		<Button data-test="projects-link-to-bingo" href="/projects/bingoApp" class="w-48" variant="primary">dropzones</Button>
		<Button data-test="projects-link-to-pento" href="/projects/pento" class="w-48" variant="primary">pento</Button>
		{#if false}<Button href="/projects/vybs" class="w-48" variant="primary">vybs</Button>{/if}

		<span class="text-4xl font-bold" data-test="title">My projects</span>

		<Button href="https://github.com/KooperL/svelte-pocketbase-quickstart" class="w-48" variant="primary"><ArrowRightToBracketOutline class="w-5 pr-2 h-5" /><marquee class="text-xxs text-nowrap-fff">svelte-pocketbase-quickstart</marquee></Button>
		<Button href="https://github.com/KooperL/mdApp" class="w-48" variant="primary"><ArrowRightToBracketOutline class="w-5 h-5 pr-2"  />mdApp</Button>
	</div>
</Card>
</div>
