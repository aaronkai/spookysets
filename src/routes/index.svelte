<script>
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

	console.log($user);
</script>

<main>
	<header>
		<h1><span class="highlight">Spoooky Sets</span></h1>
		<h2>Create a <span class="highlight">Workout</span></h2>
		<h2>List Your <span class="highlight">Exercises</span></h2>
		<h2>Track Your <span class="highlight">Sets</span></h2>
	</header>
	<div class="cta">
		{#if $user}
			<a href="/pages/workout">Workout</a>
		{:else}
			<a href="/pages/workout">Workout</a>
			<a href="/pages/signUp">SignUp</a>
		{/if}
	</div>
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
	.cta {
		display: grid;
		grid-gap: var(--spacing-xs);
		grid-template-columns: 1fr 1fr;
	}
	.highlight {
		background-image: var(--yellow-pink);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	header h1 {
		font-size: var(--font-5xl);
		text-align: center;
	}
	header h2 {
		font-size: var(--font-2xl);
		text-align: center;
	}

	a {
		display: block;
		background-image: var(--yellow-pink);
		color: var(--black-dark);
		padding: 1rem;
		width: 100%;
		text-align: center;
		border-radius: 10px;
		text-decoration: none;
		font-size: var(--heading-six);
		margin: 0 auto;
	}
</style>
