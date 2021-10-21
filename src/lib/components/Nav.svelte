<script>
	import SignOut from './SignOut.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { fly } from 'svelte/transition';
	export let toggleNav;
</script>

<nav transition:fly={{ x: '500' }}>
	<button on:click={toggleNav} class="close">&times;</button>

	<div on:click={toggleNav} class="background" />
	<a on:click={toggleNav} href="/">Home</a>
	<a on:click={toggleNav} href="/pages/workout">Workout</a>
	<a on:click={toggleNav} href="/pages/bodyfat">Bodyfat Percentage</a>
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
	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	a {
		text-decoration: none;
		font-size: var(--heading-three);
		padding-top: 1rem;
	}
	.close {
		--size: 30px;
		background: var(--purple);
		color: var(--foreground);
		width: var(--size);
		height: var(--size);
		text-align: center;
		padding: 0;
		border-radius: var(--size);
		position: absolute;
		top: 1rem;
		right: 1rem;
		border: none;
		font-size: var(--paragraph);
	}
</style>
