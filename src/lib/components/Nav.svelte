<script>
	import SignOut from './SignOut.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { fly } from 'svelte/transition';
	export let toggleNav;
</script>

<nav transition:fly={{ x: '500' }}>
	<a on:click={toggleNav} href="/">Home</a>
	<a on:click={toggleNav} href="/pages/workout">Workout</a>
	{#if !$user}
		<a on:click={toggleNav} href="/pages/signUp">SignUp</a>
	{:else}
		<a on:click={toggleNav} href="/pages/profile">Profile</a>
		<SignOut />
	{/if}
</nav>

<style>
	nav {
		padding: 1rem;

		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;

		position: fixed;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		background-color: var(--black);
		text-decoration: underline;
	}
	a {
		text-decoration: none;
		font-size: var(--heading-three);
		padding-top: 1rem;
	}
</style>
