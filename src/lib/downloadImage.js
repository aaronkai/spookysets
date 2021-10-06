import { supabase } from '$lib/supabaseClient';

export async function downloadImage(url) {
	try {
		const { data, error } = await supabase.storage.from('avatars').download(url);
		if (error) throw error;

		return URL.createObjectURL(data);
	} catch (error) {
		console.error('Error downloading image: ', error.message);
	}
}
