import { supabase } from '$lib/supabaseClient';

export async function post({ request }) {
	try {
		const { email, password } = await request.json();
		console.log(email, password);
		return {
			body: JSON.stringify('you suck'),
		};
	} catch (e) {
		console.log({ e });
		return {
			body: JSON.stringify({ e }),
		};
	}
}

export async function put() {
	try {
		const { data, error } = await supabase.auth.signIn({
			email: 'dummy@dummy.com',
			password: 'password',
		});
		console.log({ data, error });
		return {
			body: JSON.stringify({ data, error }),
		};
	} catch (e) {
		console.log({ e });
		return {
			body: JSON.stringify({ e }),
		};
	}
}

// export async function get() {
// 	try {
// 		const { data, error } = await supabase.from('messages').select();
// 		console.log({ data, error });
// 		return {
// 			body: JSON.stringify({ data, error }),
// 		};
// 	} catch (e) {
// 		console.log({ e });
// 		return {
// 			body: JSON.stringify({ e }),
// 		};
// 	}
// }

export async function get() {
	console.log('get received');
}
