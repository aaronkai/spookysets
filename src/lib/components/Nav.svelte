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
	<a on:click={toggleNav} href="/pages/about">About</a>

	{#if !$user}
		<a on:click={toggleNav} href="/pages/signUp">SignUp</a>
	{:else}
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
		background-color: var(--gray-9);
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
		font-size: var(--size-5);
		padding-top: var(--size-4);
		color: var(--violet-3);
	}
	.close {
		background: var(--red-5);
		color: var(--gray-0);
		width: var(--size-7);
		height: var(--size-7);
		/* text-align: center; */
		/* padding: 0; */
		border-radius: var(--size-3);
		position: absolute;
		top: var(--size-3);
		right: var(--size-3);
		border: none;
		font-size: var(--size-4);
		cursor: pointer;
	}
</style>
