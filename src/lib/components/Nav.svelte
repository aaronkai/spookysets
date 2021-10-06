<script>
	import SignOut from './SignOut.svelte';
	import UserInfo from './UserInfo.svelte';
	import { user } from '$lib/stores/sessionStore';

	console.log({ $user });
</script>

<nav>
	<a href="/pages/workout">Workout</a>
	<a href="/pages/signUp">SignUp</a>

	{#if $user}
		<a href="/pages/profile">Profile</a>
		<UserInfo />
		<SignOut />
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		padding: 10px;
	}
	a {
		text-decoration: none;
	}
</style>
