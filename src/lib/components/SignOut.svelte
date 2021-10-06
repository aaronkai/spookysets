<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/stores/sessionStore';

	export let ctaVisible;

	let message = '';
	let loading = false;

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) {
				throw error;
			} else {
				message = 'You have signed out';
			}
		} catch (error) {
			// looks like there's a bug in Supabase here that throws an error on signout, but it can be ignored
			message = `You have signed out`;
			console.warning(error);
		} finally {
			loading = false;
			user.set(null);
			console.log($user);
			ctaVisible = true;
		}
	}
</script>

<button on:click={signOut} disabled={loading}> Sign Out </button>

{#if message}
	<p>{message}</p>
{/if}

<style>
	button {
		color: var(--pink);
		background: none;
		border: none;
		font-weight: 700;
		font-size: 1.2rem;
		padding: 0;
	}
</style>
