<script>
	import Profile from '$lib/components/Profile.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import AuthForm from '$lib/components/AuthForm.svelte';

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

<div class="wrapper">
	<main>
		<header>
			<div class="subheader">
				<h2>Create a <span class="highlight">Workout</span></h2>
				<h2>List Your <span class="highlight">Exercises</span></h2>
				<h2>Track Your <span class="highlight">Sets</span></h2>
				{#if $user}
					<a href="/pages/workout">Workout</a>
				{:else}
					<a href="/pages/signUp">SignUp</a>
				{/if}
			</div>
		</header>

		<!-- <section>
				{#if $user}
					<Profile bind:ctaVisible />
				{:else}
					<AuthForm />
		
			</section> -->
	</main>
</div>

<style>
	@media only screen and (min-height: 900px) {
		.wrapper {
			background-image: url('/ghost.svg');
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 3rem;
			background-size: 3rem;
			animation: animatedBackground 2s ease-in-out infinite alternate;
		}
	}

	@keyframes animatedBackground {
		from {
			background-position-y: 3rem;
			background-size: 3.3rem;
		}
		to {
			background-position-y: 4rem;
			background-size: 3rem;
		}
	}

	main {
		display: grid;
		width: 100%;
		max-width: 500px;
		margin: auto;
		row-gap: 3rem;
	}

	.subheader {
		display: grid;
		justify-items: center;
	}
	header h1 {
		text-align: center;
		margin: 0;
	}
	header h2 {
		text-align: center;
		margin: 0.5rem 0;
		font-size: 1.5rem;
	}
	.subheader {
		margin: 1rem;
	}
	header button {
		background-color: var(--green);
		border: none;
		padding: 0.5rem 1rem;
		margin-top: 1rem;
		font-weight: 700;
		color: var(--off-black);
		font-size: 1.5rem;
	}
</style>
