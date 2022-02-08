<script lang="ts">
	let email;
	let password;

	async function login() {
		const res = await fetch('/supabaseAuth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		if (res.ok) {
			const data = await res.json();
			console.log(data);
		} else {
			console.log('error in post');
		}
	}

	async function request(method: 'POST' | 'GET' | 'PUT') {
		const data = await fetch('/supabaseAuth', {
			method,
		});
		const json = await data.json();
		console.log({ json });
	}
</script>

<form on:submit|preventDefault={login}>
	<h1 class="text-center text-2xl font-bold">Login</h1>

	<div class="my-1">
		<label for="email">Email</label>
		<input type="email" placeholder="Enter your email" bind:value={email} />
	</div>
	<div class="my-1">
		<label for="password">Password</label>
		<input type="password" placeholder="Enter your password" bind:value={password} />
	</div>
	<div class="my-3">
		<button class="submit" type="submit">Login</button>
	</div>
</form>
