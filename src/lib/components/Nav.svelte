<script>
	import SignOut from './SignOut.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { fly } from 'svelte/transition';
	export let toggleNav;
</script>

<nav
	class="p-4 left-0 right-0 bottom-0 top-0 flex flex-col fixed bg-gray-900 "
	transition:fly={{ x: 500 }}
>
	<button
		on:click={toggleNav}
		class="bg-fuchsia-400 text-gray-50 w-8 h-8 rounded absolute top-4 right-4 border-none text-3xl cursor-pointer font-bold flex justify-center items-center "
		>&times;</button
	>

	<div on:click={toggleNav} class="background w-full h-full absolute z-0" />
	<div class="grid gap-4">
		<a on:click={toggleNav} href="/">Home</a>
		<a on:click={toggleNav} href="/pages/workout">Workout</a>
		<a on:click={toggleNav} href="/pages/bodyfat">Bodyfat Percentage</a>
		<a on:click={toggleNav} href="/pages/about">About</a>

		{#if !$user}
			<a on:click={toggleNav} href="/pages/signUp">SignUp</a>
		{:else}
			<SignOut />
		{/if}
	</div>
</nav>

<style>
	a {
		@apply text-fuchsia-300 text-3xl font-bungee underline underline-offset-2 z-50;
	}
</style>
