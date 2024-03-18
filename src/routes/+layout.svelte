<script lang="ts">
	import '../app.pcss';
	import { beforeNavigate } from '$app/navigation';
	import { Flex, Box } from '@threlte/flex'
	import {
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		Toast,
		FooterLink
	} from 'flowbite-svelte';
	import { FireOutline, ExclamationCircleOutline, UserCircleOutline } from 'flowbite-svelte-icons';
	import Navbar from '$lib/components/navbar.svelte';
	import { site } from '$lib/config';
	import { metadata, toast } from '$lib/app/stores';
	import TestScene from '$lib/components/scenes/grid/grid.svelte'
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { base } from '$app/paths';


	let formModal = false;
	$: title = ($metadata.title ? $metadata.title + ' | ' : '') + site.name;
	$: description = site.description;
	$: headline = $metadata.title;
	let renderer
	beforeNavigate(() => {});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="flex h-full flex-col">
	<header>
		<Navbar />
	</header>
	<main class="flex grow max-h-full w-full bg-dotted-spacing-6 bg-dotted-primary-700 bg-dotted-radius-0.1">
		<div class="w-full md:min-w-96 md:w-2/3 lg:w-1/2" style="max-height: 100%">
			<slot />
			{#if $toast?.text}
				<Toast class="absolute bottom-2.5 left-1/2 mb-4 -translate-x-1/2">
					{#if $toast.icon === 'ExclamationCircleOutline'}
						<ExclamationCircleOutline
							slot="icon"
							class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
						/>
					{:else if $toast.icon === 'FireOutline'}
						<FireOutline
							slot="icon"
							class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
						/>
					{/if}
					{$toast.text}
				</Toast>
			{/if}
		</div>
		<div class="hidden md:block flex h-full flex-col items-center justify-center lg:aspect-square" style="max-width: 50%;">
			<Canvas bind:this={renderer} id="canvas">
				<World>
					<TestScene renderer={renderer}/>
				</World>
		</Canvas>
</div>

	</main>
	<Footer class="flex justify-center">
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href={`${base}/projects`}>Home</FooterLink>
			<FooterLink href="/projects">Projects</FooterLink>
			<FooterLink href="/about">About</FooterLink>
			<FooterLink href="/contact">Contact</FooterLink>
		</FooterLinkGroup>
	</Footer>
</div>

<style>
	canvas {
		/* max-height: 48rem; */
		aspect-ratio: 1;
	}


	main1 {
  --dot-bg: black;
  --dot-color: red;
  --dot-size: 2px;
  --dot-space: 22px;
	background:
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		var(--dot-color);
}
			canvas { width: 100%; height: 100%;}
</style>
