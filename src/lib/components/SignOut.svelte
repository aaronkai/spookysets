<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/stores/sessionStore';
	import { goto } from '$app/navigation';

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
			console.warn(error);
		} finally {
			loading = false;
			user.set(null);
			ctaVisible = true;
			goto('/');
		}
	}
</script>

<button
	class="bg-none border-none text-fuchsia-300 font-bungee text-3xl underline underline-offset-2 text-start z-50 cursor-pointer"
	type="button"
	on:click={signOut}
	disabled={loading}
>
	Sign Out
</button>

{#if message}
	<p>{message}</p>
{/if}

<!-- <style>
	button {
		background: none;
		border: none;
		text-align: left;
		color: var(--violet-3);
		font-size: var(--font-size-4);
		padding-top: var(--size-4);
		padding-left: 0;
		text-decoration: underline;
		cursor: pointer;
	}
</style> -->
