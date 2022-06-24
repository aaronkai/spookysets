<script>
	import { supabase } from '$lib/supabaseClient';

	let username = 'User';
	let src;
	let url;

	async function getUsername() {
		try {
			const user = supabase.auth.user();
			let { data, error, status } = await supabase
				.from('profiles')
				.select(`username, avatar_url`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;
			if (data) {
				username = data.username;
				url = await downloadImage(data.avatar_url);
			}
		} catch (error) {
			console.error(error.message);
		} finally {
		}
	}

	async function downloadImage(url) {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(url);
			if (error) throw error;

			src = URL.createObjectURL(data);
		} catch (error) {
			console.error('Error downloading image: ', error.message);
		}
	}

	username = getUsername();
</script>

<div>
	<a href="/pages/profile">Welcome, {username}</a>
	<img use:downloadImage {src} alt="Avatar" />
</div>

<style>
	img {
		@apply h-12 w-12;
	}
</style>
