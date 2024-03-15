<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Modal,
		Label,
		Input,
		DarkMode,
		Checkbox,
		Progressbar,
		Marquee
	} from 'flowbite-svelte';
	import { AtomOutline, CodeMergeOutline, CodeOutline, DatabaseOutline, DesktopPcOutline, DnaOutline, HeadphonesOutline, HomeOutline, KeyboardOutline, MobilePhoneOutline, ProfileCardOutline, RocketOutline, StarOutline, TerminalOutline, UserCircleOutline, UserSolid } from 'flowbite-svelte-icons';
	import { pb, currentUser } from '../pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { site } from '$lib/config';

	let openLoginModalAttempted = false;
	let logoutModalAttempted = false;
	let pendingUsernameChange = $currentUser?.model?.username;
</script>

<Navbar class="flex flex-row">
	<NavBrand href="/" class="w-20">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			<HomeOutline />
		</span>
	</NavBrand>
	<Marquee class="w-0 grow">
		<AtomOutline />
		<MobilePhoneOutline />
		<ProfileCardOutline />
		<CodeMergeOutline />
		<CodeOutline />
		<DatabaseOutline />
		<DesktopPcOutline />
		<DnaOutline />
		<KeyboardOutline />
		<StarOutline />
		<TerminalOutline />
	</Marquee>
<div class="w-20 flex justify-end">
	<DarkMode class="w-10 h-10" />

</div>

</Navbar>

