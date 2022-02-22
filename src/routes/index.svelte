<script>
	import ChooseWorkout from '$lib/components/ChooseWorkout.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
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

<main>
	{#if !$user}
		<img src="/ghost.svg" alt="ghost" />
		<header>
			<h1>Spooky Sets</h1>
			<h2>Create a <a href="/pages/workout" class="highlight">Workout</a></h2>
			<h2>List Your <a href="pages/workout" class="highlight">Exercises</a></h2>
			<h2>Track Your <a href="/pages/workout" class="highlight">Sets</a></h2>
		</header>
		<div class="cta">
			<a href="/pages/workout">Workout Now!</a>
			<a href="/pages/signUp">Log In</a>
		</div>
	{:else}
		<ChooseWorkout />
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-gap: var(--size-9);
		align-self: center;
		justify-content: center;
	}
	header {
		display: grid;
		grid-gap: var(--size-5);
	}
	header h1 {
		font-size: var(--font-size-6);
		text-align: center;
		color: var(--grape-3);
	}
	header h2 {
		font-size: var(--font-size-4);
		text-align: center;
	}
	img {
		height: var(--size-fluid-7);
		width: var(--size-fluid-7);
		margin: auto;
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
</style>
