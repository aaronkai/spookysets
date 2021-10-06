<script>
	import { createEventDispatcher } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	export let path;

	let uploading = false;
	let src;
	let files;

	const dispatch = createEventDispatcher();

	async function downloadImage() {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);
			if (error) throw error;

			src = URL.createObjectURL(data);
		} catch (error) {
			console.error('Error downloading image: ', error.message);
		}
	}

	async function uploadAvatar() {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const fileName = `${Math.random()}.${fileExt}`;
			const filePath = `${fileName}`;

			let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

			if (uploadError) throw uploadError;

			path = filePath;
			dispatch('upload');
		} catch (error) {
			alert(error.message);
		} finally {
			uploading = false;
		}
	}
</script>

{#if path}
	<img use:downloadImage {src} alt="Avatar" />
	<label for="single">
		{uploading ? 'Uploading ...' : 'Change Image'}
	</label>
{:else}
	<label for="single">
		{uploading ? 'Uploading ...' : 'Upload Image'}
	</label>
{/if}
<input
	type="file"
	id="single"
	accept="image/*"
	bind:files
	on:change={uploadAvatar}
	disabled={uploading}
/>

<style>
	img {
		object-fit: cover;
		width: 150px;
		height: 150px;
		border-radius: 100%;
	}
	input {
		visibility: hidden;
	}
	label {
		color: var(--pink);
		background: none;
		border: none;
		font-weight: 700;
		font-size: 1rem;
		padding: 0;
	}
</style>
