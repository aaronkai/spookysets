<script>
	import { supabase } from '$lib/supabaseClient';
	import ErrorMessage from './ErrorMessage.svelte';
	import Toast from './Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { user } from '$lib/stores/sessionStore';

	let signIn = false;
	let email;
	let password;
	let errorMessage;
	let loading = false;

	//when there is a change to auth status, update the user store
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});

	function toggle() {
		signIn = !signIn;
	}

	async function handleSubmit() {
		if (signIn) {
			try {
				loading = true;
				const { user, session, error } = await supabase.auth.signIn({
					email,
					password,
				});
				if (error) {
					throw error;
				} else {
					$alert = { text: 'Success: You have logged in!', isActive: true };
				}
			} catch (error) {
				errorMessage = error.error_description || error.message;
			} finally {
				loading = false;
			}
		} else {
			try {
				loading = true;
				const { user, session, error } = await supabase.auth.signUp({
					email,
					password,
				});

				if (error) {
					throw error;
				} else {
					$alert = { text: 'Check your email for a verification link.!', isActive: true };
					signIn = true;
				}
			} catch (error) {
				errorMessage = error.error_description || error.message;
			} finally {
				loading = false;
			}
		}
	}
	console.log($user);
</script>

<Toast />
{#if !$user}
	<form id="form" on:submit|preventDefault={handleSubmit}>
		{#if signIn}
			<header>
				<h1>Sign In</h1>
			</header>
		{:else}
			<header>
				<h1>Sign Up Now</h1>
				<div class="subheader" />
			</header>
		{/if}
		<label for="email">Email: </label>
		<input
			id="email"
			type="email"
			placeholder="Your email"
			autocomplete="email"
			bind:value={email}
		/>
		<label for="password">Password: </label>
		<input
			type="password"
			placeholder="Your password"
			autocomplete="current-password"
			bind:value={password}
		/>
		{#if errorMessage}
			<ErrorMessage error={errorMessage} />
		{/if}

		{#if signIn}
			<input
				class="submit"
				type="submit"
				value={loading ? 'Loading' : 'Sign In'}
				disabled={loading}
			/>
		{:else}
			<input
				class="submit"
				type="submit"
				value={loading ? 'Loading' : 'Sign Up'}
				disabled={loading}
			/>
		{/if}

		{#if signIn}
			<button on:click={toggle}>Do you need to sign up?</button>
		{:else}
			<button on:click={toggle}>Already have an account?</button>
		{/if}
	</form>
{:else}
	<div class="signedIn">
		<h1>You are signed in!</h1>
		<a href="/">Go pick a workout</a>
	</div>
{/if}

<style>
	button {
		color: var(--pink);
		background: none;
		border: none;
		font-size: 1.2rem;
		padding: 0;
		/* margin-top: 1rem; */
	}
	header {
		text-align: center;
	}
	header h1 {
		margin-bottom: 1rem;
		font-size: var(--heading-two);
	}

	form {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		row-gap: 1rem;
		border: 2px solid var(--current-line);
	}

	label {
		font-family: bungee;

		display: grid;
		grid-template-columns: 1fr 3fr;
		align-items: baseline;
	}
	input {
		border: none;
		background-color: var(--off-black);
		border-bottom: 2px solid var(--pink);
		color: var(--foreground);
		width: 100%;
	}
	.submit {
		background-color: var(--green);
		border: none;
		padding: 0.5rem 1rem;
		margin: 1rem 0;
		font-weight: 700;
		color: var(--black-card);
		font-family: bungee;
	}
	.signedIn {
		display: grid;
		grid-gap: var(--spacing-md);
	}
	.signedIn a,
	.signedIn h1 {
		color: var(--pink);
	}
</style>
