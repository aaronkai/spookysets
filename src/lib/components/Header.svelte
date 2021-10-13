<script>
	import Nav from './Nav.svelte';

	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
		console.log(isNavOpen);
	}
</script>

<header>
	<div>
		<h1><a href="/">Spoooky sets<img src="/ghost.svg" /></a></h1>
	</div>
	{#if isNavOpen}
		<Nav {toggleNav} />
	{/if}
	<button on:click={toggleNav}>Menu</button>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
		background-color: var(--black-card);
		padding: 1rem;
		width: 100%;
		border-bottom: 1px solid var(--black-dark);
	}

	a {
		text-decoration: none;
		font-size: var(--heading-one);
	}
	img {
		height: 2rem;
		width: 2rem;
		margin-left: 1rem;
		animation-name: drift;
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	button {
		margin-top: 1rem;
	}

	@keyframes drift {
		from {
			maring-left: 1rem;
		}
		to {
			margin-left: 6rem;
		}
	}
</style>
