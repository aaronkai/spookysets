<script>
	import { supabase } from '$lib/supabaseClient';
	import SignOut from './SignOut.svelte';
	import Avatar from './Avatar.svelte';

	let loading = true;
	let username = null;
	let website = null;
	let avatar_url = null;

	async function getProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();
			let { data, error, status } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;
			if (data) {
				username = data.username;
				website = data.website;
				avatar_url = data.avatar_url;
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			loading = false;
		}
	}

	async function updateProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			};

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal', // Don't return the value after inserting
			});

			if (error) throw error;
		} catch (error) {
			console.error(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<form use:getProfile on:submit|preventDefault={updateProfile}>
	<header>
		<h1>Profile</h1>
		<h2>Get started creating your profile.</h2>
	</header>
	<Avatar bind:path={avatar_url} on:upload={updateProfile} />

	<label for="username"> Name: </label>
	<input id="username" type="text" bind:value={username} />
	<label for="website"> Website: </label>
	<input id="website" type="text" bind:value={website} />
	<input
		class="submit"
		type="submit"
		value={loading ? 'Loading ...' : 'Update'}
		disabled={loading}
	/>
</form>

<style>
	header {
		text-align: center;
	}
	header h1 {
		margin-bottom: 1rem;
		font-size: var(--heading-two);
	}
	header h2 {
		margin-bottom: 1rem;
		font-size: var(--heading-five);
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
		margin-top: 1rem;
		font-weight: 700;
		color: var(--black-card);
		font-family: bungee;
	}
</style>
