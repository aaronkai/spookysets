<script>
	import { supabase } from '$lib/supabaseClient';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import Toast from './Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { user } from '$lib/stores/sessionStore';
	import { goto } from '$app/navigation';

	let signIn = false;
	let email;
	let password;
	let errorMessage;
	let loading = false;
	let isMember = localStorage.getItem('spookysetsMember') ? (signIn = true) : false;

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
					localStorage.setItem('spookysetsMember', 'true');
					goto('/');
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
</script>

<Toast />
<main>
	{#if !$user}
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
		<form id="form" on:submit|preventDefault={handleSubmit}>
			<div>
				<label for="email">Email: </label>
				<input
					id="email"
					type="email"
					placeholder="Your email"
					autocomplete="email"
					bind:value={email}
				/>
			</div>
			<div>
				<label for="password">Password: </label>
				<input
					type="password"
					placeholder="Your password"
					autocomplete="current-password"
					bind:value={password}
				/>
			</div>
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
		</form>
		{#if signIn}
			<button on:click={toggle}>Do you need to sign up?</button>
		{:else}
			<button on:click={toggle}>Already have an account?</button>
		{/if}
	{:else}
		<div class="signedIn">
			<h1>You are signed in!</h1>
			<a href="/">Go pick a workout</a>
		</div>
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-gap: var(--size-6);
		justify-content: center;
	}

	header {
		text-align: center;
	}
	header h1 {
		font-size: var(--font-size-6);
		color: var(--grape-3);
	}

	form {
		display: grid;
		grid-gap: var(--size-7);
		padding: var(--size-3);
	}

	button {
		color: var(--grape-3);
		background: none;
		border: none;
		font-size: var(--font-size-2);
		padding: 0;
	}

	label {
		font-family: bungee;
		display: grid;
		grid-template-columns: 1fr 3fr;
		align-items: baseline;
		margin-bottom: var(--size-2);
	}
	input {
		border: none;
		background-color: var(--gray-8);
		border-bottom: 2px solid var(--grape-3);
		color: var(--foreground);
		width: 100%;
	}
	.submit {
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
		font-family: bungee;
		border-bottom: none;
	}

	.submit:hover {
		background: var(--grape-3);
	}

	.signedIn {
		display: grid;
		grid-gap: var(--size-3);
	}

	.signedIn a,
	.signedIn h1 {
		color: var(--grape-3);
	}
</style>
