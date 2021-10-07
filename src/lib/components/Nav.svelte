<script>
	import SignOut from './SignOut.svelte';
	import UserInfo from './UserInfo.svelte';
	import { user } from '$lib/stores/sessionStore';
</script>

<nav>
	<a href="/pages/workout">Workout</a>
	{#if !$user}
		<a href="/pages/signUp">SignUp</a>
	{:else}
		<a href="/pages/profile">Profile</a>
		<!-- <UserInfo /> -->
		<SignOut />
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		width: 100%;
		margin-top: 1rem;
	}
	a {
		text-decoration: none;
	}
</style>
