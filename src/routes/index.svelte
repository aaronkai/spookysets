<script>
	import ChooseWorkout from '$lib/components/ChooseWorkout.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	let ctaVisible = true;
	//instantiate user store
	user.set(supabase.auth.user());

	//when there is a change to auth status, update the user store
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});

	function handleClick() {
		ctaVisible = !ctaVisible;
	}
</script>

<main class="grid gap-8 ">
	{#if !$user}
		<img class="h-20 w-20 m-auto" src="/ghost.svg" alt="ghost" />
		<header class="grid gap-4 justify-center text-center">
			<h1 class="font-bungee text-5xl align-middle text-fuchsia-300">Spooky Sets</h1>
			<h2>Create a <a href="/pages/workout" class="highlight">Workout</a></h2>
			<h2>List Your <a href="pages/workout" class="highlight">Exercises</a></h2>
			<h2>Track Your <a href="/pages/workout" class="highlight">Sets</a></h2>
		</header>
		<div class="grid grid-cols-2 gap-8 cta">
			<a href="/pages/workout">Workout Now!</a>
			<a href="/pages/signUp">Log In</a>
		</div>
	{:else}
		<ChooseWorkout />
	{/if}
</main>

<!-- <style>



	header h2 {
		font-size: var(--font-size-4);
		text-align: center;
	}
	.cta {
		display: grid;
		grid-gap: var(--size-6);
		grid-template-columns: 1fr 1fr;
	}
	.cta a {
		display: block;
		background: var(--green-4);
		color: var(--gray-9);
		padding: var(--size-3);
		width: 100%;
		text-align: center;
		border-radius: var(--radius-2);
		text-decoration: none;
		font-size: var(--font-size-2);
		margin: 0 auto;
	}

	.cta a:hover {
		background: var(--grape-3);
	}

	.highlight {
		color: var(--grape-3);
	}

	@media (max-width: 600px) {
		.cta {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(2, 1fr);
		}
	}
</style> -->
<style>
	h2 {
		@apply text-3xl text-gray-50 font-bungee;
	}
	a {
		@apply text-3xl text-gray-50 font-bungee;
	}
	.cta a {
		@apply bg-violet-400 rounded py-2 px-4 text-slate-900 text-center;
	}
	.highlight {
		@apply text-fuchsia-300;
	}
</style>
