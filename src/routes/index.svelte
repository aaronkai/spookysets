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
	<h2>Create a <span class="highlight">Workout</span></h2>
	<h2>List Your <span class="highlight">Exercises</span></h2>
	<h2>Track Your <span class="highlight">Sets</span></h2>
	{#if $user}
		<a href="/pages/workout">Workout</a>
	{:else}
		<a href="/pages/workout">Workout</a>
		<a href="/pages/signUp">SignUp</a>
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-gap: 1rem;
		width: 100%;
		align-self: center;
		justify-content: center;
		/* justify-content: center; */
	}

	.highlight {
		background-image: var(--grad-orange-to-pink);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	main h2 {
		font-size: var(--heading-five);
		text-align: center;
	}

	a {
		display: block;
		background-image: var(--grad-orange-to-pink);
		color: var(--black-dark);
		padding: 1rem;
		width: 50%;
		text-align: center;
		border-radius: 10px;
		text-decoration: none;
		font-size: var(--heading-six);
		margin: 0 auto;
	}
	.cta {
	}
</style>
