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
			<header class="text-center">
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
		@apply grid gap-6 justify-center;
	}

	header h1 {
		@apply text-5xl font-bungee text-indigo-300;
	}

	form {
		@apply grid gap-4 py-4;
	}

	button {
		@apply text-indigo-300 bg-none border-none text-xl font-bungee;
	}

	label {
		@apply text-xl font-bungee text-indigo-300 grid items-baseline mb-2;
	}

	input {
		@apply border-none p-2 w-full rounded;
	}
	.submit {
		@apply block bg-emerald-400 p-4 text-slate-900 w-full text-center rounded font-bungee no-underline text-2xl hover:bg-indigo-300;
	}

	.signedIn {
		@apply grid gap-4;
	}

	.signedIn a,
	.signedIn h1 {
		@apply text-indigo-300;
	}
</style>
