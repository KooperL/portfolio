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
		<span class="text-4xl font-bold">Welcome to my portfolio</span>
		<div>
		<span class=" font-bold">I'm Kooper. Enjoy your visit and have a poke around. Let me know if you like what you see!</span>
		<span class="hidden md:block  font-bold">(Try playing around with the plane on the right)</span>
	</div>
			<Button href="/projects" class="w-48" variant="primary">Projects</Button>
			<Button href="/about" class="w-48" variant="primary">About</Button>
			<Button href="/contact" class="w-48" variant="primary">Contact</Button>
		<span class="text-4xl font-bold">External links</span>

			<Button href="https://github.com/KooperL" class="w-48" variant="primary"><ArrowRightToBracketOutline class="w-5 pr-2 h-5" />GitHub</Button>
			<Button href="https://linkedin.com/in/kooper" class="w-48" variant="primary"><ArrowRightToBracketOutline class="w-5 h-5 pr-2"  />LinkedIn</Button>
	</div>
</Card>
</div>