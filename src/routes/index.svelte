<script>
	import Workout from '$lib/components/Workout.svelte';
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

<main>
	{#if !$user}
		<header>
			<h1>Spoooky Sets</h1>
			<h2>Create a <a href="/pages/exercises" class="highlight">Workout</a></h2>
			<h2>List Your <a href="pages/exercises" class="highlight">Exercises</a></h2>
			<h2>Track Your <a href="/pages/workout" class="highlight">Sets</a></h2>
		</header>
		<div class="cta">
			<a href="/pages/workout">Workout</a>
			<a href="/pages/signUp">SignUp</a>
		</div>
	{:else}
		<Workout />
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-gap: var(--spacing-lg);
		align-self: center;
		justify-content: center;
	}
	header {
		display: grid;
		grid-gap: var(--spacing-md);
	}
	header h1 {
		font-size: var(--font-5xl);
		text-align: center;
		color: var(--pink);
	}
	header h2 {
		font-size: var(--font-2xl);
		text-align: center;
	}

	.cta {
		display: grid;
		grid-gap: var(--spacing-xs);
		grid-template-columns: 1fr 1fr;
	}
	.cta a {
		display: block;
		background: var(--green);
		color: var(--black-dark);
		padding: 1rem;
		width: 100%;
		text-align: center;
		border-radius: 10px;
		text-decoration: none;
		font-size: var(--heading-six);
		margin: 0 auto;
	}
	.highlight {
		color: var(--pink);
	}
</style>
