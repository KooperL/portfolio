<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { Card, Button, Skeleton } from 'flowbite-svelte';
	import { site } from '$lib/config';

	onMount(async () => {


		
	});
</script>

<div class="box-border p-8 w-full h-full">
<Card class="w-full max-w-full h-full bg-white/50">
	<div class="flex flex-col items-center space-y-4">
		<Skeleton class="w-full h-full rounded-full" />

	</div>
</Card>
</div>