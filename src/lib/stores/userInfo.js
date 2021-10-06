import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

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
			return data.username;
		}
	} catch (error) {
		console.error(error.message);
	}
}

export const username = writable(getUsername());
export const avatar_url = writable('/genericUserIcon.svg');
